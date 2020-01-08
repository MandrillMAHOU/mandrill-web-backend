import Vue from 'vue';
import Router from 'vue-router';

import http from '../config/http';
import Login from './login';
import Article from './article';

const Main = () => import(/* webpackChunkName: "Main" */ '@/views');
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/Layout/404.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'article' },
      component: Main,
      children: [
        Article,
      ],
    },
    Login,
    {
      name: '404',
      path: '*',
      meta: { title: 'Page not found' },
      component: NotFound,
    }
  ],
  // scroll back to top
  scrollBehavior(to, from, savePosition) {
    if (savePosition) return savePosition;
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // change tab title
  const { title } = to.meta;
  document.title = `${title}`;
  // send get req to login to verify login status
  if (to.name !== 'login') {
    http('login', null, { method: 'get' }).then((res) => {
      console.log(res);
    });
  }
  next();
});

export default router;
