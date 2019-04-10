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
var ChangePwd = /** @class */ (function (_super) {
    __extends(ChangePwd, _super);
    function ChangePwd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePwd.prototype.setSucListener = function (caller, callback) {
        this.sucCaller = caller;
        this.sucCallback = callback;
    };
    ChangePwd.prototype.init = function (node, conf) {
        // ChangePwd.obj = this;
        _super.prototype.init.call(this, node, conf);
        this.initContent();
    };
    ChangePwd.prototype.initContent = function () {
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
        if (this.conf.inputs) {
            var blen = this.conf.inputs.length;
            this.arr_inputs = new Array();
            for (var a = 0; a < blen; a++) {
                var cf = this.conf.inputs[a];
                var c = Tools.addMyTextInput(this, cf);
                c.setDataName(cf.data);
                this.arr_inputs.push(c);
            }
        }
        if (this.conf.switchmenus) {
            var blen = this.conf.switchmenus.length;
            this.arr_switchbtns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.switchmenus[a];
                var sb = new MySwitchBtn();
                sb.init(btnconf, this, this.onSwitchClick);
                sb.setQuery(btnconf.cmd);
                this.addChild(sb);
                sb.setOn(0);
                this.arr_switchbtns.push(sb);
            }
        }
    };
    ChangePwd.prototype.getInputByData = function (cmd) {
        for (var i = 0; i < this.arr_inputs.length; i++) {
            var a = this.arr_inputs[i];
            if (a.dataName == cmd) {
                return a;
            }
        }
        return null;
    };
    ChangePwd.prototype.showOrHidePwd = function (obj, n) {
        if (n == 1) {
            obj.type = "text";
        }
        else {
            obj.type = "password";
        }
        obj.focus = true;
    };
    ChangePwd.prototype.onSwitchClick = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        var inp = this.getInputByData(cmd);
        if (inp) {
            this.showOrHidePwd(inp, btn.isOn());
        }
    };
    ChangePwd.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        // Debug.trace("ChangePwd.onClickBtn cmd:"+cmd);
        switch (cmd) {
            case "ok":
                var pwd = this.getInputByData("oldpwd").text;
                var newpwd = this.getInputByData("newpwd").text;
                var confirmpwd = this.getInputByData("confirmpwd").text;
                var verify = Tools.verifyChangePw(pwd, newpwd, confirmpwd);
                if (!verify.bRight) {
                    Toast.showToast(Tools.getStringByKey(verify.msg));
                    return;
                }
                this.requestChange(pwd, newpwd, confirmpwd);
                break;
        }
    };
    ChangePwd.prototype.onClose = function (s, bcallback) {
        if (bcallback === void 0) { bcallback = true; }
        _super.prototype.onClose.call(this, s, bcallback);
        this.destroy(true);
    };
    ChangePwd.prototype.requestChange = function (pwds, newpwds, cfpwd) {
        try {
            var pwd = pwds; //this.getInputByData("oldpwd").text;
            var newpwd = newpwds; //this.getInputByData("newpwd").text;
            var confirmpwd = cfpwd; //this.getInputByData("confirmpwd").text;
            // if( pwd.length <= 0 || newpwd.length <= 0 || confirmpwd.length <= 0 )
            // {
            //     Toast.showToast("请正确输入各项内容");
            //     return;
            // }
            // if( newpwd != confirmpwd )
            // {
            //     Toast.showToast("两次输入的新密码不相同");
            //     return;
            // }
            var url = ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.changepwd +
                "?access_token=" + Common.access_token;
            LayaMain.getInstance().showCircleLoading(true);
            var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
            var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
            var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
            var data = {
                mode: "PASSWORD",
                password: ePwd,
                newPassword: eNpwd
            };
            var jd = JSON.stringify(data);
            NetManager.getObj().HttpConnect(url, this, this.responseChange, header, jd, "POST", "JSON");
        }
        catch (e) { }
    };
    ChangePwd.prototype.responseChange = function (s, stat, hr) {
        // Debug.trace("ChangePwd.responseChange");
        // Debug.trace(hr);
        LayaMain.getInstance().showCircleLoading(false);
        var err = hr.http.status;
        if (err == 204) {
            this.changeSuc(this.getInputByData("newpwd").text);
            this.onClose(null, false);
        }
        else {
            var response = hr.http.response;
            var jobj;
            try {
                jobj = JSON.parse(response);
            }
            catch (e) {
                Debug.trace(e);
                jobj = response;
            }
            var msg = jobj.message;
            Toast.showToast(msg);
            try {
                this.getInputByData("oldpwd").text = "";
                this.getInputByData("newpwd").text = "";
                this.getInputByData("confirmpwd").text = "";
            }
            catch (e) { }
        }
    };
    ChangePwd.prototype.changeSuc = function (newpwd) {
        if (this.sucCaller && this.sucCallback) {
            this.sucCallback.apply(this.sucCaller, [newpwd]);
        }
        // else
        // {
        //     LoginPad.getObj().setPassword("");
        //     LoginPad.getObj().setYanzhengma("");
        //     LoginPad.getObj().refreshYanzhengma();
        //     Toast.showToast(this.conf.textChanged);
        // }
        if (Common.loginType == Common.TYPE_LOGIN_QK) {
            SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, newpwd);
            Common.loginInfo.strongPwd = true;
            SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        }
    };
    return ChangePwd;
}(AgentDialogBase));
//# sourceMappingURL=ChangePwd.js.map