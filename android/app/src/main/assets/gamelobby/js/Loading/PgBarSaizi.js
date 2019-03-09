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
        //先加载动画资源
        // Laya.loader.load(this.conf.anim.src,new Laya.Handler(this,this.onloadedAnim));
        this.onloadedAnim(null);
    };
    PgBarSaizi.prototype.onloadedAnim = function (s) {
        // Debug.trace('PgBarSaizi onloadedAnim s:');
        // Debug.trace(s);
        this.anim_saizi = new laya.display.Animation();
        this.anim_saizi.loadAtlas(this.conf.anim.src); // 加载图集动画
        this.anim_saizi.interval = this.conf.anim.interval; //30; // 设置播放间隔（单位：毫秒）
        this.anim_saizi.index = this.conf.anim.index; //1; // 当前播放索引
        this.anim_saizi.play(); // 播放图集动画
        // 获取动画的边界信息
        // var bounds: Laya.Rectangle = this.anim_saizi.getGraphicBounds();
        // this.anim_saizi.pivot(bounds.width / 2, bounds.height / 2);
        // Debug.trace(bounds);
        this.anim_saizi.pos(this.conf.anim.pos.x, this.conf.anim.pos.y); //Laya.stage.width / 2, Laya.stage.height / 2);
        this.addChild(this.anim_saizi);
        // Debug.trace(this.anim_saizi);
    };
    return PgBarSaizi;
}(PgBar));
//# sourceMappingURL=PgBarSaizi.js.map