<template>
  <el-container id="temp-root">
    <el-header>
      我是页首
    </el-header>

    <el-container id="main-body">
      <el-aside id="aside-body">
        我是侧边栏
      </el-aside>
      <el-main id="main-content">
        我是正文
      </el-main>
    </el-container>

    <el-footer id="footer-body">
      我是页脚
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'IndexTest'
}
</script>

<style>
  #temp-root {
    margin: 0;
    background-color: #42b983;
    height: 100%;
  }

  #main-body {
    margin: 0;
    background-color: #2c3e50;
    height: 85%;
  }

  #aside-body {
    width: 30%;
    border: 1px solid #42b983;
  }

  #main-content {
    width: 70%;
    border: 1px solid #42b983;
  }

  #footer-body {
    border: 1px solid #333;
    height: 15%;
  }

</style>
