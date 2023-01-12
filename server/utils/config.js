require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;
const PORT = process.env.PORT;
const BUCKETNAME = process.env.BUCKETNAME;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  BUCKETNAME,
  S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY,
};
