// a library to wrap and simplify api calls
import apisauce from 'apisauce'
const URL_PREFIX = 'api/v1'
import { configAppId } from './AppConfig'

const create = (baseURL = TCDefaultDomain) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json'
    },
    timeout: 10000
  })

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const checkIpInfo = () => api.get('/update/checkIpInfo').then((response) => {
    return response
  })

  const checkIpInfoDomains = () => api.get(URL_PREFIX + '/ip/user/checkIpInfoDomains', {clientId: configAppId}).then((response) => {
    return response
  })

  const uploadLog = (level, message) => api.put(URL_PREFIX + '/cms/internal/uploadLog', {level: level, message: message})
  return {
    getRoot,
    getRate,
    getUser,
    checkIpInfo,
    checkIpInfoDomains,
    uploadLog
  }
}

export default {
  create
}
