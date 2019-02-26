# wechat-public-template

> 微信公众号单页面模板

### VUX教程网址
> https://doc.vux.li/zh-CN/

### Build Setup

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
### 微信授权:get-weixin-code.html
> 假设你的http://www.xyz.com/hello-world.html 这个页面需要获取微信授权，那么你应该使用以下地址来获取授权：http://www.abc.com/xxx/get-weixin-code.html?appid=XXXX&scope=snsapi_base&state=hello-world&redirect_uri=http%3A%2F%2Fwww.xyz.com%2Fhello-world.html
 这样最终就会跳转到这样一个地址：http://www.xyz.com/hello-world.html?code=XXXXXXXXXXXXXXXXX&state=hello-world
 从而你就拿到了授权code以及自定义的state参数了

