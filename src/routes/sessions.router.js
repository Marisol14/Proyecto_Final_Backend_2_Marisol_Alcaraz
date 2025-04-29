const express  = require('express');
const passport = require('passport');
const ctrl     = require('../controllers/sessions.controller');
const router   = express.Router();

router.post('/login', ctrl.login);

router.get(
  '/current',
  passport.authenticate('current', { session: false }),
  ctrl.current
);

module.exports = router;
