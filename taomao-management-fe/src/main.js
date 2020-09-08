import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/elementUI.js';
import '../theme/index.css';
import api from '@/api';
import '@/permission.js';

Vue.prototype.$api = api;
Vue.config.productionTip = false;

//如果本地存储中有token，则网页刷新后仍然保留并存入store中管理
if (localStorage.getItem('token') && localStorage.getItem('adminInfo')) {
  store.dispatch('setTokenAction', localStorage.getItem('token'));
  store.dispatch(
    'setAdminInfoAction',
    JSON.parse(localStorage.getItem('adminInfo'))
  );
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
