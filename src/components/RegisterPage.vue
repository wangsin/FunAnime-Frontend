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
          <el-button slot="append" v-if="verify.allowSend" @click="sendSms()" icon="el-icon-refresh-right">获取验证码</el-button>
          <el-button slot="append" v-else icon="el-icon-refresh-right" disabled> {{verify.authTime}} 秒后重新发送</el-button>
        </el-input>
        <el-input v-model="password" v-if="quickRegister" placeholder="密码" class="inputArea" show-password></el-input>
        <el-input v-model="passwordRepeat" v-if="quickRegister" placeholder="重复密码" class="inputArea" show-password></el-input>
        <el-input v-model="mail" v-if="quickRegister" placeholder="邮箱" class="inputArea"></el-input>
        <el-checkbox v-model="checked" class="checkArea">我同意<a href="">《用户协议》</a></el-checkbox>
        <div class="btn">
          <el-button type="primary" class="btn1" icon="el-icon-question" plain></el-button>
          <el-button type="primary" class="btn2" v-if="quickRegister" @click="switchMethod" plain>切换到快速注册</el-button>
          <el-button type="primary" class="btn2" v-if="normalRegister" @click="switchMethod" plain>切换到普通注册</el-button>
          <el-button type="primary" class="btn3" @click="submit()" :disabled="!checked">注册</el-button>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import * as API from '@/api/user/'
import {encrypt} from '../util/encrypt.js'

export default {
  name: 'RegisterPage',
  data () {
    return {
      verify: {
        allowSend: true,
        authTime: 0
      },
      phone: '',
      verifyCode: '',
      password: '',
      passwordRepeat: '',
      mail: '',
      quickRegister: false,
      normalRegister: true,
      checked: false,
      disabled: false,
      routerPushTime: 0
    }
  },
  methods: {
    switchMethod: function (event) {
      console.log(this.checked)
      this.quickRegister = !this.quickRegister
      this.normalRegister = !this.normalRegister
    },
    sendSms: function () {
      if (this.$data.phone === '') {
        this.$notify.error({
          title: '发送失败',
          message: '请输入手机号~'
        })
        return
      }

      API.sendSms({
        phone: this.$data.phone,
        type: 1
      }).then((res) => {
        if (res.errno !== 0) {
          // 业务逻辑失败
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
        } else {
          // 发送成功
          this.$data.verify.authTime = 30
          this.$data.verify.allowSend = false

          let authTimer = setInterval(() => {
            this.$data.verify.authTime--
            if (this.$data.verify.authTime <= 0) {
              this.$data.verify.allowSend = true
              clearInterval(authTimer)
            }
          }, 1000)
        }
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    },
    submit: function () {
      if (this.$data.phone === '' || this.$data.verifyCode === '') {
        this.$notify.error({
          title: '注册失败',
          message: '请正确输入信息'
        })
        return
      }

      if (this.$data.password !== this.$data.passwordRepeat) {
        this.$notify.error({
          title: '注册失败',
          message: '两次输入的密码不一致，请重新输入~'
        })
        return
      }

      API.submitRegister({
        phone: this.$data.phone,
        smsCode: this.$data.verifyCode,
        password: encrypt(this.$data.password),
        mail: this.$data.mail
      }).then((res) => {
        if (res.errno !== 0) {
          // 业务逻辑失败
          this.$notify.error({
            title: '提交失败',
            message: res.errmsg
          })
        } else {
          // 注册成功 路由跳转到登录页面
          this.$notify.info({
            title: '注册成功',
            message: '3秒后将跳转到登陆页面'
          })

          let pushTimer = setTimeout(() => {
            clearTimeout(pushTimer)
            this.$router.push('/login')
          }, 3000)
        }
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '提交失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
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
