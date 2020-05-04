import axios from 'axios'

const getBasicConfig = () => axios.get('/funanime/server/api/outer/basic/config').then(res => res.data)

export {
  getBasicConfig
}
