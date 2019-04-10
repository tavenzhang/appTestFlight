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
var AccountCenter = /** @class */ (function (_super) {
    __extends(AccountCenter, _super);
    function AccountCenter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iCPWDClickNum = 0;
        _this.iClickNum = 0;
        return _this;
    }
    AccountCenter.getObj = function () {
        return AccountCenter.obj;
    };
    AccountCenter.prototype.destroy = function (b) {
        AccountCenter.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AccountCenter.showPad = function (node) {
        if (!AccountCenter.obj) {
            var o = new AccountCenter();
            o.init(ConfObjRead.getConfAccountCenter());
            node.addChild(o);
        }
        // AccountCenter.obj.show(b);
    };
    AccountCenter.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        AccountCenter.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    AccountCenter.prototype.init = function (conf) {
        AccountCenter.obj = this;
        this.conf = conf;
        this.arr_btns = new Array();
        this.data = Common.userInfo; //headicon.data;
        Debug.trace('AccountCenter.init this.data:');
        Debug.trace(this.data);
        this.initAlphaBg();
        this.initBg(this.conf.bg);
        if (this.conf.title) {
            var sp_title_lb = Tools.newSprite(this.conf.title.lb);
            this.addChild(sp_title_lb);
            if (ConfObjRead.getConfCommon().btestaccount) {
                sp_title_lb.on(Laya.Event.CLICK, this, this.onClickTitle);
            }
        }
        this.initCurAvator(this.conf.curavator);
        this.initBtns(this.conf.btns);
        if (this.conf.close) {
            this.btnclose = new MyButton();
            this.btnclose.init(this.conf.close, this, this.onClose);
            this.btnclose.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.btnclose);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    AccountCenter.prototype.onClickAvator = function (e) {
        this.iCPWDClickNum += ConfObjRead.getConfCommon().btestchangepwd.stepAdd;
        if (this.iCPWDClickNum >= ConfObjRead.getConfCommon().btestchangepwd.totalNum) {
            this.iCPWDClickNum = 0;
            this.changePwd();
        }
        Laya.timer.clear(this, this.clearAvator);
        Laya.timer.once(ConfObjRead.getConfCommon().btestchangepwd.delayTime, this, this.clearAvator);
    };
    AccountCenter.prototype.clearAvator = function () {
        this.iCPWDClickNum = 0;
    };
    AccountCenter.prototype.onClickTitle = function (e) {
        // Debug.trace("AccountCenter.onClickBg "+this.iClickNum);
        this.iClickNum += ConfObjRead.getConfCommon().btestaccount.stepAdd;
        if (this.iClickNum >= ConfObjRead.getConfCommon().btestaccount.totalNum) {
            this.iClickNum = 0;
            this.onClose(null);
            LayaMain.getInstance().loginOut();
        }
        Laya.timer.clear(this, this.clearClick);
        Laya.timer.once(ConfObjRead.getConfCommon().btestaccount.delayTime, this, this.clearClick);
    };
    AccountCenter.prototype.clearClick = function () {
        this.iClickNum = 0;
    };
    AccountCenter.prototype.initAlphaBg = function () {
        this.alphabg = new MySprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
    };
    AccountCenter.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        var sp_bg = Tools.addSprite(this, conf);
    };
    AccountCenter.prototype.initCurAvator = function (conf) {
        if (!conf) {
            return;
        }
        if (conf) {
            if (conf.bg) {
                var sp_curavator_bg = Tools.addSprite(this, conf.bg);
            }
            if (conf.title) {
                var sp_lb = new MySprite();
                sp_lb.loadImage(conf.title.lb.src);
                sp_lb.pos(conf.title.lb.pos.x, conf.title.lb.pos.y);
                this.addChild(sp_lb);
                var sp_p1 = new MySprite();
                sp_p1.loadImage(conf.title.point1.src);
                sp_p1.pos(conf.title.point1.pos.x, conf.title.point1.pos.y);
                this.addChild(sp_p1);
                var sp_p2 = new MySprite();
                sp_p2.loadImage(conf.title.point2.src);
                sp_p2.pos(conf.title.point2.pos.x, conf.title.point2.pos.y);
                this.addChild(sp_p2);
            }
            if (conf.avator) {
                if (conf.iconframe) {
                    var iconframe = Tools.addSprite(this, conf.iconframe);
                }
                this.sp_icon = new MySprite();
                this.sp_icon.loadImage(conf.avator.src);
                this.sp_icon.pos(conf.avator.pos.x, conf.avator.pos.y);
                this.addChild(this.sp_icon);
                var scx = conf.avator.size.w / this.sp_icon.width;
                var scy = conf.avator.size.h / this.sp_icon.height;
                this.sp_icon.scale(scx, scy);
                if (ConfObjRead.getConfCommon().btestchangepwd) {
                    this.sp_icon.on(Laya.Event.CLICK, this, this.onClickAvator);
                }
            }
            if (conf.id) {
                if (conf.id.bg) {
                    var sp_idbg = Tools.newSprite(conf.id.bg);
                    this.addChild(sp_idbg);
                }
                if (conf.id.label) {
                    this.lb_id = Tools.addLabels(this, conf.id.label);
                }
            }
            if (conf.money) {
                if (conf.money.bg) {
                    var sp_idbg = Tools.newSprite(conf.money.bg);
                    this.addChild(sp_idbg);
                }
                if (conf.money.label) {
                    var v = Common.userInfo.userBalance.balance;
                    v = Tools.FormatMoney(v, 2);
                    this.lb_num = new DataNum(ConfObjRead.getConfDataNum());
                    this.addChild(this.lb_num);
                    this.lb_num.setNum(v);
                    this.lb_num.pos(conf.money.label.pos.x, conf.money.label.pos.y);
                }
            }
            if (conf.btnchange) {
                this.btnchange = new MyButton();
                this.btnchange.setQuery(conf.btnchange.cmd);
                this.btnchange.init(conf.btnchange, this, this.onButtonClick);
                this.btnchange.pos(conf.btnchange.pos.x, conf.btnchange.pos.y);
                this.addChild(this.btnchange);
            }
            this.resetIconAndID();
        }
    };
    AccountCenter.prototype.initBtns = function (conf) {
        for (var i = 0; i < conf.length; i++) {
            var cf = conf[i];
            var btn = new MyButton();
            btn.init(cf, this, this.onButtonClick);
            btn.setQuery(cf.cmd);
            btn.pos(cf.pos.x, cf.pos.y);
            this.addChild(btn);
            this.arr_btns.push(btn);
        }
    };
    AccountCenter.prototype.onButtonClick = function (e) {
        // Debug.trace("AccountCenter.onButtonClick e:");
        // Debug.trace(e);
        var btn = e;
        switch (btn.getQuery()) {
            case "setting":
                // Debug.trace("AccountCenter.onButtonClick setting");
                // SettingPad.showPad(LobbyScene.getInstance(),ConfObjRead.getConfSetting(),this,this.setCallback);
                SettingPad.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfSetting(), this, this.setCallback);
                break;
            case "account":
                // Debug.trace("AccountCenter.onButtonClick account");
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_account, "account");
                break;
            case "logout":
                // Debug.trace("AccountCenter.onButtonClick logout");
                //先关闭当前窗体
                this.hide();
                LayaMain.getInstance().loginOut();
                break;
            case "changeicon":
                AvatorPad.showPad(LayaMain.getInstance().getRootNode()); //LobbyScene.getInstance());
                break;
            case "changepwd":
                this.changePwd();
                break;
        }
    };
    AccountCenter.prototype.changePwd = function () {
        if (Common.loginType == Common.TYPE_LOGIN_QK) {
            this.showChangePwdQk();
        }
        else {
            this.showChangePwd();
        }
    };
    AccountCenter.prototype.showChangePwd = function () {
        ChangePwdNormal.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfChangePwdIn());
        ChangePwdNormal.getObj().setSucListener(this, this.onChangePwdSuc);
    };
    AccountCenter.prototype.onChangePwdSuc = function (e) {
        ChangePwdNormal.getObj().destroy(true);
        this.destroy(true);
        LayaMain.getInstance().loginOut();
        Toast.showToast(ConfObjRead.getConfChangePwdIn().textChanged);
    };
    AccountCenter.prototype.showChangePwdQk = function () {
        ChangePwdNormal.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfChangePwdIn());
        ChangePwdNormal.getObj().setSucListener(this, this.onChangePwdQkSuc);
        var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
        var bchangepwd = SaveManager.getObj().get(SaveManager.KEY_QK_PWD_CHANGED, false);
        if (!bchangepwd) {
            ChangePwdNormal.getObj().setOldPwd(pwd);
        }
        // ChangePwdQk.showPad(LayaMain.getInstance().getRootNode(),ConfObjRead.getConfChangePwdQk(),this,this.onChangePwdQkCancel);
        // ChangePwdQk.getObj().setSucListener(this,this.onChangePwdQkSuc);
        // var pwd:string = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD,"123456");
        // ChangePwdQk.getObj().setOldPwd(pwd);
    };
    AccountCenter.prototype.onChangePwdQkCancel = function () {
        // ChangePwdQk.getObj().destroy(true);
        // ChangePwdQk.showPad(LayaMain.getInstance().getRootNode(),ConfObjRead.getConfChangePwdQk(),this,this.onChangePwdQkCancel);
    };
    AccountCenter.prototype.onChangePwdQkSuc = function (e) {
        ChangePwdNormal.getObj().destroy(true);
        this.destroy(true);
        var npwd = e;
        // Debug.trace("AttentionDialog.onChangePwdSuc");
        Common.loginInfo.strongPwd = true;
        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, npwd);
        SaveManager.getObj().save(SaveManager.KEY_QK_PWD_CHANGED, true);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        LayaMain.getInstance().loginOut();
        Toast.showToast(ConfObjRead.getConfChangePwdQk().textChanged);
        // ChangePwdQk.getObj().destroy(true);
        // this.destroy(true);
        // var npwd:string = e as string;
        // Debug.trace("AttentionDialog.onChangePwdSuc");
        // Common.loginInfo.strongPwd = true;
        // SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD,npwd);
        // SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO,Common.loginInfo);
        // LayaMain.getInstance().loginOut();
        // Toast.showToast(ConfObjRead.getConfChangePwdQk().textChanged);
    };
    AccountCenter.prototype.setCallback = function () {
    };
    AccountCenter.prototype.resetIconAndID = function () {
        // this.data.headerIndex = Tools.transNickname2id(this.data.username);
        if (!this.data) {
            this.data = { "avatorId": 1, "userId": "123456" };
        }
        if (!this.data.avatorId) {
            this.data.avatorId = 1;
        }
        var id = parseInt(this.data.avatorId); //.headerIndex);
        this.setIcon(id);
        // this.setId(this.data.userId);
        this.setName(this.data.username);
    };
    AccountCenter.prototype.onSureDis = function (e) {
        // Debug.trace('btn change dis click');
    };
    AccountCenter.prototype.btnEnable = function (b) {
        if (this.btnchange) {
            this.btnchange.visible = b;
            // this.btnchange.setEnabled(b,true);
        }
    };
    AccountCenter.prototype.setIcon = function (id) {
        // this.cur_icon_id = id;
        // Debug.trace("AccountCenter.setIcon id:"+id);
        if (this.sp_icon) {
            this.drawIcon(id);
        }
    };
    AccountCenter.prototype.drawIcon = function (id) {
        if (!this.sp_icon) {
            return;
        }
        Debug.trace("AccountCenter.drawIcon id:" + id);
        this.sp_icon.graphics.clear();
        var index = Tools.FormatNumber(id, 2);
        var res = ConfObjRead.getConfAvator().headicon.picnamehead +
            index +
            ConfObjRead.getConfAvator().headicon.picnameend;
        Debug.trace("AccountCenter.drawIcon res:" + res);
        var tex = Laya.loader.getRes(Tools.getSrc(res));
        this.sp_icon.graphics.drawTexture(tex, 0, 0);
    };
    AccountCenter.prototype.setName = function (id) {
        if (this.lb_id) {
            this.lb_id.text = Tools.getStringByKey(this.conf.curavator.id.label.font.pretext) + "" + id;
        }
    };
    AccountCenter.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    AccountCenter.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AccountCenter.prototype.onClose = function (s) {
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    return AccountCenter;
}(MySprite));
//# sourceMappingURL=AccountCenter.js.map