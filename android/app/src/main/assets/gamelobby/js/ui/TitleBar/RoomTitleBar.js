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
        if (this.conf.bg) {
            var bg = Tools.addSprite(this, this.conf.bg);
        }
        this.initTitle(this.conf.title);
        if (this.conf.btns) {
            this.initButtons(this.conf.btns);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    RoomTitleBar.prototype.initButtons = function (conf) {
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
    RoomTitleBar.prototype.initTitle = function (conf) {
        if (!conf) {
            return;
        }
        var sp = Tools.addSprite(this, conf);
    };
    RoomTitleBar.prototype.onEventClick = function (e) {
        var btn = e;
        try {
            var cmd = btn.getQuery();
            switch (cmd) {
                case "backlobby":
                    LayaMain.getInstance().initLobby();
                    break;
                case "custom":
                    Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                    break;
                case "notice":
                    AttentionDialog.showPad(LobbyScene.getInstance(), ConfObjRead.getConfAttention());
                    AttentionDialog.obj.show();
                    break;
                case "quit":
                    PostMHelp.goBack({ token: Common.access_token });
                    break;
                case "setting":
                    var conf = ConfObjRead.getConfSetting();
                    SettingPad.showPad(LayaMain.getInstance().getRootNode(), conf, this, this.setCallback);
                    break;
                default:
                    break;
            }
        }
        catch (e) { }
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
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    RoomTitleBar.obj = null;
    return RoomTitleBar;
}(MySprite));
//# sourceMappingURL=RoomTitleBar.js.map