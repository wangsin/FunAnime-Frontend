<template>
  <el-menu :default-active="headListDefault" mode="horizontal" :router="routerSwitch" id="nav">
    <el-menu-item><img id="main-logo" src="../assets/funanime-logo.svg" alt="logo" /></el-menu-item>
    <el-menu-item v-for="head in headListData" :index="head.router" :key="head.title">
      {{head.title}}
    </el-menu-item>
    <el-menu-item v-if="$store.getters.isLogin" class="menu-right">
      <el-dropdown @command="toLink">
        <span class="el-dropdown-link">{{ JSON.parse($store.state.userInfo).nick_name }}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item :command="() => {$router.push('/post')}">创作视频</el-dropdown-item>
          <el-dropdown-item>我的收藏</el-dropdown-item>
          <el-dropdown-item :command="() => {$router.push('/supple')}">信息完善</el-dropdown-item>
          <el-dropdown-item :command="() => {$store.commit('set_offline')}" divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
    <el-menu-item v-else class="menu-right">
      <el-button type="primary" @click="$router.push('/register')" plain>注册</el-button>
      <el-button type="primary" @click="pushNewTab()">登录</el-button>
    </el-menu-item>
    <el-menu-item class="menu-right">
      <el-input placeholder="Just Search" v-model="searchData" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-menu-item>
  </el-menu>
</template>

<script>
import * as configApi from '../api/config/index.js'

export default {
  name: 'IndexHeader',
  beforeMount: function () {
    configApi.getBasicConfig().then((resp) => {
      if (resp.errno !== 0) {
        console.log('fuck_server')
        this.$data.searchData = ''
        this.$data.headListData = [
          {
            title: 'Fucker主页',
            router: '/'
          }
        ]
        return
      }
      this.$data.searchData = resp.data.search_area
      this.$data.headListData = resp.data.head_router
    }).catch((err) => {
      console.log('fuck_server_twice')
      console.log(err)
    })
  },
  data () {
    return {
      searchData: '',
      headListData: [],
      headListDefault: '/',
      routerSwitch: true
    }
  },
  methods: {
    pushNewTab: function () {
      let newPage = this.$router.resolve({
        path: '/login'
      })
      window.open(newPage.href, '_blank')
    },
    toLink: function (command) {
      command()
    }
  }
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

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
