const quickProcessingRouter = require('express').Router();
const { tryAuthorizeRequest } = require('../utils/authHelper');
const { tryBufferFileFromRequest, clearTempBuffer } = require('../utils/bufferHelper');
const { processAudio } = require('../utils/audioProcessor');

quickProcessingRouter.post('/:req', async (request, response, next) => {
  if (await tryAuthorizeRequest(request, response)) {
    const { req } = request.params;
    const acceptedReq = ['normalize', 'denoise', 'silence', 'transcribe'];
    if (!acceptedReq.includes(req)) {
      next();
    }
    const out = {};
    if (await tryBufferFileFromRequest(request, response, out)) {
      const { audioName } = out;
      const processedFilePath = await processAudio(req, audioName);
      response.download(processedFilePath.trim(), () => {
        clearTempBuffer(`./server/temp/files/${audioName}.wav`);
        clearTempBuffer(processedFilePath.trim());
      });
    }
  }
});

module.exports = quickProcessingRouter;
