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
var Stars = /** @class */ (function (_super) {
    __extends(Stars, _super);
    function Stars() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stars.prototype.init = function (conf) {
        this.conf = conf;
        this.sp_content = new Laya.Sprite();
        this.addChild(this.sp_content);
        for (var i = 0; i < this.conf.starscount; i++) {
            var sp = new Laya.Sprite();
            sp.loadImage(this.conf.src);
            var rd_scale_x = Math.random() + this.conf.minScale;
            sp.scale(rd_scale_x, rd_scale_x);
            var rd_alpha = Math.random() + this.conf.minAlpha;
            sp.alpha = rd_alpha;
            var rd_pos_x = (Math.random() * 99999) % this.conf.maxPosX;
            var rd_pos_y = (Math.random() * 99999) % this.conf.maxPosY;
            sp.pos(rd_pos_x, rd_pos_y);
            this.sp_content.addChild(sp);
        }
    };
    Stars.prototype.move = function (nx) {
        this.sp_content.x += nx;
    };
    return Stars;
}(Laya.Sprite));
//# sourceMappingURL=Stars.js.map