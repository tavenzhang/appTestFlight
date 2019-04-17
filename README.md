##博博乐棋牌-官方包app下载地址规则
iOS：
https://download.{业主下载域名}/ios/{业主品牌代号}/app.html?app=1&sub=bbl
android：
https://download.{业主下载域名}/bbl/{业主品牌代号}_bbl_release.apk

例如
超会赢棋牌
iOS： https://download.jinkuangjia.com/ios/chyqp/app.html?app=1&sub=bbl
安卓：https://download.jinkuangjia.com/bbl/chyqp_bbl_release.apk



运行说明: 
基于RN 0.57.7 版本搭建
初次运行前先执行一次`JDInit`脚本 之后如果不报错就不需要执行

https://gitlab.mtgogo.online/Zhang/BBL_Game.git
博博乐 app 部分代码，主要用与app与html通信。webView 性能优化，游戏页面显示

https://gitlab.mtgogo.online/Zhang/BBL_Game_Config.git
博博乐 多平台配置config文件，方便多个平台部署。一般使用develop 分支

https://gitlab.mtgogo.online/Zhang/BBL_Game_Lobby.git
博博乐 大厅html5 代码。基于laya引擎，与app 通过postMessage 进行通信 




import React, {
    Platform
} from 'react-native';

//主域名配置  用于获取和更新  热更新服务器的域名 还有游戏服务器域名 
export const appDomainBase = {
    base1: 'https://www.diwudalu.com',
    base2: 'https://www.diwudalu.com',
    base3: 'https://www.diwudalu.com',
    base4: 'https://www.diwudalu.com',
    base5: 'https://www.diwudalu.com',
    base6: 'https://www.diwudalu.com',
    base7: 'https://www.diwudalu.com',
}

//　游戏平台唯一id
export let configAppId = "5"


export const AppConfig = {
    allowFontScaling: true,
    domains: [
        appDomainBase.base1,
        appDomainBase.base2,
        appDomainBase.base3
    ],
    backupDomains: [
        appDomainBase.base4,
        appDomainBase.base5,
        appDomainBase.base6
    ],
    //用于渠道包 相关域名，获取热更新开关 
    checkUpdateDomains:[ 
        "https://www.ba2d16.com",
        "https://www.aa2d16.com",
        "https://www.ca2d16.com"
    ],
}

//app 名称
export const MyAppName = '博博乐';

//app js 业务代码版本
export const versionHotFix = 'bbl_3_25';

//配合渠道域名 用来 获取 域名的开关等参数
export const MyOwnerPlatName= 'uat彩票';

//备份域名 用来获取  备份的  热更新和游戏域名
export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']

//游戏平台相关配置
export const platInfo = {
    loginDomain: "https://webplatform.psxiaohe.com", //游戏默认登陆域名 实际使用时，会被动态替换
     gameDomain: "https://webplatform.psxiaohe.com", //游戏默认数据服务域名 实际使用时，会被动态替换

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888", //测试环境 游戏大厅zip 地址服务
        release_server: "https://download.hkbaoxian188.com/game/release/uat" //生产环境 游戏大厅zip下载服务器
    },
    platId: configAppId, //平台号
    brand: "uat01", // 用于获取分享链接 下载链接的平台参数
    latestNativeVersion:"2.0",//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}

//邀请码默认配置  从彩票app 遗漏下来  暂不使用
export const affCodeList = {
    ios: {
        '2.9.6': 'uat_ios'
    },
    android: {
        '2.10.11': 'uat_android'
    }
};


android 关键参数
#PLAT_ID  PLAT_ID  用于业主唯一id 区分
#PLAT_CH  PLAT_CH   聚道id 用于业主子聚道id
#SUB_TYPE app包的类型 0为主包 非0 是聚道包 21 是特殊的屏蔽了客户充值的包
APP_DOWNLOAD_VERSION=1.0  native app 的版本号 用于强制更新
#OPEN_INSTALL_KEY=xxx  用于第三方sdk openInstall appKey

android.useDeprecatedNdk=true
APP_VERSION=2.0.14   //app 版本号 用于热更新code-push 匹配
APP_ID=com.bbl.cguat  // appId 对应于android 系统的唯一id，
APP_NAME=QP-UAT  //android app 安装后应用名称
APK_NAME=        //apk文件名 可以忽略
CLIENT_ID=xxcard  //从cp 保留 可以忽略
AFF_CODE=1d17685c9ea667cd41058e0e  // app 邀请码 用于渠道打包
PLAT_ID=5  //平台唯一id， 会覆盖js 的 configAppId，用于获取域名的唯一id，
PLAT_CH=1  //渠道id，用于 渠道 子包 的区分
UMENG_KEY=5b9f7642f43e486308000111   //友盟key
JPUSH_KEY=e9f6454032a3f4936d80a82f  //极光key
SUB_TYPE=0  //平台app 类型 0 为官方主包。   1为渠道主包 21 为屏蔽包
WECHAT_KEY=wx39520c48b4a7dc64   //微信分享相关 key 
WECHAT_SECRET_KEY=67de54808bba55e934e3126f3e607a42 //微信分享相关 SECRET_KEY 
APP_DOWNLOAD_VERSION=2.0     //用于app 强制更新 于js 种platInfo的 latestNativeVersion 配合
OPEN_INSTALL_KEY=xhmkrq     //用于第三方sdk OPEN_INSTALL_KEY的 key


ios Info.plist关键参数  ios没有特殊SUB_TYPE 包 

APP_DOWNLOAD_VERSION     //用于app 强制更新 于js 种platInfo的 latestNativeVersion 配合
PLAT_ID： //平台唯一id， 会覆盖js 的 configAppId，用于获取域名的唯一id，
PLAT_CH=1  //渠道id，用于 渠道 子包 的区分
UMENG_KEY=5b9f7642f43e486308000111   //友盟key
JPUSH_KEY=e9f6454032a3f4936d80a82f  //极光key

com.openinstall.APP_KEY=xhmkrq     //用于第三方sdk OPEN_INSTALL_KEY的 key

Affcode=xxxx // app 邀请码 用于渠道打包

Bundle display name =xxx //app显示名字
Bundle identifier =xxx //appid 
















