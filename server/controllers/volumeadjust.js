const volumeadjustrouter = require('express').Router();
const NormalizeVolume = require('normalize-volume');

volumeadjustrouter.post('/adjust', async (resquest, response) => {
  const options = {
    normalize: true,
    waveform: { width: 1400, height: 225 },
    ffmpeg_bin: 'ffmpeg.exe',
    convert_bin: 'convert.exe',
  };
  NormalizeVolume('z:\test.mp4', 'z:\test_normalized.mp4')
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
