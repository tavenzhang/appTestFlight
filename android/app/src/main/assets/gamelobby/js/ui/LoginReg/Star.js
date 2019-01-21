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
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = 0;
        return _this;
    }
    Star.prototype.init = function (conf) {
        this.conf = conf;
        // Debug.trace("Star.init");
        // Debug.trace(this.conf);
        var starconf = this.conf.star;
        var len = this.conf.src.length;
        var rd = Math.floor(Math.random() * 9999 % len);
        starconf.src = this.conf.src[rd];
        // Debug.trace("Star.init rd:"+rd+" conf:");
        // Debug.trace(starconf);
        this.sp_star = Tools.addSprite(this, starconf);
        Laya.timer.loop(this.conf.delay, this, this.shine);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    Star.prototype.shine = function () {
        switch (this.status) {
            case 0:
                //在亮着
                this.sp_star.alpha -= this.conf.alphaspd;
                if (this.sp_star.alpha <= 0) {
                    this.status = 1;
                }
                break;
            case 1:
                this.sp_star.alpha += this.conf.alphaspd;
                if (this.sp_star.alpha >= 1) {
                    this.status = 0;
                }
                break;
        }
    };
    return Star;
}(Laya.Sprite));
//# sourceMappingURL=Star.js.map