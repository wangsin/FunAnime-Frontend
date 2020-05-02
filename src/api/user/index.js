import axios from 'axios'

// 发送验证码
const sendSms = form => axios.post('/funanime/server/api/outer/user/smsCode', form).then(res => res.data)

export {
  sendSms
}
