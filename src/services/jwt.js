const jwt = require('jsonwebtoken');
const EXPIRATION = '1h'; 

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: EXPIRATION
  });
}

module.exports = { signToken };
