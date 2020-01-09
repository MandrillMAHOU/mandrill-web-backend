import RouteContainer from '@/views/Layout/RouteContainer';

const List = () => import(/* webpackChunkName: "ArticleList" */ '@/views/Article/list');
const Detail = () => import(/* webpackChunkName: "ArticleDetail" */ '@/views/Article/detail');
const Setting = () => import(/* webpackChunkName: "Setting" */ '@/views/Article/setting');

export default {
  name: 'article',
  path: '/article',
  component: RouteContainer,
  redirect: { name: 'articleList' },
  children: [
    {
      name: 'articleList',
      path: 'list',
      meta: { title: 'Article List' },
      component: List,
    },
    {
      name: 'articleDetail',
      path: 'detail',
      meta: { title: 'Article Detail' },
      component: Detail,
    },
    {
      name: 'articleSetting',
      path: 'setting',
      meta: { title: 'Article setting' },
      component: Setting,
    }
  ],
};
