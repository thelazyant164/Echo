const multer = require('multer');
const _ = require('lodash');
const audiosRouter = require('express').Router();
const User = require('../models/user');
const Audio = require('../models/audio');
const { getLoggedInUser, tryAuthorizeRequest } = require('../utils/authHelper');
const { getBufferFileFromId } = require('../utils/bufferHelper');
const {
  S3Delete, S3Insert, S3Update,
} = require('../utils/s3Storage');

const upload = multer();

audiosRouter.get('/', async (request, response) => {
  const { username } = await getLoggedInUser(request);
  const populated = await User.find({ username }).populate('audios', { name: 1, date: 1 });
  const { audios } = populated[0];
  response.json(audios);
});

audiosRouter.get('/:id', async (request, response, next) => {
  if (await tryAuthorizeRequest(request, response)) {
    await getBufferFileFromId(request, response);
  }
});

audiosRouter.put('/:id', upload.single('test'), async (request, response, next) => {
  if (await tryAuthorizeRequest(request, response)) {
    const audio = await Audio.findById(request.params.id);
    await Audio.findByIdAndUpdate(request.params.id, { ...audio, date: new Date() }, { new: true });
    try {
      await S3Update(request.user.userID, request.params.id, request.file.buffer);
    } catch (err) {
      return response.status(400).send({ error: 'file override failed' });
    }
    response.status(200).end();
  }
});

audiosRouter.delete('/:id', async (request, response, next) => {
  if (await tryAuthorizeRequest(request, response)) {
    // Delete reference to audio from user
    const audio = await Audio.findById(request.params.id);
    const userId = audio.user;
    const user = await User.findById(userId);
    _.remove(user.audios, (audioID) => audioID === audio.id);
    await user.save(user);
    try {
      await S3Delete(userId, request.params.id);
    } catch (err) {
      return response.status(400).send({ error: 'file deletion failed' });
    }
    await Audio.findByIdAndRemove(audio.id);
    response.status(204).end();
  }
});

audiosRouter.post('/', upload.single('test'), async (request, response, next) => {
  const { file } = request;
  const user = await getLoggedInUser(request, response);
  const audio = new Audio({
    name: file.fieldname,
    user: user._id,
    date: new Date(),
  });
  const savedAudio = await audio.save();
  try {
    await S3Insert(request.user.userID, savedAudio._id, file.buffer);
  } catch (err) {
    return response.status(400).send({ error: 'file upload failed' });
  }
  user.audios = user.audios.concat(savedAudio._id);
  await user.save();
  const res = { id: savedAudio._id };
  response.json(res);
});

module.exports = audiosRouter;
