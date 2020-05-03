<template>
  <el-menu :default-active="headListDefault" mode="horizontal" :router="routerSwitch" id="nav">
    <el-menu-item><img id="main-logo" src="../assets/funanime-logo.svg" alt="logo" /></el-menu-item>
    <el-menu-item v-for="head in headListData" :index="head.router" :key="head.title">
      {{head.title}}
    </el-menu-item>
    <el-menu-item v-if="$store.state.outerToken" class="menu-right">
      <el-button type="primary" @click="$store.commit('set_offline')" plain>ForceLogout</el-button>
      <span>{{ $store.state.nickName }}</span>
    </el-menu-item>
    <el-menu-item v-else class="menu-right">
      <el-button type="primary" @click="$store.commit('set_user', testJson)" plain>ForceLogin</el-button>
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
export default {
  name: 'IndexHeader',
  mounted: function () {
    // console.log(this.$router)
  },
  data () {
    return {
      testJson: '{\n' +
        '        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImxldmVsIjowLCJwaG9uZSI6IjE4MDQ1MzYyNzM2Iiwibmlja25hbWUiOiJNVGd3TkRVek5qIiwidXNlcm5hbWUiOiJNVGd3TkRVek5qIiwiZXhwIjowLCJtYWxlIjowfQ.z81Zg2IyAy_QULon2l6BU9beclBEG80et8375t7Ycuk",\n' +
        '        "user_name": "MTgwNDUzNj",\n' +
        '        "phone": "18045362736",\n' +
        '        "nick_name": "MTgwNDUzNj",\n' +
        '        "exp": 0,\n' +
        '        "level": 0,\n' +
        '        "user_id": 1,\n' +
        '        "status": 1,\n' +
        '        "mail": "",\n' +
        '        "user_avatar": ""\n' +
        '    }',
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
        },
        {
          title: 'test-视频上传',
          router: '/post'
        }
      ],
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
</style>
