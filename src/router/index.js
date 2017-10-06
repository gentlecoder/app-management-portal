/**
 * Created by dyc on 2017/9/30.
 *
 * 路由Map
 *
 * @author: dyc
 * @github: https://github.com/gentlecoder
 * @email: 610249080@qq.com
 * @Date: 2017/9/30 18:30
 * @Copyright(©) 2017 by dyc.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'
//softrsy
import softrsyComponent from 'pages/softrsy'
//softrsy deploy
import softrsyDeployComponent from 'pages/softrsy/deploy'
//blueprint
import blueprintComponent from 'pages/blueprint'
//blueprint add
import blueprintAddComponent from 'pages/blueprint/add'
//blueprint deploy
import blueprintDeployComponent from 'pages/blueprint/deploy'
//app
import appComponent from 'pages/appmanage'
//log
import logComponent from 'pages/log'
//user info
import userInfoComponent from 'pages/user/info'
//user set
import userSetComponent from 'pages/user/set'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  }, {
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "基本表格",
      auth: true
    }
  }, {
    path: '/table/sort',
    name: 'tableSort',
    component: sortTableComponent,
    meta: {
      title: "排序表格",
      auth: true
    }
  }, {
    path: '/table/update/:id',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  }, {
    path: '/charts/bar',
    name: 'chartsBar',
    component: barChartsComponent,
    meta: {
      title: "柱状图表",
      auth: true
    }
  }, {
    path: '/softrsy',
    name: 'softrsy',
    component: softrsyComponent,
    meta: {
      title: "软件仓库",
      auth: true
    }
  }, {
    path: '/softrsy/deploy',
    name: 'softrsyDeploy',
    component: softrsyDeployComponent,
    meta: {
      title: "镜像部署",
      auth: true
    }
  }, {
    path: '/blueprint',
    name: 'blueprint',
    component: blueprintComponent,
    meta: {
      title: "蓝图中心",
      auth: true
    }
  }, {
    path: '/blueprint/add',
    name: 'blueprintAdd',
    component: blueprintAddComponent,
    meta: {
      title: "蓝图导入",
      auth: true
    }
  }, {
    path: '/blueprint/deploy',
    name: 'blueprintDeploy',
    component: blueprintDeployComponent,
    meta: {
      title: "蓝图部署",
      auth: true
    }
  }, {
    path: '/app',
    name: 'app',
    component: appComponent,
    meta: {
      title: "应用管理",
      auth: true
    }
  }, {
    path: '/log',
    name: 'log',
    component: logComponent,
    meta: {
      title: "日志查询",
      auth: true
    }
  }, {
    path: '/user/info',
    name: 'userInfo',
    component: userInfoComponent,
    meta: {
      title: "个人信息",
      auth: true
    }
  }, {
    path: '/user/set',
    name: 'userSet',
    component: userSetComponent,
    meta: {
      title: "用户设置",
      auth: true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
});

export default router
