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
var UITitleBar = /** @class */ (function (_super) {
    __extends(UITitleBar, _super);
    function UITitleBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UITitleBar.getInstance = function (node, conf, caller, callback) {
        if (!UITitleBar.obj) {
            var a = new UITitleBar();
            a.init(conf, caller, callback);
            node.addChild(a);
        }
        return UITitleBar.obj;
    };
    UITitleBar.prototype.destroy = function (b) {
        UITitleBar.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    UITitleBar.prototype.init = function (conf, caller, callback) {
        UITitleBar.obj = this;
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        this.initTitle(this.conf.title);
        this.initSetting(this.conf.btnsetting);
        this.initNotice(this.conf.btnnotice);
        // Debug.trace("titlebar init ok");
        // Debug.trace(this.conf);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    UITitleBar.prototype.initSetting = function (conf) {
        if (!conf) {
            return;
        }
        this.btn_setting = new MyButton();
        this.btn_setting.init(this.conf.btnsetting, this, this.onSettingClick);
        this.btn_setting.pos(this.conf.btnsetting.pos.x, this.conf.btnsetting.pos.y);
        this.addChild(this.btn_setting);
    };
    UITitleBar.prototype.initNotice = function (conf) {
        if (!conf) {
            return;
        }
        this.btn_notice = new MyButton();
        this.btn_notice.init(this.conf.btnnotice, this, this.onNoticeClick);
        this.btn_notice.pos(this.conf.btnnotice.pos.x, this.conf.btnnotice.pos.y);
        this.addChild(this.btn_notice);
    };
    UITitleBar.prototype.initTitle = function (conf) {
        if (!conf) {
            return;
        }
        var sp = Tools.addSprite(this, conf);
    };
    //点击设置按钮
    UITitleBar.prototype.onSettingClick = function (e) {
        var conf = ConfObjRead.getConfSetting();
        // Debug.trace("SettingPad conf:");
        // Debug.trace(conf);
        SettingPad.showPad(Laya.stage, conf, this, this.setCallback);
    };
    UITitleBar.prototype.setCallback = function (e) {
    };
    UITitleBar.prototype.onNoticeClick = function (e) {
        // LayaMain.getInstance().showNoticePad(ConfObjRead.getConfNotice());//Common.confObj.settingpad);
        AttentionDialog.showPad(ConfObjRead.getConfAttention());
    };
    UITitleBar.prototype.scrollOut = function () {
        var xIn = 0;
        var yIn = 0;
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.conf.duration, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutOk));
    };
    UITitleBar.prototype.scrollOutOk = function () {
        // Debug.trace('TitleBar scrollOutOk');
        //滚动进来之后，告知主界面构造游戏图标
        // sceneRoot.initGameIcon();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    UITitleBar.obj = null;
    return UITitleBar;
}(Laya.Sprite));
//# sourceMappingURL=UITitleBar.js.map