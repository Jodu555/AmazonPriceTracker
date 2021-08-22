const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const validator = require('../utils/validator');
const { getAmazonData } = require('../utils/amazon');
const { v4: uuidv4 } = require('uuid');

async function getAll(req, res, next) {
    const products = await database.get('product').get({});
    if (products.length == 0) {
        next(new Error('There are no Products!'));
    }
    res.json(products);
}

async function get(req, res, next) {
    const { uuid } = req.params;
    const product = await database.get('product').getOne({
        UUID: uuid,
    });
    if (!product) {
        next(new Error('Product not found'));
    }
    res.json(product);
}

function create(req, res, next) {
    const validation = validator.validateProduct(req.body);
    if (validation.success) {
        const product = req.body;
        product.UUID = v4();
        product.product_data_UUID = v4();
        database.get('product').create(product);
        res.json(product);
    } else {
        next(new Error(validation.message));
    }
}

async function update(req, res, next) {
    const { uuid } = req.params;
    try {
        const validation = validator.validateProduct(req.body);
        if (validation.success) {
            if (validation.UUID) delete validation.UUID;
            const update = await database.get('product').update({
                UUID: uuid
            }, req.body);
            res.json(update);
        } else {
            throw new Error(validation.message);
        }
    } catch (error) {
        next(error);
    }
}

async function fetchAll(req, res, next) {
    try {
        const products = await database.get('product').get({});
        products.forEach((product) => {
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

function insertData(UUID, data) {

}

module.exports = {
    getAll,
    get,
    create,
    update,
    fetchAll,
    fetchOne
};