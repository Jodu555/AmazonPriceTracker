const express = require('express');
const controller = require('./fetch.controller');
const router = express.Router();

router.get('/', controller.fetchAll);
router.get('/:uuid', controller.fetchOne);


module.exports = { router }
