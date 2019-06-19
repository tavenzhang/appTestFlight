import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'http://sit.106games.com',
    base2: 'http://sit.106games.com',
    base3: 'http://sit.106games.com',
    base4: 'http://sit.106games.com',
    base5: 'http://sit.106games.com',
    base6: 'http://sit.106games.com',
    base7: 'http://sit.106games.com',
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


export const MyAppName = '博博乐sit';

export const versionHotFix = 'v6.11';

export const MyOwnerPlatName= 'sit';

// export const safeguardDomain = [
//     'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
//     'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']
//第三方安全域名base64 key
export const safeguardKey = 'eyJkIjogWyJodHRwczovLzk4NzY0NWJhMDBhOWIwNDE2YjI1NGYzM2Q5MThlZDY0Lm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20iLCAiaHR0cHM6Ly9jNDBiNmUzZDY2NDU1NmFiNDIzZDNlZWJjMDFhYjJmZC5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIl19'


export const platInfo = {
    //loginDomain:"https://0365cai.cc",http://192.168.1.93:8091
    loginDomain: "http://sit.106games.com",
    //  gameDomain:"https://dk3nuq7v.zhdisi.com",
    gameDomain: "http://sit.106games.com",

    downDomain:"https://download.jinkuangjia.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/sit"
    },
    platId: configAppId,
    brand: "106",
    latestNativeVersion:{ios:"5.0",android:"5.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载

}



