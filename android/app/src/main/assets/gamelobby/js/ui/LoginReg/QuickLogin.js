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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.quick_username = "";
        _this.quick_pwd = "";
        return _this;
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
        this.requestPreQuickLogin();
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
    QuickLogin.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "login":
                try {
                    var tYzm = this.getInputByData("yanzhengma").text;
                    if (tYzm.length <= 0) {
                        Toast.showToast("请正确输入验证码");
                        return;
                    }
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
        // Debug.trace("responsePreQuickLogin Suc stat:"+stat);
        // Debug.trace(s);
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
                Toast.showToast("未知错误，请联系管理员");
            }
        }
    };
    QuickLogin.prototype.requestLogin = function (name, pwd, yzm, yzmRoot) {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.quicklogin;
        LayaMain.getInstance().showCircleLoading(true);
        // Debug.trace("QuickLogin.requestLogin name:"+name+" pwd:"+pwd+" yzm:"+yzm);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
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
        NetManager.getObj().HttpConnect(url, this, this.responseLogin, header, jd, "POST", "JSON");
    };
    QuickLogin.prototype.responseLogin = function (s, stat, hr) {
        Debug.trace("responseLogin Suc stat:" + stat);
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
                Common.loginInfo = jobj;
                Common.access_token = jobj.oauthToken.access_token;
                SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
                PostMHelp.tokenChange({ "payload": Common.access_token });
                if (jobj.strongPwd) {
                    LayaMain.getInstance().initLobby();
                }
                else {
                    // ChangePwd.showPad(LoginScene.getObj(),ConfObjRead.getConfChangePwd(),this,this.cancelChangePwd);
                    // ChangePwd.getObj().setSucListener(this,this.changePwdSuc);
                }
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
                Toast.showToast("未知错误，请联系管理员");
            }
            this.yzmObj.refresh();
        }
    };
    return QuickLogin;
}(AgentComBase));
//# sourceMappingURL=QuickLogin.js.map