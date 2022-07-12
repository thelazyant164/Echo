const audiosRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Audio = require('../models/audio');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

audiosRouter.get('/', async (request, response) => {
  const audios = await Audio.find({});
  response.json(audios);
});

audiosRouter.get('/:id', async (request, response, next) => {
  const audio = await Audio.findById(request.params.id);
  if (audio) {
    response.json(audio);
  } else {
    response.status(404).end();
  }
});

audiosRouter.post('/', async (request, response, next) => {
  const { name, content } = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const audio = new Audio({
    name,
    content, // placeholder -> clone & apply audio processing here
    user: user._id,
  });

  const savedAudio = await audio.save();
  user.notes = user.notes.concat(savedAudio._id);
  await user.save();

  response.json(savedAudio);
});

audiosRouter.delete('/:id', async (request, response, next) => {
  await Audio.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = audiosRouter;
