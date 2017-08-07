const router = require('express').Router();
const controller = require('./emoticon_controller');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post);

module.exports = router;
