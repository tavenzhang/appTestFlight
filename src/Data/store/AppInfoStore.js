import { observable, action } from "mobx";
import { NativeModules, Alert, Platform } from 'react-native';
import CodePush from "react-native-code-push";
import DeviceInfo from 'react-native-device-info';
import {
  configAppId,
  MyAppName,
  versionHotFix,
  platInfo,
  AppConfig,
  MyOwnerPlatName,
} from "../../config/appConfig";

import { UpDateHeadAppId } from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls';
import TCUserOpenPayApp from '../../Page/UserCenter/UserPay/TCUserOpenPayApp';
import OpeninstallModule from "openinstall-react-native";
/**
 * 用于初始化项目信息
 */
export default class AppInfoStore {
  @observable
  screenW = SCREEN_W;
  /**
   * 应用名称
   * @type {string}
   */
  @observable
  appName = MyAppName;
  /**
   *  是否保持高亮
   * @type {string}
   */
  @observable
  keepAwake = false;
  /**
   * 应用版本号
   * @type {string}
   */
  @observable
  appVersion = '1.0.0';
  /**
   * 设备token
   * @type {string}
   */
  @observable
  deviceToken = '';
  /**
   * 邀请码
   * @type {string}
   */
  userAffCode = '';
  @observable
  versionHotFix = versionHotFix;
  @observable
  currentDomain = '';
  @observable
  appInfo = {
    PLAT_ID: "",
    PLAT_CH: "",
    APP_DOWNLOAD_VERSION: "",
    Affcode: "",
    JPushKey: "",
    UmengKey: "",
    applicationId: "",
    SUB_TYPE: "0"
  };
  @observable
  channel = '';
  @observable
  clindId = configAppId;
  callInitFuc = null;
  @observable
  isInitPlat = false;
  applicationId = '';
  @observable
  isInAnroidHack = false;
  @observable
  subAppType = '0';
  //tag 用于更新一次
  updateflag = false;
  //app 最新版本
  @observable
  latestNativeVersion = G_IS_IOS
    ? platInfo.latestNativeVersion.ios
    : platInfo.latestNativeVersion.android;
  //app 当前版本
  APP_DOWNLOAD_VERSION = '1.0';
  //openInstallData
  @observable
  openInstallData = { appKey: "", data: null };

  @observable
  isSitApp=this.clindId=="31"

  openInstallCheckCount = 1;

  constructor() {
    this.init();
  }

  init() {
    TW_Data_Store.getItem(TW_DATA_KEY.platData, (err, ret) => {
      TW_Log(
        "TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat====eeror=" +
          err +
          "--ret--" +
          ret
      );

      if (err) {
        this.checkAppInfoUpdate(null);
      } else {
        if (ret) {
          let appInfo = JSON.parse(ret);
          if (appInfo) {
            this.initData(appInfo);
          }
          this.checkAppInfoUpdate(ret);
        } else {
          this.checkAppInfoUpdate(null);
        }
      }
    });
  }

  checkAppInfoUpdate = (oldData = null) => {
    TN_GetAppInfo(data => {
      // TW_Log("TN_GetPlatInfo---versionBBL--checkAppInfoUpdate.platDat==start==data=",data);
      if (data) {
        let appInfo = {};
        if (G_IS_IOS) {
          appInfo = JSON.parse(data);
        } else {
          appInfo = data;
        }
        // TW_Log("TN_GetPlatInfo---versionBBL--checkAppInfoUpdate.platDat==start==appInfo----=",appInfo);
        let dataString = JSON.stringify(appInfo);
        if (oldData) {
          if (oldData != dataString) {
            this.initData(appInfo);
            TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
          }
        } else {
          this.initData(appInfo);
          TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
        }
        this.APP_DOWNLOAD_VERSION = this.appInfo.APP_DOWNLOAD_VERSION;
        this.APP_DOWNLOAD_VERSION = this.APP_DOWNLOAD_VERSION
          ? this.APP_DOWNLOAD_VERSION
          : "1.0";
        TW_Store.bblStore.getAppData();

        try {
          TW_Data_Store.getItem(TW_DATA_KEY.AFF_CODE, (err, ret) => {
            TW_Store.dataStore.log +=
              "TN_GetPlatInfo---versionBBL-TW_DATA_KEY.AFF_CODd----err=-" +
              err +
              "----ret==" +
              ret +
              "\n";
            if (ret && ret.length > 0) {
              this.userAffCode = ret;
            }
          });
          //最多重复3次检察
          this.onOpenInstallCheck(this.onOpenInstallCheck);
        } catch (e) {
          TW_Store.dataStore.log += "getInstall---error=" + e;
        }
      }
    });
  };

