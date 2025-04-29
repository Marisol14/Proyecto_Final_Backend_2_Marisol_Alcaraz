const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users.controller');

router.post('/register', usersCtrl.register);

// Protegida: sólo usuarios con JWT válido pueden ver sus datos
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  usersCtrl.current
);

module.exports = router;
