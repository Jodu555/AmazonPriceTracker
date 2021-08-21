const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const validator = require('../utils/validator');

function getAll(req, res, next) {

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
        database.get('product').create(req.body);
    } else {
        next(new Error(validation.message));
    }
}

function update(req, res, next) {

}

module.exports = {
    getAll,
    get,
    create,
    update
};