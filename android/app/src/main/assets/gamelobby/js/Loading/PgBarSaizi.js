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
var PgBarSaizi = /** @class */ (function (_super) {
    __extends(PgBarSaizi, _super);
    function PgBarSaizi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PgBarSaizi.prototype.createSaizi = function () {
        this.bg.visible = false;
        this.front.visible = false;
        this.onloadedAnim(null);
    };
    PgBarSaizi.prototype.onloadedAnim = function (s) {
        // Debug.trace('PgBarSaizi onloadedAnim s:');
        // Debug.trace(s);
        this.anim_saizi = new laya.display.Animation();
        this.anim_saizi.loadAtlas(this.conf.anim.src);
        this.anim_saizi.interval = this.conf.anim.interval;
        this.anim_saizi.index = this.conf.anim.index;
        this.anim_saizi.play();
        this.anim_saizi.pos(this.conf.anim.pos.x, this.conf.anim.pos.y);
        this.addChild(this.anim_saizi);
    };
    return PgBarSaizi;
}(PgBar));
//# sourceMappingURL=PgBarSaizi.js.map