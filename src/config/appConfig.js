import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://btni8bzcqp.cdqqs.com',
    base2: 'https://6uucgazcqp.cdqqs.com',
    base3: 'https://ignq0hzcqp.cdqqs.com',
    base4: 'https://5qpogizcqp.cdqqs.com',
    base5: 'https://btni8bzcqp.bidsbr.com"',
    base6: 'https://6uucgazcqp.bidsbr.com',
    base7: 'https://btni8bzcqp.hiheye.com',
}


export let configAppId = "300075"


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


export const MyAppName = '招财棋牌';

export const versionHotFix = 'v6.1';

export const MyOwnerPlatName= '招财棋牌';

// export const safeguardDomain = [
//     'https://092123c5518f263f7442d3c31dc08d74.oss-cn-shenzhen.aliyuncs.com',
//     'https://092123c5518f263f7442d3c31dc08d74.s3-accelerate.amazonaws.com',
//     'https://092123c5518f263f7442d3c31dc08d74.azureedge.net']

//第三方安全域名base64 key
export const safeguardKey = 'ewogICAgImQiOlsKICAgICAgICAiaHR0cHM6Ly8wOTIxMjNjNTUxOGYyNjNmNzQ0MmQzYzMxZGMwOGQ3NC5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIiwKICAgICAgICAiaHR0cHM6Ly8wOTIxMjNjNTUxOGYyNjNmNzQ0MmQzYzMxZGMwOGQ3NC5zMy1hY2NlbGVyYXRlLmFtYXpvbmF3cy5jb20iLAogICAgICAgICJodHRwczovLzA5MjEyM2M1NTE4ZjI2M2Y3NDQyZDNjMzFkYzA4ZDc0LmF6dXJlZWRnZS5uZXQiCiAgICBdCn0='


export const platInfo = {

    downDomain:"https://download.emkeic.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/zcqp"
    },
    platId: configAppId,
    brand: "zcqp",
    latestNativeVersion:{ios:"2.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}



