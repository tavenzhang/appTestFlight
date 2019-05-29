import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://webplatform.psxiaohe.com',
    base2: 'https://webplatform.psxiaohe.com',
    base3: 'https://webplatform.psxiaohe.com',
    base4: 'https://webplatform.psxiaohe.com',
    base5: 'https://webplatform.psxiaohe.com',
    base6: 'https://webplatform.psxiaohe.com',
    base7: 'https://webplatform.psxiaohe.com',
}


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
    checkUpdateDomains:[
        "https://www.ba2d16.com",
        "https://www.aa2d16.com",
        "https://www.ca2d16.com"
    ],
}


export const MyAppName = '博博乐';

export const versionHotFix = '5.23';

export const MyOwnerPlatName= 'uat彩票';

export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


export const platInfo = {

    downDomain:"https://download.jinkuangjia.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/uat"
    },
    platId: configAppId,
    brand: "uat01",
    latestNativeVersion:{ios:"2.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}



