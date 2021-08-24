const express = require('express');
const controller = require('./product.controller');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:uuid', controller.get);
router.post('/', controller.create);
router.patch('/:uuid', controller.update);


module.exports = { router }
