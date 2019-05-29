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
var LotteryRecordList = /** @class */ (function (_super) {
    __extends(LotteryRecordList, _super);
    function LotteryRecordList() {
        var _this = _super.call(this) || this;
        _this._types = [];
        return _this;
    }
    LotteryRecordList.prototype.init = function ($data) {
        var date = this._date = new Laya.Label();
        this.addChild(date);
        date.color = $data.date;
        date.align = "center";
        date.width = $data.w[0];
        date.text = "";
        var type = this._type = new Laya.Label();
        this.addChild(type);
        type.align = "center";
        type.text = "";
        type.width = $data.w[1];
        var total = this._total = new Laya.Label();
        this.addChild(total);
        total.align = "center";
        total.width = $data.w[2];
        total.text = "";
        date.fontSize = type.fontSize = total.fontSize = $data.size;
        date.height = type.height = total.height = $data.h;
        date.valign = type.valign = total.valign = "middle";
        type.x = date.x + date.width;
        total.x = type.x + type.width;
        this._silverC = $data.silver;
        this._goldC = $data.gold;
        this._diamondC = $data.diamond;
        this._types = $data.type;
    };
    LotteryRecordList.prototype.setData = function ($data) {
        try {
            this._date.text = this.beforeLast($data.createTime, " ");
            switch ($data.rouletteLevel) {
                case 1:
                    this._type.color = this._total.color = this._silverC;
                    this._type.text = this._types[0];
                    break;
                case 2:
                    this._type.color = this._total.color = this._goldC;
                    this._type.text = this._types[1];
                    break;
                case 3:
                    this._type.color = this._total.color = this._diamondC;
                    this._type.text = this._types[2];
                    break;
            }
            this._total.text = $data.prizeAmount;
        }
        catch (error) {
        }
    };
    LotteryRecordList.prototype.beforeLast = function (p_string, p_char) {
        if (p_string === null) {
            return '';
        }
        var idx = p_string.lastIndexOf(p_char);
        if (idx === -1) {
            return '';
        }
        return p_string.substr(0, idx);
    };
    return LotteryRecordList;
}(Laya.Sprite));
//# sourceMappingURL=LotteryRecordList.js.map