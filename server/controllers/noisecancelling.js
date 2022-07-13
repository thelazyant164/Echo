const NoiseSuppressionProcessor = require('@shiguredo/noise-suppression');
const axios = require('axios');
const noisecancellingrouter = require('express').Router();

noisecancellingrouter.post('/noisecancelling', async (request, response) => {
  const assetsPath = 'https://cdn.jsdelivr.net/npm/@shiguredo/noise-suppression@latest/dist';
  const processor = new NoiseSuppressionProcessor(assetsPath);
  processor.startProcessing(request.file)
    .then((newaudio) => { console.log(newaudio); })
    .then(() => { processor.stopProcessing(); })
    .catch((error) => { console.log(error); });
});
