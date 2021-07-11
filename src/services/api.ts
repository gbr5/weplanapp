import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.we-plan.io',
});
// api.we-plan.io

export default api;
