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
var NoticeTipsNumber = /** @class */ (function (_super) {
    __extends(NoticeTipsNumber, _super);
    function NoticeTipsNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.num = 0;
        return _this;
    }
    NoticeTipsNumber.prototype.init = function (conf) {
        this.conf = conf;
        var sp = Tools.addSprite(this, this.conf.bg);
        this.lb_number = Tools.addLabels(this, this.conf.label);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.setNum(this.conf.defaultNum);
    };
    NoticeTipsNumber.prototype.setNum = function (n) {
        this.num = n;
        if (this.lb_number) {
            this.lb_number.text = "" + n;
        }
        if (this.num <= 0) {
            this.visible = false;
        }
        else {
            this.visible = true;
        }
    };
    NoticeTipsNumber.prototype.setQuery = function (a) {
        this.query = a;
    };
    return NoticeTipsNumber;
}(Laya.Sprite));
//# sourceMappingURL=NoticeTipsNumber.js.map