import React, {
    Platform
} from 'react-native';


export const appDomainBase = {
    base1: 'https://38fo28gk.ewxsg.cn',
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


export const MyAppName = '超会赢棋牌';
export const MyOwnerPlatName= '超会赢棋牌';

export const versionHotFix = 'v7.18';


//第三方安全域名base64 key
export const safeguardKey = 'ewoJImQiOiBbImh0dHBzOi8vY2VhNGVjYTY1MGQ3MWJkOWQ1NTJiNGNmMzhlMDU3MDIub3NzLWNuLXNoZW56aGVuLmFsaXl1bmNzLmNvbSIsCgkJImh0dHBzOi8vY2VhNGVjYTY1MGQ3MWJkOWQ1NTJiNGNmMzhlMDU3MDIuczMtYWNjZWxlcmF0ZS5hbWF6b25hd3MuY29tIiwKCQkiaHR0cHM6Ly9jZWE0ZWNhNjUwZDcxYmQ5ZDU1MmI0Y2YzOGUwNTcwMi5henVyZWVkZ2UubmV0IgoJXQp9'


export const platInfo = {

    downDomain:"https://download.jinkuangjia.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/chyqp",
    },
    latestNativeVersion:{ios:"6.0",android:"6.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
    platId: configAppId,
    brand: "uat01",
    latestNativeVersion:{ios:"8.0",android:"8.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}


