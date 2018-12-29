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
var RoomTitleBar = /** @class */ (function (_super) {
    __extends(RoomTitleBar, _super);
    function RoomTitleBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomTitleBar.getInstance = function (node, conf, caller, callback) {
        if (!RoomTitleBar.obj) {
            var a = new RoomTitleBar();
            a.init(conf, caller, callback);
            node.addChild(a);
        }
        return RoomTitleBar.obj;
    };
    RoomTitleBar.prototype.destroy = function (b) {
        RoomTitleBar.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    RoomTitleBar.prototype.init = function (conf, caller, callback) {
        RoomTitleBar.obj = this;
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        this.initTitle(this.conf.title);
        this.initSetting(this.conf.btnback);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    RoomTitleBar.prototype.initSetting = function (conf) {
        if (!conf) {
            return;
        }
        this.btn_setting = new MyButton();
        this.btn_setting.init(this.conf.btnback, this, this.onSettingClick);
        this.btn_setting.pos(this.conf.btnback.pos.x, this.conf.btnback.pos.y);
        this.addChild(this.btn_setting);
    };
    RoomTitleBar.prototype.initTitle = function (conf) {
        if (!conf) {
            return;
        }
        var sp = Tools.addSprite(this, conf);
    };
    //点击设置按钮
    RoomTitleBar.prototype.onSettingClick = function (e) {
        //返回大厅
        LayaMain.getInstance().initLobby();
    };
    RoomTitleBar.prototype.setCallback = function (e) {
    };
    RoomTitleBar.prototype.scrollOut = function () {
        var xIn = 0;
        var yIn = 0;
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.conf.duration, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutOk));
    };
    RoomTitleBar.prototype.scrollOutOk = function () {
        // Debug.trace('TitleBar scrollOutOk');
        //滚动进来之后，告知主界面构造游戏图标
        // sceneRoot.initGameIcon();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    RoomTitleBar.obj = null;
    return RoomTitleBar;
}(Laya.Sprite));
//# sourceMappingURL=RoomTitleBar.js.map