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
        if (AppData.IS_NATIVE_APP) {
            var httpData = { hashUrl: hashUrl, caller: caller, callback: callback };
            NetManager.httpRequestList.push(httpData);
            PostMHelp.game_Http({ url: url, header: header, data: data, metod: metod, restype: restype, hashUrl: hashUrl });
        }
        else {
            var hr = new Laya.HttpRequest();
            hr.once(Laya.Event.PROGRESS, this, this.HttpRequestProgress, [caller, callback, hr]);
            hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete, [caller, callback, hr]);
            hr.once(Laya.Event.ERROR, this, this.HttpRequestError, [caller, callback, hr]);
            if (header) {
                hr.send(url, data, metod, restype, header);
            }
            else {
                hr.send(url, null, metod, restype);
            }
        }
    };
    NetManager.prototype.HttpRequestProgress = function (caller, callback, hr, e) {
        //...
    };
    NetManager.prototype.HttpRequestComplete = function (caller, callback, hr, e) {
        callback.apply(caller, [e, 'complete', hr]);
    };
    NetManager.prototype.HttpRequestError = function (caller, callback, hr, e) {
        if (hr.http.status == 204) {
            callback.apply(caller, [e, 'complete', hr]);
        }
        else {
            callback.apply(caller, [e, 'error', hr]);
        }
    };
    // public hr:Laya.HttpRequest;
    NetManager.obj = null;
    NetManager.httpRequestList = [];
    return NetManager;
}());
//# sourceMappingURL=NetManager.js.map