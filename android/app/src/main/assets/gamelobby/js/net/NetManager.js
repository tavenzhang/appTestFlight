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
        var hr = new Laya.HttpRequest();
        hr.once(Laya.Event.PROGRESS, this, this.HttpRequestProgress, [caller, callback, hr]);
        hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete, [caller, callback, hr]);
        hr.once(Laya.Event.ERROR, this, this.HttpRequestError, [caller, callback, hr]);
        var url = urls;
        if (url == null) {
            url = urls;
        }
        // var headers = ["Content-Type","application/json; charset=utf-8","Accept","sean"];
        /*
        this.hr.send(
            url,
            "key="+key+"&count="+count,
            'post', 'json',headers);
        */
        Debug.trace("http-------->" + url + "\n---data===", data);
        if (header) {
            hr.send(url, data, //null
            metod, //'get'
            restype, //'json',
            header);
        }
        else {
            hr.send(url, null, 'get', 'json');
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
        callback.apply(caller, [e, 'progress', hr]);
    };
    NetManager.prototype.HttpRequestComplete = function (caller, callback, hr, e) {
        // if( Common.confObj.debugmode == 1 )
        // {
        // 	Debug.trace("onHttpRequestComplete");
        // 	Debug.trace(e);
        // Debug.trace(caller);
        // Debug.trace(callback);
        // }
        Debug.trace("http<----------" + e);
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
        Debug.trace("http<--------error==\n" + e);
        callback.apply(caller, [e, 'error', hr]);
    };
    // public hr:Laya.HttpRequest;
    NetManager.obj = null;
    return NetManager;
}());
//# sourceMappingURL=NetManager.js.map