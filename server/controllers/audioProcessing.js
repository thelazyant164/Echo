const audioProcessingRouter = require('express').Router();
const { authorizeRequest } = require('../utils/authHelper');
const { bufferFileFromId, clearTempBuffer } = require('../utils/bufferHelper');
const { processAudio } = require('../utils/audioProcessor');

audioProcessingRouter.get('/:req/:id', async (request, response, next) => {
  await authorizeRequest(request, response);
  const { req, id } = request.params;
  const acceptedReq = ['normalize', 'denoise', 'volume', 'silence', 'transcribe'];
  if (!acceptedReq.includes(req)) {
    response.redirect(301, `../../audios/${id}`);
  }
  const audioName = await bufferFileFromId(request, response);
  const processedFilePath = await processAudio(req, audioName);
  response.download(processedFilePath.trim(), () => {
    clearTempBuffer(`./server/temp/files/${audioName}.wav`);
    clearTempBuffer(processedFilePath.trim());
  });
});

module.exports = audioProcessingRouter;
