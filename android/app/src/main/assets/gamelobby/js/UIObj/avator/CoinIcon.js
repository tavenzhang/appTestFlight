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
var CoinIcon = /** @class */ (function (_super) {
    __extends(CoinIcon, _super);
    function CoinIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CoinIcon.prototype.init = function (conf) {
        this.conf = conf;
        this.sp_bg = new MySprite();
        this.sp_bg.loadImage(this.conf.bg.src);
        this.sp_bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        this.addChild(this.sp_bg);
        if (this.conf.icon) {
            this.sp_icon = new MySprite();
            if (this.conf.icon.src) {
                this.sp_icon.loadImage(this.conf.icon.src);
            }
            this.sp_icon.pos(this.conf.icon.pos.x, this.conf.icon.pos.y);
            this.addChild(this.sp_icon);
            if (this.conf.icon.anim) {
                var anim = new MyBoneAnim();
                anim.init(this.conf.icon.anim);
                this.sp_icon.addChild(anim);
                anim.playAnim(0, true);
            }
        }
        this.lb_num = new DataNum(ConfObjRead.getConfDataNum());
        this.addChild(this.lb_num);
        this.lb_num.setNum("0");
        this.lb_num.pos(this.conf.label.pos.x, this.conf.label.pos.y);
        if (this.conf.btnadd) {
            this.btn_add = new MyButton();
            this.btn_add.init(this.conf.btnadd, this, this.onBtnClick);
            this.btn_add.pos(this.conf.btnadd.pos.x, this.conf.btnadd.pos.y);
            if (!AppData.isAndroidHack) {
                this.addChild(this.btn_add);
            }
            if (this.conf.btnadd.anim) {
                var anim = new MyBoneAnim();
                anim.init(this.conf.btnadd.anim);
                this.btn_add.addChild(anim);
                anim.playAnim(0, true);
            }
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    CoinIcon.prototype.onBtnClick = function (s) {
        try {
            if (Common.userInfo_current.needResetPwd) {
                this.showChangePwd();
                return;
            }
        }
        catch (e) { }
        ;
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
    };
    CoinIcon.prototype.setData = function (dt) {
        // Debug.trace("CoinIcon.setData dt.userBalance.balance:");
        // Debug.trace(dt);
        var v = dt.userBalance.balance;
        v = Tools.FormatMoney(v, 2);
        // this.lb_num.text = v;
        // Debug.trace("CoinIcon.setData v:"+v);
        this.lb_num.setNum(v);
    };
    CoinIcon.prototype.showChangePwd = function () {
        ChangePwdQk.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfChangePwdQk(), this, this.onChangePwdCancel);
        ChangePwdQk.getObj().setSucListener(this, this.onChangePwdSuc);
        var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
        ChangePwdQk.getObj().setOldPwd(pwd);
    };
    CoinIcon.prototype.onChangePwdCancel = function (e) {
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
    };
    CoinIcon.prototype.onChangePwdSuc = function (e) {
        var npwd = e;
        // Common.loginInfo.strongPwd = true;
        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, npwd);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        var str = Tools.getStringByKey(ConfObjRead.getConfChangePwdQk().textChanged);
        Debug.trace("CoinIcon.onChangePwdSuc str:" + str);
        LayaMain.getInstance().loginOut();
        Toast.showToast(str);
    };
    return CoinIcon;
}(MySprite));
//# sourceMappingURL=CoinIcon.js.map