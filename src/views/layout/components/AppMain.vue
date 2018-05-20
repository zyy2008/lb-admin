<template>
  <section class="app-main" style="min-height: 100%;background-color:#ffffff">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.filter-container {
  .search-title{
    color: #545454;
    font-size: 14px;
  }
  button{
    background-color: #445576;
    color: #ffffff;
    border-width: 0;
    &:hover{
      color:#ffffff;
      background-color:#445576;
      opacity: .8;
    }
  }
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #445576
}
</style>

