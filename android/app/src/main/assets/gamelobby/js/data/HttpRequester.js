/*
* 用于请求http数据
*/
var HttpRequester = /** @class */ (function () {
    function HttpRequester() {
    }
    /**
     * 网关初始化信息
     * @param caller
     * @param callback
     */
    HttpRequester.getGatewayInfo = function (caller, callback) {
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*",
            "device_token", GameUtils.deviceToken,
            "rid", MyUid.getUid(),
            "ts", Laya.Browser.now(),
            "s", "WAP"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.gatewayInfo;
        this.doRequest(url, header, null, caller, callback, "get");
    };
    /**
     * 通过token登录
     */
    HttpRequester.loginByToken = function (token, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.userinfobalance + "?access_token=" + token;
        this.doRequest(url, null, null, caller, callback, "get");
    };
    /**
     * 获取快捷登录用户名和密码信息
     * 用于首次登录本地无缓存的情况
     * @param caller
     * @param callback
     */
    HttpRequester.getFastUserInfo = function (caller, callback) {
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "device_token", GameUtils.deviceToken];
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.prequicklogin;
        this.doRequest(url, header, null, caller, callback, "post");
    };
    /**
     * 快速登录
     * @param userName 用户名
     * @param passWord 密码
     * @param caller 上下文
     * @param callback 回调函数
     */
    HttpRequester.fastLogin = function (userName, passWord, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (GameUtils.isNativeApp)
            url += ConfObjRead.getConfUrl().cmd.quicklogin_app;
        else
            url += ConfObjRead.getConfUrl().cmd.quicklogin;
        var header = this.getEncryHeader();
        var ePwd = window['SecretUtils'].rsaEncodePWD(passWord);
        var data = {
            username: userName,
            password: ePwd,
            affCode: AppData.NATIVE_DATA.affCode
        };
        var dataStr = JSON.stringify(data);
        this.doRequest(url, header, dataStr, caller, callback, "post");
    };
    /**
     * 快速登录之验证码登录
     * @param userName
     * @param passWord
     * @param code
     * @param random
     * @param caller
     * @param callback
     */
    HttpRequester.fastLoginWithVC = function (userName, passWord, code, random, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (GameUtils.isNativeApp)
            url += ConfObjRead.getConfUrl().cmd.quickloginWithVC_app;
        else
            url += ConfObjRead.getConfUrl().cmd.quickloginWithVC;
        var header = this.getEncryHeader();
        var ePwd = window['SecretUtils'].rsaEncodePWD(passWord);
        var data = {
            username: userName,
            password: ePwd,
            validateCode: code,
            webUniqueCode: random,
            affCode: AppData.NATIVE_DATA.affCode
        };
        var dataStr = JSON.stringify(data);
        this.doRequest(url, header, dataStr, caller, callback, "post");
    };
    /**
     * 账户登录
     * @param userName
     * @param passWord
     * @param caller
     * @param callback
     */
    HttpRequester.accountLogin = function (userName, passWord, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (GameUtils.isNativeApp)
            url += ConfObjRead.getConfUrl().cmd.userlogin_app;
        else
            url += ConfObjRead.getConfUrl().cmd.userlogin;
        var header = this.getEncryHeader();
        var ePwd = window['SecretUtils'].rsaEncodePWD(passWord);
        var data = {
            username: userName,
            password: ePwd
        };
        var dataStr = JSON.stringify(data);
        this.doRequest(url, header, dataStr, caller, callback, "post");
    };
    /**
     * 账户登录-带验证码
     * @param userName
     * @param passWord
     * @param code
     * @param random
     * @param caller
     * @param callback
     */
    HttpRequester.accountLoginWithVC = function (userName, passWord, code, random, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (GameUtils.isNativeApp)
            url += ConfObjRead.getConfUrl().cmd.userloginWithVC_app;
        else
            url += ConfObjRead.getConfUrl().cmd.userloginWithVC;
        var header = this.getEncryHeader();
        var ePwd = window['SecretUtils'].rsaEncodePWD(passWord);
        var data = {
            username: userName,
            password: ePwd,
            validateCode: code,
            webUniqueCode: random
        };
        var dataStr = JSON.stringify(data);
        this.doRequest(url, header, dataStr, caller, callback, "post");
    };
    /**
     * 注册账号
     * @param pwd
     * @param code
     * @param rand
     * @param caller
     * @param callback
     */
    HttpRequester.registerAccount = function (uname, pwd, code, rand, caller, callback) {
        var _this = this;
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        var data = {
            username: uname,
            password: ePwd,
            hash: '',
            validateCode: code,
            webUniqueCode: rand,
            affCode: AppData.NATIVE_DATA.affCode
        };
        window['SecretUtils'].encode(name, pwd, function (hash) {
            data.hash = hash;
            var jsonStr = JSON.stringify(data);
            var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.userreg;
            var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
            _this.doRequest(url, header, jsonStr, caller, callback);
        });
    };
    /**
     * 获取手机验证码
     * @param phone
     * @param isAuthor 是否已授权(未登录前为false)
     * @param type 验证码使用场景
     * @param caller
     * @param callback
     */
    HttpRequester.getPhoneVercode = function (phone, isAuthor, type, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (isAuthor) {
            url += ConfObjRead.getConfUrl().cmd.getAuthorVerCode;
            url += "?access_token=" + Common.access_token;
        }
        else
            url += ConfObjRead.getConfUrl().cmd.getunAuthorVerCode;
        var data = {
            phoneNumber: phone,
            smsMsgType: VerCodeType[type]
        };
        var jd = JSON.stringify(data);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        this.doRequest(url, header, jd, caller, callback);
    };
    /**
     * 手机登录
     * @param num
     * @param code
     * @param caller
     * @param callback
     */
    HttpRequester.phoneLogin = function (num, code, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (GameUtils.isNativeApp)
            url += ConfObjRead.getConfUrl().cmd.phoneLogin_app;
        else
            url += ConfObjRead.getConfUrl().cmd.phoneLogin_web;
        var header = this.getEncryHeader();
        var data = {
            affCode: AppData.NATIVE_DATA.affCode,
            phoneNumber: num,
            verificationCode: code
        };
        var jsonStr = JSON.stringify(data);
        this.doRequest(url, header, jsonStr, caller, callback);
    };
    /**
     * 修改密码(包括登录密码和取款密码)
     * @param pwd
     * @param newpwd
     * @param isSetLoginPwd 是否修改登录密码(否则修改取款密码)
     * @param caller
     * @param callback
     */
    HttpRequester.changePassword = function (pwd, newpwd, isSetLoginPwd, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.changePassword;
        url += "?access_token=" + Common.access_token;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
        var data = {
            isWep: !GameUtils.isNativeApp,
            mode: isSetLoginPwd ? "PASSWORD" : "SECURITY_PASSWORD",
            oldPassword: ePwd,
            newPassword: eNpwd
        };
        var jd = JSON.stringify(data);
        this.doRequest(url, header, jd, caller, callback);
    };
    /**
     * 通过手机短信验证修改密码(包括登录密码和取款密码)
     * @param newpwd
     * @param phone
     * @param code
     * @param setLoginPwd
     * @param caller
     * @param callback
     */
    HttpRequester.changePasswordWithPhone = function (newpwd, phone, code, setLoginPwd, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.changePwdWithPhone;
        url += "?access_token=" + Common.access_token;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
        var data = {
            isWep: !GameUtils.isNativeApp,
            mode: setLoginPwd ? "PASSWORD" : "SECURITY_PASSWORD",
            newPassword: eNpwd,
            phoneNumber: phone,
            verificationCode: code
        };
        var jd = JSON.stringify(data);
        this.doRequest(url, header, jd, caller, callback);
    };
    /**
     * 修改持卡人真实姓名
     * @param name
     * @param caller
     * @param callback
     */
    HttpRequester.setRealName = function (name, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.setCardRealName;
        url += "?realName=" + name;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "Authorization", "bearer " + Common.access_token];
        this.doRequest(url, header, null, caller, callback, "put");
    };
    /**
     * 通用get方式请求
     * @param caller
     * @param callback
     */
    HttpRequester.getHttpData = function (cmd, caller, callback, urlParams) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        url += "?access_token=" + Common.access_token;
        if (urlParams)
            url += urlParams;
        var header = ["Accept", "application/json"];
        this.doRequest(url, header, null, caller, callback, "get");
    };
    /**
     * 通用post方式请求
     */
    HttpRequester.postHttpData = function (cmd, data, caller, callback, addHeaderToken) {
        if (data === void 0) { data = null; }
        if (addHeaderToken === void 0) { addHeaderToken = true; }
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        url += "?access_token=" + Common.access_token;
        var jsonStr = null;
        if (data)
            jsonStr = JSON.stringify(data);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        if (addHeaderToken)
            header.push("Authorization", "bearer " + Common.access_token);
        this.doRequest(url, header, jsonStr, caller, callback, "post");
    };
    /**
     * 通用delete方式请求
     * @param cmd
     * @param caller
     * @param callback
     */
    HttpRequester.deleteHttpData = function (cmd, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        url += "?access_token=" + Common.access_token;
        var header = ["Accept", "application/json"];
        this.doRequest(url, header, null, caller, callback, "delete");
    };
    /**
     * 通用put方式请求
     * @param cmd
     * @param data
     * @param caller
     * @param callback
     */
    HttpRequester.putHttpData = function (cmd, data, caller, callback) {
        if (data === void 0) { data = null; }
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        url += "?access_token=" + Common.access_token;
        var jsonStr = null;
        if (data)
            jsonStr = JSON.stringify(data);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "Authorization", "bearer " + Common.access_token];
        this.doRequest(url, header, jsonStr, caller, callback, "put");
    };
    /**
     * 开始请求-后续统一走这里方面定位问题
     * @param url
     * @param header
     * @param jsonStr
     * @param caller
     * @param callback
     * @param method
     */
    HttpRequester.doRequest = function (url, header, jsonStr, caller, callback, method) {
        if (method === void 0) { method = "post"; }
        this.httpConnect(url, this, function (s, stat, hr) {
            var suc = false;
            var jobj;
            if (stat == "complete") {
                try {
                    jobj = JSON.parse(s);
                }
                catch (e) {
                    jobj = s;
                }
                suc = true;
            }
            else {
                var status_1 = hr.http.status;
                jobj = hr;
                if (status_1 >= 200 && status_1 < 300) { //后端认为此范围为成功
                    suc = true;
                }
                else {
                    Debug.output("request-err:", url, header, jsonStr, hr.http);
                    if (status_1 == 401) {
                        LayaMain.onQuit();
                        Toast.showToast("登录过期,请重新登录");
                        return;
                    }
                    var err = hr.http.response;
                    if (err) {
                        var obj = JSON.parse(err);
                        Toast.showToast(obj.message || "网络异常,请检查网络环境");
                    }
                    else {
                        var info = Tools.getStringByKey("txt_unknowerr");
                        Toast.showToast(info || "未知错误");
                    }
                }
            }
            if (caller && callback)
                callback.apply(caller, [suc, jobj]);
        }, header, jsonStr, method, "json");
    };
    /**
     * 开始请求
     * @param urls
     * @param caller
     * @param callback
     * @param header
     * @param data
     * @param metod
     * @param restype
     */
    HttpRequester.httpConnect = function (urls, caller, callback, header, data, metod, restype) {
        if (header === void 0) { header = null; }
        if (data === void 0) { data = null; }
        if (metod === void 0) { metod = "get"; }
        if (restype === void 0) { restype = "json"; }
        var url = urls ? urls : "";
        var hashUrl = url + "_" + JSON.stringify(header ? header : {}) + "_" + JSON.stringify(data ? data : {});
        for (var _i = 0, _a = this.httpRequestList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item && item.hashUrl == hashUrl) {
                return;
            }
        }
        //app 使用本地app 代理请求 网页使用原来的
        if (AppData.IS_NATIVE_APP) {
            var httpData = { hashUrl: hashUrl, caller: caller, callback: callback };
            this.httpRequestList.push(httpData);
            PostMHelp.game_Http({ url: url, header: header, data: data, metod: metod, restype: restype, hashUrl: hashUrl });
        }
        else {
            var hr = new Laya.HttpRequest();
            hr.once(Laya.Event.COMPLETE, this, this.httpRequestComplete, [caller, callback, hr]);
            hr.once(Laya.Event.ERROR, this, this.httpRequestError, [caller, callback, hr]);
            if (header) {
                hr.send(url, data, metod, restype, header);
            }
            else {
                hr.send(url, null, metod, restype);
            }
        }
    };
    HttpRequester.httpRequestComplete = function (caller, callback, hr, e) {
        callback.apply(caller, [e, 'complete', hr]);
    };
    HttpRequester.httpRequestError = function (caller, callback, hr, e) {
        if (hr.http.status == 204) {
            callback.apply(caller, [e, 'complete', hr]);
        }
        else {
            callback.apply(caller, [e, 'error', hr]);
        }
    };
    //获取加密相关的头部信息
    HttpRequester.getEncryHeader = function () {
        var tsValue = Laya.Browser.now() + Common.gatewayInfo.tsDiff;
        //按字典排序拼接数据
        var value = "device_token=" + GameUtils.deviceToken;
        value += "rid=" + MyUid.getUid();
        value += "s=" + "WAP";
        value += "ts=" + tsValue;
        var sign = value + Common.gatewayInfo.sid;
        if (window["_0x78550"]) {
            sign += window["_0x78550"]();
        }
        else {
            Toast.showToast("sec失效,请杀掉进程重启游戏");
        }
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*",
            "device_token", GameUtils.deviceToken,
            "rid", MyUid.getUid(),
            "ts", tsValue,
            "s", "WAP",
            "sign", sign
        ];
        return header;
    };
    HttpRequester.httpRequestList = [];
    return HttpRequester;
}());
//# sourceMappingURL=HttpRequester.js.map