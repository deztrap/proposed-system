import axios from "axios";
import {
  API_URL,
} from '../config';

const config = {
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
};

const client = axios.create(config);

// client.interceptors.request.use(
//   function (config) {
//     config.headers["Authorization"] = config.headers["Authorization"] || `Bearer ${localStorage.getItem('accessToken')}`;
//     return config;
//   }
// );

export default client;