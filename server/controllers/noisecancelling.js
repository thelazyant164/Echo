const NoiseSuppressionProcessor = require('@shiguredo/noise-suppression');
const axios = require('axios');
const noisecancellingrouter = require('express').Router();

noisecancellingrouter.post('/noisecancelling', async (request, response) => {
  


  const assetsPath = 'https://cdn.jsdelivr.net/npm/@shiguredo/noise-suppression@latest/dist';
  const processor = new NoiseSuppressionProcessor(assetsPath);
  const newAudio = await processor.startProcessing(request.file);
  processor.stopProcessing();
});
