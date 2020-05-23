import axios from 'axios'

const getVideoUploadSign = form => axios.post('http://192.168.127.130:4869/upload', form).then(res => res.data)

export {
  getVideoUploadSign
}
