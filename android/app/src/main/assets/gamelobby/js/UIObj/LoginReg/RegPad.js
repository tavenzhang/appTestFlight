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
var RegPad = /** @class */ (function (_super) {
    __extends(RegPad, _super);
    function RegPad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegPad.getObj = function () {
        return RegPad.obj;
    };
    RegPad.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!RegPad.obj) {
            var o = new RegPad();
            o.init(conf, caller, callback);
            node.addChild(o);
        }
    };
    RegPad.prototype.destroy = function (b) {
        RegPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    RegPad.prototype.hide = function () {
        this.visible = false;
        RegPad.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
    };
    RegPad.prototype.init = function (conf, caller, callback) {
        RegPad.obj = this;
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
    RegPad.prototype.initBtns = function () {
        if (this.conf.btnclose) {
            this.btnclose = new MyButton();
            this.btnclose.init(this.conf.btnclose, this, this.onCloseClick);
            this.btnclose.pos(this.conf.btnclose.pos.x, this.conf.btnclose.pos.y);
            this.addChild(this.btnclose);
        }
        if (this.conf.btnok) {
            this.btnok = new MyButton();
            this.btnok.init(this.conf.btnok, this, this.onOkClick);
            this.btnok.pos(this.conf.btnok.pos.x, this.conf.btnok.pos.y);
            this.addChild(this.btnok);
        }
    };
    RegPad.prototype.initContent = function () {
        if (this.conf.name) {
            var sp = new MySprite();
            sp.pos(this.conf.name.pos.x, this.conf.name.pos.y);
            this.addChild(sp);
            var lb = Tools.addSprite(sp, this.conf.name.label);
            var inputbg = Tools.addSprite(sp, this.conf.name.inputbg);
            this.inputName = Tools.addInput(sp, this.conf.name.input);
            this.inputName.on(Laya.Event.INPUT, this, this.onNameKey);
            var star = Tools.addLabels(sp, this.conf.name.star);
        }
        if (this.conf.pwd) {
            var sp = new MySprite();
            sp.pos(this.conf.pwd.pos.x, this.conf.pwd.pos.y);
            this.addChild(sp);
            var lb = Tools.addSprite(sp, this.conf.pwd.label);
            var inputbg = Tools.addSprite(sp, this.conf.pwd.inputbg);
            this.inputPwd = Tools.addInput(sp, this.conf.pwd.input);
            var star = Tools.addLabels(sp, this.conf.pwd.star);
        }
        if (this.conf.pwdconfirm) {
            var sp = new MySprite();
            sp.pos(this.conf.pwdconfirm.pos.x, this.conf.pwdconfirm.pos.y);
            this.addChild(sp);
            var lb = Tools.addSprite(sp, this.conf.pwdconfirm.label);
            var inputbg = Tools.addSprite(sp, this.conf.pwdconfirm.inputbg);
            this.inputConfirmPwd = Tools.addInput(sp, this.conf.pwdconfirm.input);
            var star = Tools.addLabels(sp, this.conf.pwdconfirm.star);
        }
        if (this.conf.yanzhengma) {
            this.sp_yanzhengma = new MySprite();
            this.sp_yanzhengma.pos(this.conf.yanzhengma.pos.x, this.conf.yanzhengma.pos.y);
            this.addChild(this.sp_yanzhengma);
            var lb = Tools.addSprite(this.sp_yanzhengma, this.conf.yanzhengma.label);
            var inputbg = Tools.addSprite(this.sp_yanzhengma, this.conf.yanzhengma.inputbg);
            this.inputYanzhengma = Tools.addInput(this.sp_yanzhengma, this.conf.yanzhengma.input);
            this.inputYanzhengma.on(Laya.Event.FOCUS, this, this.onYanzhengmaInputFocus);
            var star = Tools.addLabels(this.sp_yanzhengma, this.conf.yanzhengma.star);
            this.imgYanzhengma = this.newYanzhengma(this.sp_yanzhengma, this.conf.yanzhengma.image);
        }
        if (this.conf.yaoqingma) {
            var sp = new MySprite();
            sp.pos(this.conf.yaoqingma.pos.x, this.conf.yaoqingma.pos.y);
            this.addChild(sp);
            var lb = Tools.addSprite(sp, this.conf.yaoqingma.label);
            var inputbg = Tools.addSprite(sp, this.conf.yaoqingma.inputbg);
            this.inputYaoqingma = Tools.addInput(sp, this.conf.yaoqingma.input);
        }
        if (this.conf.phone) {
            var sp = new MySprite();
            sp.pos(this.conf.phone.pos.x, this.conf.phone.pos.y);
            this.addChild(sp);
            var lb = Tools.addSprite(sp, this.conf.phone.label);
            var inputbg = Tools.addSprite(sp, this.conf.phone.inputbg);
            this.inputPhone = Tools.addInput(sp, this.conf.phone.input);
        }
    };
    RegPad.prototype.onNameKey = function (e) {
        var name = e;
        var tx = name.text;
        var ntx = tx.toLowerCase();
        // Debug.trace("RegPad.onNameKey tx:"+tx+" ntx:"+ntx);
        name.text = ntx;
    };
    RegPad.prototype.lostFocusInputText = function () {
        if (this.inputName) {
            this.inputName.focus = false;
        }
        if (this.inputPwd) {
            this.inputPwd.focus = false;
        }
        if (this.inputYaoqingma) {
            this.inputYaoqingma.focus = false;
        }
        if (this.inputConfirmPwd) {
            this.inputConfirmPwd.focus = false;
        }
        if (this.inputYanzhengma) {
            this.inputYanzhengma.focus = false;
        }
    };
    RegPad.prototype.clearYanzhengma = function (node) {
        // if( this.imgYanzhengma )
        // {
        //     Debug.trace("clear yanzhengmna");
        //     node.removeChild(this.imgYanzhengma);
        //     this.imgYanzhengma.destroy(true);
        //     this.imgYanzhengma = null;
        // }
    };
    RegPad.prototype.onYanzhengmaInputFocus = function (e) {
        // Debug.trace("RegPad.onYanzhengmaInputFocus e:");
        // Debug.trace(e);
        // var inputText:MyTextInput = e as MyTextInput;
        // inputText.text = "";
    };
    RegPad.prototype.newYanzhengmaY = function (node, conf) {
        var img;
        if (this.imgYanzhengma) {
            img = this.imgYanzhengma;
        }
        else {
            img = new MySprite();
            img.on(Laya.Event.CLICK, this, this.onYanzhengmaFocus, [node]);
            img.pos(conf.pos.x, conf.pos.y);
            img.size(conf.size.w, conf.size.h);
            node.addChild(img);
        }
        this.yanzhengma_root = Math.random();
        // img.pos(conf.pos.x,conf.pos.y);
        // img.size(conf.size.w,conf.size.h);
        Debug.trace("RegPad.newYanzhengma root:" + this.yanzhengma_root);
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.yanzhengma_root;
        Debug.trace("RegPad.newYanzhengma url:" + url);
        Laya.loader.load(url, Laya.Handler.create(this, this.onYZMLoaded, [img, url, conf.size.w, conf.size.h]));
        // img.skin = url;
        // img.loadImage(url);
        // img.on(Laya.Event.CLICK,this,this.onYanzhengmaFocus,[node]);
        // node.addChild(img);
        return img;
    };
    RegPad.prototype.onYZMLoaded = function (sp, url, w, h) {
        // Debug.trace("RegPad.onYZMLoaded e:");
        // Debug.trace(e);
        Debug.trace("RegPad.onYZMLoaded url:" + url);
        var img = sp;
        img.graphics.clear();
        var t = Laya.loader.getRes(url);
        Debug.trace("RegPad.onYZMLoaded t:");
        Debug.trace(t);
        img.graphics.drawTexture(t, 0, 0, w, h);
    };
    RegPad.prototype.newYanzhengma = function (node, conf) {
        switch (Common.pathType) {
            case Common.PATH_TYPE_XD:
                return this.newYanzhengma_xiangdui(node, conf);
            default:
                return this.newYanzhengma_juedui(node, conf);
        }
    };
    RegPad.prototype.newYanzhengma_xiangdui = function (node, conf) {
        var img;
        if (this.imgYanzhengma) {
            img = this.imgYanzhengma;
        }
        else {
            img = new Laya.Image();
            img.on(Laya.Event.CLICK, this, this.onYanzhengmaFocus, [node]);
            img.pos(conf.pos.x, conf.pos.y);
            img.size(conf.size.w, conf.size.h);
            node.addChild(img);
        }
        this.yanzhengma_root = Math.random();
        // img.pos(conf.pos.x,conf.pos.y);
        // img.size(conf.size.w,conf.size.h);
        Debug.trace("RegPad.newYanzhengma root:" + this.yanzhengma_root);
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.yanzhengma_root;
        Debug.trace("RegPad.newYanzhengma url:" + url);
        img.skin = url;
        // img.on(Laya.Event.CLICK,this,this.onYanzhengmaFocus,[node]);
        // node.addChild(img);
        return img;
    };
    RegPad.prototype.newYanzhengma_juedui = function (node, conf) {
        var img;
        if (this.imgYanzhengma) {
            img = this.imgYanzhengma;
        }
        else {
            img = new Laya.Image();
            img.on(Laya.Event.CLICK, this, this.onYanzhengmaFocus, [node]);
            img.pos(conf.pos.x, conf.pos.y);
            img.size(conf.size.w, conf.size.h);
            node.addChild(img);
        }
        this.yanzhengma_root = Math.random();
        // img.pos(conf.pos.x,conf.pos.y);
        // img.size(conf.size.w,conf.size.h);
        Debug.trace("RegPad.newYanzhengma root:" + this.yanzhengma_root);
        var url = Tools.getCurHost(Tools.getCurFullPath()); //+"/";
        var ext = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.yanzhengma + "" + this.yanzhengma_root;
        if (ext.indexOf("../") == 0) {
            ext = ext.substr(3, ext.length);
        }
        url = url + ext;
        Debug.trace("RegPad.newYanzhengma url:" + url);
        img.skin = url;
        // img.on(Laya.Event.CLICK,this,this.onYanzhengmaFocus,[node]);
        // node.addChild(img);
        return img;
    };
    RegPad.prototype.onYanzhengmaFocus = function (node) {
        this.clearYanzhengma(node);
        // Debug.trace("focus on yanzhengma");
        this.imgYanzhengma = this.newYanzhengma(node, this.conf.yanzhengma.image);
    };
    RegPad.prototype.initAlphaBg = function () {
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
    RegPad.prototype.initBg = function () {
        if (this.conf.bg) {
            var sp_bg = Tools.addSprite(this, this.conf.bg);
        }
    };
    RegPad.prototype.initTitle = function () {
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
    RegPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onCloseClick(null);
            }
        }
    };
    RegPad.prototype.onOkClick = function (e) {
        var name = this.inputName.text;
        var pwd = this.inputPwd.text;
        var pwdconfirm = this.inputConfirmPwd.text;
        var yanzhengma = this.inputYanzhengma.text;
        var yaoqingma = null;
        if (this.inputYaoqingma) {
            yaoqingma = this.inputYaoqingma.text;
        }
        var phone = null;
        if (this.inputPhone) {
            phone = this.inputPhone.text;
        }
        var verify = Tools.verifyReg(name, pwd, pwdconfirm, yanzhengma);
        if (!verify.bRight) {
            Toast.showToast(Tools.getStringByKey(verify.msg));
            return;
        }
        // if( name.length <= 0 
        // || pwd.length <= 0 
        // || pwdconfirm.length <= 0 )
        // {
        //     Toast.showToast(this.conf.textNoValue);
        //     return;
        // }
        // if( pwd != pwdconfirm )
        // {
        //     Toast.showToast(this.conf.textPwdUnsame);
        //     this.inputPwd.text = "";
        //     this.inputConfirmPwd.text = "";
        //     return;
        // }
        LayaMain.getInstance().showCircleLoading(true);
        this.requestReg(name, pwd, yanzhengma, yaoqingma, phone);
    };
    RegPad.prototype.onCloseClick = function (s) {
        this.hide();
    };
    RegPad.prototype.getHash = function (hash) {
        RegPad.reghash = hash;
        RegPad.request_data.hash = RegPad.reghash;
        // Debug.trace("getHash:"+hash);
        var jd = JSON.stringify(RegPad.request_data);
        // Debug.trace("jd:"+jd);
        NetManager.getObj().HttpConnect(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userreg, RegPad.getObj(), RegPad.getObj().responseInfo, RegPad.request_header, jd, "POST", "JSON");
    };
    RegPad.prototype.requestReg = function (name, pwd, yanzheng, yaoqing, phone) {
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        // Debug.trace("pwd:"+pwd+" ePwd:"+ePwd);
        var deviceId = "" + this.yanzhengma_root; //MyUid.getUid();
        // Debug.trace("deviceId:"+deviceId);
        var sPhone = {};
        if (phone) {
            sPhone = { "phoneNumber": phone };
            // sPhone = JSON.stringify(phoneNumber);
            // Debug.trace("sPhone:"+sPhone);
        }
        RegPad.request_header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        // RegPad.request_data = {
        //     username:name,
        //     password:ePwd,
        //     hash:RegPad.reghash,
        //     affCode:yaoqing,
        //     validateCode:yanzheng,
        //     webUniqueCode:deviceId,
        //     options:sPhone
        // };
        RegPad.request_data = {
            username: name,
            password: ePwd,
            hash: RegPad.reghash,
            validateCode: yanzheng,
            webUniqueCode: deviceId,
            affCode: AppData.NATIVE_DATA.affCode
        };
        if (yaoqing) {
            RegPad.request_data.affCode = yaoqing;
        }
        if (phone) {
            RegPad.request_data.options = sPhone;
        }
        window['SecretUtils'].encode(name, pwd, this.getHash);
        // var hash = "xxx";
    };
    RegPad.prototype.responseInfo = function (s, stat, hr) {
        // Debug.trace("reg s:");
        // Debug.trace(s);
        // Debug.trace("reg stat:");
        // Debug.trace(stat);
        // Debug.trace("reg hr:");
        // Debug.trace(hr);
        if (stat == "complete") {
            //注册成功
            // Toast.showToast("注册成功，请返回登录");
            // LoginPad.getObj().setUserName( RegPad.request_data.username );
            // var pwd = this.inputPwd.text;
            // LoginPad.getObj().setPassword( pwd );
            // LoginPad.getObj().onLoginClick(null);
            var jobj;
            try {
                jobj = JSON.parse(s);
            }
            catch (e) {
                Debug.trace(e);
                jobj = s;
            }
            Common.access_token = jobj.oauthToken.access_token;
            SaveManager.getObj().save(SaveManager.KEY_TOKEN, Common.access_token);
            LayaMain.getInstance().initLobby();
            this.onCloseClick(null);
        }
        else {
            var err = hr.http.response;
            try {
                var jo = JSON.parse(err);
                Toast.showToast(jo.message);
            }
            catch (e) {
                Debug.trace("error===" + err, hr.http);
            }
            this.onYanzhengmaFocus(this.sp_yanzhengma);
        }
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
    };
    RegPad.request_header = {};
    RegPad.request_data = {};
    return RegPad;
}(MySprite));
//# sourceMappingURL=RegPad.js.map