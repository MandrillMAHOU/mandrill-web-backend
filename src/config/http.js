import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/route';
import api from './api';

const codeMap = {
  20: '登陆超时',
};

// 基础配置
axios.defaults.baseURL = '/mandrill-api';
axios.defaults.withCredentials = true;

// 请求响应拦截
axios.interceptors.request.use((config) => {
  // 请求添加token
  const token = localStorage.getItem('mandrillToken');
  if (token) {
    config.headers.Authorization = token;
  }
  // console.log(config.headers);
  return config;
});

axios.interceptors.response.use((response) => {
  if (response.status !== 200) Message.warning(`系统错误，错误代码${response.status}`);
  const { code, data, message } = response.data;
  if (code !== '0') { // 有异常
    Message.error({
      message: codeMap[code] || `${message}` || (Array.isArray(data) ? data[0] : data),
      showClose: true,
    });
    if (code === '20') { // 未登录
      router.push({ name: 'login' });
      return response;
    }
  }
  return response;
},
(error) => {
  console.info(error);
  return Promise.reject(error.response.data);
});

/**
 * @param {string} requestName 请求名称 ---- api.js中配置
 * @param {object} params      请求参数
 * @param {object} otherConfig 其他配置 { key1: value1, key2: value2}形式
 */
function http(requestName, params = {}, otherConfig = {}) {
  // 嵌套API
  const requestKeyArr = String(requestName).split('/');
  let httpConfig = api;
  for (const key of requestKeyArr) {
    httpConfig = httpConfig[key];
    if (!httpConfig) {
      httpConfig = {};
      break;
    }
  }
  const url = httpConfig.url;
  const method = otherConfig.method || httpConfig.method;
  const key = (method === 'post' || method === 'put') ? 'data' : 'params';
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      [key]: params,
      ...otherConfig,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default http;
