import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://event-management-o3vq.onrender.com/api' 
    : 'http://localhost:5000/api'
});

// Interceptor to include token in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log('Token in Interceptor:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API calls
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events', eventData);

export default API;
