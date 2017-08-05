const router = require('express').Router();
const controller = require('./emoticon_controller');


router.route('/')
  .get(controller.get)
  .post(controller.post);


module.exports = router;
