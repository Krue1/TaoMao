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
    return axios.post(base.bgGoods, data);
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
    return axios.post(base.bgGoods + '/' + id, data);
  },
  deleteGoodsById(id) {
    return axios.delete(base.bgGoods + '/' + id);
  },
  uploadCoverById(id, data) {
    return axios.post(base.bgGoods + '/' + id + '/cover', data);
  },
  uploadPictureById(id, data) {
    return axios.post(base.bgGoods + '/' + id + '/picture', data);
  },
  login(data, config) {
    return axios.post('/admin/login', data, config);
  },
  queryOrderByStatus(data, config) {
    return axios.post(base.order + '/queryOrderByStatus', data, config);
  },
  cancelOrder(data, config) {
    return axios.post(base.order + '/cancelOrder', data, config);
  },
  completeOrder(data, config) {
    return axios.post(base.order + '/finishOrder', data, config);
  },
};

export default api;
