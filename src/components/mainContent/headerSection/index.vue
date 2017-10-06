<template>
  <div class="header-section">
    <!--TODO 支持左侧菜单栏缩放-->
    <!--<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"-->
       <!--@click.stop.prevent="toggleMenu">-->
      <!--<span class="sr-only">Toggle navigation</span>-->
    <!--</a>-->
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'
  import search from 'components/search'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import * as types from 'store/mutations/type'

  export default {
    components: {
      menuRight,
      search
    },
    computed: mapGetters({
      sidebar: 'sidebar',
    }),
    methods: {
      toggleMenu() {
        this.toggleSidebar();
      },
      ...mapMutations({
        toggleSidebar: types.TOGGLE_SIDEBAR,
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
      }),
    },
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 15px 15px;
    font-family: fontAwesome;
    line-height: 20px;
  }

  .sidebar-toggle:before {
    content: "\f03b";
  }

  .sidebar-toggle:hover {
    color: #fff;
  }
</style>
