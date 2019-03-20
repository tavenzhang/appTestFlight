import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://www.diwudalu.com',
    base2: 'https://www.diwudalu.com',
    base3: 'https://www.diwudalu.com',
    base4: 'https://www.diwudalu.com',
    base5: 'https://www.diwudalu.com',
    base6: 'https://www.diwudalu.com',
    base7: 'https://www.diwudalu.com',
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

export const versionHotFix = 'bbl_3_16';

export const MyOwnerPlatName= 'uat彩票';

export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


export const platInfo = {
    //loginDomain:"https://0365cai.cc",
    loginDomain: "https://webplatform.psxiaohe.com",
    //  gameDomain:"https://dk3nuq7v.zhdisi.com",
     gameDomain: "https://webplatform.psxiaohe.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/uat"
    },
    platId: configAppId,
}


export const affCodeList = {
    ios: {
    },
    android: {
    }
};

export const shareURL={
    ios:"https://download.imsue.cn/game/app.html?sub=release-uat&app=1&rom=7803",
    android:"https://download.imsue.cn/game/release/uat/uat.apk?rom=4473",
}