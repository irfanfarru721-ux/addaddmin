import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backendmodern.onrender.com/api',
});

export default API;
