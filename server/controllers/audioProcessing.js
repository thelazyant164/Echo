const audioProcessingRouter = require('express').Router();
const { tryAuthorizeRequest } = require('../utils/authHelper');
const { tryBufferFileFromId, clearTempBuffer } = require('../utils/bufferHelper');
const { processAudio } = require('../utils/audioProcessor');

audioProcessingRouter.get('/:req/:id', async (request, response, next) => {
  if (await tryAuthorizeRequest(request, response)) {
    const { req } = request.params;
    const acceptedReq = ['normalize', 'denoise', 'silence', 'transcribe'];
    if (!acceptedReq.includes(req)) {
      next();
    }
    const out = {};
    if (await tryBufferFileFromId(request, response, out)) {
      const { audioName } = out;
      const processedFilePath = await processAudio(req, audioName);
      response.download(processedFilePath.trim(), (err) => {
        clearTempBuffer(`./server/temp/files/${audioName}.wav`);
        clearTempBuffer(processedFilePath.trim());
      });
    }
  }
});

module.exports = audioProcessingRouter;
