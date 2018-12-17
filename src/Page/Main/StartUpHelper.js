import { AsyncStorage ,Platform} from 'react-native'
import { create } from 'apisauce'

import AppConfig from './AppConfig'
import NetUitls from "../../Common/Network/TCRequestUitls";

const cacheDomain = {
  domain: 'https://www.xiyiji923.com',
  updateThisTime: false,
  responseTime: 0
}

const StartUp = create({
  baseURL: cacheDomain.domain,
  timeout: 5000,
  headers: {
    'Cache-Control': 'no-cache',
    'Accept': 'application/json'
  }
})

function getAvailableDomain (domains,callback) {
  // 不用检测可访问域名是否在本地缓存，第一次启动肯定不存在。如果设置缓存，其实每次还是要去校验缓存的那条地址能不能访问。
  // 直接进行检测
  AsyncStorage.setItem('cacheDomain', JSON.stringify(cacheDomain));
  let errorCount = 0;
  let isFinish =false;
  for (let i = 0; i < domains.length; i++) {
   // StartUp.setBaseURL(domains[i]);
    TW_Log('cacheDomain check= '+domains[i]);
      NetUitls.getUrlAndParamsAndCallback(`${domains[i]}/api/v1/ip/user/checkIpInfoDomains?clientId=${AppConfig.clientId}&platform=GAME`,null,(rt)=>{
        if(rt.rs){
          if(!isFinish){

              isFinish = true;
              let content= rt.content;
              TW_Log('start finishe check================================>'+domains[i],content);
              AsyncStorage.setItem('cacheDomain', JSON.stringify({
                  serverDomains: content.serverDomains,
                  hotfixDomains: content.availableUpdateInfoList,
                  trendChartDomains: content.trendChartDomains,
                  responseTime: rt.duration
              }), (err) => {
                  if (!err) {
                      if (content && content.allowAppUpdate) {
                          callback(true, true, null)
                      } else {
                          callback(true, false, null)
                      }
                  } else {//写入缓存失败
                      callback(false, false, false)
                  }
              })
          }
        }else{
            errorCount++;
            if (errorCount >= domains.length) {
                  callback(false, false, rt.rs);
            }
        }
      })
    // StartUp.get(`/api/v1/ip/user/checkIpInfoDomains?clientId=${AppConfig.clientId}&platform=GAME`).then((response) => {
    //   if (response.ok) {
    //     AsyncStorage.getItem('cacheDomain').then((cacheDomain) => {
    //       if (!JSON.parse(cacheDomain).updateThisTime) {
    //         // update cacheDomain
    //         TCDefaultDomain = domains[i]//存入默认使用域名，如果请求成功使用从服务器获取的第一条，失败则使用默认配置第一条
    //         TCDefaultTendDomain = response.data.trendChartDomains
    //           TCServerDomains = response.data.serverDomains
    //         AsyncStorage.mergeItem('uploadLog', JSON.stringify({responseTime: response.duration,platform:Platform.OS ==='ios'?'ios':'android',checkIpInfoDemain:domains[i]}))
    //         AsyncStorage.setItem('cacheDomain', JSON.stringify({
    //           serverDomains: response.data.serverDomains,
    //           hotfixDomains: response.data.availableUpdateInfoList,
    //           updateThisTime: true,
    //           trendChartDomains: response.data.trendChartDomains,
    //           responseTime: response.duration
    //         }), (err) => {
    //           if (!err) {
    //             if (response.data && response.data.allowAppUpdate) {
    //               callback(true, true, null)
    //             } else {
    //               callback(true, false, null)
    //             }
    //           } else {//写入缓存失败
    //             callback(false, false, false)
    //           }
    //         })
    //         AsyncStorage.setItem('AppConfig', JSON.stringify(response.data));
    //       }
    //     }).catch(() => console.log('async get exception'))
    //   } else {
    //     errorCount++
    //     if (errorCount >= domains.length) {
    //       callback(false, false, response.problem)
    //     }
    //   }
    // }).catch((error) => { })
  }
}

export default {getAvailableDomain}
