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
  },
  actions: {
    setTokenAction({ commit }, token) {
      commit('setToken', token);
    },
  },
  modules: {},
});
