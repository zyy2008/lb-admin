<template>
  <div class="menu-wrapper">
   
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon :icon-class="item.children[0].meta.icon"></svg-icon>
          <span slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>


    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.el-menu--collapse {
  .el-menu-item.is-active{
    border-left: 0;
  }
  .hamburger-container{
    padding-left: 8px;
  }
}
.el-menu-item.is-active{
  border-left: 5px solid #445576;
  padding-left: 35px !important;
}
.hamburger-container{
  padding: 15px;
  padding-left: 33px;
}
.el-menu-item{
  padding-left: 40px !important;
}
</style>