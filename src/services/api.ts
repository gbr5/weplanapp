import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.6:3333',
});

export default api;

// IP de casa baseURL: 'http://192.168.15.11:3333',
// baseURL: 'http://192.168.15.6:3333',
// https://api.we-plan.io
