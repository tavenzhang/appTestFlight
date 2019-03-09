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
        if (!AppData.isAndroidHack) {
            this.initTitle(this.conf.title);
        }
        //遍历构造所有按钮
        this.initBtns(this.conf.btns);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //批量生产按钮
    UITitleBar.prototype.initBtns = function (conf) {
        this.arr_btns = new Array();
        for (var i = 0; i < conf.length; i++) {
            var cf = conf[i];
            var btn = new MyButton();
            btn.setQuery(cf.cmd);
            btn.init(cf, this, this.onEventClick);
            btn.pos(cf.pos.x, cf.pos.y);
            this.addChild(btn);
            this.arr_btns.push(btn);
        }
    };
    UITitleBar.prototype.initTitle = function (conf) {
        if (!conf) {
            return;
        }
        var sp = Tools.addSprite(this, conf);
    };
    //点击按钮
    UITitleBar.prototype.onEventClick = function (e) {
        var btn = e;
        try {
            var cmd = btn.getQuery();
            switch (cmd) {
                case "custom":
                    Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                    break;
                case "notice":
                    //活动
                    AttentionDialog.showPad(LobbyScene.getInstance(), ConfObjRead.getConfAttention());
                    AttentionDialog.obj.show();
                    break;
                case "quit":
                    //返回
                    PostMHelp.goBack({ token: Common.access_token });
                    break;
                case "setting":
                    var conf = ConfObjRead.getConfSetting();
                    SettingPad.showPad(Laya.stage, conf, this, this.setCallback);
                    break;
                default:
                    break;
            }
        }
        catch (e) { }
    };
    UITitleBar.prototype.setCallback = function (e) {
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