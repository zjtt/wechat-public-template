<template>
    <div class="home-box">
        <div class="home-container">
            <div class="home-container-con">
                1
            </div>
            <div class="home-container-bottom"></div>
        </div>
    </div>
</template>

<script>

    import util from '../../assets/js/util';
    import login from '../../mixins/login';
    import wxConfig from '../../mixins/wxConfig';

    export default {
        data() {
            return {
            };
        },
        mixins: [login, wxConfig],
        components: {
        },
        mounted() {
            this.loginInit();
        },
        events: {
            homeInit: 'homeInit'
        },
        methods: {
            homeInit() {
                let iPageStorage = util.getLocalstorage('iPageStorage') || '';
                let openId = iPageStorage.openId || '';
                if (openId) {
                    this.wxconfig(); // 微信签名
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例
                if (from.name === null && from.path === '/') { // 第一次进入项目
                }
            });
        }
    };
</script>

<style scoped lang="less">
    .home-container {
        position: relative;
        height: 100vh;
        width: 100vw;
        -webkit-overflow-scrolling: touch;
        &-con {
            height: 100%;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
           
        }
        &-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 500;
        }
    }
</style>