<template>
  <div class="app-wrapper" :class="classObj">
    <navbar></navbar>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import Breadcrumb from '@/components/Breadcrumb'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
   data() {
    return {
      list:null
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Breadcrumb
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
