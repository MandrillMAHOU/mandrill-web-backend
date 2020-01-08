const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login');

export default {
  name: 'login',
  path: '/login',
  meta: { title: 'Mandrill - Login' },
  component: Login,
};
