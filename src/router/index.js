/**
 * @file 路由文件
 * @author coder
 * @date 2019.02.26
 */

import Vue from 'vue';
import Router from 'vue-router';

import isLogin from '@/page/isLogin';
import home from '@/page/home';

import util from '../assets/js/util';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'isLogin',
            component: isLogin
        },
        {
            path: '/home',
            name: 'home',
            component: home
        }
    ]
});

// 跳转路由前
router.beforeEach(function (to, from, next) {
    let path = util.toWhichPath(to);
    next();
    // if (!path) {
    //     next();
    // }
    // else {
    //     next(path);
    // }
});
// 跳转路由后
router.afterEach(function (to) {});

export default router;
