<template>
  <el-container id="temp-root">
    <index-header></index-header>

  </el-container>
</template>

<script>
import IndexHeader from './IndexHeader'
export default {
  name: 'MainPage',
  components: {IndexHeader}
}
</script>

<style scoped>
  #temp-root {
    margin: 0;
    background-color: #409EFF;
    height: 100%;
  }
</style>
