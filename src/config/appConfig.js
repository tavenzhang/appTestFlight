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
    base7: 'https://www.vdfrtw654qefhj.com',
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
    ]
}


export const MyAppName = '梦想游戏';

export const versionHotFix = 'mx-aw7-3';

export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


export const platInfo = {
    loginDomain:"https://38fo28gk.czdelong.com",
    gameDomain:"https://yw8txj2e.pgzlwx.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/mxaw7"
    },
    platId: configAppId,
    brand: "mxqp",
    channel: {
        c_1: {
            jpushKey: "e9f6454032a3f4936d80a82f",
            jpush_channel: "",
            umengKey: "5b9f7642f43e486308000111",
            umengChanel:"1",
            flurry_ios:"TYFQRDDBJC5HKBJMRYP5",
            flurry_android:"BGZ8YFQ22PMPF87KCCBW"
        },
        c_2: {jpushKey: "",
            jpush_channel: "",
            umengKey: "",
            umengChanel:"1",
            flurry_ios:"",
            flurry_android:""
        },
        c_3: {jpushKey: "",
            jpush_channel: "",
            umengKey: "",
            umengChanel:"1",
            flurry_ios:"",
            flurry_android:""
        },
    }
}

export const affCodeList = {
    ios: {
        '2.9.6': 'mxaw7_ios'
    },
    android: {
        '2.10.11': 'mxaw7_android'
    }
};

export const shareURL={
    ios:"https://download.jinkuangjia.com/game/app.html?sub=release-mxqp&app=1&rom=7827",
    android:"https://download.jinkuangjia.com/game/release/mxqp/mxqp.apk?rom=5593",
}