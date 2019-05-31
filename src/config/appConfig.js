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
    ],
     checkUpdateDomains:[
        "https://www.ba2d16.com",
        "https://www.aa2d16.com",
        "https://www.ca2d16.com"
    ],
}


export const MyAppName = '博必胜棋牌';

export const MyOwnerPlatName= '博必胜棋牌';

export const versionHotFix = 'v6.1';

//第三方安全域名base64 key
export const safeguardKey = 'IHsiZCI6WyIiaHR0cHM6Ly9hMTE0ZjUzMmU3MDUwMjAyOTViODljNDBiOTAxZTEyNy5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIiwKICAgICJodHRwczovL2ExMTRmNTMyZTcwNTAyMDI5NWI4OWM0MGI5MDFlMTI3LnMzLWFjY2VsZXJhdGUuYW1hem9uYXdzLmNvbSIsCiAgICAiaHR0cHM6Ly9hMTE0ZjUzMmU3MDUwMjAyOTViODljNDBiOTAxZTEyNy5henVyZWVkZ2UubmV0Il19'




export const platInfo = {
    downDomain:"https://download.hkbaoxian188.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/bbsqp"
    },
    platId: configAppId,
    brand: "bbsqp",
    latestNativeVersion:{ios:"2.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}

export const affCodeList = {
    ios: {
        '2.9.6': 'bbsqp_ios'
    },
    android: {
        '2.10.11': 'bbsqp_android'
    }
};
