import axios from 'axios';
import Qs from 'qs';
import { Loading, Message } from 'element-ui';
import router from '../router';
import Vue from 'vue';
const instance = axios.create({
 // baseURL: 'http://10.1.0.53:8080',
    baseURL: 'https://yhg.ygb56.com',//生产
   //baseURL: 'http://10.1.0.58',//预生产
    // baseURL: 'http://10.1.0.61',//开发/
 //    baseURL: 'http://ygb56.f3322.net:60080',//开发
 //     baseURL: 'http://localhost:8080', // swagger接口路径
    // baseURL: 'https://10.1.0.61',//开发
    // baseURL: 'http://localhost:9001', //本地模拟数据路径
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params)
    // },
  timeout: 60 * 10000
    // transformRequest: [function (data) {
    //     // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    //     console.log(JSON.stringify(data));
    //     if (data instanceof Object)
    //         data = Qs.stringify(data);
    //     return data;
    // }],
});

let loadinginstace,configObject;

// 请求拦截
instance.interceptors.request.use((config) => {
  configObject = config;
  if (!document.querySelector('.loading-box')) {
    loadinginstace = Loading.service({ text: '加载中...', target: '.content-container', customClass: 'loading-box' });
  }
    // 处理请求之前的配置
  const token = sessionStorage.getItem('id_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

    // form post 暂时解决方案
  if (!config.url.endsWith('/api/system/user/login')) {
    config.transformRequest = [function (data) {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      if (data instanceof Object) { data = Qs.stringify(data); }
      return data;
    }];
    config.paramsSerializer = params => Qs.stringify(params);
  }

  return config;
}, (error) => {
  loadinginstace && loadinginstace.close();
  loadinginstace=null;
  Message.error({
    message: '网络异常,请稍候重试',
  });
    // 请求失败的处理
  return Promise.reject(error)
;
});

instance.interceptors.response.use(
    (response) => {
      loadinginstace && loadinginstace.close();
      loadinginstace=null;
        // 处理响应数据
      if (response.data && response.data.message && response.data.message === '会话超时') {
        Message.error('会话超时');
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.fullPath },
        });
        return Promise.reject();
      }
      return response;
    },
    (error) => {
      loadinginstace && loadinginstace.close();
      loadinginstace=null;
    // 处理响应失败
      Message.error('网络异常,请稍候重试');
    // message: '加载失败'
      return Promise.reject(error);
    });


export default instance;
