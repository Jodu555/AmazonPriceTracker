const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const { getAmazonData } = require('../utils/amazon');

async function fetchAll(req, res, next) {
    try {
        const products = await database.get('product').get({});
        await products.forEach(async (product) => {
            const data = await getAmazonData(product.amazon_link);
            await manageData(product.UUID, data);
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
            UUID: uuid
        });
        const data = await getAmazonData(product.amazon_link);
        await manageData(uuid, data);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

function getLatestInsertedProductByDataUUID(uuid) {
    const query = 'SELECT * FROM product_data WHERE UUID=? ORDER BY time DESC LIMIT 1'
    return new Promise(async (resolve, reject) => {
        await database.connection.query(query, [uuid], async (error, results, fields) => {
            if (error) {
                throw error;
            }
            await results.forEach((result) => {
                resolve(result);
            });

        });
    });
}

async function manageData(UUID, data) {
    const obj = prepareData(UUID, data)
    const latest = await getLatestInsertedProductByDataUUID(UUID);
    database.get('product_data').create(obj);
    //TO copy without reference
    const newest = JSON.parse(JSON.stringify(obj));
    if (latest) {
        const changes = estimateChanges(newest, latest);
        console.log('Change Found:', changes);
    }
}

function prepareData(UUID, data) {
    data.rating = JSON.stringify(data.rating);
    data.descriptions = JSON.stringify(data.descriptions);
    data.specifications = JSON.stringify(data.specifications);
    const obj = {
        UUID,
        time: Date.now(),
        ...data
    }
    return obj;
}

function estimateChanges(newest, latest) {
    const changes = [];
    if (JSON.stringify(latest) !== JSON.stringify(newest)) {
        Object.entries(latest).forEach(([key, value]) => {
            if (key != 'time' && JSON.stringify(newest[key]) != JSON.stringify(value))
                changes.push({
                    key,
                    latest: value,
                    newest: newest[key]
                });
        });
    }
    return changes;
}

module.exports = {
    fetchAll,
    fetchOne
}