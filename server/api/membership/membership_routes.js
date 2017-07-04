const router = require('express').Router();
const controller = require('./membership_controller');

router.route('/')
  .get(controller.get);

module.exports = router;
