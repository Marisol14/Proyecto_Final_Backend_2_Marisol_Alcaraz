// src/config/passport.js
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt        = require('bcrypt');
const User          = require('../models/user.model');

// ----- Estrategia de LOGIN (email + password) -----
passport.use('login', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user)
        return done(null, false, { message: 'Usuario no existe' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// ----- Función para extraer el JWT de la cookie -----
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[process.env.JWT_COOKIE_NAME];
  }
  return token;
};

// ----- Estrategia JWT (lee el token de la cookie) -----
passport.use('jwt', new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:    process.env.JWT_SECRET
  },
  async (payload, done) => {
    try {
      // payload.sub es el userId que firmaste
      const user = await User.findById(payload.sub).select('-password');
      if (!user)
        return done(null, false, { message: 'Token inválido' });
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

