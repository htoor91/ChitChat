const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./user_controller');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

router.route('/:id/channels')
  .get(controller.getChannels);

module.exports = router;
