import React, {
    Component,
} from 'react'
import {config, baseUrl} from './TCRequestConfig';
import queryString from 'query-string';
import _ from 'lodash';
import Toast from '../../Common/JXHelper/JXToast';
import initAppStore from '../../Data/store/AppInfoStore'


const defaultTimeout = 10000;
import Moment from 'moment';
import NavigationService from "../../Page/Route/NavigationService";


export default class NetUitls extends Component {
    /**
     *url :请求地址
     *params:参数(Json对象)
     *callback:回调函数
     */
    static getUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization,loadingState,isWebHttp=false) {
        this.getUrlAndParamsAndPlatformAndCallback(url, params, null, callback, timeout, dontAddHeadersAuthorization,loadingState,isWebHttp)
    }

    /**
     * 获取平台相关数据
     * @param url
     * @param params
     * @param callback
     * @param timeout
     * @param dontAddHeadersAuthorization
     */
    static getUrlAndParamsAndPlatformAndCallback(url, params, platform, callback, timeout, dontAddHeadersAuthorization,loadingState,isWebHttp=false) {
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
        config.mapGet.headers.gamePlatform = platform ? platform : '';
        this.fetchAsync(url, config.mapGet, callback, dontAddHeadersAuthorization,loadingState,isWebHttp)
    }

    static PostUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization, dontStringfyBody,loadingState,isWebHttp=false) {
        url = this.getServerUrl(url)

        TW_Log(JSON.stringify(config.map))
        let map = _.assignIn(config.map, {
            body: dontStringfyBody ? params : JSON.stringify(params),
        });
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }

        this.fetchAsync(url, map, callback, dontAddHeadersAuthorization,loadingState,isWebHttp)
    }

    static postUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization, dontStringfyBody,loadingState,isWebHttp=false) {
        url = this.getServerUrl(url)

        TW_Log(JSON.stringify(config.map))
        let map = _.assignIn(config.map, {
            body: dontStringfyBody ? params : JSON.stringify(params),
        });
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }

        this.fetchAsync(url, map, callback, dontAddHeadersAuthorization,loadingState,isWebHttp)
    }

    static putUrlAndParamsAndCallback(url, params, callback, timeout, loadingState, isWebHttp=false) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapPut, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback,false,loadingState,isWebHttp)
    }


    /**
     * put请求
     * @param url 请求地址
     * @param platform 平台
     * @param params 请求参数
     * @param callback 请求回调
     * @param timeout 超时设置
     */
    static putUrlAndParamsAndAndPlatformAndCallback(url, platform, params, callback, timeout,loadingState,isWebHttp=false) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapPut, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        map.headers.gamePlatform = platform ? platform : '';
        this.fetchAsync(url, map, callback,loadingState,isWebHttp)
    }

    static DeleteUrlAndParamsAndCallback(url, params, callback, timeout,loadingState,isWebHttp=false) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapDelete, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback,loadingState,isWebHttp)
    }

    static deleteUrlAndParamsAndCallback(url, params, callback, timeout,loadingState,isWebHttp=false) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapDelete, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        } else {
            map.timeout = defaultTimeout
        }
        this.fetchAsync(url, map, callback,loadingState,isWebHttp)
    }

    static DeleteHttpUrlAndParamsAndCallback(url, params, callback, timeout,loadingState,isWebHttp=false) {
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
        this.fetchAsync(url, config.mapDelete, callback,loadingState,isWebHttp)
    }

    static deleteHttpUrlAndParamsAndCallback(url, params, callback, timeout,loadingState,isWebHttp=false) {
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
        this.fetchAsync(url, config.mapDelete, callback,loadingState,isWebHttp)
    }

    //loadingState = {isModal: false, overStyle: {}, style: {}, margeTop: 0}
    static async fetchAsync(url, map, callback, dontAddHeadersAuthorization,loadingState,isWebHttp=false) {
        if (!dontAddHeadersAuthorization) {
            map = addHeadersAuthorization(map,isWebHttp)
        } else {
            delete map.headers.Authorization
        }
        // if (initAppStore.deviceToken.length) {
        //     map.headers.device_token = initAppStore.deviceToken;
        // }
        //记录请求开始时间
        let startTime = Moment();
      //  TW_Log('http------------------------->' , {url,map})
        let response = {}
        try {
            //如果需要全局 londing 提示 进行显示 通过 loadingState 可以设置具体样式
            // if(loadingState!=null){
            //     rootStore.commonBoxStore.showSpinWithState(loadingState)
            // }
            response = await fetch(url, map)
        } catch (e) {

        } finally {
            if(loadingState!=null){
               // rootStore.commonBoxStore.hideSpin()
            }
            // TW_Log('response:', response.headers.map.date)
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
                    result = {"rs": true, duration: duration,"message": response.message}
                } else {
                    result = {
                        "content": responseJson,
                        "rs": true,
                        duration: duration,
                        serverDate: response.headers.map.date,
                        "message": response.message
                    }
                }
            } else if (response.status >= 400) {
                if (response.status === 401) {
                   // userStore.isLogin = false
                    result = {"rs": false, "error": '无效token', "status": response.status, duration: duration, "message": response.message}
                    if(TW_Store.userStore.isLogin){
                        Toast.showShortCenter('登录状态过期，请重新登录！')
                    }
                    //NavigationService.tokenIsError();
                    result.rs = false;
                    callback(result);
                } else if (response.status === 422) {
                    if (url.match(/refreshToken/)) {
                     //   userStore.isLogin = false
                        //NavigationService.tokenIsError();
                    } else {
                        result = _.assignIn(responseJson, {"rs": false, "status": response.status, duration: duration, "message": response.message});
                    }
                } else if (responseJson) {
                    TW_Log('responseJson:', JSON.stringify(responseJson))
                    result = _.assignIn(responseJson, {
                        "rs": false,
                        "status": response.status,
                        "massage": response.message,
                        duration: duration
                    })
                } else {
                    result = {"rs": false, "status": response.status, duration: duration,"message": response.message}
                }
            } else {
                result = {"rs": false, "status": response.status, "message": response.message, duration: duration}
            }
        }
        result.status = response.status;
        callback(result);
        TW_Log('\n\n*******   ' + map.method + '请求 url:\n' + url + '\nrequestMap = ' + JSON.stringify(map) + '\n\n*******   状态码:' + response.status + '  *******返回结果：  \n' + JSON.stringify(result) + '\n')
        if(!result.rs){

            let access_token =TW_GetQueryString("access_token",url);
            TW_Log("无效token====TW_Store.userStore.access_token=="+TW_Store.userStore.access_token,access_token);
            if(result.error&&result.error=="无效token"&&TW_Store.userStore.access_token!=""&&access_token==TW_Store.userStore.access_token){
                if(TW_OnValueJSHome){
                    Toast.showShortCenter('登录状态过期，请重新登录！');
                    TW_Store.userStore.exitAppToLoginPage();
                    TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.logout));
                    TW_Log("无效token====TW_Store.userStore.access_token==after"+TW_Store.userStore.access_token,result)
                }
            }
        }
    }

    static getServerUrl(url) {
        if (url && (_.startsWith(url, 'http://') || _.startsWith(url, 'https://'))) {
            return url
        }

        return TW_Store.appStore.currentDomain  + baseUrl.baseUrl + url
    }

    /**
     * 请求其他服务器数据
     * @param url
     * @param callback
     * @param timeout
     * @param header
     */
    static getOtherServerUrlAndCallback(url,timeout,header,callback){
        let map = config.mapGet
        if(header){
            map.headers = header
        }
        if(timeout>0){
            map.timeout = timeout
        }

        this.fetchAsync(url,map,callback)
    }
}

function addHeadersAuthorization(map,isWebHttp=false) {
    if(!isWebHttp){
        if (TW_Store.userStore.access_token && TW_Store.userStore.access_token!="") {
            map.headers.Authorization = 'bearer ' + TW_Store.userStore.access_token;
        }
        else {
            map.headers.Authorization = '';
        }
    }else{
        map.headers.Authorization = '';
    }
    return map
}

