# hospitalside

项目技术栈：Vue+Webpack+Axios+vueRouter（Vue全家桶）

1. 目录结构说明
build - 开发（测试）环境和生产环境的webpack配置
config - 开发（测试）环境和生产环境的url部署
dist - 文件打包输出 (项目正式发布上线，传到服务器)
src - 项目业务模块（路由有相关注释说明）

2. 用到的第三方组件及相关配置说明
axios -  HTTP 请求客户端，远程获取数据
sass- css预处理的扩展
babel - ES6解析器
node - 构建本地服务器模块
webpack - 项目打包工具

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
