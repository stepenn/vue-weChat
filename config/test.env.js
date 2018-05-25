'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv,{
    NODE_ENV: '"test"',
    API_ROOT: '"https://test-hospitals-api.touchealth.com"', //测试环境地址
    WX_APPID: '"wx9d03d2f9135c6c04"',
    WX_PATH: '"https://natapp.touchealth.com"' //前端项目地址
})
