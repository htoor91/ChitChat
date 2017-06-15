const router = require('express').Router();

router.use('/users', require('./user/user_routes'));

module.exports = router;
