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
        // name: 'Home',
        // component: Home,
      },
      {
        path: '/news',
        name: 'News',
        component: () => import('../views/News.vue'),
      },
      {
        path: '/movie',
        name: 'Movie',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
      },
      {
        path: '/music',
        name: 'Music',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Music.vue'),
      },
      {
        path: '/jokes',
        name: 'Jokes',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Jokes.vue'),
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
