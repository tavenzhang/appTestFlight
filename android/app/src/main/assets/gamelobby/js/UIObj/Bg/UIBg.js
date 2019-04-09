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
var UIBg = /** @class */ (function (_super) {
    __extends(UIBg, _super);
    function UIBg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIBg.getInstance = function (node, conf) {
        if (!UIBg.obj) {
            var a = new UIBg();
            a.init(conf);
            node.addChild(a);
        }
        return UIBg.obj;
    };
    UIBg.prototype.destroy = function (b) {
        UIBg.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    UIBg.prototype.init = function (conf) {
        this.conf = conf;
        this.bg = new MySprite();
        this.bg.loadImage(this.conf.src);
        this.bg.pos(this.conf.pos.x, this.conf.pos.y);
        this.addChild(this.bg);
        if (this.conf.stars) {
            this.sp_stars = new Stars();
            this.sp_stars.init(this.conf.stars);
            this.addChild(this.sp_stars);
        }
    };
    UIBg.prototype.changeBg = function (src) {
        var t = Laya.loader.getRes(Tools.getSrc(src));
        this.bg.graphics.clear();
        this.bg.graphics.drawTexture(t, 0, 0);
    };
    UIBg.prototype.moveStars = function (nx) {
        if (this.sp_stars) {
            var mx = nx * this.conf.stars.moveScale;
            this.sp_stars.move(mx);
        }
    };
    UIBg.obj = null;
    return UIBg;
}(MySprite));
//# sourceMappingURL=UIBg.js.map