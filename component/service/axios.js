import axios from 'axios';

require('dotenv').config();

const LOCAL_IP = process.env.LOCAL_IP;
const PORT = process.env.PORT;

export const axiosInstance = axios.create({
  baseURL: `http://${LOCAL_IP}:${PORT}/`,
  timeout: 1000,
});
