const express = require('express');
const controller = require('./controller');
const authManager = require('../../utils/authManager');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Auth-Router works just fine' });
});
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', authManager.authentication, controller.logout);

module.exports = {
    router,
};
