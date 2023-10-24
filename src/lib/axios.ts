/* eslint-disable no-param-reassign */

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

// instance.interceptors.request.use(async (config) => {
//   return config;
// });

export default instance;
