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
var PopMineMenus = /** @class */ (function (_super) {
    __extends(PopMineMenus, _super);
    function PopMineMenus() {
        return _super.call(this) || this;
    }
    PopMineMenus.prototype.init = function (conf) {
        this.conf = conf;
        if (this.conf.alphabg) {
            //todo:xxx
            // this.alpha_bg = new MySprite();
            // Tools.drawRectWithAlpha(this.alpha_bg,
            //     this.conf.alphabg.pos.x,
            //     this.conf.alphabg.pos.y,
            //     this.conf.alphabg.size.w,
            //     this.conf.alphabg.size.h,
            //     this.conf.alphabg.color,
            //     this.conf.alphabg.alpha);
            // this.alpha_bg.pos(this.conf.pos.x*-1,this.conf.pos.y*-1);
            // this.addChild(this.alpha_bg);
            // this.alpha_bg.size(
            //     this.conf.alphabg.size.w,
            //     this.conf.alphabg.size.h
            // );
            this.alpha_bg = Tools.creatDlgBg();
            this.addChild(this.alpha_bg);
            this.alpha_bg.on(Laya.Event.CLICK, this, this.onMouse);
        }
        if (this.conf.bg) {
            this.bg = Tools.addSprite(this, this.conf.bg);
        }
        if (this.conf.btns) {
            var blen = this.conf.btns.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.btns[a];
                var b = new MyButton();
                b.init(btnconf, this, this.onClickBtn);
                b.setQuery(btnconf.cmd);
                this.addChild(b);
                this.arr_btns.push(b);
            }
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    PopMineMenus.prototype.onMouse = function (e) {
        this.show(false);
    };
    PopMineMenus.prototype.onClickBtn = function (e) {
        var cmd = e.getQuery();
        switch (cmd) {
            case "agent":
                AgentPad.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAgentPad());
                break;
            case "recharge":
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
                break;
            case "custom":
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                break;
            case "setting":
                // SettingPad.showPad(LobbyScene.getInstance(),ConfObjRead.getConfSetting(),this,this.setCallback);
                SettingPad.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfSetting(), this, this.setCallback);
                break;
            case "notice":
                // Debug.trace("PopMineMenus.onClickBtn manual");
                AttentionDialog.showPad(LobbyScene.getInstance(), ConfObjRead.getConfAttention(), AttentionDialog.TYPE_OPEN_MANUAL);
                AttentionDialog.obj.show();
                break;
            case "share":
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "share");
                break;
            case "account":
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_account, "account");
                break;
            case "redraw":
                try {
                    if (Common.userInfo_current.needResetPwd) {
                        this.showChangePwd();
                        break;
                    }
                }
                catch (e) { }
                ;
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_redraw, "redraw");
                break;
        }
    };
    PopMineMenus.prototype.setCallback = function (e) {
    };
    PopMineMenus.prototype.show = function (b) {
        this.visible = b;
    };
    PopMineMenus.prototype.switch = function () {
        if (this.visible) {
            this.show(false);
        }
        else {
            this.show(true);
        }
    };
    PopMineMenus.prototype.showChangePwd = function () {
        ChangePwdQk.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfChangePwdQk(), this, this.onChangePwdCancel);
        ChangePwdQk.getObj().setSucListener(this, this.onChangePwdSuc);
        var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
        ChangePwdQk.getObj().setOldPwd(pwd);
    };
    PopMineMenus.prototype.onChangePwdCancel = function (e) {
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_redraw, "redraw");
    };
    PopMineMenus.prototype.onChangePwdSuc = function (e) {
        var npwd = e;
        Common.loginInfo.strongPwd = true;
        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, npwd);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        SaveManager.getObj().save(SaveManager.KEY_QK_PWD_CHANGED, true);
        var str = Tools.getStringByKey(ConfObjRead.getConfChangePwdQk().textChanged);
        Debug.trace("MineMenu.onChangePwdSuc str:" + str);
        LayaMain.getInstance().loginOut();
        Toast.showToast(str);
    };
    return PopMineMenus;
}(MySprite));
//# sourceMappingURL=PopMineMenus.js.map