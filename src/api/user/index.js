import axios from 'axios'

// 发送验证码
const sendSms = form => axios.post('/funanime/server/api/outer/user/smsCode', form).then(res => res.data)
// 提交注册
const submitRegister = form => axios.post('/funanime/server/api/outer/user/register', form).then(res => res.data)

export {
  sendSms,
  submitRegister
}
