const NormalizeVolume = require('normalize-volume');
const logger = require('../../utils/logger');

const normalize = async (raw) => {
  const processed = `${raw}-normalized.mp3`;
  const options = {
    normalize: true,
    waveform: { width: 1400, height: 225 },
    ffmpeg_bin: 'ffmpeg.exe',
    convert_bin: 'convert.exe',
  };
  const result = await NormalizeVolume(raw, processed, options);
  logger.info(result);
  return processed;
};

const denoise = async (raw) => {
};

const volume = async (raw) => processed;

const silence = async (raw) => processed;

const transcribe = async (raw) => processed;

module.exports = {
  normalize, denoise, volume, silence, transcribe,
};
