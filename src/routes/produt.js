const express = require('express');
const controller = require('./product.controller');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:uuid', controller.get);
router.post('/', controller.create);
router.patch('/:uuid', controller.update);
router.get('/fetch/all', controller.fetchAll);
router.get('/fetch/:uuid', controller.fetchOne);


module.exports = { router }
