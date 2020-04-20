<template>
  <el-container class="root" direction="vertical">
    <div class="registerRoot">
      <div class="leftArea">
        <div class="title">注册</div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="rightArea">
        <div class="subTitle">确认个人信息</div>
        <el-input v-model="phone" placeholder="手机号" class="inputArea">
          <template slot="prepend">+86</template>
        </el-input>
        <el-input v-model="verifyCode" placeholder="验证码" class="inputArea">
          <el-button slot="append" icon="el-icon-refresh-right">获取验证码</el-button>
        </el-input>
        <el-input v-model="password" v-if="quickRegister" placeholder="密码" class="inputArea"></el-input>
        <el-input v-model="passwordRepeat" v-if="quickRegister" placeholder="重复密码" class="inputArea"></el-input>
        <el-input v-model="mail" v-if="quickRegister" placeholder="邮箱" class="inputArea"></el-input>
        <el-checkbox v-model="checked" class="checkArea">我同意<a href="">《用户协议》</a></el-checkbox>
        <div class="btn">
          <el-button type="primary" class="btn1" icon="el-icon-question" plain></el-button>
          <el-button type="primary" class="btn2" v-if="quickRegister" @click="switchMethod" plain>切换到快速注册</el-button>
          <el-button type="primary" class="btn2" v-if="normalRegister" @click="switchMethod" plain>切换到普通注册</el-button>
          <el-button type="primary" class="btn3" :disabled="!checked">注册</el-button>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      phone: '',
      verifyCode: '',
      password: '',
      passwordRepeat: '',
      mail: '',
      quickRegister: false,
      normalRegister: true,
      checked: false,
      disabled: false
    }
  },
  methods: {
    switchMethod: function (event) {
      console.log(this.checked)
      this.quickRegister = !this.quickRegister
      this.normalRegister = !this.normalRegister
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}

.leftArea {
  flex-basis: 40%;
  margin: 15px 0 15px 0;
}

.rightArea {
  flex-basis: 60%;
  margin: 35px 0 15px 0;
}

.registerRoot {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  flex-direction: row;
}

.root {
  height: 80%;
}

.leftArea {
  flex-basis: 30%;
}

.inputArea {
  width: 50%;
  margin: 20px 0 10px 0;
}

.title {
  font-weight: bold;
  font-size: 60px;
}

.subTitle {
  margin-bottom: 20px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}

.btn {
  margin-top: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 50%;
}

.btn2 {
  /*width: 25%*/
}

.btn3 {
  width: 70%;
}

.checkArea {
  width: 50%;
  display: inline-block;
  margin: 20px 0 10px 40px;
}
</style>
