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
var BottomMenus = /** @class */ (function (_super) {
    __extends(BottomMenus, _super);
    function BottomMenus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0; //初始状态是藏起来的
        _this.style = ""; //当前是在哪个界面
        return _this;
    }
    BottomMenus.getInstance = function (node, conf) {
        if (!BottomMenus.obj) {
            var a = new BottomMenus();
            a.init(conf);
            node.addChild(a);
        }
        return BottomMenus.obj;
    };
    BottomMenus.prototype.destroy = function (b) {
        BottomMenus.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    BottomMenus.prototype.init = function (conf) {
        this.conf = conf;
        // Debug.trace(this.conf);
        if (this.conf.menus) {
            // for(var a in this.conf.menus)
            // Debug.trace("BottomMenus.init menus:"+this.conf.menus.length);
            // Debug.trace(this.conf.menus);
            for (var a = 0; a < this.conf.menus.length; a++) {
                var bc = this.conf.menus[a];
                var btn = new MyButton();
                btn.actionDown = bc.actionDown; //true;   //该按钮动作是按下即执行
                btn.init(bc, this, this.onClick);
                btn.setQuery(bc.cmd);
                this.addChild(btn);
                // btn.pos(bc.pos.x,bc.pos.y);
            }
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    BottomMenus.prototype.onClick = function (btn) {
        // Debug.trace("BottomMenus.onClick btn:");
        // Debug.trace(btn);
        this.click(btn.getQuery());
    };
    BottomMenus.prototype.click = function (style) {
        // Debug.trace("click style:"+style);
        switch (style) {
            case "history":
                HistoryDialog.showPad(Common.gameId);
                break;
            case "fullscreen":
                // Tools.doFullscreen();
                break;
            case "rule":
                HelpPad.showPad("");
                break;
            case "setting":
                SettingPad.showPad(Laya.stage, ConfObjRead.getConfSetting(), this, this.setCallback);
                break;
        }
    };
    BottomMenus.prototype.setCallback = function (e) {
    };
    //使用坐标隐藏
    BottomMenus.prototype.hidePos = function () {
        this.y = this.conf.scrollout.pos.y;
    };
    //整体向上移动
    BottomMenus.prototype.scrollin = function () {
        this.visible = true;
        var tween = Laya.Tween.to(this, {
            x: this.conf.pos.x,
            y: this.conf.pos.y
        }, this.conf.duration, 
        // Laya.Ease["elasticOut"],
        Laya.Ease["backIn"], new Laya.Handler(this, this.scrollinOver));
    };
    BottomMenus.prototype.scrollinOver = function (gotos) {
        this.state = 1;
        this.style = gotos;
    };
    // 整体向下移出
    BottomMenus.prototype.scrollout = function () {
        var tween = Laya.Tween.to(this, {
            x: this.conf.scrollout.pos.x,
            y: this.conf.scrollout.pos.y
        }, this.conf.duration, 
        // Laya.Ease["elasticIn"],
        Laya.Ease["backOut"], new Laya.Handler(this, this.scrolloutOver));
    };
    BottomMenus.prototype.scrolloutOver = function () {
        this.state = 0;
        this.visible = false;
    };
    BottomMenus.bClickFullscreen = false; //当前是否全屏
    BottomMenus.obj = null;
    return BottomMenus;
}(Laya.Sprite));
//# sourceMappingURL=BottomMenus.js.map