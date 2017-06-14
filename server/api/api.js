const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));

module.exports = router;
