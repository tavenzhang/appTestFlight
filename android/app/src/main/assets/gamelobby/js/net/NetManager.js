var NetManager = /** @class */ (function () {
    function NetManager() {
        NetManager.obj = this;
    }
    NetManager.getObj = function () {
        if (!NetManager.obj) {
            var a = new NetManager();
        }
        return NetManager.obj;
    };
    NetManager.prototype.HttpConnect = function (urls, caller, callback, header, data, metod, restype) {
        if (header === void 0) { header = null; }
        if (data === void 0) { data = null; }
        if (metod === void 0) { metod = "get"; }
        if (restype === void 0) { restype = "json"; }
        var url = urls ? urls : "";
        var hashUrl = url + "_" + JSON.stringify(header ? header : {}) + "_" + JSON.stringify(data ? data : {});
        for (var _i = 0, _a = NetManager.httpRequestList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item && item.hashUrl == hashUrl) {
                return;
            }
        }
        //app 使用本地app 代理请求 网页使用原来的
        if (Common.IS_NATIVE_APP) {
            var httpData = { hashUrl: hashUrl, caller: caller, callback: callback };
            NetManager.httpRequestList.push(httpData);
            PostMHelp.game_Http({ url: url, header: header, data: data, metod: metod, restype: restype, hashUrl: hashUrl });
        }
        else {
            var hr = new Laya.HttpRequest();
            hr.once(Laya.Event.PROGRESS, this, this.HttpRequestProgress, [caller, callback, hr]);
            hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete, [caller, callback, hr]);
            hr.once(Laya.Event.ERROR, this, this.HttpRequestError, [caller, callback, hr]);
            hr.http.timeout = 8000;
            var historyUrl = url + "_" + JSON.stringify(header ? header : {}) + "_" + JSON.stringify(data ? data : {});
            var isExist = NetManager.hisHashUrlList.indexOf(historyUrl) > -1;
            if (isExist) {
                Debug.trace("http-------->" + url + "\n---is--Exist repeate===", data);
            }
            else {
                Debug.trace("http-------->" + url + "\n---data===", data);
                NetManager.hisHashUrlList.push(historyUrl);
                if (header) {
                    hr.send(url, data, //null
                    metod, //'get'
                    restype, //'json',
                    header);
                }
                else {
                    hr.send(url, null, 'get', 'json');
                }
            }
        }
        // if( Common.confObj.debugmode == 1 )
        // {
        // 	Debug.trace('HttpConnect url:'+url);
        // }
    };
    NetManager.prototype.HttpRequestProgress = function (caller, callback, hr, e) {
        // if( Common.confObj.debugmode == 1 )
        // {
        // 	Debug.trace("onHttpRequestProgress");
        // 	Debug.trace(e);
        // }
        // Debug.trace(caller);
        // Debug.trace(callback);
        //callback.apply(caller,[e,'progress',hr]);
    };
    NetManager.prototype.HttpRequestComplete = function (caller, callback, hr, e) {
        // if( Common.confObj.debugmode == 1 )
        // {
        // 	Debug.trace("onHttpRequestComplete");
        // 	Debug.trace(e);
        // Debug.trace(caller);
        // Debug.trace(callback);
        // }
        var ret = {};
        if (hr.http) {
            ret["readyState"] = hr.http.readyState;
            ret["response"] = hr.http.response;
            ret["responseText"] = hr.http.responseText;
            ret["responseType"] = hr.http.responseType;
            ret["responseURL"] = hr.http.responseURL;
            ret["status"] = hr.http.status;
            ret["statusText"] = hr.http.statusText;
            ret["timeout"] = hr.http.timeout;
        }
        for (var j = 0, len = NetManager.httpRequestList.length; j < len; j++) {
            var item = NetManager.httpRequestList[j];
            if (item && item.indexOf(hr.http.responseURL) > -1) {
                NetManager.httpRequestList.splice(j, 1);
                break;
            }
        }
        Debug.trace("http<--------<====" + ret["responseURL"], ret);
        callback.apply(caller, [e, 'complete', hr]);
    };
    NetManager.prototype.HttpRequestError = function (caller, callback, hr, e) {
        // if( Common.confObj.debugmode == 1 )
        // {
        // 	Debug.trace("onHttpRequestError:");
        // Debug.trace(hr);
        // 	Debug.trace(e);
        // }
        // Debug.trace(caller);
        // Debug.trace(callback);
        var ret = {};
        if (hr.http) {
            ret["readyState"] = hr.http.readyState;
            ret["response"] = hr.http.response;
            ret["responseText"] = hr.http.responseText;
            ret["responseType"] = hr.http.responseType;
            ret["responseURL"] = hr.http.responseURL;
            ret["status"] = hr.http.status;
            ret["statusText"] = hr.http.statusText;
            ret["timeout"] = hr.http.timeout;
        }
        for (var j = 0, len = NetManager.httpRequestList.length; j < len; j++) {
            var item = NetManager.httpRequestList[j];
            if (item && item.indexOf(hr.http.responseURL) > -1) {
                NetManager.httpRequestList.splice(j, 1);
                break;
            }
        }
        Debug.trace("http<--------error<====" + ret["responseURL"], ret);
        callback.apply(caller, [e, 'error', hr]);
    };
    // public hr:Laya.HttpRequest;
    NetManager.obj = null;
    NetManager.httpRequestList = new Array();
    NetManager.hisHashUrlList = new Array();
    return NetManager;
}());
//# sourceMappingURL=NetManager.js.map