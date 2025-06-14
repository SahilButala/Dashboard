import axios from 'axios';

const url = "http://localhost:3000";
// const url = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: url,
});

// Every time we refresh the page, this interceptor checks for the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
