import React, {
    Platform
} from 'react-native';


export const appDomainBase = {
    base1: 'https://yw8txj2e.shpeisheng1.cn',
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

export const versionHotFix = 'v6.1';


//第三方安全域名base64 key
export const safeguardKey = 'eyJkIjogWydodHRwczovL2NlYTRlY2E2NTBkNzFiZDlkNTUyYjRjZjM4ZTA1NzAyLm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20nLAogICAgJ2h0dHBzOi8vY2VhNGVjYTY1MGQ3MWJkOWQ1NTJiNGNmMzhlMDU3MDIuczMtYWNjZWxlcmF0ZS5hbWF6b25hd3MuY29tJywKICAgICdodHRwczovL2NlYTRlY2E2NTBkNzFiZDlkNTUyYjRjZjM4ZTA1NzAyLmF6dXJlZWRnZS5uZXQnXX0='


export const platInfo = {

    downDomain:"https://download.jinkuangjia.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/chyqp",
    },
    latestNativeVersion:{ios:"2.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
    platId: configAppId,
    brand: "chyqp",
}

export const affCodeList = {
    ios: {
    },
    android: {
    }
};

