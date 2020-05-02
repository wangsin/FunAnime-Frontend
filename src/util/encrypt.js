import CryptoJS from 'crypto-js'

export const encrypt = function (word) {
  if (word === '') {
    // 空字符串不加密
    return ''
  }

  let key = CryptoJS.enc.Utf8.parse('123456')
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
