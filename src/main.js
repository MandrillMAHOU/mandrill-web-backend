import Vue from 'vue';
import ElementUI from 'element-ui';
import mavonEditor from 'mavon-editor';

import App from './App.vue';
import router from '@/route';
import store from '@/store';
import http from '@/config/http';
import utils from '@/utils';

import 'element-ui/lib/theme-chalk/index.css';
import '@/style/reset.scss';
import '@/style/common.scss';
import 'mavon-editor/dist/css/index.css';

// elementui table col sort
ElementUI.TableColumn.props.sortOrders.default = () => ['descending', 'ascending', null];

// elementui
Vue.use(ElementUI, {
  size: 'mini',
  zIndex: 5000,
});
Vue.use(mavonEditor);
Vue.use(utils);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
