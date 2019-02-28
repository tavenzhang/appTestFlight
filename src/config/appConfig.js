import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://6ykufu5x.xuhuicaifu.com',
    base2: 'https://7gz24qk6.xuhuicaifu.com',
    base3: 'https://3gxwm2qg.xuhuicaifu.com',
    base4: 'https://6ykufu5x.xuhuicaifu.com',
    base5: 'https://7gz24qk6.xuhuicaifu.com',
    base6: 'https://3gxwm2qg.xuhuicaifu.com',
    base7: 'https://6ykufu5x.xuhuicaifu.com',
}


export let configAppId = "2"


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


export const MyAppName = '梦想游戏';

export const versionHotFix = 'mxcp_1_14';

export const safeguardDomain = [
    'https://721327bfc0e276a871561a42ac89a490.oss-cn-shenzhen.aliyuncs.com',
    'https://721327bfc0e276a871561a42ac89a490.s3-accelerate.amazonaws.com']


export const platInfo = {
    loginDomain:"https://5530cp.net",
    //gameDomain: "https://dk3nuq7v.zhdisi.com",
    gameDomain:"https://ax7eykmk.syglhfsp.com",
    // gameDomain: "https://0365cai.cc",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/release/mxcp"
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
    },
    android: {
    }
};