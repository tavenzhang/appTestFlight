import {
    configAppId,
    versionHotFix
} from '../../config/appConfig';


export const appVersion = '1.0.1';



export const baseUrl = {
    baseUrl: '/api/v1/'
};

export let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': G_IS_IOS ? 'iphone' : 'android',
    ClientId: configAppId,
    AppVersion: appVersion,
    'Version-hotFix': versionHotFix
};

export const config = {

    map: {
        method: 'POST',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    },
    mapGet: {
        method: 'GET',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    },
    mapPut: {
        method: 'PUT',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    },
    mapDelete: {
        method: 'DELETE',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    }
};

export const UpDateHeadAppId =(newId)=> {
    headers.ClientId=newId;
    config.map.headers.ClientId=newId;
    config.mapGet.headers.ClientId=newId;
    config.mapPut.headers.ClientId=newId;
    config.mapDelete.headers.ClientId=newId;

};