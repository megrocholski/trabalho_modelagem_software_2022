import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set API URL on .env.local
});

export default api;
