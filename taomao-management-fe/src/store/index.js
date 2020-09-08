import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    adminInfo: {
      name: '',
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAdminInfo(state, adminInfo) {
      state.adminInfo = adminInfo;
    },
  },
  actions: {
    setTokenAction({ commit }, token) {
      commit('setToken', token);
    },
    setAdminInfoAction({ commit }, adminInfo) {
      commit('setAdminInfo', adminInfo);
    },
  },
  modules: {},
});
