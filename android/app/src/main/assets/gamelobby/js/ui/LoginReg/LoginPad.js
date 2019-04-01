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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // public sp_shine:Shining;
    LoginPad.getObj = function () {
        return LoginPad.obj;
    };
    LoginPad.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!LoginPad.obj) {
            var o = new LoginPad();
            o.init(conf, caller, callback);
            // Laya.stage.addChild(o);
            node.addChild(o);
        }
        // LoginPad.obj.show(b);
    };
    LoginPad.prototype.destroy = function (b) {
        LoginPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    LoginPad.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        LoginPad.obj = null;
        Laya.stage.removeChild(this);
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
        if (this.conf.name) {
            var lb = Tools.addSprite(this, this.conf.name.label);
            var inputbg = Tools.addSprite(this, this.conf.name.inputbg);
            this.inputName = Tools.addInput(this, this.conf.name.input);
            this.inputName.on(Laya.Event.INPUT, this, this.onNameKey);
        }
        if (this.conf.pwd) {
            var lb = Tools.addSprite(this, this.conf.pwd.label);
            var inputbg = Tools.addSprite(this, this.conf.pwd.inputbg);
            this.inputPwd = Tools.addInput(this, this.conf.pwd.input);
        }
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
    LoginPad.prototype.initAlphaBg = function () {
        if (this.conf.mask) {
            var alphabg = new Laya.Sprite();
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
        }
        // Debug.trace("LoginPad.initBg");
        // Debug.trace(this.conf.bg.shine);
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
    LoginPad.prototype.onLoginClick = function (e) {
        var name = this.inputName.text;
        var pwd = this.inputPwd.text;
        if (name.length <= 0 || pwd.length <= 0) {
            Toast.showToast("请正确输入用户名及密码");
            return;
        }
        PostMHelp.debugInfo({ name: name, pwd: pwd });
        this.requestLogin(name, pwd);
    };
    LoginPad.prototype.onRegClick = function (e) {
        RegPad.showPad(LoginScene.getObj(), ConfObjRead.getConfLogin().reg);
    };
    LoginPad.prototype.onClose = function (s) {
        this.hide();
    };
    LoginPad.prototype.requestLogin = function (name, pwd) {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userlogin +
            "?checkHash=false";
        LayaMain.getInstance().showCircleLoading(true);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        var data = {
            username: name,
            password: pwd
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
                LayaMain.getInstance().initLobby();
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
        }
    };
    return LoginPad;
}(Laya.Sprite));
//# sourceMappingURL=LoginPad.js.map