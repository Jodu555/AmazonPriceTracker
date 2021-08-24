const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.get('/', controller.fetchAll);
router.get('/:uuid', controller.fetchOne);


module.exports = { router }
