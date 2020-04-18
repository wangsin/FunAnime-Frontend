<template>
  <div id="app">
    <el-header>
      <index-header></index-header>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
export default {
  name: 'App',
  components: {IndexHeader}
}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  margin: 0;
}
</style>
