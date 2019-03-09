/**
 * @file 判断是否登录
 * @author coder
 * @date 2019.02.26
 */

import util from '../assets/js/util';
export default {
    data() {
        return {
            currentRouteName: '' // isLogin登录home主页
        };
    },
    mixins: [],
    mounted() {
    },
    created() {},
    methods: {
        loginInit() {
            let me = this;
            me.currentRouteName = me.$route.name;
            let urlCode = util.getQueryString('code') || '';
            let iPageStorage = util.getLocalstorage('iPageStorage') || '';
            let openId = iPageStorage.openId || '';
            if (me.currentRouteName === 'home') {
                if (!urlCode && !openId) { // 未授权：如果没有urlCode无openId
                    me.getAuth();
                }
                // else if (urlCode && !openId) { // 回调授权成功
                else if (urlCode && !openId) { // 回调授权成功
                    me.login(urlCode);
                }
                else if (openId) {
                    me.loadHome();
                }
            }
            else if (me.currentRouteName === 'isLogin') {
                if (!urlCode) { // 未授权：如果没有urlCode
                    me.getAuth();
                }
                else { // 回调授权成功
                    me.login(urlCode);
                }
            }
        },
        getAuth() { // 回掉授权
            let switchUrl = '';
            let appid = '';
            if (this.currentRouteName === 'home') { // 主页授权
                switchUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri='
                + encodeURIComponent(window.location.origin + '/dist/index.html#/home')
                + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            }
            else if (this.currentRouteName === 'isLogin') { // 登录页授权
                // 此处应填写已经授权的域名
                let getCodeUrl = window.location.origin + '/dist/get-weixin-code.html';
                let redirectUrl = encodeURIComponent(window.location.href);
                switchUrl = `${getCodeUrl}?appid=${appid}&scope=snsapi_userinfo&state=hello`
                    + `&redirect_uri=${redirectUrl}`;
            }
            window.location.replace(switchUrl);
        },
        login(urlCode) { // 获取openId
            let me = this;
            // 请求业务登录接口
        },
        loadHome() {
            // 不授权就不发起任何请求,授权才发起请求
            this.$trigger('homeInit');
        },
        goHome() { // 登录页去主页
            let homeUrl = window.location.href.split('?')[0] + '#/home';
            window.location.replace(homeUrl);
        }
    }
};
