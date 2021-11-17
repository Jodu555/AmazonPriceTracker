const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const { getAmazonData } = require('../../utils/amazon');
const { sendMessage } = require('../../utils/mailer');

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
];
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samsatg', 'Sonntag'];

async function fetchAll(req, res, next) {
    try {
        const products = await database.get('product').get({});
        await products.forEach(async (product) => {
            const data = await getAmazonData(product.amazon_link);
            await manageData(product.UUID, data, product.amazon_link);
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function fetchOne(req, res, next) {
    const { uuid } = req.params;
    try {
        const product = await database.get('product').getOne({
            UUID: uuid,
        });
        if (product) {
            const data = await getAmazonData(product.amazon_link);
            await manageData(uuid, data, product.amazon_link);
            res.json(product);
        } else {
            next(new Error('Product with that UUID not found'));
        }
    } catch (error) {
        next(error);
    }
}

function getLatestInsertedProductByDataUUID(uuid) {
    const query = 'SELECT * FROM product_data WHERE UUID=? ORDER BY time DESC LIMIT 1';
    return new Promise(async (resolve, reject) => {
        await database.connection.query(query, [uuid], async (error, results, fields) => {
            if (error) {
                throw error;
            }
            if (results.length == 0) resolve(null);

            await results.forEach((result) => {
                resolve(result);
            });
        });
    });
}

async function manageData(UUID, data, url) {
    if (data.denied)
        return;
    const obj = prepareData(UUID, data);
    const latest = await getLatestInsertedProductByDataUUID(UUID);
    database.get('product_data').create(obj);
    //TO copy without reference
    const newest = JSON.parse(JSON.stringify(obj));
    if (latest) {
        const changes = estimateChanges(newest, latest);
        if (changes.length > 0) {
            let text = 'A Product Data changed for: \'' + newest.title + '\'\n';
            text += 'Link: \'' + url + '\'\n';
            changes.forEach((change) => {
                text +=
                    '\n' +
                    change.key.toUpperCase() +
                    " Changed \n  From: '" +
                    change.latest +
                    "' \n  To: '" +
                    change.newest +
                    "'";
            });
            sendMessage(process.env.RECIEVER, text);
        } else {
            await database.get('product_data').delete({
                UUID: latest.UUID,
                unique: true
            });
        }
    }
}

function prepareData(UUID, data) {
    data.rating = JSON.stringify(data.rating);
    data.descriptions = JSON.stringify(data.descriptions);
    data.specifications = JSON.stringify(data.specifications);
    const obj = {
        UUID,
        time: Date.now(),
        ...data,
    };
    return obj;
}

function estimateChanges(newest, latest) {
    const changes = [];
    if (JSON.stringify(latest) !== JSON.stringify(newest)) {
        Object.entries(latest).forEach(([key, value]) => {
            if (key == 'delivery' && !isValidChange(decodeDeliveryDate(newest.delivery), decodeDeliveryDate(latest.delivery))) {
                return;
            }
            if (key != 'time' && JSON.stringify(newest[key]) != JSON.stringify(value))
                changes.push({
                    key,
                    latest: value,
                    newest: newest[key],
                });
        });
    }

    return changes;
}

function decodeDeliveryDate(deliveryDate) {
    if (!deliveryDate)
        return { break: true }
    try {
        if (deliveryDate.includes('Morgen'))
            return { break: true }
        if (deliveryDate.includes('-'))
            return {
                month: deliveryDate.split('-')[1].split('.')[1].trim(),
                numday: deliveryDate.split('-')[0].split('.')[0].trim(),
                dashed: true,
            }
        return {
            day: deliveryDate.split(',')[0].trim(),
            numday: deliveryDate.split('.')[0].split(',')[1].trim(),
            month: deliveryDate.split('.')[1].trim(),
        };
    } catch (error) {
        console.error(error);
        console.log('Decoding Delivery Date failed: ' + deliveryDate);
    }
}

function isValidChange(from, to) {
    if (from.break && to.break)
        return true;
    return (
        (+from.numday + 1 == to.numday && from.month == to.month) ||
        (from.numday >= daysInMonth(months.indexOf(from.month + 1)) &&
            to.month == getNext(months, months.indexOf(from.month)))
    );
}

function daysInMonth(month) {
    return new Date(new Date(Date.now()).getFullYear(), month, 0).getDate();
}

function getNext(arr, index) {
    while (index + 1 >= arr.length)
        index = index - arr.length;
    return arr[index + 1];
}

module.exports = {
    fetchAll,
    fetchOne,
};
