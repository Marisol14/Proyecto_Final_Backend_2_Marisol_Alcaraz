const passport = require('passport');

const authorize = (...allowedRoles) => {
  return [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      const { role } = req.user;
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }
      next();
    }
  ];
};

module.exports = authorize;
