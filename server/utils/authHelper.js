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

const getLoggedInUser = async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    response.status(401).send({ error: 'user not found' });
  }
  return user;
};

const authorizeRequest = async (request, response) => {
  const user = await getLoggedInUser(request, response);
  const audio = await Audio.findById(request.params.id);
  if (!audio) {
    response.status(404).send({ error: 'file not found' });
  }
  const authorized = _.some(user.audios, audio._id);
  if (!authorized) {
    response.status(401).send({ error: 'unauthorized permission' });
  }
  return user;
};

module.exports = {
  getTokenFrom, getLoggedInUser, authorizeRequest,
};
