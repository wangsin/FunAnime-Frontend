<template>
  <el-menu :default-active="headListDefault" mode="horizontal" :router="routerSwitch" id="nav">
    <el-menu-item><img id="main-logo" src="../assets/funanime-logo.svg" alt="logo" /></el-menu-item>
    <el-menu-item v-for="head in headListData" :index="head.router" :key="head.title">
      {{head.title}}
    </el-menu-item>
    <el-menu-item class="menu-right">
      <el-button type="primary" @click="$router.push('/register')" plain>注册</el-button>
      <el-button type="primary" @click="$router.push('/login')">登录</el-button>
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
  mounted: function () {
    console.log(this.$router)
  },
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
        },
        {
          title: 'test-信息补全',
          router: '/supple'
        },
        {
          title: 'test-视频详情',
          router: '/video/10'
        }
      ],
      headListDefault: '/',
      routerSwitch: true
    }
  },
  methods: {}
}
</script>

<style>
  #main-logo {
    height: 90%;
  }

  #nav {
    flex-wrap: nowrap;
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
