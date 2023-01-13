const AWS = require('aws-sdk');
const config = require('./config');
const logger = require('./logger');

const s3 = new AWS.S3({
  accessKeyId: config.S3_ACCESS_KEY,
  secretAccessKey: config.S3_SECRET_ACCESS_KEY,
});

// const S3CreateBucket = () => {
//   s3.createBucket({
//     Bucket: config.BUCKETNAME,
//   }, (err, data) => {
//     if (err) {
//       logger.errorInfo(err, err.stack);
//     } else {
//       logger.info('Bucket created successfully', data.Location);
//     }
//   });
// };

const S3Insert = (username, id, fileContent) => {
  s3.upload({
    Bucket: config.BUCKETNAME,
    Key: `${username}/${id}`,
    Body: fileContent,
  }, (err, data) => {
    if (err) {
      logger.errorInfo(err, err.stack);
    } else {
      logger.info(`File uploaded successfully at ${data.Location}`);
    }
  });
};

const S3Delete = (username, id) => {
  s3.deleteObject({
    Bucket: config.BUCKETNAME,
    Key: `${username}/${id}`,
  }, (err, data) => {
    if (err) {
      logger.errorInfo(err, err.stack);
    } else {
      logger.info(`File deleted successfully from ${data.Location}`);
    }
  });
};

const S3RetrieveItem = (username, id) => new Promise((resolve, reject) => {
  s3.getObject({
    Bucket: config.BUCKETNAME,
    Key: `${username}/${id}`,
  }, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

const S3RetrieveAll = (username, id) => {
  s3.listObjects({
    Bucket: config.BUCKETNAME,
    Key: `${username}/${id}`,
  }, (err, data) => {
    if (err) {
      logger.errorInfo(err, err.stack);
    } else {
      logger.info(`File successfully retrieved from ${data.Location}`);
    }
  });
};

module.exports = {
  S3Delete, S3Insert, S3RetrieveItem, S3RetrieveAll,
};
