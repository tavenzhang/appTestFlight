import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://1fbbzf911qp.sznxd.com',
    base2: 'https://jmar2u911qp.sznxd.com',
    base3: 'https://hr5umv911qp.sznxd.com',
    base4: 'https://4djmkh911qp.sznxd.com',
    base5: 'https://1fbbzf911qp.uicbio.com"',
    base6: 'https://jmar2u911qp.uicbio.com',
    base7: 'https://1fbbzf911qp.jnshtc.com',
}


export let configAppId = "300122"


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


export const MyAppName = '911棋牌';

export const versionHotFix = 'v6.22';

export const MyOwnerPlatName= '911棋牌';

// export const safeguardDomain = [
//     'https://092123c5518f263f7442d3c31dc08d74.oss-cn-shenzhen.aliyuncs.com',
//     'https://092123c5518f263f7442d3c31dc08d74.s3-accelerate.amazonaws.com',
//     'https://092123c5518f263f7442d3c31dc08d74.azureedge.net']

//第三方安全域名base64 key
export const safeguardKey = 'ewogICAgImQiOlsKICAgICAgICAiaHR0cHM6Ly8zODU3YTRiZTU5YTJhNGQwNzM5NzM0YmRhNmY2NGQ1YS5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIiwKICAgICAgICAiaHR0cHM6Ly8zODU3YTRiZTU5YTJhNGQwNzM5NzM0YmRhNmY2NGQ1YS5zMy1hY2NlbGVyYXRlLmFtYXpvbmF3cy5jb20iLAogICAgICAgICJodHRwczovLzM4NTdhNGJlNTlhMmE0ZDA3Mzk3MzRiZGE2ZjY0ZDVhLmF6dXJlZWRnZS5uZXQiCiAgICBdCn0='


export const platInfo = {

    downDomain:"download.jiahestone.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/911qp"
    },
    platId: configAppId,
    brand: "911qp",
    latestNativeVersion:{ios:"4.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}



