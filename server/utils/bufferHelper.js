const fs = require('fs');
const { promisify } = require('util');
const Audio = require('../models/audio');

const clearTempBuffer = async (filePath) => {
  const unlinkPromise = promisify(fs.unlink);
  await unlinkPromise(filePath);
};

// returns the name of the file written to FS, responses with status code 404 if error
const bufferFileFromId = async (request, response) => {
  const audio = await Audio.findById(request.params.id);
  if (!audio) {
    response.status(404).end();
  }
  const writeFilePromise = promisify(fs.writeFile);
  const filePath = `./server/temp/files/${audio.name}.wav`;
  // write file to FS
  const err = await writeFilePromise(filePath, audio.content, 'ascii');
  if (err) {
    response.status(404).end();
  }
  return audio.name;
};

// downloads the file written to FS as attachment
// auto clears buffer when done, responses with status code 404 if error
const getBufferFileFromId = async (request, response) => {
  const audioName = await bufferFileFromId(request, response);
  await response.download(`./server/temp/files/${audioName}.wav`, () => {
    clearTempBuffer(`./server/temp/files/${audioName}.wav`);
  });
};

module.exports = {
  bufferFileFromId, getBufferFileFromId, clearTempBuffer,
};
