const router = require('express').Router();
const controller = require('./channel_controller');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post);

router.route('/:id')
  .get(controller.getOne)
  .delete(checkUser, controller.delete);

router.route('/:id/messages')
  .get(controller.getMessages);

router.route('/:id/users')
  .get(controller.getUsers);

module.exports = router;
