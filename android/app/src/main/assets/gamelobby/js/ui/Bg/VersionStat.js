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
var VersionStat = /** @class */ (function (_super) {
    __extends(VersionStat, _super);
    function VersionStat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VersionStat.getInstance = function (node, conf) {
        if (!VersionStat.obj) {
            var a = new VersionStat();
            a.init(conf);
            node.addChild(a);
        }
        return VersionStat.obj;
    };
    VersionStat.prototype.destroy = function (b) {
        VersionStat.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    VersionStat.prototype.init = function (conf) {
        this.conf = conf;
        this.sp_bg = Tools.addSprite(this, this.conf.bg);
        this.lb_v = Tools.addLabels(this, this.conf.label);
        // this.lb_v = Tools.newLabel(
        //     this.conf.value,
        //     this.conf.size.w,this.conf.size.h,
        //     this.conf.font.size,
        //     this.conf.font.color,
        //     this.conf.font.align,
        //     this.conf.font.valign,
        //     this.conf.font.name,
        //     this.conf.font.wrap,
        //     this.conf.font.underline
        // );
        // if( this.conf.font.borderColor )
        // {
        //     this.lb_v.borderColor = this.conf.font.borderColor;
        // }
        // if( this.conf.font.alpha )
        // {
        //     this.lb_v.alpha = this.conf.font.alpha;
        // }
        // this.lb_v.pos(this.conf.pos.x,this.conf.pos.y);
        // this.addChild(this.lb_v);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    VersionStat.obj = null;
    return VersionStat;
}(Laya.Sprite));
//# sourceMappingURL=VersionStat.js.map