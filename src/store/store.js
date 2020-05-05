import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const outerToken = 'outerToken'
const userInfo = 'userInfo'

/* eslint-disable */
var getCookie = function (name) {
  let strcookie = document.cookie//获取cookie字符串
  let arrcookie = strcookie.split("; ")//分割
  //遍历匹配
  for ( let i = 0; i < arrcookie.length; i++) {
    let arr = arrcookie[i].split("=")
    if (arr[0] === name){
      return arr[1]
    }
  }
  return '{}'
}

const state = {
  userInfo: decodeURIComponent(getCookie(userInfo)),
  outerToken: getCookie(outerToken), // Token
}

const mutations = {
  set_user_obj: (state, user) => {
    state.outerToken = user.token
    state.userInfo = JSON.stringify(user)

    Vue.cookie.set(userInfo, JSON.stringify(user), 1)
    Vue.cookie.set(outerToken, user.token, 1)

    window.sessionStorage.setItem(outerToken, user.token)
    window.sessionStorage.setItem(userInfo, JSON.stringify(user))
  },
  set_offline: (state) => {
    state.outerToken = '{}'
    state.userInfo = '{}'

    window.sessionStorage.removeItem(outerToken)
    window.sessionStorage.removeItem(userInfo)

    Vue.cookie.delete(outerToken)
    Vue.cookie.delete(userInfo)
  }
}

const getters = {
  isLogin: (state) => {
    return state.outerToken !== '{}'
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})

export default store
