/* eslint-disable object-curly-spacing */
const jwt = require('jsonwebtoken');
require('dotenv').config();

// This function will return error if authorization fails
module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json({
        isAuthorize: false,
        message: 'Authorization denied',
      });
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json({
      isAuthorize: false,
      message: error.message,
    });
  }
};
