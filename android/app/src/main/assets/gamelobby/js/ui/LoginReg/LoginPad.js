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
var LoginPad = /** @class */ (function (_super) {
    __extends(LoginPad, _super);
    function LoginPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iClickNum = 0;
        return _this;
    }
    LoginPad.getObj = function () {
        return LoginPad.obj;
    };
    LoginPad.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!LoginPad.obj) {
            var o = new LoginPad();
            o.init(conf, caller, callback);
            node.addChild(o);
        }
    };
    LoginPad.prototype.destroy = function (b) {
        LoginPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    LoginPad.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        LoginPad.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    LoginPad.prototype.init = function (conf, caller, callback) {
        LoginPad.obj = this;
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        this.initAlphaBg();
        this.initBg();
        this.initTitle();
        this.initContent();
        this.initBtns();
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    LoginPad.prototype.initBtns = function () {
        if (this.conf.btnreg) {
            this.btnreg = new MyButton();
            this.btnreg.init(this.conf.btnreg, this, this.onRegClick);
            this.btnreg.pos(this.conf.btnreg.pos.x, this.conf.btnreg.pos.y);
            this.addChild(this.btnreg);
        }
        if (this.conf.regshadow) {
            var sp = Tools.addSprite(this, this.conf.regshadow);
        }
        if (this.conf.btnlogin) {
            this.btnlogin = new MyButton();
            this.btnlogin.init(this.conf.btnlogin, this, this.onLoginClick);
            this.btnlogin.pos(this.conf.btnlogin.pos.x, this.conf.btnlogin.pos.y);
            this.addChild(this.btnlogin);
        }
        if (this.conf.loginshadow) {
            var sp = Tools.addSprite(this, this.conf.loginshadow);
        }
    };
    LoginPad.prototype.initContent = function () {
        if (this.conf.inputpad) {
            var spad = new MySprite();
            this.addChild(spad);
            spad.pos(this.conf.inputpad.pos.x, this.conf.inputpad.pos.y);
            if (this.conf.inputpad.name) {
                var sp = new MySprite();
                spad.addChild(sp);
                sp.pos(this.conf.inputpad.name.pos.x, this.conf.inputpad.name.pos.y);
                var lb = Tools.addSprite(sp, this.conf.inputpad.name.label);
                var inputbg = Tools.addSprite(sp, this.conf.inputpad.name.inputbg);
                this.inputName = Tools.addInput(sp, this.conf.inputpad.name.input);
                this.inputName.on(Laya.Event.INPUT, this, this.onNameKey);
            }
            if (this.conf.inputpad.pwd) {
                var sp = new MySprite();
                spad.addChild(sp);
                sp.pos(this.conf.inputpad.pwd.pos.x, this.conf.inputpad.pwd.pos.y);
                var lb = Tools.addSprite(sp, this.conf.inputpad.pwd.label);
                var inputbg = Tools.addSprite(sp, this.conf.inputpad.pwd.inputbg);
                this.inputPwd = Tools.addInput(sp, this.conf.inputpad.pwd.input);
            }
            if (this.conf.inputpad.yanzhengma) {
                this.sp_yanzhengma = new MySprite();
                spad.addChild(this.sp_yanzhengma);
                this.sp_yanzhengma.pos(this.conf.inputpad.yanzhengma.pos.x, this.conf.inputpad.yanzhengma.pos.y);
                var lb = Tools.addSprite(this.sp_yanzhengma, this.conf.inputpad.yanzhengma.label);
                var inputbg = Tools.addSprite(this.sp_yanzhengma, this.conf.inputpad.yanzhengma.inputbg);
                this.inputYanzhengma = Tools.addInput(this.sp_yanzhengma, this.conf.inputpad.yanzhengma.input);
                this.inputYanzhengma.on(Laya.Event.FOCUS, this, this.onYanzhengmaInputFocus);
                // this.imgYanzhengma = this.newYanzhengma(this.sp_yanzhengma,this.conf.inputpad.yanzhengma.image);
                this.yzmObj = new YZM();
                this.yzmObj.init(this, this.conf.inputpad.yanzhengma.image);
                this.addChild(this.yzmObj);
            }
        }
        if (this.conf.menus) {
            var blen = this.conf.menus.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.menus[a];
                var b = new MyButton();
                b.init(btnconf, this, this.onMenusClick);
                b.setQuery(btnconf.cmd);
                this.addChild(b);
                this.arr_btns.push(b);
            }
        }
    };
    // public newYanzhengma(node:any,conf:any):Laya.Image
    // {
    //     switch( Common.pathType )
    //     {
    //         case Common.PATH_TYPE_XD:
    //         return this.newYanzhengma_xiangdui(node,conf);
    //         default:
    //         return this.newYanzhengma_juedui(node,conf);
    //     }
    // }
    // public onYanzhengmaFocus(node:any):void
    // {
    //     this.clearYanzhengma(node);
    // Debug.trace("focus on yanzhengma");
    //     this.imgYanzhengma = this.newYanzhengma(node,this.conf.inputpad.yanzhengma.image);
    // }
    LoginPad.prototype.refreshYanzhengma = function () {
        // this.onYanzhengmaFocus(this.sp_yanzhengma);
        this.yzmObj.refresh();
    };
    LoginPad.prototype.onYanzhengmaInputFocus = function (e) {
        // Debug.trace("RegPad.onYanzhengmaInputFocus e:");
        // Debug.trace(e);
        // var inputText:MyTextInput = e as MyTextInput;
        // inputText.text = "";
    };
    LoginPad.prototype.onNameKey = function (e) {
        var name = e;
        var tx = name.text;
        var ntx = tx.toLowerCase();
        // Debug.trace("RegPad.onNameKey tx:"+tx+" ntx:"+ntx);
        name.text = ntx;
    };
    LoginPad.prototype.setUserName = function (name) {
        if (this.inputName) {
            this.inputName.text = name;
        }
    };
    LoginPad.prototype.setPassword = function (pwd) {
        if (this.inputPwd) {
            this.inputPwd.text = pwd;
        }
    };
    LoginPad.prototype.setYanzhengma = function (yzm) {
        if (this.inputYanzhengma) {
            this.inputYanzhengma.text = yzm;
        }
    };
    LoginPad.prototype.lostFocusInputText = function () {
        if (this.inputName) {
            this.inputName.focus = false;
        }
        if (this.inputPwd) {
            this.inputPwd.focus = false;
        }
        if (this.inputYanzhengma) {
            this.inputYanzhengma.focus = false;
        }
    };
    LoginPad.prototype.initAlphaBg = function () {
        if (this.conf.mask) {
            var alphabg = new MySprite();
            Tools.drawRectWithAlpha(alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
            this.addChild(alphabg);
            alphabg.size(this.conf.size.w, this.conf.size.h);
            alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
            alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
            alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
            alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        }
    };
    LoginPad.prototype.initBg = function () {
        if (!AppData.isAndroidHack) {
            if (this.conf.logo) {
                var sp_logo = Tools.addSprite(this, this.conf.logo);
            }
        }
        if (this.conf.bg) {
            var sp_bg = Tools.addSprite(this, this.conf.bg);
            if (ConfObjRead.getConfCommon().btest) {
                sp_bg.on(Laya.Event.CLICK, this, this.onClickBg);
            }
        }
        // Debug.trace("LoginPad.initBg");
        // Debug.trace(this.conf.bg.shine);
    };
    LoginPad.prototype.onClickBg = function (e) {
        // Debug.trace("LoginPad.onClickBg "+this.iClickNum);
        this.iClickNum += ConfObjRead.getConfCommon().btest.stepAdd;
        if (this.iClickNum >= ConfObjRead.getConfCommon().btest.totalNum) {
            this.iClickNum = 0;
            ChangePwd.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfChangePwd(), this, this.cancelChangePwd);
            ChangePwd.getObj().setSucListener(this, this.changePwdSuc);
        }
        Laya.timer.clear(this, this.clearClick);
        Laya.timer.once(ConfObjRead.getConfCommon().btest.delayTime, this, this.clearClick);
    };
    LoginPad.prototype.clearClick = function () {
        this.iClickNum = 0;
    };
    LoginPad.prototype.initTitle = function () {
        if (this.conf.title) {
            if (this.conf.title.bg) {
                var sp_title_bg = Tools.newSprite(this.conf.title.bg);
                this.addChild(sp_title_bg);
            }
            if (this.conf.title.lb) {
                var sp_title_lb = Tools.newSprite(this.conf.title.lb);
                this.addChild(sp_title_lb);
            }
        }
    };
    LoginPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    LoginPad.prototype.onMenusClick = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "other":
                if (this.callback && this.caller) {
                    this.callback.apply(this.caller, [cmd]);
                }
                break;
        }
    };
    LoginPad.prototype.onLoginClick = function (e) {
        var name = this.inputName.text;
        var pwd = this.inputPwd.text;
        var yzm = this.inputYanzhengma.text;
        if (name.length <= 0 || pwd.length <= 0) {
            Toast.showToast("请正确输入用户名及密码");
            return;
        }
        if (yzm.length <= 0) {
            Toast.showToast("请正确输入验证码");
            return;
        }
        PostMHelp.debugInfo({ name: name, pwd: pwd });
        this.requestLogin(name, pwd, yzm);
    };
    LoginPad.prototype.onRegClick = function (e) {
        RegPad.showPad(LoginScene.getObj(), ConfObjRead.getConfLogin().reg);
    };
    LoginPad.prototype.onClose = function (s) {
        this.hide();
    };
    LoginPad.prototype.requestLogin = function (name, pwd, yzm) {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userlogin;
        LayaMain.getInstance().showCircleLoading(true);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        var swebUniqueCode = "" + this.yzmObj.yanzhengma_root;
        var data = {
            username: name,
            password: ePwd,
            validateCode: yzm,
            webUniqueCode: swebUniqueCode
        };
        var jd = JSON.stringify(data);
        NetManager.getObj().HttpConnect(url, this, this.responseLogin, header, jd, "POST", "JSON");
    };
    LoginPad.prototype.responseLogin = function (s, stat, hr) {
        Debug.trace("Login Suc stat:" + stat);
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
                    ChangePwd.showPad(LoginScene.getObj(), ConfObjRead.getConfChangePwd(), this, this.cancelChangePwd);
                    ChangePwd.getObj().setSucListener(this, this.changePwdSuc);
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
            // this.onYanzhengmaFocus(this.sp_yanzhengma);
            this.yzmObj.refresh();
        }
    };
    LoginPad.prototype.changePwdSuc = function (e) {
        LoginPad.getObj().setPassword("");
        LoginPad.getObj().setYanzhengma("");
        LoginPad.getObj().refreshYanzhengma();
        Toast.showToast(ConfObjRead.getConfChangePwd().textChanged);
    };
    LoginPad.prototype.cancelChangePwd = function (e) {
        Debug.trace("LoginPad.cancelChangePwd:");
        // Debug.trace(e);
        // LayaMain.getInstance().initLobby();
    };
    return LoginPad;
}(MySprite));
//# sourceMappingURL=LoginPad.js.map