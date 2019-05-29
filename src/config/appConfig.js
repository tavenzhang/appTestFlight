import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://jasf3r188qp.celue20.com',
    base2: 'https://4fjdhw188qp.celue20.com',
    base3: 'https://olmr3n188qp.celue20.com',
    base4: 'https://6shwoa188qp.celue20.com',
    base5: 'https://jasf3r188qp.costackup.com',
    base6: 'https://4fjdhw188qp.costackup.com',
    base7: 'https://jasf3r188qp.lakenkyra.com',
}


export let configAppId = "300002"


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


export const MyAppName = '188棋牌';

export const versionHotFix = '5.23';

export const MyOwnerPlatName= '188棋牌';

export const safeguardDomain = [
    'https://7aa58ab0e2988abc6384e8957b567a4c.oss-cn-shenzhen.aliyuncs.com',
    'https://7aa58ab0e2988abc6384e8957b567a4c.s3-accelerate.amazonaws.com',
    'https://7aa58ab0e2988abc6384e8957b567a4c.azureedge.net']


export const platInfo = {

    downDomain:"https://download.emkeic.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/188qp"
    },
    platId: configAppId,
    brand: "188qp",
    latestNativeVersion:{ios:"2.0",android:"2.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}



