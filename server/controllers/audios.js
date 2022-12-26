const multer = require('multer');
const _ = require('lodash');
const audiosRouter = require('express').Router();
const User = require('../models/user');
const Audio = require('../models/audio');
const { getLoggedInUser, authorizeRequest } = require('../utils/authHelper');
const { getBufferFileFromId } = require('../utils/bufferHelper');

const upload = multer();

audiosRouter.get('/', async (request, response) => {
  const { username } = await getLoggedInUser(request);
  const populated = await User.find({ username }).populate('audios', { name: 1, date: 1 });
  const { audios } = populated[0];
  response.json(audios);
});

audiosRouter.get('/:id', async (request, response, next) => {
  await authorizeRequest(request, response);
  await getBufferFileFromId(request, response);
});

audiosRouter.put('/:id', upload.single('test'), async (request, response, next) => {
  const { name } = request.body;
  const { file } = request;
  await authorizeRequest(request, response);

  const audio = {
    name,
    content: file,
    date: new Date(),
  };

  await Audio.findByIdAndUpdate(request.params.id, audio, { new: true });
  response.status(200).end();
});

audiosRouter.delete('/:id', async (request, response, next) => {
  await authorizeRequest(request, response);

  // Delete reference to audio from user
  const audio = await Audio.findById(request.params.id);
  const userId = audio.user;
  const user = await User.findById(userId);
  _.remove(user.audios, (audioID) => audioID === audio.id);
  await user.save(user);

  // Delete audio
  await Audio.findByIdAndRemove(audio.id);
  response.status(204).end();
});

audiosRouter.post('/', upload.single('test'), async (request, response, next) => {
  const { name, id } = request.body;
  const { file } = request;
  const user = await getLoggedInUser(request, response);

  const audio = new Audio({
    name,
    content: file,
    user: user._id,
    date: new Date(),
  });

  const savedAudio = await audio.save();
  user.audios = user.audios.concat(savedAudio._id);
  await user.save();
  const res = { id: savedAudio._id };
  response.json(res);
});

module.exports = audiosRouter;
