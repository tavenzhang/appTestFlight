import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://38fo28gk.czdelong.com',
    base2: 'https://38fo28gk.fdk800.com',
    base3: 'https://38fo28gk.jdzdingli.com',
    base4: 'https://hosobw29.czdelong.com',
    base5: 'https://hosobw29.jdzdingli.com',
    base6: 'https://hosobw29.fdk800.com',
}

export let configAppId = "1146"


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


export const MyAppName = '梦想棋牌';

export const versionHotFix = 'v6.11';

export const MyOwnerPlatName= '梦想棋牌';


//第三方安全域名base64 key
export const safeguardKey = 'eyJkIjpbImh0dHBzOi8vMzdhOWFlYTFiZTg5MTVmNDk5ODQ0Mzg3M2VjOTBkYjAub3NzLWNuLXNoZW56aGVuLmFsaXl1bmNzLmNvbSIsCiAgICAiaHR0cHM6Ly8zN2E5YWVhMWJlODkxNWY0OTk4NDQzODczZWM5MGRiMC5zMy1hY2NlbGVyYXRlLmFtYXpvbmF3cy5jb20iLAogICAgImh0dHBzOi8vMzdhOWFlYTFiZTg5MTVmNDk5ODQ0Mzg3M2VjOTBkYjAuYXp1cmVlZGdlLm5ldCJdfQ=='



export const platInfo = {

    downDomain:"https://download.winmeng.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/mxqp"
    },
    platId: configAppId,
    brand: "mxqp",
    latestNativeVersion:{ios:"3.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}

export const affCodeList = {
    ios: {
        '2.9.6': 'mxaw7_ios'
    },
    android: {
        '2.10.11': 'mxaw7_android'
    }
};
