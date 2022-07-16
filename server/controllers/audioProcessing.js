const fs = require('fs');
const audioProcessingRouter = require('express').Router();
const Audio = require('../models/audio');
const { authorizeRequest } = require('../utils/authHelper');
const {
  normalize, denoise, volume, silence, transcribe,
} = require('./audio-processing/processor');
const logger = require('../utils/logger');

audioProcessingRouter.get('/:req/:id', async (request, response, next) => {
  await authorizeRequest(request, response);
  const { req, id } = request.params;

  const audio = await Audio.findById(id);
  if (!audio) {
    response.status(404).end();
  }

  // write file to Heroku FS
  let raw = `${audio.name}.mp3`;
  fs.writeFile(raw, audio.content, 'ascii', (err) => logger.info(err));
  raw = raw.slice(0, -4);
  // Store path name & forward to processing functions
  let processed = '';
  switch (req) {
    case 'normalize':
      processed = await normalize(raw);
      break;
    case 'denoise':
      processed = await denoise(raw);
      break;
    case 'volume':
      processed = await volume(raw);
      break;
    case 'silence':
      processed = await silence(raw);
      break;
    case 'transcribe':
      processed = await transcribe(raw);
      break;
    default:
    // if no request, download original file from ID in DB
      response.redirect(301, `../../audios/${id}`);
  }
  response.download(processed);
});

module.exports = audioProcessingRouter;
