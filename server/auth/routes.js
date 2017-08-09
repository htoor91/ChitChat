const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const controller = require('./controller');

router.post('/signin', verifyUser(), controller.signin);

module.exports = router;
