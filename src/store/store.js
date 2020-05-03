import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const outerToken = 'outerToken'
const userName = 'userName'
const userAvatar = 'userAvatar'
const phone = 'phone'
const nickName = 'nickName'
const exp = 'exp'
const level = 'level'
const userId = 'userId'
const status = 'status'
const mail = 'mail'

const state = {
  outerToken: window.sessionStorage.getItem(outerToken), // Token
  userName: window.sessionStorage.getItem(userName), // 用户名
  userAvatar: window.sessionStorage.getItem(userAvatar), // 头像
  phone: window.sessionStorage.getItem(phone),
  nickName: window.sessionStorage.getItem(nickName),
  exp: window.sessionStorage.getItem(exp),
  level: window.sessionStorage.getItem(level),
  userId: window.sessionStorage.getItem(userId),
  status: window.sessionStorage.getItem(status),
  mail: window.sessionStorage.getItem(mail)
}

const mutations = {
  set_token: (state, data) => {
    state.outerToken = data
    window.sessionStorage.setItem(outerToken, data)
  },
  set_user_obj: (state, user) => {
    state.outerToken = user.token
    window.sessionStorage.setItem(outerToken, user.token)

    state.userName = user.user_name
    window.sessionStorage.setItem(userName, user.user_name)

    state.phone = user.phone
    window.sessionStorage.setItem(phone, user.phone)

    state.nickName = user.nick_name
    window.sessionStorage.setItem(nickName, user.nick_name)

    state.exp = user.exp
    window.sessionStorage.setItem(exp, user.exp)

    state.level = user.level
    window.sessionStorage.setItem(level, user.level)

    state.userId = user.user_id
    window.sessionStorage.setItem(userId, user.user_id)

    state.status = user.status
    window.sessionStorage.setItem(status, user.status)

    state.mail = user.mail
    window.sessionStorage.setItem(mail, user.mail)

    state.userAvatar = user.user_avatar
    window.sessionStorage.setItem(userAvatar, user.user_avatar)
  },
  set_user: (state, user) => {
    JSON.parse(user, (k, v) => {
      switch (k) {
        case 'token': {
          state.outerToken = v
          window.sessionStorage.setItem(outerToken, v)
          break
        }
        case 'user_name': {
          state.userName = v
          window.sessionStorage.setItem(userName, v)
          break
        }
        case 'phone': {
          state.phone = v
          window.sessionStorage.setItem(phone, v)
          break
        }
        case 'nick_name': {
          state.nickName = v
          window.sessionStorage.setItem(nickName, v)
          break
        }
        case 'exp': {
          state.exp = v
          window.sessionStorage.setItem(exp, v)
          break
        }
        case 'level': {
          state.level = v
          window.sessionStorage.setItem(level, v)
          break
        }
        case 'user_id': {
          state.userId = v
          window.sessionStorage.setItem(userId, v)
          break
        }
        case 'status': {
          state.status = v
          window.sessionStorage.setItem(status, v)
          break
        }
        case 'mail': {
          state.mail = v
          window.sessionStorage.setItem(mail, v)
          break
        }
        case 'user_avatar': {
          state.userAvatar = v
          window.sessionStorage.setItem(userAvatar, v)
          break
        }
      }
    })
  },
  set_offline: (state) => {
    state.outerToken = ''
    state.userName = ''
    state.userAvatar = ''
    state.phone = ''
    state.nickName = ''
    state.exp = ''
    state.level = ''
    state.userId = ''
    state.status = ''
    state.mail = ''

    window.sessionStorage.removeItem(outerToken)
    window.sessionStorage.removeItem(userName)
    window.sessionStorage.removeItem(userAvatar)
    window.sessionStorage.removeItem(phone)
    window.sessionStorage.removeItem(nickName)
    window.sessionStorage.removeItem(exp)
    window.sessionStorage.removeItem(level)
    window.sessionStorage.removeItem(userId)
    window.sessionStorage.removeItem(status)
    window.sessionStorage.removeItem(mail)
  }
}

const getters = {
  isLogin: (state) => {
    return !!state.outerToken
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})

export default store
