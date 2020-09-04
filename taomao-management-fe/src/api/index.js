import axios from '@/utils/http';
import base from './base';

const api = {
  getNews(config) {
    return axios.get(base.baseURL + base.news, config);
  },
  getJokes(config) {
    return axios.get(base.jokes, config);
  },
};

export default api;
