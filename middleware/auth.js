const jwt = require('jsonwebtoken');
const config = require('config');
// A middleware function is a function that has access to the request and response cycle / objects
//next is a callback that we have to run when we are done to move to the next middleware
module.export = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // Status for not authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // This passes the token through and decodes it with the jwtSecert
    const decoded = jwt.verify(token, config.get('jwtSecert'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};
