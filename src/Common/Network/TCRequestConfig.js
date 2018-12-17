import {
    configAppId,
    versionHotFix
} from '../../Page/resouce/appConfig';

export const appId = configAppId;

export const appVersion = '1.0.1';



export const baseUrl = {
    baseUrl: '/api/v1/'
};

let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': G_IS_IOS ? 'iphone' : 'android',
    ClientId: appId,
    AppVersion: appVersion,
    'Version-hotFix': versionHotFix
};

export const config = {
    api: {
        checkIpInfo: 'update/checkIpInfo', //热更新开关

        gameSetting: 'adminsettings/user/prizeSettings', //获取游戏设定

        getHome: 'cms/internal/mobile/'+configAppId+"/contents", //首页接口
    },
    map: {
        method: 'POST',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0
    },
    mapGet: {
        method: 'GET',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0
    },
    mapPut: {
        method: 'PUT',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0
    },
    mapDelete: {
        method: 'DELETE',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0
    }
};
