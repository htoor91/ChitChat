const router = require('express').Router();
const controller = require('./channel_controller');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .delete(controller.delete);

router.route('/:id/messages')
  .get(controller.getMessages);

module.exports = router;


// TODO: MAKE SURE checkUser middleware is passed to post and delete
