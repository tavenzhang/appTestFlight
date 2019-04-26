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
var LotteryRecord = /** @class */ (function (_super) {
    __extends(LotteryRecord, _super);
    function LotteryRecord() {
        var _this = _super.call(this) || this;
        _this.lists = [];
        return _this;
    }
    LotteryRecord.prototype.init = function ($data) {
        for (var i = 0; i < 7; i++) {
            var list = new LotteryRecordList();
            list.init($data);
            this.addChild(list);
            list.y = $data.h * i;
            this.lists.push(list);
        }
    };
    LotteryRecord.prototype.setData = function ($data) {
        for (var i = 0; i < this.lists.length; i++) {
            var list = this.lists[i];
            if ($data[i]) {
                list.setData($data[i]);
                list.visible = true;
            }
            else {
                list.visible = false;
            }
        }
    };
    return LotteryRecord;
}(Laya.Sprite));
//# sourceMappingURL=LotteryRecord.js.map