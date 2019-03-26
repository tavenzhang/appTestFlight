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
var ScrollBar = /** @class */ (function (_super) {
    __extends(ScrollBar, _super);
    function ScrollBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollBar.prototype.init = function (conf) {
        this.conf = conf;
        this.showinsmall = this.conf.showinsmall;
        if (!this.scrollbar_bg) {
            this.scrollbar_bg = new Laya.Sprite();
            // this.scrollbar_bg.loadImage(this.conf.bg.src);
            this.addChild(this.scrollbar_bg);
            this.scrollbar_bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
            // var scx = this.conf.bg.size.w/this.scrollbar_bg.width;
            // this.scrollbar_bg.scale(scx,1);
            Tools.scaleSprite(this.scrollbar_bg, this.conf.bg.src, this.conf.bg.size.splice);
        }
        if (!this.scrollbar_ft) {
            this.scrollbar_ft = new Laya.Sprite();
            // this.scrollbar_ft.loadImage(this.conf.ft.src);
            this.addChild(this.scrollbar_ft);
            this.scrollbar_ft.pos(this.conf.ft.pos.x, this.conf.ft.pos.y);
            Tools.scaleSprite(this.scrollbar_ft, this.conf.ft.src, this.conf.ft.size.splice);
        }
        this.setMyAlpha(0);
    };
    ScrollBar.prototype.reset = function (width, totalWidth) {
        this.width = width;
        this.totalWidth = totalWidth;
        var wp = this.width / this.totalWidth;
        var ftw = wp * this.conf.bg.size.w;
        if (this.showinsmall) {
            if (ftw > this.conf.bg.size.w) {
                ftw = this.conf.bg.size.w;
            }
        }
        if (this.totalWidth > 0 && ftw <= this.conf.bg.size.w) {
            this.scrollbar_bg.visible = true;
            this.scrollbar_ft.visible = true;
            this.scrollbar_ft.graphics.clear();
            Tools.scaleSprite(this.scrollbar_ft, this.conf.ft.src, this.conf.ft.size.splice, ftw);
        }
        else {
            this.scrollbar_bg.visible = false;
            this.scrollbar_ft.visible = false;
        }
    };
    ScrollBar.prototype.move = function (nx) {
        if (this.scrollbar_ft) {
            var wp = nx / this.totalWidth;
            var mx = this.conf.bg.size.w * wp;
            this.scrollbar_ft.x -= mx;
        }
    };
    ScrollBar.prototype.moveStart = function () {
        this.clearTimer();
        // Debug.trace('ScrollBar moveStart:'+this.alpha);
        Laya.timer.frameLoop(1, this, this.fadeIn);
    };
    ScrollBar.prototype.fadeIn = function () {
        this.setMyAlpha(this.alpha + this.conf.fadeAlpha);
        if (this.alpha >= 1) {
            this.alpha = 1;
            Laya.timer.clear(this, this.fadeIn);
        }
    };
    ScrollBar.prototype.moveEnd = function () {
        this.clearTimer();
        Laya.timer.frameLoop(1, this, this.fadeOut);
    };
    ScrollBar.prototype.fadeOut = function () {
        this.setMyAlpha(this.alpha - this.conf.fadeAlpha);
        if (this.alpha <= 0) {
            this.alpha = 0;
            Laya.timer.clear(this, this.fadeOut);
        }
    };
    ScrollBar.prototype.setMyAlpha = function (a) {
        this.alpha = a;
        this.scrollbar_bg.alpha = this.alpha;
        this.scrollbar_ft.alpha = this.alpha;
    };
    ScrollBar.prototype.clearTimer = function () {
        Laya.timer.clear(this, this.fadeIn);
        Laya.timer.clear(this, this.fadeOut);
    };
    return ScrollBar;
}(Laya.Sprite));
//# sourceMappingURL=ScrollBar.js.map