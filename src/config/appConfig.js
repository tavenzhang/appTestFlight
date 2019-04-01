import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://pt2kmby3.kwuesw.com',
    base2: 'https://pt2kmby3.pnldtz.com',
    base3: 'https://pt2kmby3.pnldtz.com',
    base4: 'https://pt2kmby3.pnldtz.com',
    base5: 'https://pt2kmby3.pnldtz.com',
    base6: 'https://pt2kmby3.pnldtz.com',
    base7: 'https://pt2kmby3.weygwy.com',
}

export let configAppId = "280001"


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
    ]
}


export const MyAppName = '博必胜游戏';

export const versionHotFix = 'bbsqp_4_1';

export const safeguardDomain = [
    "https://a114f532e705020295b89c40b901e127.oss-cn-shenzhen.aliyuncs.com",
    "https://a114f532e705020295b89c40b901e127.s3-accelerate.amazonaws.com",
    "https://a114f532e705020295b89c40b901e127.azureedge.net"]


export const platInfo = {
    loginDomain:"https://pt2kmby3.kwuesw.com",
    gameDomain:"https://pt2kmby3.kwuesw.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/mxaw7"
    },
    platId: configAppId,
    brand: "bbsqp",
    channel: {}
}

export const affCodeList = {
    ios: {
        '2.9.6': 'bbsqp_ios'
    },
    android: {
        '2.10.11': 'bbsqp_android'
    }
};
