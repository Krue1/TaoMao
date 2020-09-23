import axios from '@/utils/http';
import base from './base';
axios.defaults.baseURL = base.baseURL;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const api = {
  getNews(config) {
    return axios.get(base.news, config);
  },
  getJokes(config) {
    return axios.get(base.jokes, config);
  },
  addGoods(data) {
    return axios.post(base.goods, data);
  },
  getAllGoods() {
    return axios.get(base.goods);
  },
  getGoodsById(id, config) {
    return axios.get(base.goods + '/' + id, config);
  },
  getGoodsByKeyword(keyword, config) {
    return axios.get(base.goods + '/search/' + keyword, config);
  },
  modifyGoodsById(id, data) {
    return axios.post(base.goods + '/' + id, data);
  },
  deleteGoodsById(id) {
    return axios.delete(base.goods + '/' + id);
  },
  uploadCoverById(id, data) {
    return axios.post(base.goods + '/' + id + '/cover', data);
  },
  uploadPictureById(id, data) {
    return axios.post(base.goods + '/' + id + '/picture', data);
  },
};

export default api;
