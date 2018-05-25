<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  // 引入样式重置
  @import './static/scss/config/_reset.scss';
  //引入公共样式
  @import './static/scss/config/common.scss';
</style>
