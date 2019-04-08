import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'http://192.168.1.93:7500',
    base2: 'http://192.168.1.93:7500',
    base3: 'http://192.168.1.93:7500',
    base4: 'http://192.168.1.93:7500',
    base5: 'http://192.168.1.93:7500',
    base6: 'http://192.168.1.93:7500',
    base7: 'http://192.168.1.93:7500',
}


export let configAppId = "31"


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

export const versionHotFix = 'bbl_3_23';

export const MyOwnerPlatName= 'sit';

export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


export const platInfo = {
    //loginDomain:"https://0365cai.cc",http://192.168.1.93:8091
    loginDomain: "http://192.168.1.93:8091",
    //  gameDomain:"https://dk3nuq7v.zhdisi.com",
    gameDomain: "http://sit.106games.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/sit"
    },
    platId: configAppId,
    brand: "sit01",
    channel: {

    }
}


export const affCodeList = {
    ios: {
        '2.9.6': 'sit_ios'
    },
    android: {
        '2.10.11': 'sit_android'
    }
};

