/**
 * Created by Sam on 17/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import _ from 'lodash';
import {config, appId} from '../Network/TCRequestConfig';
import JXHelper from './JXHelper';
import userStore from '../../Data/UserData'

let instance = null;

export default class MyComponent {
    constructor() {
        if (!instance) {
            instance = this;
            this.log = {};
        }
        return instance;
    }

    addRequestLog(path, timeout) {
        this.log = {path: TCDefaultDomain + '/' + path, timeout: timeout, id: appId, username: userStore.userName};
        this.upload();
    }

    upload() {
        this.fetchAsync(this.log);
    }

    async fetchAsync(params) {
        let url = JXHelper.getotherSettings().apiAnalysis;
        // url = 'https:  log.fengxianxinxigang.com/api'; //error url
        if (!url) return
        if (!JXHelper.regularTestUrl(url)) {
            return;
        }
        let map = _.assignIn(config.map, {
            body: JSON.stringify(params)
        });
        try {

            let response = await fetch(url, map);
            if (response.status >= 200) {
                TW_Log('上传成功');
            }
        } catch (e) {
        }
    }
}
