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
var CommisionRecord = /** @class */ (function (_super) {
    __extends(CommisionRecord, _super);
    function CommisionRecord($dummy) {
        var _this = _super.call(this) || this;
        _this.bg = new Laya.Image($dummy.skin);
        _this.addChild(_this.bg);
        var labels = ["orderlabel", "order", "timelabel", "time", "statuslabel", "status", "amount"];
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
        var copy = $dummy.getChildByName("copy");
        _this.copy = new Laya.Image(copy.skin);
        _this.addChild(_this.copy);
        _this.copy.x = copy.x;
        _this.copy.y = copy.y;
        _this.copy.on(Laya.Event.CLICK, _this, _this.onclick);
        return _this;
    }
    CommisionRecord.prototype.setData = function ($data) {
        this.order.text = $data.id;
        this.amount.text = $data.brokerage.toFixed(2);
        this.time.text = $data.createTime;
        switch ($data.state) {
            case "PENDING":
                this.status.color = "#f9cb46";
                this.status.text = "待确定";
                break;
            case "COMPLETED":
                this.status.color = "#04d273";
                this.status.text = "已通过";
                break;
            case "CANCEL":
                this.status.color = "#ff191a";
                this.status.text = "已拒绝";
                break;
        }
    };
    CommisionRecord.prototype.onclick = function () {
        PostMHelp.game_common({ "do": "copylink", "param": this.order.text });
    };
    CommisionRecord.prototype.destroy = function () {
        this.copy.off(Laya.Event.CLICK, this, this.onclick);
    };
    return CommisionRecord;
}(Laya.Sprite));
//# sourceMappingURL=CommisionRecord.js.map