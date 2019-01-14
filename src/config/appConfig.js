import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://www.0579jiapeiwang.com',
    base2: 'https://www.yurewd456qwep.com',
    base3: 'https://www.mkjow321qwup.com',
    base4: 'https://www.qzxsaq987dwqd.com',
    base5: 'https://www.ghyrfd123eqqd.com',
    base6: 'https://www.qwedsa789qszd.com',
    base7: 'https://www.vdfrtw654qefhj.com',
}

export let configAppId = "24"


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


export const MyAppName = '365游戏';


export const versionHotFix = '365_1_14';

export const safeguardDomain = [
    'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
    'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


export const platInfo = {
    gameDomain: "http://webplatform.psxiaohe.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "https://download.hkbaoxian188.com/game/365"
    },

    plat: {
        platId: configAppId,
        channel_1: {channel: "1", jpushKey: "", jpush_channel: "", umengKey: ""},
        channel_2: {channel: "2", jpushKey: "", umengKey: ""},
        channel_3: {channel: "3", jpushKey: "", umengKey: ""},
    }

}