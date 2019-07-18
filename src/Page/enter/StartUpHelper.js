import { AsyncStorage} from 'react-native'
import { create } from 'apisauce'

import NetUitls from "../../Common/Network/TCRequestUitls";
import Base64 from "../../Common/JXHelper/Base64";
import CryptoJS from "crypto-js";
const pk64 = 'OXcwQkFRRUZBQU9lZGZxNQ=='
let base64 = new Base64()
function getAvailableDomain (domains,callback) {
  // 不用检测可访问域名是否在本地缓存，第一次启动肯定不存在。如果设置缓存，其实每次还是要去校验缓存的那条地址能不能访问。
  // 直接进行检测
 // AsyncStorage.setItem('cacheDomain', JSON.stringify(cacheDomain));
  let errorCount = 0;
  let isFinish =false;
  for (let i = 0; i < domains.length; i++) {
    TW_Log('cacheDomain check= '+domains[i]);
      let tempDomain =domains[i]
      if(tempDomain.indexOf("http")==-1){
          errorCount+=1;
          if (errorCount >= domains.length) {
              callback(false, false, "");
          }
      }
      NetUitls.getUrlAndParamsAndCallback(`${domains[i]}/api/v1/ip/user/checkIpInfoDomainsEncrypte?clientId=${TW_Store.appStore.clindId}&platform=CG`,null,(rt)=>{
        if(rt.rs){
          if(!isFinish){
              isFinish = true;
             // TW_Log('大王来巡山--content ',rt.content.data);
              var decodepk64 = base64.decode(pk64)
              var key = CryptoJS.enc.Utf8.parse(decodepk64)
              var iv = CryptoJS.enc.Utf8.parse(decodepk64)
              var decryptedResponseData = CryptoJS.AES.decrypt(rt.content.data, key, {
                  iv: iv,
                  mode: CryptoJS.mode.CBC,
                  padding: CryptoJS.pad.Pkcs7
              })
              var decryptedResponseDataJson = JSON.parse(decryptedResponseData.toString(CryptoJS.enc.Utf8));
              let content=decryptedResponseDataJson;
              content.allowAppUpdate=true;
              TW_Log('大王来巡山 content==domains[i]--'+domains[i],content);
             // TW_Log("callback-------content.trendChartDomains[0]-"+content.trendChartDomains[0],content.trendChartDomains);
             // let gameDomain = content.trendChartDomains&&content.trendChartDomains.length>0 ? content.trendChartDomains[0]:"";
              let gameDomain = domains[i];
              if(gameDomain.indexOf("http")>-1){
                 // TW_Log("callback-------content.trendChartDomains[0]-exist"+gameDomain);
                  if(TW_Store.appStore.clindId!="31"){ //对于sit  环境做特殊处理 使用默认
                      TW_Store.appStore.currentDomain=TW_Store.bblStore.loginDomain =TW_Store.bblStore.gameDomain=gameDomain;
                  }

              }
              TW_Log('大王来巡山 content==domains[i] loginDomain--'+ TW_Store.bblStore.loginDomain,TW_Store.bblStore.gameDomain);
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
                      callback(false, false, false);
                      TW_Log("callback------写入缓存失败--");
                  }
              })
          }
        }else{
            errorCount++;
            TW_Log("cacheAttempt000+errorCount=="+errorCount,domains);
            if (errorCount >= domains.length) {
                  callback(false, false, rt.status);
            }
        }
      })
  }
}

export default {getAvailableDomain}
