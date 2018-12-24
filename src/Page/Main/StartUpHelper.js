import { AsyncStorage} from 'react-native'
import { create } from 'apisauce'

import AppConfig from './AppConfig'
import NetUitls from "../../Common/Network/TCRequestUitls";

const cacheDomain = {
  domain: '',
  updateThisTime: false,
  responseTime: 0
}

function getAvailableDomain (domains,callback) {
  // 不用检测可访问域名是否在本地缓存，第一次启动肯定不存在。如果设置缓存，其实每次还是要去校验缓存的那条地址能不能访问。
  // 直接进行检测
 // AsyncStorage.setItem('cacheDomain', JSON.stringify(cacheDomain));
  let errorCount = 0;
  let isFinish =false;
  for (let i = 0; i < domains.length; i++) {
    TW_Log('cacheDomain check= '+domains[i]);
      NetUitls.getUrlAndParamsAndCallback(`${domains[i]}/api/v1/ip/user/checkIpInfoDomains?clientId=${AppConfig.clientId}&platform=CG`,null,(rt)=>{
        if(rt.rs){
          if(!isFinish){
              isFinish = true;
              let content= rt.content;
              TW_Log('start finish check==================22==============>'+domains[i],content);
              content.allowAppUpdate=true;
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
                      TW_Log("callback------写入缓存失败---");
                  }
              })
          }
        }else{
            errorCount++;
            if (errorCount >= domains.length) {
                  callback(false, false, rt.status)
            }
        }
      })
  }
}

export default {getAvailableDomain}
