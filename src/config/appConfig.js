import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://www.0579jiapeiwang.com',
    base2: 'https://www.yurewd456qwep.com',
    base3: 'https://www.mkjow321qwup.com',
    base4: 'https://www.qzxsaq987dwqd.com',
    base5: 'https://www.ghyrfd123eqqd.com',
    base6: 'https://www.qwedsa789qszd.com',
    base7: 'https://www.vdfrtw654qefhj.com',
}

export let configAppId = "34"


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


export const MyAppName = '365游戏';

export const MyOwnerPlatName= '365彩票';

export const versionHotFix = '365_2_15';

export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


export const platInfo = {
    loginDomain:"https://0365cai.cc",
    //gameDomain: "https://dk3nuq7v.zhdisi.com",
    gameDomain:"https://dk3nuq7v.zhdisi.com",
    // gameDomain: "https://0365cai.cc",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/365"
    },
    platId: configAppId,

    channel: {
        c_1: {
            jpushKey: "",
            jpush_channel: "",
            umengKey: "5c2af406f1f5568dcc000160",
            umengChanel:"1",
            flurry_ios:"TYFQRDDBJC5HKBJMRYP5",
            flurry_android:"BGZ8YFQ22PMPF87KCCBW"
        },
        c_2: {jpushKey: "",
            jpush_channel: "",
            umengKey: "5c2af406f1f5568dcc000160",
            umengChanel:"1",
            flurry_ios:"TYFQRDDBJC5HKBJMRYP5",
            flurry_android:"BGZ8YFQ22PMPF87KCCBW"
        },
        c_3: {jpushKey: "",
            jpush_channel: "",
            umengKey: "5c2af406f1f5568dcc000160",
            umengChanel:"1",
            flurry_ios:"TYFQRDDBJC5HKBJMRYP5",
            flurry_android:"BGZ8YFQ22PMPF87KCCBW"
        },
    }
}

export const affCodeList = {
    ios: {
        '2.9.6': '365_ios'
    },
    android: {
        '2.10.11': '365_android'
    }
};