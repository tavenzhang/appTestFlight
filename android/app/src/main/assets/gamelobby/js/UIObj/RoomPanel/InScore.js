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
var InScore = /** @class */ (function (_super) {
    __extends(InScore, _super);
    function InScore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InScore.prototype.init = function (conf, num_minscore) {
        this.conf = conf;
        this.sp_bg = new MySprite();
        this.sp_bg.loadImage(this.conf.bg.src);
        this.addChild(this.sp_bg);
        this.sp_bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        // this.sp_arrow = new MySprite();
        // this.sp_arrow.loadImage(this.conf.arrow.src);
        // this.addChild(this.sp_arrow);
        // this.sp_arrow.pos(this.conf.arrow.pos.x,this.conf.arrow.pos.y);
        this.lb = Tools.newLabel(this.conf.lb.font.pretext + num_minscore, this.conf.lb.size.w, this.conf.lb.size.h, this.conf.lb.font.size, this.conf.lb.font.color, this.conf.lb.font.align, this.conf.lb.font.valign, this.conf.lb.font.name, this.conf.lb.font.wrap);
        this.lb.pos(this.conf.lb.pos.x, this.conf.lb.pos.y);
        this.addChild(this.lb);
        if (this.conf.lb.font.borderColor) {
            this.lb.borderColor = this.conf.lb.font.borderColor;
        }
    };
    InScore.prototype.setText = function (num) {
        this.lb.text = num;
    };
    return InScore;
}(MySprite));
//# sourceMappingURL=InScore.js.map