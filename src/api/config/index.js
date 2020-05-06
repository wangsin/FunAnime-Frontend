import axios from 'axios'

const getBasicConfig = () => axios.get('/funanime/server/api/outer/basic/config').then(res => res.data)

const getVideoList = options => axios.get('/funanime/server/api/outer/video/list', options).then(res => res.data)

const getVideoDetail = form => axios.get('/funanime/server/api/outer/video/detail/' + form.id).then(res => res.data)

const initVideoBarrage = form => axios.get('/funanime/server/api/outer/video/barrage/list/' + form.id).then(res => res.data)

const getVideoUploadSign = () => axios.get('/funanime/server/api/outer/video/manage/uploadSign').then(res => res.data)

export {
  getBasicConfig,
  getVideoList,
  getVideoDetail,
  initVideoBarrage,
  getVideoUploadSign
}
