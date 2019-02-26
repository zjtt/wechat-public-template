/**
 * @file 配置文件
 * @author coder
 * @date 2019.02.26
 */
'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"'
});
