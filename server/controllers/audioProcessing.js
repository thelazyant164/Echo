const fs = require('fs');
const audioProcessingRouter = require('express').Router();
const { spawn } = require('child_process');
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
  let raw = `${audio.name.replace(/ /g, '')}.wav`;
  fs.writeFile(`./server/temp/files/${raw}`, audio.content.buffer.toString(), 'ascii', (err) => logger.errorInfo(err));
  raw = raw.slice(0, -4);
  // Store path name & forward to processing functions
  let processed = '';
  switch (req) {
    case 'normalize':
      logger.info('Normalize request received. Waiting for server to process...');
      try {
        processed = await normalize(raw);
      } catch (e) {
        logger.errorInfo(e);
      }
      break;
    case 'denoise':
      logger.info('Denoise request received. Waiting for server to process...');
      try {
        processed = await denoise(raw);
      } catch (e) {
        logger.errorInfo(e);
      }
      break;
    case 'volume':
      logger.info('Volume adjust request received. Waiting for server to process...');
      try {
        processed = await volume(raw);
      } catch (e) {
        logger.errorInfo(e);
      }
      break;
    case 'silence':
      logger.info('Silence request received. Waiting for server to process...');
      try {
        processed = await silence(raw);
      } catch (e) {
        logger.errorInfo(e);
      }
      break;
    case 'transcribe':
      logger.info('Transcribe request received. Waiting for server to process...');
      try {
        processed = await transcribe(raw);
      } catch (e) {
        logger.errorInfo(e);
      }
      break;
    default:
    // if no request, download original file from ID in DB
      response.redirect(301, `../../audios/${id}`);
  }
  response.download(processed.trim());
});

module.exports = audioProcessingRouter;
