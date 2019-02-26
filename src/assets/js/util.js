/**
 * @file 公用函数
 * @author coder
 * @date 2019.02.26
 */
export default {

    /**
     * 设置本地存储参数
     *
     * @param {string} key 参数名字
     * @param {Object} value 参数值
     */
    setLocalstorage(key, value) {
        if (typeof value === 'object') {
            window.localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
        }
    },

    /**
     * 获取本地存储参数
     *
     * @param {string} key 参数名字
     * @return {Object} 参数值
     */
    getLocalstorage(key) {
        let value = window.localStorage.getItem(key) || '';
        if (value) {
            return JSON.parse(decodeURIComponent(value));
        }
        return '';
    },

    /**
     * 判断用户是否登录
     *
     * @param {Object} rqObj 请求链接配置
     * @param {Object} data 请求获取的参数
     * @param {boolean} isLoginApi 是否是登录请求
     * @param {Object} anotherVue vue实例
     */
    handleRes(rqObj, data, isLoginApi, anotherVue) {
        // 1\请求的不是登录接口
        // 2\本地没有openId就表示未登录
        // 3\或者如果有openId传到后端，返回status 4 or 5表示未登录。
        if (!isLoginApi) { // 不是登录接口
            let openId = this.getLocalstorage('iPageStorage').openId || '';
            let status = [4, 5].includes(Number(data.status)) && !!openId;
            if (!openId || status) { // 未登录
                // window.localStorage.clear();
                window.localStorage.removeItem('iPageStorage');
                let url = '';
                if (rqObj.online) {
                    url = rqObj.onlineHtmlUrl;
                }
                else {
                    url = rqObj.localHtmlUrl;
                }
                window.location.replace(url);
            }
            else { // 已登录报错
                if (data.statusInfo) {
                    anotherVue.$vux.toast.show({
                        text: data.statusInfo,
                        type: 'text',
                        width: '10em'
                    });
                }
                else if (data.message) {
                    anotherVue.$vux.toast.show({
                        text: data.message,
                        type: 'text',
                        width: '10em'
                    });
                }
            }
        }
    },

    /**
     * 获取url参数
     *
     * @param {string} name 参数名字
     * @return {string} 返回参数值
     */
    getQueryString(name) {
        let result = location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
        if (result == null || result.length < 1) {
            return '';
        }
        return result[1];
    },

    /**
     * 是否是微信
     *
     * @return {boolean} 是否是微信
     */
    isWeChat() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return true; // 是微信
        }

        return false; // 不是微信
    },

    /**
     * 是否是苹果手机
     *
     * @return {boolean} 是否是苹果手机
     */
    isIos() {
        let u = window.navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        return isiOS;
    },

    /**
     *不是微信浏览器跳转
     */
    goWexin() {
        // 不是微信浏览器
        location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=1&redirect_uri=url&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
    },

    /**
     * 前往哪个路由
     * @param {Object} route 路由对象
     * @return {boolean} 是否是苹果手机
     */
    toWhichPath(route) {
        let iPageStorage = this.getLocalstorage('iPageStorage') || '';
        let isAccess = (iPageStorage && iPageStorage.isLogin) || route.fullPath === '/login';
        let path = '';
        if (!isAccess) {
            path = '/login';
        }
        return path;
    }
};
