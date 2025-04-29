// src/controllers/sessions.controller.js
const passport  = require('passport');
const { signToken } = require('../services/jwt');

exports.login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err)   return next(err);
    if (!user) return res.status(401).json({ status: 'error', message: info.message });

    req.login(user, { session: false }, err => {
      if (err) return next(err);

      // Generar JWT y enviarlo en cookie httpOnly
      const token = signToken(user._id);
      res.cookie(process.env.JWT_COOKIE_NAME, token, {
        httpOnly: true,
        secure: false,       // en producción: true con HTTPS
        maxAge: 1000 * 60 * 60 // 1 hora
      });

      return res.json({ status: 'success', message: 'Login exitoso' });
    });
  })(req, res, next);
};

exports.current = (req, res) => {
  // Si llegaste aquí, passport ya validó y puso user en req.user
  res.json({ status: 'success', payload: req.user });
};
