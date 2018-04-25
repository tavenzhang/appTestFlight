/**
 * Created by Sam on 17/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import _ from 'lodash';
import { config } from '../Network/TCRequestConfig';

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

    testDomainsHealth() {
        this.testDone = false;
        if (!_.isEmpty(TCServerDomains)) {
            for (let i = 0; i < TCServerDomains.length; i++) {
                let url = TCServerDomains[i];
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
}
