import React, {
    Platform
} from 'react-native';


export const appDomainBase = {
    base1: 'https://38fo28gk.ewxsg.cn"',
    base2: "https://38fo28gk.jjxzt.cn",
    base3: "https://38fo28gk.gybye.cn",
    base4: "https://hosobw29.ewxsg.cn",
    base5: "https://hosobw29.jjxzt.cn",
    base6: "https://hosobw29.gybye.cn",
    base7: "https://hosobw29.gybye.cn",
}


export let configAppId = "1147"


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


export const MyAppName = '超会盈游戏';

export const versionHotFix = 'chy_3_6';

export const safeguardDomain = [
    'https://721327bfc0e276a871561a42ac89a490.oss-cn-shenzhen.aliyuncs.com',
    'https://721327bfc0e276a871561a42ac89a490.s3-accelerate.amazonaws.com']


export const platInfo = {
    loginDomain:"https://38fo28gk.ewxsg.cn",
    gameDomain:"https://yw8txj2e.shpeisheng1.cn",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/chycp"
    },
    platId: configAppId,

    channel: {
        c_1: {
            jpushKey: "",
            jpush_channel: "",
            umengKey: "5c80d8883fc195f177000916",
            umengChanel:"1",
            flurry_ios:"",
            flurry_android:""
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
    },
    android: {
    }
};