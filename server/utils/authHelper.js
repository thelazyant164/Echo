const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/user');
const Audio = require('../models/audio');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const getLoggedInUser = async (request) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  return user;
};

const authorizeRequest = async (request, response) => {
  const user = await getLoggedInUser(request);
  const audio = await Audio.findById(request.params.id);
  const authorized = _.some(user.audios, audio._id);
  if (!authorized) {
    response.status(401).send({ error: 'unauthorized permission' });
  }
};

module.exports = {
  getTokenFrom, getLoggedInUser, authorizeRequest,
};
