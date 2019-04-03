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
var MyDialog = /** @class */ (function (_super) {
    __extends(MyDialog, _super);
    function MyDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scx = 1;
        _this.scy = 1;
        return _this;
    }
    MyDialog.prototype.init = function (conf, caller, closeCallback) {
        this.conf = conf;
        this.caller = caller;
        this.closeCallback = closeCallback;
        var w = Common.GM_SCREEN_W;
        var h = Common.GM_SCREEN_H;
        this.alphabg = new MySprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, w, h, "#000000", Common.confObj.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(w, h);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        this.bg = new MySprite();
        this.bg.loadImage(this.conf.bg.src);
        this.bg.pos(this.conf.pos.x, this.conf.pos.y);
        // this.bg.graphics.alpha(1);
        this.addChild(this.bg);
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        if (this.conf.pivot) {
            this.bg.pivot(this.conf.pivot.x, this.conf.pivot.y);
        }
        if (this.conf.size) {
            this.scx = this.conf.size.w / this.bg.width;
            this.scy = this.conf.size.h / this.bg.height;
            var sc = this.scx > this.scy ? this.scy : this.scx;
            this.bg.scale(sc, sc);
            // Debug.trace('scx:'+this.scx+' scy:'+this.scy);
        }
        // Debug.trace('my dialog init');
    };
    MyDialog.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    MyDialog.prototype.onClose = function (s) {
        this.showDialog(false);
        this.closeCallback.apply(this.caller, [this]);
    };
    MyDialog.prototype.showDialog = function (b) {
        this.visible = b;
    };
    return MyDialog;
}(MySprite));
//# sourceMappingURL=MyDialog.js.map