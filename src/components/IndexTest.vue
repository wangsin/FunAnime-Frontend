<template>
  <el-container id="temp-root">
    <el-header class="basic">
      <el-menu :default-active="1" mode="horizontal" @select="1">
        <el-menu-item><img id="main-logo" src="../assets/ele-icon.svg" alt="logo" /></el-menu-item>
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">番剧</el-menu-item>
<!--        <el-menu-item index="3" class="menu-right">消息中心</el-menu-item>-->
<!--        <el-menu-item index="4" class="menu-right">个人中心</el-menu-item>-->
        <el-menu-item class="menu-right">
          <el-button type="primary" plain>注册</el-button>
          <el-button type="primary">登录</el-button>
        </el-menu-item>
        <el-menu-item class="menu-right">
          <el-input placeholder="Just Search" v-model="searchdata" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: 'IndexTest',
  data () {
    return {
      searchdata: ''
    }
  }
}
</script>

<style>
  #temp-root {
    margin: 0;
    background-color: #409EFF;
    height: 100%;
  }

  #main-logo {
    height: 90%;
  }

  .basic {
    margin: 0;
    width: 100%;
    padding: 0;
  }

  .menu-right {
    float: right !important;
    padding: 0 10px;
  }
</style>
