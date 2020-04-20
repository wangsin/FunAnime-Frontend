<template>
  <el-container class="root" direction="vertical">
    <div class="loginRoot">
        <div class="leftArea">
            <img src="../assets/fucker.jpg" alt=""/>
        </div>

        <div class="rightArea">
            <div class="title">登录</div>
            <el-input v-model="username" placeholder="手机号/邮箱" v-if="passwordMethod" class="inputArea"></el-input>
            <el-input v-model="password" placeholder="密码" v-if="passwordMethod" class="inputArea" show-password>
                <el-button slot="append" icon="el-icon-question">忘记密码</el-button>
            </el-input>
            <el-input v-model="phone" placeholder="手机号" v-if="verifyCodeMethod" class="inputArea"></el-input>
            <el-input v-model="verifyCode" placeholder="验证码" v-if="verifyCodeMethod" class="inputArea" show-password>
                <el-button slot="append" icon="el-icon-refresh-right">获取验证码</el-button>
            </el-input>
            <el-checkbox v-model="checked" class="checkArea">记住我</el-checkbox>
            <div class="btn">
                <el-button type="primary" class="btn1" @click="switchMethod" v-if="passwordMethod" plain>使用验证码登录</el-button>
                <el-button type="primary" class="btn1" @click="switchMethod" v-if="verifyCodeMethod" plain>使用密码登录</el-button>
                <el-button type="primary" class="btn2">登录</el-button>
            </div>
        </div>
    </div>
    <el-footer>
        <div class="bg">©版权所有 登录必究</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      phone: '',
      verifyCode: '',
      checked: true,
      verifyCodeMethod: false,
      passwordMethod: true,
      bill: '../assets/fucker.jpg'
    }
  },
  methods: {
    switchMethod: function (event) {
      console.log('switch')
      this.verifyCodeMethod = !this.verifyCodeMethod
      this.passwordMethod = !this.passwordMethod
    }
  }
}
</script>

<style scoped>
.root {
    height: 90%;
}

.title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
}

.loginRoot {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    flex-direction: row;
}

.leftArea {
    flex-basis: 40%;
    margin: 15px 0 15px 0;
}

.rightArea {
    flex-basis: 60%;
    margin: 35px 0 15px 0;
}

.inputArea {
    width: 50%;
    margin: 20px 0 10px 0;
}

.checkArea {
    width: 50%;
    display: inline-flex;
    margin: 20px 0 10px 40px;
}

.btn {
    margin-top: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 50%;
}

.btn1 {
    width: 30%;
}

.btn2 {
    width: 70%;
}

.bg {
    background-color: #FFF;
}
</style>
