const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { getTokenFrom, getLoggedInUser } = require('./authHelper');

const authenticate = async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = getLoggedInUser(request);
  if (!user) {
    return response.status(401).json({ error: 'invalid user' });
  }
  next();
};

module.exports = authenticate;
