/**
 * Created by Sam on 2017/1/14.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component,
    PropTypes,
} from 'react'
import {config, base, baseUrl} from './TCRequestConfig';
import queryString from 'query-string';
import _ from 'lodash';
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import Toast from '../../Common/JXHelper/JXToast';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import initAppStore from '../../Data/store/InitAppStore'
import userStore from '../../Data/store/UserStore'

const defaultTimeout = 10000;
import Moment from 'moment';
import NavigationService from "../../Page/Route/NavigationService";

export default class NetUitls extends Component {
    /**
     *url :请求地址
     *params:参数(Json对象)
     *callback:回调函数
     */
    static getUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization) {
        this.getUrlAndParamsAndPlatformAndCallback(url, params, null, callback, timeout, dontAddHeadersAuthorization)
    }

    /**
     * 获取平台相关数据
     * @param url
     * @param params
     * @param callback
     * @param timeout
     * @param dontAddHeadersAuthorization
     */
    static getUrlAndParamsAndPlatformAndCallback(url, params, platform, callback, timeout, dontAddHeadersAuthorization) {
        url = this.getServerUrl(url)
        if (typeof params === 'string') {
            url += '/' + params
        } else if (params) {
            url += '?' + queryString.stringify(params)
        }
        if (timeout > 0) {
            config.mapGet.timeout = timeout
        } else {
            config.mapGet.timeout = defaultTimeout
        }
        if (platform) {
            config.mapGet.headers.gamePlatform = platform;
        }
        this.fetchAsync(url, config.mapGet, callback, dontAddHeadersAuthorization)
    }

    static PostUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization, dontStringfyBody) {
        url = this.getServerUrl(url)

        JXLog(JSON.stringify(config.map))
        let map = _.assignIn(config.map, {
            body: dontStringfyBody ? params : JSON.stringify(params),
        });
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }

        this.fetchAsync(url, map, callback, dontAddHeadersAuthorization)
    }

    static postUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization, dontStringfyBody) {
        url = this.getServerUrl(url)

        JXLog(JSON.stringify(config.map))
        let map = _.assignIn(config.map, {
            body: dontStringfyBody ? params : JSON.stringify(params),
        });
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }

        this.fetchAsync(url, map, callback, dontAddHeadersAuthorization)
    }

    static PutUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapPut, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback)
    }

    static putUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapPut, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback)
    }

    /**
     * put请求
     * @param url 请求地址
     * @param platform 平台
     * @param params 请求参数
     * @param callback 请求回调
     * @param timeout 超时设置
     */
    static putUrlAndParamsAndAndPlatformAndCallback(url, platform, params, callback, timeout) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapPut, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        map.headers.gamePlatform = platform;
        this.fetchAsync(url, map, callback)
    }

    static DeleteUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapDelete, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback)
    }

    static deleteUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapDelete, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback)
    }

    static DeleteHttpUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        if (typeof params === 'string') {
            url += '/' + params
        } else if (params) {
            url += '?' + queryString.stringify(params)
        }
        if (timeout > 0) {
            config.mapDelete.timeout = timeout
        } else {
            config.mapDelete.timeout = defaultTimeout
        }
        this.fetchAsync(url, config.mapDelete, callback)
    }

    static deleteHttpUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        if (typeof params === 'string') {
            url += '/' + params
        } else if (params) {
            url += '?' + queryString.stringify(params)
        }
        if (timeout > 0) {
            config.mapDelete.timeout = timeout
        } else {
            config.mapDelete.timeout = defaultTimeout
        }
        this.fetchAsync(url, config.mapDelete, callback)
    }


    static async fetchAsync(url, map, callback, dontAddHeadersAuthorization) {
        // JXLog('URL:' + url)
        if (!dontAddHeadersAuthorization) {
            map = addHeadersAuthorization(map)
        } else {
            delete map.headers.Authorization
        }
        if (initAppStore.deviceToken.length) {
            map.headers.device_token = initAppStore.deviceToken;
        }

        //记录请求开始时间
        let startTime = Moment();

        let response = {}
        try {
            response = await fetch(url, map)
        } catch (e) {
            response = {}
        } finally {
            // JXLog('response:', response.headers.map.date)
        }

        // 计算请求响应时间
        let endTime = Moment();
        let duration = endTime.diff(startTime) / 1000;

        let responseJson = {}
        let result = {}
        try {
            responseJson = await response.json()
        } catch (e) {
            responseJson = null
        } finally {
            if (response.status >= 200 && response.status < 305) {
                if (response.status === 204) {
                    result = {"rs": true, duration: duration}
                } else {
                    result = {
                        "content": responseJson,
                        "rs": true,
                        duration: duration,
                        serverDate: response.headers.map.date
                    }
                }
            } else if (response.status >= 400) {
                if (response.status === 401) {
                    userStore.isLogin = false
                    result = {"rs": false, "error": '无效token', "status": response.status, duration: duration}
                    Toast.showShortCenter('登录状态过期，请重新登录！')
                    NavigationService.tokenIsError();
                    result.rs = false;
                    callback(result);
                } else if (response.status === 422) {
                    if (url.match(/refreshToken/)) {
                        userStore.isLogin = false
                        NavigationService.tokenIsError();
                    } else {
                        result = _.assignIn(responseJson, {"rs": false, "status": response.status, duration: duration})
                    }
                } else if (responseJson) {
                    JXLog('responseJson:', JSON.stringify(responseJson))
                    result = _.assignIn(responseJson, {
                        "rs": false,
                        "status": response.status,
                        "massage": response.massage,
                        duration: duration
                    })
                } else {
                    result = {"rs": false, "status": response.status, duration: duration}
                }
            } else {
                result = {"rs": false, "status": response.status, "massage": response.massage, duration: duration}
            }
        }
        JXLog('\n\n*******   ' + map.method + '请求 url:\n' + url + '\n' + '\nrequestMap = ' + JSON.stringify(map) + '\n\n*******   状态码:' + response.status + '  *******返回结果：  \n' + JSON.stringify(result) + '\n')
        callback(result)
    }

    static getServerUrl(url) {
        if (url && (_.startsWith(url, 'http://') || _.startsWith(url, 'https://'))) {
            return url
        }
        return TCDefaultDomain + baseUrl.baseUrl + url
        if (TCInitHelper.baseDomain) {
            url = TCInitHelper.baseDomain + baseUrl.baseUrl + url
        } else {
            // url = TCInitHelper.defaultBaseDomain + baseUrl.baseUrl + url
        }
        return url
    }
}

function addHeadersAuthorization(map) {
    if (userStore.access_token && userStore.isLogin) {
        map.headers.Authorization = 'bearer ' + userStore.access_token;
    }
    else {
        map.headers.Authorization = '';
    }

    return map
}

