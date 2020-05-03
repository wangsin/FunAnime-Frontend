import CryptoJS from 'crypto-js'

export const encrypt = function (word) {
  if (word === '') {
    // 空字符串不加密
    return ''
  }

  let encrypt = CryptoJS.AES.encrypt(word, CryptoJS.enc.Utf8.parse('12345678'), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypt.toString()
}