  onOpenInstallCheck = callBack => {
    OpeninstallModule.getInstall(10, res => {
      //TW_Store.dataStore.log+="getInstall----"+JSON.stringify(res);
      TW_Store.dataStore.log += "getInstall---res-" + res;
      if (res && res.data) {
        //TW_Store.dataStore.log+="getInstall----"+JSON.stringify(res);
        let map = null;
        if (typeof res.data === "object") {
          map = res.data;
        } else {
          map = JSON.parse(res.data);
        }
        if (map) {
          this.openInstallData.data = map;
          if (map && map.affCode) {
            this.userAffCode = map.affCode;
            TW_Data_Store.setItem(TW_DATA_KEY.AFF_CODE, this.userAffCode);
            TW_OnValueJSHome(
              TW_Store.bblStore.getWebAction(
                TW_Store.bblStore.ACT_ENUM.affcode,
                { data: this.userAffCode }
              )
            );
            TW_Store.dataStore.log +=
              "\ngetInstall---affCode=TW_OnValueJSHome--userAffCode-" +
              this.userAffCode;
          }
        }
      } else {
        if (callBack) {
          if (this.openInstallCheckCount < 3) {
            this.openInstallCheckCount += 1;
            callBack(this.onOpenInstallCheck);
          }
        }
      }
    });
  };

  onShowDownAlert = url => {
    //处于渠道验证阶段 不需要检测强更新
    if (url && url.length > 0 && !this.isInAnroidHack) {
      TW_Log(
        "onShowDownAlert-----url==this.APP_DOWNLOAD_VERSION=" +
          this.APP_DOWNLOAD_VERSION,
        this.latestNativeVersion
      );
      let isShowAlert=this.APP_DOWNLOAD_VERSION != this.latestNativeVersion;
      if(!isShowAlert&&this.appInfo.PLAT_ID=="1147"){
          //针对超会赢棋牌app 做特殊处理 由于超会赢中途更新了app微信账号
          if(this.appInfo.PLAT_ID=="1147"&&this.appInfo.AppSecret&&this.appInfo.AppSecret.weixin){
              isShowAlert = (this.appInfo.AppSecret.weixin != "c05ff4e9cb83b964dd7e1c46b7f3f080")
          }
      }
        TW_Log("onBackAndroid---this.APP_DOWNLOAD_VERSION==-" + this.APP_DOWNLOAD_VERSION, this.latestNativeVersion);
      if (isShowAlert) {

        //清除所有的缓存数据 方便app升级
        TW_Data_Store.clear();
        Alert.alert(
          "检测到版本升级，请重新下载安装！",
          "",
          [
            {
              text: "前往下载",
              onPress: () => {
                TCUserOpenPayApp.linkingWeb(url);
                TW_Log("onShowDownAlert-----url==" + url);
                setTimeout(() => {
                  this.onShowDownAlert(url);
                }, 1000);
              }
            }
          ],
          { cancelable: false }
        );
      }
    }
  };

  initData = appInfo => {
      if(!appInfo){
          appInfo = { PLAT_ID: configAppId, isNative: false };
      }
      else{
          appInfo.PLAT_ID= appInfo.PLAT_ID ? appInfo.PLAT_ID:appInfo.PlatId;//兼容某些老的app
          if(!appInfo.PLAT_ID){
              appInfo.PLAT_ID = configAppId;
          }
      }
    //所以的clintId 在此重置
    this.clindId = appInfo.PLAT_ID ? appInfo.PLAT_ID : configAppId;
    this.subAppType = appInfo.SUB_TYPE ? appInfo.SUB_TYPE : '0';
    this.channel = appInfo.PLAT_CH ? appInfo.PLAT_CH : '1';

    platInfo.platId = this.clindId;
    UpDateHeadAppId(this.clindId);
    this.appInfo = appInfo;
    this.isInitPlat = true;
    this.initAppName();
    this.initAppVersion();
    this.initDeviceTokenFromLocalStore();
    /*** 初始化邀请码*/
    this.userAffCode = this.appInfo.Affcode;
    this.callInitFuc = this.callInitFuc ? this.callInitFuc() : null;
    this.openInstallData.appKey = this.appInfo['com.openinstall.APP_KEY'];
    // TW_Log("TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat====appInfo--this.userAffCode--"+this.userAffCode, appInfo);
    if (G_IS_IOS) {
      //ios 动态开启友盟等接口 android 是编译时 决定好了。
      // TW_Log('JX===  appInfo '+this.appInfo.APP_DOWNLOAD_VERSION+"--appInfo.JPushKey=="+this.appInfo.JPushKey,this.appInfo)
      TN_StartJPush(this.appInfo.JPushKey, "1");
      TN_START_Fabric();
      // TN_START_SHARE("111","222");
      TN_StartUMeng(this.appInfo.UmengKey, this.appInfo.Affcode);
    }
    this.isSitApp=this.clindId=="31";
  };

  checkAndroidsubType(initDomain) {
    // 如果是android 需要判断是否为特殊subType 聚道包 例子 subAppType 21,  21 特殊类型包
    switch (`${this.subAppType}`) {
      case '21':
        this.isInAnroidHack = true;
        TW_Store.hotFixStore.allowUpdate = false;
        //开始检测 热更新开关
        this.initAndroidAppInfo(res => {
          this.checkUpdate(initDomain);
        });
        break;
      default:
        initDomain();
        this.initAndroidAppInfo();
        break;
    }
  }

