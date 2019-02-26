/**
 * @file 配置文件
 * @author coder
 * @date 2019.02.26
 */

'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
});
