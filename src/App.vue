<template>
  <div id="app">
    <el-header v-if="controlHeader()">
      <index-header></index-header>
    </el-header>
    <router-view></router-view>
<!--    <footer-page></footer-page>-->
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
import FooterPage from './components/FooterPage'
export default {
  name: 'App',
  components: {IndexHeader, FooterPage},
  methods: {
    controlHeader: function () {
      return this.$router.history.current.fullPath !== '/login'
    }
  }
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
