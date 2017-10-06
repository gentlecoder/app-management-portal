ZTE应用管理 [Demo]

### 项目技术架构
***
*  vue-cli
*  vue
*  axios
*  vue-router
*  vuex
*  font-awesome
*  element-ui
*  scss
*  webpack
*  mock
*  echarts

### 安装

***
项目地址: (`git clone`)
```shell
git clone https://git地址
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务: (http://localhost:3000)

```
npm run dev
```
发布代码

```
npm run build
```
***
### 目录结构
<pre>
├── build                     // 项目的 Webpack 配置文件
├── config                    // 项目配置目录
├── server                    // 项目开发的请求数据
├── src                       // 生产目录
│   ├── assets                // 一些资源文件
│   ├── common                // 通用文件、如工具类、状态码
│   ├── components            // 各种组件
│   ├── pages                 // 各种页面
│   ├── plugins               // 各种插件
│   ├── router                // 路由配置及map
│   ├── store                 // Vuex 状态管理器
│   ├── App.vue               // 根组件
│   ├── favicon.ico           // ico小图标
│   ├── index.html            // 项目入口文件
│   ├── main.js               // Webpack 编译入口文件，入口js
├── static                    // 静态资源，一般把不需要处理的文件可以放这里
├── .babelrc                  // babelrc配置文件
├── .editorconfig             // 代码风格文件，前提是要你的编辑器支持
├── .gitignore                // 用于Git配置不需要加入版本管理的文件
├── .postcssrc.js             // autoprefixer的配置文件
├── package.json              // 项目配置文件
</pre>

***
###
***
### 结束

有什么想交流的请联系我：[610249080@qq.com](mailto:610249080@qq.com)
