/**
 * Created by Sam on 17/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import _ from 'lodash';
import {config} from '../Network/TCRequestConfig';
import {safeguardKey} from '../../config/appConfig';
import JXHelper from './JXHelper';
import {AsyncStorage} from 'react-native';
import LayoutHelper from './LayoutHelper';
import Base64 from './Base64';

let base64 = new Base64();
let layoutHelper = new LayoutHelper()
let instance = null;

export default class MyComponent {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.testDone = false;
        return instance;
    }

    start() {
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.testDomainsHealth();
        }, 30000);
    }

    testDomainsHealth(d = TW_Store.appStore.currentDomain) {
        this.testDone = false;
        if (!_.isEmpty(d)) {
            for (let i = 0; i < d.length; i++) {
                let url = d[i];
                this.test(url);
            }
        }
    }

    test(url) {
        this.fetchAsync(url + '/health', ads => {
            if (!this.testDone) {
                this.testDone = true;
                TW_Store.appStore.currentDomain = url;
            }
        });
    }

    async fetchAsync(url, back) {
        if (!url) return;
        let map = config.mapGet;
        map.timeout = 6000;
        let response = await fetch(url, map);
        let responseJson = {};
        try {
            responseJson = await response.json();
        } catch (e) {
            responseJson = {};
        } finally {
            if (responseJson.status === 'UP') {
                back && back(url);
            }
        }
    }

    async fetchAsyncResponse(url, back) {
        if (!url) return;
        let map = config.mapGet;
        map.timeout = 6000;
        let response = await fetch(url, map);
        if (back) {
            back(response);
        }
    }

    getSafeguardName(callBack) {
        if (_.isEmpty(safeguardKey)) {
            return
        }
        let safeguardDomain = base64.decode(safeguardKey);
        safeguardDomain = JSON.parse(safeguardDomain);
        safeguardDomain = safeguardDomain.d;
        if (!_.isEmpty(safeguardDomain)) {
            let alreadyCallBack = false;
            for (let i = 0; i < safeguardDomain.length; i++) {
                let url = safeguardDomain[i];
                this.testSafeguarDomains(url, isSucceed => {
                    TW_Log("getSafeguardName---isSucceed=="+isSucceed+"--alreadyCallBack="+alreadyCallBack);
                    if (!alreadyCallBack) {
                        alreadyCallBack = true;
                        callBack(isSucceed);
                    }
                });
            }
        }
    }

    testSafeguarDomains(url, callBack) {
        url = url + '/q.png?temp=' + JXHelper.getRandomChars(true, 5, 15);
        let ret =this.checkURL(url);
        if(!this.checkURL(url)){
            return
        }
        this.fetchAsyncResponse(url, ads => {
            TW_Log("getSafeguardName---fetchAsyncResponse==url=="+url+"---ads==="+ads,ads);
            try {
                ads = this.decodeDomain(ads._bodyText);
            }
            catch (e) {
                if(callBack){
                    callBack(false);
                }
                TW_Log("getSafeguardName---fetchAsyncResponse==url=="+ret+"---ads=catch=="+ads,e);
            }

            TW_Log("getSafeguardName---fetchAsyncResponse==url=="+ret+"---ads=resutlt=="+ads);
            if (ads && ads.d && ads.d.length > 0) {
                this.testDomainsHealth(ads.d);
                AsyncStorage.setItem(
                    'cacheDomain',
                    JSON.stringify({
                        serverDomains: ads.d
                    }),
                    err => {
                        if (!err) {
                            // 缓存更新成功
                            if (callBack) {
                                callBack(true);
                            }
                        } else {
                            //写入缓存失败
                            // callback(false)
                        }
                    }
                );
            }
        });
    }

    decodeDomain(Q) {
        let h = layoutHelper.layoutHelper2(Q);
        let c = base64.decode(h);
        return JSON.parse(c);
    }

    checkURL(URL){
        let str=URL;
        let Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        let objExp=new RegExp(Expression);
        return objExp.test(str) === true;
    }
}
