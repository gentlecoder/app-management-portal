<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block" :hidden="sidebar.collapsed">
        <img src="./images/logo.png" alt="应用管理">
        <span class="title-span">ZTE应用管理</span>
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :collapse="sidebar.collapsed"
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import * as type from 'store/getters/type'

  export default {
    name: 'slide',
    computed: mapGetters({
      sidebar: type.GET_SIDE_BAR,
    }),
    data() {
      return {
        nav_menu_data: [{
          title: "主页",
          path: "/home",
          icon: "fa-home"
        }, {
//          title: "表格管理",
//          path: "/table",
//          icon: "fa-table",
//          child: [{
//            title: "基本表格",
//            path: "/table/base"
//          }, {
//            title: "排序表格",
//            path: "/table/sort"
//          }]
//        }, {
//          title: "图表管理",
//          path: "/charts",
//          icon: "fa-bar-chart-o",
//          child: [{
//            title: "柱状图表",
//            path: "/charts/bar"
//          }]
//        }, {
          title: "软件仓库",
          path: "/softrsy",
          icon: "fa-cube"
        }, {
          title: "蓝图中心",
          path: "/blueprint",
          icon: "fa-braille"
        }, {
          title: "应用管理",
          path: "/app",
          icon: "fa-jsfiddle"
        }, {
          title: "日志查询",
          path: "/log",
          icon: "fa-tasks"
        }, {
          title: "用户管理",
          path: "/user",
          icon: "fa-user-circle-o ",
          child: [{
            title: "个人信息",
            path: "/user/info"
          }, {
            title: "用户设置",
            path: "/user/set"
          }]
        }]
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .title-span {
    color: #50bfff;
  }

  .left-side .menu-box .menu-list.is-active, .left-side .menu-box .menu-list:hover, .left-side .menu-box .el-submenu__title.is-active, .left-side .menu-box .el-submenu__title:hover {
    color: rgb(0, 182, 255) !important;
  }
</style>
