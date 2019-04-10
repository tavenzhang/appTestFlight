var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var QuickLogin = /** @class */ (function (_super) {
    __extends(QuickLogin, _super);
    function QuickLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickLogin.getObj = function () {
        return QuickLogin.obj;
    };
    QuickLogin.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!QuickLogin.obj) {
            var o = new QuickLogin(node, conf);
            o.caller = caller;
            o.callback = callback;
            node.addChild(o);
        }
    };
    QuickLogin.prototype.destroy = function (b) {
        QuickLogin.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    QuickLogin.prototype.init = function (conf) {
        QuickLogin.obj = this;
        _super.prototype.init.call(this, conf);
        this.initContent();
        this.quick_username = SaveManager.getObj().get(SaveManager.KEY_QK_USERNAME, "");
        this.quick_pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "");
        // Debug.trace("QuickLogin.init username:"+this.quick_username+" pwd:"+this.quick_pwd);
        if (this.quick_username.length <= 0) {
            this.requestPreQuickLogin();
        }
        else {
            this.getInputByData("username").text = this.quick_username;
            this.getInputByData("yanzhengma").text = "";
        }
    };
    QuickLogin.prototype.initContent = function () {
        if (this.conf.sprites) {
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                Tools.addSprite(this, spconf);
            }
        }
        if (this.conf.menus) {
            var blen = this.conf.menus.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.menus[a];
                var b = new MyButton();
                b.init(btnconf, this, this.onClickBtn);
                b.setQuery(btnconf.cmd);
                this.addChild(b);
                this.arr_btns.push(b);
            }
        }
        // Debug.trace("QuickLogin.initContent inputs:");
        // Debug.trace(this.conf.inputs);
        if (this.conf.inputs) {
            var blen = this.conf.inputs.length;
            // Debug.trace("QuickLogin.initContent blen:"+blen);
            this.arr_inputs = new Array();
            for (var a = 0; a < blen; a++) {
                var cf = this.conf.inputs[a];
                var c = Tools.addMyTextInput(this, cf);
                c.setDataName(cf.data);
                this.arr_inputs.push(c);
            }
        }
        if (this.conf.yzm) {
            this.yzmObj = new YZM();
            this.yzmObj.init(this, ConfObjRead.getConfYZM());
            this.addChild(this.yzmObj);
            // Debug.trace(this.yzmObj);
        }
        // Debug.trace(this);
    };
    QuickLogin.prototype.getInputByData = function (key) {
        var len = this.arr_inputs.length;
        for (var i = 0; i < len; i++) {
            var mt = this.arr_inputs[i];
            if (mt.dataName == key) {
                return mt;
            }
        }
        return null;
    };
    QuickLogin.prototype.lostFocusInputText = function () {
        this.getInputByData("yanzhengma").setFocus(false);
        this.getInputByData("username").setFocus(false);
    };
    QuickLogin.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "login":
                try {
                    var tYzm = this.getInputByData("yanzhengma").text;
                    var verify = Tools.verifyQuickLogin(tYzm);
                    if (!verify.bRight) {
                        Toast.showToast(Tools.getStringByKey(verify.msg));
                        this.yzmObj.refresh();
                        return;
                    }
                    // if( tYzm.length <= 0 )
                    // {
                    //     Toast.showToast("请正确输入验证码");
                    //     return;
                    // }
                    // Debug.trace(this);
                    // Debug.trace(this.yzmObj);
                    this.requestLogin(this.quick_username, this.quick_pwd, tYzm, this.yzmObj.getRandomRoot());
                }
                catch (e) { }
                break;
            case "other":
                if (this.callback && this.caller) {
                    this.callback.apply(this.caller, [cmd]);
                }
                break;
            case "camera":
                PostMHelp.game_common({ name: "saveToPhohe" });
                break;
        }
    };
    QuickLogin.prototype.requestPreQuickLogin = function () {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.prequicklogin;
        LayaMain.getInstance().showCircleLoading(true);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        NetManager.getObj().HttpConnect(url, this, this.responsePreQuickLogin, header, null, "POST", "JSON");
    };
    QuickLogin.prototype.responsePreQuickLogin = function (s, stat, hr) {
        Debug.trace("responsePreQuickLogin Suc stat:" + stat);
        Debug.trace(s);
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            var jobj;
            try {
                jobj = JSON.parse(s);
            }
            catch (e) {
                Debug.trace(e);
                jobj = s;
            }
            try {
                this.quick_username = jobj.username;
                this.quick_pwd = jobj.password;
                this.getInputByData("username").text = this.quick_username;
                this.getInputByData("yanzhengma").text = "";
            }
            catch (e) { }
        }
        else {
            var err = hr.http.response;
            if (err) {
                var obj = JSON.parse(err);
                Toast.showToast(obj.message);
            }
            else {
                Toast.showToast(Tools.getStringByKey(ConfObjRead.getConfCommon().unknow_err)); //"未知错误，请联系管理员");
            }
        }
    };
    QuickLogin.prototype.requestLogin = function (name, pwd, yzm, yzmRoot) {
        Debug.trace("QuickLogin.requestLogin name:" + name + " pwd:" + pwd + " yzm:" + yzm);
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.quicklogin;
        LayaMain.getInstance().showCircleLoading(true);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "device_token", MyUid.getUid()];
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        // Debug.trace("QuickLogin.requestLogin ePwd:"+ePwd);
        // Debug.trace(this);
        // Debug.trace(this.yzmObj);
        var swebUniqueCode = yzmRoot; //this.yzmObj.getRandomRoot();//.yanzhengma_root;
        // Debug.trace("QuickLogin.requestLogin swebUniqueCode:"+swebUniqueCode);
        var data = {
            username: name,
            password: ePwd,
            validateCode: yzm,
            webUniqueCode: swebUniqueCode
        };
        var jd = JSON.stringify(data);
        Debug.trace("QuickLogin.requestLogin jd:");
        Debug.trace(jd);
        /*
        {"username":"4qiq98cp497","password":"NTllZWI4MDMzM2RiOGU4YmYwNGEwYmY3NWZkMjE0Mzk0ZmVjZmMyNDMwODVkZDhmY2Y3MjkyZTgwNTU3ZTFmOGQ0YjdmZWIyYTg4YzkwNWZhYTBjODVkYjc3NWE5YWNiN2Y5N2QyZTYzMGJlMGFkM2JjNWM2ZWI3M2FhNmFhZWFhMWZlNzFhMWU5OWZhZWE2YmFkMDdiYjcwNWYwZGVmNzU2ODY1M2IwNTlkYWJjMTIxZTc1ZjE1ODUyYjJhMDJkODE2N2ZiMTI3ODllNThjZjQwOTI2YTFiNzdlYTg4MDlhZjZkZDM5ZWQzYTliMTU5ZjU5ZDY2NGYwMDA2YTVmMA==","validateCode":"156182","webUniqueCode":"0.5893284448232594"}
        */
        NetManager.getObj().HttpConnect(url, this, this.responseLogin, header, jd, "POST", "JSON");
    };
    QuickLogin.prototype.responseLogin = function (s, stat, hr) {
        Debug.trace("responseLogin Suc stat:" + stat);
        Debug.trace(s);
        /*
        {
            "username":"4qiq98cp497",
            "lastSignInIp":"192.168.11.109","oauthRole":"AGENT","balance":0.0,"prizeGroup":1950,"sessionId":"fe6886f334873ab4f2b97c83","minMemberPrizeGroup":1901,
            "strongPwd":true,
            "loginCheckInfo":{"success":true},
            "oauthToken":{
                "access_token":"085af771-1914-4642-b6b9-a11e6a825887",
                "token_type":"bearer","refresh_token":"879076d0-28a6-44ad-9da5-e3588332f899","expires_in":259199,"scope":"ui"}}
        */
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            var jobj;
            try {
                jobj = JSON.parse(s);
            }
            catch (e) {
                Debug.trace(e);
                jobj = s;
            }
            try {
                Common.loginInfo = jobj;
                Common.loginType = Common.TYPE_LOGIN_QK;
                Common.access_token = jobj.oauthToken.access_token;
                SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
                PostMHelp.tokenChange({ "payload": Common.access_token });
                SaveManager.getObj().save(SaveManager.KEY_QK_USERNAME, this.quick_username);
                SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, this.quick_pwd);
                SaveManager.getObj().save(SaveManager.KEY_LOGIN_TYPE, Common.loginType);
                SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                // if( jobj.strongPwd )
                // {
                LayaMain.getInstance().initLobby();
                // }else{
                // ChangePwd.showPad(LoginScene.getObj(),ConfObjRead.getConfChangePwd(),this,this.cancelChangePwd);
                // ChangePwd.getObj().setSucListener(this,this.changePwdSuc);
                // }
            }
            catch (e) {
                Debug.trace(e);
            }
        }
        else {
            var err = hr.http.response;
            if (err) {
                var obj = JSON.parse(err);
                Toast.showToast(obj.message);
            }
            else {
                Toast.showToast(Tools.getStringByKey(ConfObjRead.getConfCommon().unknow_err)); //"未知错误，请联系管理员");
            }
            this.yzmObj.refresh();
        }
    };
    return QuickLogin;
}(AgentComBase));
//# sourceMappingURL=QuickLogin.js.map