  checkUpdate(initDomain) {
    let checkUpdateDemain = AppConfig.checkUpdateDomains;

    if (checkUpdateDemain) {
      this.isReqiestTing = true;
      setTimeout(() => {
        if (this.isReqiestTing) {
          // 如果 4秒还没有数据返回，强制初始化。 NetUitls 的timeOut 不靠谱
          initDomain();
        }
      }, 4000);
      for (var i = 0; i < checkUpdateDemain.length; i++) {
        let url = checkUpdateDemain[i] + "/code/user/apps";
        NetUitls.getUrlAndParamsAndCallback(
          url,
          {
            appId: this.applicationId,
            version: this.appVersion,
            appType: "ANDROID",
            owner: MyOwnerPlatName,
          },
          res => {
            this.isReqiestTing = false;
            if (res.rs) {
              if (!this.updateflag) {
                //tag 用于更新一次
                this.updateflag = true;
                let response = res;
                let resCheck =
                  response.content.bbq &&
                  response.content.bbq.indexOf('SueL') != -1;
                TW_Log(
                  "appInfo--================/code/user/apps--response--resCheck--" +
                    resCheck +
                    "--MyOwnerPlatName--" +
                    MyOwnerPlatName,
                  response
                );
                if (resCheck) {
                  //允许更新
                  this.isInAnroidHack = false;
                  TW_Store.hotFixStore.allowUpdate = true;
                }
                initDomain();
              }
            }
          },
          3000
        );
      }
    } else {
      initDomain();
    }
  }

  regCallInitFuc(callBack) {
    this.callInitFuc = callBack;
    if (this.isInitPlat) {
      callBack();
    }
  }

  //初始化appName
  initAppName() {
    if (!G_IS_IOS) {
      NativeModules.JXHelper.getAppName(appName => {
        if (appName.length) {
          this.appName = appName;
        }
        TW_Log("APPNAME", this.appName);
      });
    }
  }

  async initAndroidAppInfo(callback) {
    let appInfo = this.appInfo;
    if (appInfo) {
      //this.userAffCode = appInfo.Affcode;
      this.appVersion = appInfo.versionName;
      this.applicationId = appInfo.applicationId;
    }
    TW_Log("appInfo----end--appInfo====" + appInfo, appInfo);
    callback && callback(true);
  }

  getAppInfo() {
    return new Promise(resolve => {
      NativeModules.JXHelper.getAppInfo(appInfo => {
        resolve(appInfo);
      });
    });
  }

  //初始化app版本号
  async initAppVersion() {
    let nativeConfig = await CodePush.getConfiguration();
    this.appVersion = nativeConfig.appVersion;
    TW_Log(
      "appInfo----version-nativeConfig--  this.appVersion " + this.appVersion,
      nativeConfig
    );
  }

  async initDeviceTokenFromLocalStore() {
    await storage
      .load({ key: "USERDEVICETOKEN" })
      .then(res => {
        if (res) {
          TW_Log('deviceToken', res);
          this.deviceToken = res;
        }
      })
      .catch(err => {
        TW_Log('deviceToken not found');
      });

    if (this.deviceToken.length === 0) {
      //this.deviceToken = await this.initDeviceTokenFromNative();
      this.deviceToken = await this.initDeviceUniqueID();
      this.saveDeviceTokenToLocalStore();
    }
  }

  async initDeviceUniqueID() {
    try {
      const oriUniqueID = DeviceInfo.getUniqueID();
      let enhancedUniqueID = oriUniqueID;
      TW_Log('deviceToken: oriUniqueID: ', oriUniqueID);
  
      if (!G_IS_IOS) {
        enhancedUniqueID = `${oriUniqueID.substring(0, 8)}-${oriUniqueID.substring(8, 12)}-${oriUniqueID.substring(12, 16)}-${oriUniqueID.substring(0, 4)}-${oriUniqueID.substring(4)}`;
      }
  
      TW_Log('deviceToken: enhancedUniqueID: ', enhancedUniqueID);
  
      return enhancedUniqueID;
    } catch (e) {
      const enhancedUniqueID = await this.initDeviceTokenFromNative();
      
      return enhancedUniqueID;
    }
  }


  async initDeviceTokenFromNative() {
    return new Promise(resolve => {
      try {
        NativeModules.JXHelper.getCFUUID((err, uuid) => {
          if (!uuid) {
            uuid = this.getGUIDd();
          }
          resolve(uuid);
        });
      } catch (e) {
        resolve(this.getGUIDd());
      }
    });
  }

  getGUIDd() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  saveDeviceTokenToLocalStore() {
    storage.save({ key: "USERDEVICETOKEN", data: this.deviceToken });
  }

  @action
  getPlatInfo() {
    if (this.subAppType == "0") {
      return `    plat: ${this.clindId}  channel: ${this.channel}`;
    } else {
      return `    plat: ${this.clindId}  channel: ${this.channel}  subType: ${
        this.subAppType
      }`;
    }
  }
}
