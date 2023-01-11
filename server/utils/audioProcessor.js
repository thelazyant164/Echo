const { spawn } = require('child_process');
const logger = require('./logger');

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
    logger.info(code);
  });

  process.on('exit', (code, signal) => {
    logger.info('The data retrieved from the Python script is, ', result);
    logger.info(`code: ${code}`);
    logger.info(`signal: ${signal}`);
    logger.info(signal);
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
    logger.info(warning.name); // Print the warning name
    logger.info(warning.message); // Print the warning message
    logger.info(warning.stack); // Print the stack trace
  });
});

const processAudio = async (command, fileName) => {
  logger.info(`${command} request received. Waiting for server to process...`);
  const process = spawn('python', [`server\\processors\\${command}.py`, fileName]);
  const result = await getChildProcessResult(process);
  return result;
};

module.exports = { processAudio };
