const audioProcessingRouter = require('express').Router();
const { tryAuthorizeRequest } = require('../utils/authHelper');
const { tryBufferFileFromId, clearTempBuffer } = require('../utils/bufferHelper');
const { processAudio } = require('../utils/audioProcessor');

audioProcessingRouter.get('/:req/:id', async (request, response, next) => {
  if (await tryAuthorizeRequest(request, response)) {
    const { req, id } = request.params;
    const acceptedReq = ['normalize', 'denoise', 'volume', 'silence', 'transcribe'];
    if (!acceptedReq.includes(req)) {
      return response.redirect(301, `${req.baseUrl}/api/audios/${id}`);
    }
    const out = {};
    if (await tryBufferFileFromId(request, response, out)) {
      const { audioName } = out;
      const processedFilePath = await processAudio(req, audioName);
      response.download(processedFilePath.trim(), () => {
        clearTempBuffer(`./server/temp/files/${audioName}.wav`);
        clearTempBuffer(processedFilePath.trim());
      });
    }
  }
});

module.exports = audioProcessingRouter;
