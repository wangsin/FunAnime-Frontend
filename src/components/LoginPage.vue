<template>
  <el-container class="root" direction="vertical">
    <el-row :gutter="1" class="loginRoot" style="margin: 0;">
        <el-col :span="8" class="leftArea"></el-col>

        <el-col :span="16" class="rightArea">
            <div class="title">登录</div>
            <el-input v-model="phone" placeholder="手机号" v-if="passwordMethod" class="inputArea"></el-input>
            <el-input v-model="password" placeholder="密码" v-if="passwordMethod" class="inputArea" show-password>
                <el-button slot="append" icon="el-icon-question">忘记密码</el-button>
            </el-input>
            <el-input v-model="phone" placeholder="手机号" v-if="verifyCodeMethod" class="inputArea"></el-input>
            <el-input v-model="verifyCode" placeholder="验证码" v-if="verifyCodeMethod" class="inputArea" show-password>
              <el-button slot="append" v-if="verify.allowSend" @click="sendSms()" icon="el-icon-refresh-right">获取验证码</el-button>
              <el-button slot="append" v-else icon="el-icon-refresh-right" disabled> {{verify.authTime}} 秒后重新发送</el-button>
            </el-input>
            <el-checkbox v-model="checked" class="checkArea">记住我</el-checkbox>
            <div class="btn">
                <el-button type="primary" class="btn1" @click="switchMethod()" v-if="passwordMethod" plain>使用验证码登录</el-button>
                <el-button type="primary" class="btn1" @click="switchMethod()" v-if="verifyCodeMethod" plain>使用密码登录</el-button>
                <el-button type="primary" class="btn2" @click="login()">登录</el-button>
            </div>
        </el-col>
    </el-row>
  </el-container>
</template>

<script>
import * as userApi from '../api/user'
import {encrypt} from '../util/encrypt'
import * as API from '@/api/user/'

export default {
  name: 'LoginPage',
  data () {
    return {
      verify: {
        allowSend: true,
        authTime: 0
      },
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
      this.verifyCodeMethod = !this.verifyCodeMethod
      this.passwordMethod = !this.passwordMethod
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
        type: 2
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
    login: function () {
      userApi.login({
        phone: this.phone,
        password: encrypt(this.password),
        smsCode: this.verifyCode
      }).then((resp) => {
        if (resp.errno !== 0) {
          this.$notify.error({
            title: '登陆失败',
            message: resp.errmsg
          })
        } else {
          this.$store.commit('set_user_obj', resp.data)
          this.$notify.info({
            title: '欢迎回来 ' + resp.data.nick_name,
            message: '3s后为您跳转到主页'
          })
          let loginTimeOut = setTimeout(() => {
            clearTimeout(loginTimeOut)
            this.$router.push('/')
          }, 3000)
        }
      }).catch((err) => {
        console.log(err)
        this.$notify.error({
          title: '登录失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    }
  }
}
</script>

<style scoped>
.root {
    height: 100%;
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
    height: 100%;
    background-image: url("../assets/material-5.jpg");
}

.rightArea {
    /*flex-basis: 60%;*/
    /*margin: 35px 0 15px 0;*/
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
    /*width: 30%;*/
}

.btn2 {
    width: 70%;
}
</style>
