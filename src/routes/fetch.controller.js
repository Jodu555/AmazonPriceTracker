const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const { getAmazonData } = require('../utils/amazon');
const { v4: uuidv4 } = require('uuid');

async function fetchAll(req, res, next) {
    try {
        const products = await database.get('product').get({});
        products.forEach(async (product) => {
            const data = await getAmazonData(product.amazon_link);
            insertData(product.UUID, data);
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
        insertData(uuid, data);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function insertData(UUID, data) {
    data.rating = JSON.stringify(data.rating);
    data.descriptions = JSON.stringify(data.descriptions);
    data.specifications = JSON.stringify(data.specifications);
    const obj = {
        UUID,
        time: Date.now(),
        ...data
    }
    console.log(await database.get('product_data').getOne(UUID));
    database.get('product_data').create(obj);
}

module.exports = {
    fetchAll,
    fetchOne
}