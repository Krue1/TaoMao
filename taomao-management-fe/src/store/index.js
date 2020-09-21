import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    adminInfo: {
      name: '',
    },
    goods: {
      id: '',
      breed: '',
      name: '',
      description: '',
      price: 0.0,
      age: 0,
      gender: '公',
      vaccine: 0,
      purebred: false,
      insectRepellent: false,
      inventory: 0,
      soldQuantity: 0,
      coverPath: '',
      picturePath: '',
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAdminInfo(state, adminInfo) {
      state.adminInfo = adminInfo;
    },
    setGoods(state, goods) {
      Object.assign(state.goods, goods);
    },
  },
  actions: {
    setTokenAction({ commit }, token) {
      commit('setToken', token);
    },
    setAdminInfoAction({ commit }, adminInfo) {
      commit('setAdminInfo', adminInfo);
    },
    setGoodsAction({ commit }, goods) {
      commit('setGoods', goods);
    },
  },
  modules: {},
});
