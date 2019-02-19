var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        //背景图
        this.initBg();
        //标题
        this.initTitle();
        //内容输入框
        this.initContent();
        //动作按钮
        this.initBtns();
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //登录注册按钮
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
    //输入框内容
    LoginPad.prototype.initContent = function () {
        if (this.conf.name) {
            var lb = Tools.addSprite(this, this.conf.name.label);
            var inputbg = Tools.addSprite(this, this.conf.name.inputbg);
            this.inputName = Tools.addInput(this, this.conf.name.input);
        }
        if (this.conf.pwd) {
            var lb = Tools.addSprite(this, this.conf.pwd.label);
            var inputbg = Tools.addSprite(this, this.conf.pwd.inputbg);
            this.inputPwd = Tools.addInput(this, this.conf.pwd.input);
        }
    };
    //半透明背景
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
    //背景
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
    //标题
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
    //点击登录按钮
    LoginPad.prototype.onLoginClick = function (e) {
        //从文本框中取出名字、密码
        var name = this.inputName.text;
        var pwd = this.inputPwd.text;
        if (name.length <= 0 || pwd.length <= 0) {
            Toast.showToast("请正确输入用户名及密码");
            return;
        }
        PostMHelp.debugInfo({ name: name, pwd: pwd });
        //发起网络请求，请求登录
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
        /*
        {
            "username":"shawn001",
            "lastSignInIp":"192.168.11.109",
            "lastSignInAt":"2018-12-17 14:49:26",
            "oauthRole":"USER",
            "balance":13210.51,
            "prizeGroup":1960,
            "sessionId":"81cf357ee34e4cabd0a4888e",
            "minMemberPrizeGroup":1900,
            "oauthToken":{
                "access_token":"abdbcf78-c7de-41a6-92b2-53333d639fba",
                "token_type":"bearer",
                "refresh_token":"eb79fba1-c2f6-4551-be3a-55c23e2c1c4d",
                "expires_in":259199,
                "scope":"ui"
            }
        }
        */
        // Debug.trace("Login suc");
        // Debug.trace(hr);
        if (stat == "complete") {
            //保存登录信息
            // var jobj = JSON.parse(s);
            var jobj = s;
            Common.loginInfo = jobj;
            Common.access_token = jobj.oauthToken.access_token;
            //存档
            SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
            //登录成功，进入大厅
            LayaMain.getInstance().initLobby();
        }
        else {
            //找出错误信息
            var err = hr.http.response;
            if (err) {
                var obj = JSON.parse(err);
                Toast.showToast(obj.message);
            }
            else {
                Toast.showToast("未知错误，请联系管理员");
            }
        }
        // if( MyBBLoading.obj )
        // {
        //     MyBBLoading.obj.show(false);
        // }
    };
    return LoginPad;
}(Laya.Sprite));
//# sourceMappingURL=LoginPad.js.map