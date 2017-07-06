const router = require('express').Router();

router.use('/users', require('./user/user_routes'));
router.use('/channels', require('./channel/channel_routes'));
router.use('/memberships', require('./membership/membership_routes'));
router.use('/messages', require('./message/message_routes'));

module.exports = router;
