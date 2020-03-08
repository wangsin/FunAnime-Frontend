<template>
  <el-container>
    <el-header>
      <index-header></index-header>
    </el-header>
    <el-main>
      <index-body></index-body>
    </el-main>
  </el-container>
</template>

<script>
import IndexHeader from './IndexHeader'
import IndexBody from './IndexBody'
export default {
  name: 'MainPage',
  components: {IndexHeader, IndexBody}
}
</script>

<style scoped>
</style>
