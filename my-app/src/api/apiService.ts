import axios from 'axios';
// import {REACT_APP_BACKEND_URL} from '../../'

const API_URL = process.env.REACT_APP_BACKEND_URL;

if (!API_URL) {
  console.error("REACT_APP_BACKEND_URL is not defined in the environment variables.");
}

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication (if needed)
// apiService.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Or wherever you store your token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor for error handling (if needed)
// apiService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // Handle unauthorized access, e.g., redirect to login
//       console.error('Unauthorized access');
//     }
//     return Promise.reject(error);
//   }
// );

export default apiService;
