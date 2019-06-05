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
var CommisionPay = /** @class */ (function (_super) {
    __extends(CommisionPay, _super);
    function CommisionPay($dummy) {
        var _this = _super.call(this) || this;
        _this.bg = new Laya.Image($dummy.getChildByName("bg").skin);
        _this.addChild(_this.bg);
        var labels = ["index", "range", "pays"];
        var props = ["text", "x", "y", "width", "height", "align", "valign", "color", "font", "fontSize", "wordWrap"];
        for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
            var label = labels_1[_i];
            var lbl = _this[label] = new Laya.Label();
            _this.addChild(lbl);
            for (var _a = 0, props_1 = props; _a < props_1.length; _a++) {
                var prop = props_1[_a];
                lbl[prop] = $dummy.getChildByName(label)[prop];
            }
        }
        return _this;
    }
    CommisionPay.prototype.setData = function ($data) {
        this.index.text = $data.xh;
        this.range.text = $data.yjed;
        this.pays.text = $data.mwyfy;
        this.bg.visible = parseInt(this.index.text) === AgentData.myPerformanceIndex + 1;
    };
    return CommisionPay;
}(Laya.Sprite));
//# sourceMappingURL=CommissionPay.js.map