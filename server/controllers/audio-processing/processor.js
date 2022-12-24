const NormalizeVolume = require('normalize-volume');
const { splitAudio } = require('audio-splitter');
const spawn = require('child_process').spawn;
const fs = require('fs');
const { Readable } = require('stream');
const wav = require('wav');
const extractAudio = require('ffmpeg-extract-audio');
const logger = require('../../utils/logger');

const getChildProcessResult = (process) => new Promise((resolve) => {
  let result = '';
  let error = '';
  process.stdout.on('data', (data) => {
    result += data;
  });

  process.stderr.on('data', (data) => {
    error += data;
  });

  process.on('error', (err) => {
    logger.errorInfo(`\n\t\tERROR: spawn failed! (${err})`);
  });
  process.on('disconnect', (code) => {
    logger.errorInfo(`\n\t\tERROR: spawn failed! (${code})`);
  });
  process.on('message', (code) => {
    // logger.info(code);
  });

  process.on('exit', (code, signal) => {
    // logger.info('The data retrieved from the Python script is, ', result);
    // logger.info(`code: ${code}`);
    // logger.info(`signal: ${signal}`);
    // logger.info(signal);
    resolve(result);
  });

  process.on('close', (code, signal) => {
    logger.info('The data retrieved from the Python script is, ', result);
    logger.info('The error retrieve from the Python script is, ', error);
    logger.info(`code: ${code}`);
    logger.info(`signal: ${signal}`);
    resolve(result);
  });
  process.on('warning', (warning) => {
    // logger.info(warning.name); // Print the warning name
    // logger.info(warning.message); // Print the warning message
    // logger.info(warning.stack); // Print the stack trace
  });
});

const normalize = async (raw) => {
  // const processed = `${raw}-normalized.wav`;
  // const options = {
  //   normalize: true,
  //   waveform: { width: 1400, height: 225 },
  //   ffmpeg_bin: 'ffmpeg.exe',
  //   convert_bin: 'convert.exe',
  // };
  // eslint-disable-next-line
  // const result = await NormalizeVolume(`${__dirname}/child-process-hub/files/${raw}.wav`, processed, options);
  const process = spawn('python', [`${__dirname}\\child-process-hub\\normalization.py`, `${raw}.wav`]);
  const result = await getChildProcessResult(process);
  // return result.file;
  return result;
};

const denoise = async (raw) => {
  const process = spawn('python', [`${__dirname}\\child-process-hub\\noisereduction.py`, `${raw}.wav`]);
  const result = await getChildProcessResult(process);
  return result;
};

const volume = async (raw) => {
  // const result = await getChildProcessResult(process);
  const result = 'Feature not implemented yet.';
  logger.errorInfo('Feature not implemented yet.');
  return result;
};

const silence = async (raw) => {
  const process = spawn('python', [`${__dirname}\\child-process-hub\\silence.py`, `${raw}.wav`]);
  const result = await getChildProcessResult(process);
  return result;
};

const transcribe = async (raw) => {
  const process = spawn('python', [`${__dirname}\\child-process-hub\\transcribe.py`, `${raw}.wav`]);
  const result = await getChildProcessResult(process);
  return result;
};

module.exports = {
  normalize, denoise, volume, silence, transcribe,
};
