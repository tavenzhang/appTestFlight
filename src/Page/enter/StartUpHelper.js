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
  let netStateCheckAllReady = false;
  // 由于fetch 本身的timeOut 不起作用，为了防止某些域名请求一直不返回，导致无法进行错误回掉，手动进行超时处理
  setTimeout(()=>{
      if(!netStateCheckAllReady){
          netStateCheckAllReady=true;
          callback(false, false, false);
      }
  },10000)
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
                  if(!TW_Store.appStore.isSitApp){ //对于sit  环境做特殊处理 使用默认
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
                  netStateCheckAllReady=true
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
                  netStateCheckAllReady=true
                  callback(false, false, rt.status);
            }
        }
      })
  }
}

export default {getAvailableDomain}
