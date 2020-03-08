<template>
  <el-menu :default-active="headListDefault.toString()" mode="horizontal" @select="1">
    <el-menu-item><img id="main-logo" src="../assets/funanime-logo.svg" alt="logo" /></el-menu-item>
    <el-menu-item v-for="head in headListData" :index="head.id.toString()" :key="head.title">
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
          id: 1,
          title: '主页',
          router: ''
        },
        {
          id: 2,
          title: '番剧',
          router: 'anime'
        },
        {
          id: 3,
          title: '科技',
          router: 'tech'
        }
      ],
      headListDefault: 1
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
