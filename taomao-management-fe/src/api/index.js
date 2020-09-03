import axios from '@/utils/http';
import base from './base';

const api = {
  getNews(config) {
    return axios.get(base.baseURL + base.news, config);
  },
};

export default api;
