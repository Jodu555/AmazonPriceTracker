const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();
const validator = require('../utils/validator');

function getAll(req, res, next) {

}

function get(req, res, next) {

}

function create(req, res, next) {
    const validation = validator.validateProduct(req.body);
    if (validation.success) {
        database.get('product').create(req.body);
    } else {
        throw new Error(validation.message);
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