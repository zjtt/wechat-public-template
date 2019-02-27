/**
 * @file 微信签名
 * @author coder
 * @date 2019.02.26
 */
import util from '../assets/js/util';

export default {
    data() {
        return {
            defaultObj: {
                title: '', // 分享标题
                desc: '', // 分享描述
                link: '',
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                succ: res => {
                    console.log('shareSucc');
                    console.log(res);
                    // 设置成功
                    this.$trigger('taskShareToPoint');
                },
                cancel: res => { // 由于微信分享机制更改获取不到是否分享成功
                    console.log('shareCancel');
                    console.log(res);
                }
            }
        };
    },
    mounted() {
    },
    methods: {
        wxconfig() {
            this.$http({
                url: '',
                method: '',
                params: {
                    url: window.location.href.split('#')[0]
                }
            }).then(res => {
                this.$wechat.config({
                    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appid, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.sign, // 必填，签名，见附录1
                    jsApiList: [
                        // 'updateAppMessageShareData',
                        // 'updateTimelineShareData',
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                this.$wechat.error(function (err) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
                this.selfShare(this.defaultObj);
            }).catch(err => {
                console.log('wxjssdkerr:' + err);
            });
        },
        selfShare(obj) {
            this.defaultObj.link = window.location.origin + '/marketing-online/dist/index.html#/home?friendId='
            + util.getLocalstorage('socialMarketStorage').openId;
            console.log('分享链接：' + this.defaultObj.link);
            this.defaultObj.imgUrl = window.location.origin + '/dist/static/logo.jpg';
            if (!obj) {
                obj = this.defaultObj;
            }
            else {
                obj = Object.assign({}, this.defaultObj, obj);
            }
            this.$wechat.ready(() => {
                let tempObj = {
                    title: obj.title || '', // 分享标题
                    link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: obj.imgUrl, // 分享图标
                    success: () => {
                    // 设置成功
                        typeof obj.succ === 'function' && obj.succ();
                    },
                    cancel: () => {
                        typeof obj.cancel === 'function' && obj.cancel();
                    }
                };
                let otherObj = {
                    desc: obj.desc || '' // 分享描述
                };
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃)
                let onMenuShare = Object.assign({}, tempObj, {
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                }, otherObj);
                this.$wechat.onMenuShareAppMessage(onMenuShare);
                // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
                this.$wechat.onMenuShareTimeline(tempObj);
                // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
                // 需在用户可能点击分享按钮前就先调用
                // let updateApp = Object.assign({}, tempObj, otherObj);
                // this.$wechat.updateAppMessageShareData(updateApp);
                // // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                // // 需在用户可能点击分享按钮前就先调用
                // let updateTime = Object.assign({}, tempObj);
                // this.$wechat.updateTimelineShareData(updateTime);
            });
        }

    }
};
