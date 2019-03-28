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
var MyCircleLoading = /** @class */ (function (_super) {
    __extends(MyCircleLoading, _super);
    function MyCircleLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tips = "";
        _this.dots = ".";
        _this.dotCount = 1;
        return _this;
    }
    MyCircleLoading.prototype.destroy = function (b) {
        Laya.timer.clear(this, this.dotloop);
        Laya.timer.clear(this, this.circleLoop);
        _super.prototype.destroy.call(this, b);
    };
    MyCircleLoading.prototype.init = function (conf, str, bshowalpha) {
        if (str === void 0) { str = "Loading"; }
        if (bshowalpha === void 0) { bshowalpha = true; }
        this.conf = conf;
        this.tips = str;
        // Debug.trace('cloading:');
        // Debug.trace(this.conf);
        // var w = Const.GM_SCREEN_W;
        // var h = Const.GM_SCREEN_H;
        if (this.conf.mask && bshowalpha) {
            this.alpha_bg = new Laya.Sprite();
            Tools.drawRectWithAlpha(this.alpha_bg, this.conf.mask.pos.x, this.conf.mask.pos.y, this.conf.mask.size.w, this.conf.mask.size.h, this.conf.mask.color, this.conf.mask.alpha);
            this.alpha_bg.pos(this.conf.pos.x * -1, this.conf.pos.y * -1);
            this.addChild(this.alpha_bg);
            this.alpha_bg.size(this.conf.mask.size.w, this.conf.mask.size.h);
            this.alpha_bg.on(Laya.Event.CLICK, this, this.onMouse);
            this.alpha_bg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
            this.alpha_bg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
            this.alpha_bg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
            // this.bg.on(Laya.Event.MOUSE_OVER,this,this.onMouse);
        }
        if (this.conf.lbg) {
            this.loadingbg = new Laya.Sprite();
            this.loadingbg.loadImage(this.conf.lbg.src);
            this.loadingbg.pos(this.conf.lbg.pos.x, this.conf.lbg.pos.y);
            this.loadingbg.pivot(this.conf.lbg.pivot.x, this.conf.lbg.pivot.y);
            this.addChild(this.loadingbg);
        }
        if (this.conf.lft) {
            this.loadingft = new Laya.Sprite();
            this.loadingft.loadImage(this.conf.lft.src);
            this.loadingft.pos(this.conf.lft.pos.x, this.conf.lft.pos.y);
            this.loadingft.pivot(this.conf.lft.pivot.x, this.conf.lft.pivot.y);
            this.addChild(this.loadingft);
        }
        if (this.conf.txt) {
            this.lb_loading = Tools.newLabel(str, this.conf.txt.size.w, this.conf.txt.size.h, this.conf.txt.font.size, this.conf.txt.font.color);
            this.lb_loading.pos(this.conf.txt.pos.x, this.conf.txt.pos.y);
            if (this.conf.txt.borderColor) {
                this.lb_loading.borderColor = this.conf.txt.borderColor;
            }
            this.addChild(this.lb_loading);
        }
        if (this.loadingft) {
            this.startCircle();
        }
    };
    MyCircleLoading.prototype.startCircle = function () {
        Laya.timer.frameLoop(1, this, this.circleLoop);
    };
    MyCircleLoading.prototype.stopCircle = function () {
        Laya.timer.clear(this, this.circleLoop);
    };
    MyCircleLoading.prototype.circleLoop = function () {
        if (this.loadingft) {
            this.loadingft.rotation += this.conf.lft.rotatspd;
        }
    };
    MyCircleLoading.prototype.onMouse = function (s) {
        // Debug.trace("MyCircleLoading onMouse:");
        // Debug.trace(s);
    };
    MyCircleLoading.prototype.setTips = function (tip) {
        this.tips = tip;
        if (this.lb_loading) {
            this.lb_loading.text = this.tips;
        }
    };
    MyCircleLoading.prototype.show = function (b) {
        this.visible = b;
    };
    MyCircleLoading.prototype.startLoading = function () {
        Laya.timer.loop(this.conf.dotdelay, this, this.dotloop);
    };
    MyCircleLoading.prototype.dotloop = function () {
        this.dots += ".";
        this.dotCount += 1;
        if (this.lb_loading) {
            this.lb_loading.text = this.tips + this.dots;
        }
        if (this.dotCount >= this.conf.dotcount) {
            this.dotCount = 1;
            this.dots = ".";
        }
    };
    return MyCircleLoading;
}(Laya.Sprite));
//# sourceMappingURL=MyCircleLoading.js.map