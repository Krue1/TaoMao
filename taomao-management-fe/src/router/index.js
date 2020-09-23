import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requireAuth: true,
    },
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/news',
      },
      {
        path: '/news',
        name: 'News',
        component: () => import('../views/News.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/management',
        name: 'Management',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Management.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/jokes',
        name: 'Jokes',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Jokes.vue'),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
];

//解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
