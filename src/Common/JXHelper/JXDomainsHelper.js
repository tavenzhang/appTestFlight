/**
 * Created by Sam on 17/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import _ from 'lodash';
import { config } from '../Network/TCRequestConfig';
import { safeguardDomain } from '../../Page/resouce/appConfig';
import JXHelper from './JXHelper';
import {AsyncStorage} from "react-native";

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

    testDomainsHealth(d = TCServerDomains) {
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
                TCDefaultDomain = url;
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
            if (responseJson.status == 'UP') {
                back && back(url);
            }
        }
    }

    async fetchAsyncResponseJson(url, back) {
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
            if (back) {
                back(responseJson);
            }
        }
    }

    getSafeguardName(callBack) {
        if (!_.isEmpty(safeguardDomain)) {
            let alreadyCallBack=false
            for (let i = 0; i < safeguardDomain.length; i++) {
                let url = safeguardDomain[i];
                this.testSafeguarDomains(url,(succeed)=>{
                    if(!alreadyCallBack){
                        alreadyCallBack=true
                        callBack(succeed)
                    }
                })
            }
        }
    }

    testSafeguarDomains(url,callBack){
        url = url + '/d.json?temp=' + JXHelper.getRandomChars(true,5, 15)
        this.fetchAsyncResponseJson(url,(ads) =>{
            if(ads && ads.d && ads.d.length >0){
                this.testDomainsHealth(ads.d)
                AsyncStorage.setItem('cacheDomain', JSON.stringify({
                    serverDomains:ads.d
                }), (err) => {
                    if (!err) {// 缓存更新成功
                        if (callBack){
                            callBack(true)
                        }
                    } else {
                        //写入缓存失败
                        // callback(false)
                    }
                })
            }
        })
    }
}
