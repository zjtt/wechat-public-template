/**
 * @file 配置文件
 * @author coder
 * @date 2019.02.26
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import router from './router/index';
import App from './App';
// 请求
import '@/assets/js/request';
import '@/assets/js/hub';
import '@/assets/js/vconsole';

// vux插件
import {WechatPlugin, ConfirmPlugin, AlertPlugin, ToastPlugin} from 'vux';
Vue.use(WechatPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);

// 移除移动端页面点击延迟
FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box');
