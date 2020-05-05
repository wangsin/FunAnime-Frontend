import axios from 'axios'

const getBasicConfig = () => axios.get('/funanime/server/api/outer/basic/config').then(res => res.data)

const getVideoList = options => axios.get('/funanime/server/api/outer/video/list', options).then(res => res.data)

const getVideoDetail = form => axios.get('/funanime/server/api/outer/video/detail/' + form.id).then(res => res.data)

export {
  getBasicConfig,
  getVideoList,
  getVideoDetail
}
