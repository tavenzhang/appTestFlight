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
var DiamonIcon = /** @class */ (function (_super) {
    __extends(DiamonIcon, _super);
    function DiamonIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiamonIcon.prototype.init = function (conf) {
        this.conf = conf;
        this.sp_bg = new MySprite();
        this.sp_bg.loadImage(this.conf.bg.src);
        this.sp_bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        this.addChild(this.sp_bg);
        this.sp_icon = new MySprite();
        this.sp_icon.loadImage(this.conf.icon.src);
        this.sp_icon.pos(this.conf.icon.pos.x, this.conf.icon.pos.y);
        this.addChild(this.sp_icon);
        this.lb_num = Tools.newLabel(this.conf.label.font.text, this.conf.label.size.w, this.conf.label.size.h, this.conf.label.font.size, this.conf.label.font.color, this.conf.label.font.align, this.conf.label.font.valign, this.conf.label.font.name, this.conf.label.font.wrap);
        if (this.conf.label.font.borderColor) {
            this.lb_num.borderColor = this.conf.label.font.borderColor;
        }
        this.lb_num.pos(this.conf.label.pos.x, this.conf.label.pos.y);
        this.addChild(this.lb_num);
        if (this.conf.btnadd) {
            this.btn_add = new MyButton();
            this.btn_add.init(this.conf.btnadd, this, this.onBtnClick);
            this.btn_add.pos(this.conf.btnadd.pos.x, this.conf.btnadd.pos.y);
            this.addChild(this.btn_add);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    DiamonIcon.prototype.onBtnClick = function (s) {
        // Debug.trace('DiamonIcon onBtnClick');
        // Debug.trace(s);
    };
    DiamonIcon.prototype.setData = function (dt) {
        // this.lb_num.text = dt.userBalance.balance;
    };
    return DiamonIcon;
}(MySprite));
//# sourceMappingURL=DiamonIcon.js.map