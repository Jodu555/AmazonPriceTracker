const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const { productCreationSchema } = require('../../database/schemas');
const { v4 } = require('uuid');

async function getAll(req, res, next) {
    const products = await database.get('product').get({});
    if (products.length == 0) {
        next(new Error('There are no Products!'));
    } else {
        res.json(products);
    }
}

async function get(req, res, next) {
    const { uuid } = req.params;
    const product = await database.get('product').getOne({
        UUID: uuid,
    });
    if (!product) {
        next(new Error('Product not found'));
    } else {
        res.json(product);
    }
}

function create(req, res, next) {
    const validation = productCreationSchema.validate(req.body);
    if (validation.error) {
        next(new Error(validation.error.details[0].message));
        return;
    } else {
        const product = req.body;
        product.UUID = v4();
        product.product_data_UUID = v4();
        product.notification_cases = '*';
        database.get('product').create(product);
        res.json(product);
    }
}

async function update(req, res, next) {
    const { uuid } = req.params;
    try {
        const validation = productCreationSchema.validate(req.body);
        if (validation.error) {
            next(new Error(validation.error.details[0].message));
            return;
        } else {
            if (validation.UUID) delete validation.UUID;
            const update = await database.get('product').update({
                UUID: uuid
            }, req.body);
            res.json(update);
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAll,
    get,
    create,
    update,
};