<template>
  <el-menu :default-active="headListDefault" mode="horizontal" :select="1" :router="routerSwitch">
    <el-menu-item><img id="main-logo" src="../assets/funanime-logo.svg" alt="logo" /></el-menu-item>
    <el-menu-item v-for="head in headListData" :index="head.router" :key="head.title">
      {{head.title}}
    </el-menu-item>
    <el-menu-item class="menu-right">
      <el-button type="primary" plain>注册</el-button>
      <el-button type="primary">登录</el-button>
    </el-menu-item>
    <el-menu-item class="menu-right">
      <el-input placeholder="Just Search" v-model="searchData" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'IndexHeader',
  data () {
    return {
      searchData: '',
      headListData: [
        {
          title: '主页',
          router: '/'
        },
        {
          title: '番剧',
          router: '/anime'
        },
        {
          title: '科技',
          router: '/tech'
        }
      ],
      headListDefault: '/',
      routerSwitch: true
    }
  }
}
</script>

<style>
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
