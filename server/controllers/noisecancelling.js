const NoiseSuppressionProcessor = require('@shiguredo/noise-suppression');
const axios = require('axios');

const NoiseSuppression = async (audio) => {
  const assetsPath = 'https://cdn.jsdelivr.net/npm/@shiguredo/noise-suppression@latest/dist';
  const processor = new NoiseSuppressionProcessor(assetsPath);
  processor.startProcessing(audio)
    .then((newaudio) => { console.log(newaudio); })
    .then(() => { processor.stopProcessing(); })
    .catch((error) => { console.log(error); });
};