/**
 * @file 封装请求
 * @author coder
 * @date 2019.02.26
 */
import Vue from 'vue';
import axios from 'axios';
import util from './util';
import {ToastPlugin, ConfirmPlugin} from 'vux';
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
const anotherVue = new Vue();
// vux插件
const request = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'userAgent': 'micromessenger',
        'openId': util.getLocalstorage('iPageStorage').openId || ''
    },
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false // 默认的
});
let isLoginApi = false; // 判断是否是请求的登录接口
const rqObj = {
    online: true, // 是否是线上
    onlineRqUrl: window.location.origin,
    onlineHtmlUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=&redirect_uri='
    + encodeURIComponent(window.location.origin + '/dist/index.html#/home')
    + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
    localHtmlUrl: window.location.href.split('/#/')[0]
};
// 添加请求拦截器
request.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.headers.openId = util.getLocalstorage('iPageStorage').openId || '';
    if (rqObj.online) {
        config.url = rqObj.onlineRqUrl + config.url;
    }
    isLoginApi = config.url.includes('/security/login');
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
request.interceptors.response.use(res => {
    let data = res.data;
    if (isLoginApi) {
        return res;
    }
    if (Number(data.status) === 0) {
        return data;
    }
    util.handleRes(rqObj, data, isLoginApi, anotherVue);
    return Promise.reject('请求报错');
}, error => Promise.reject(error));
Vue.prototype.$http = request;
