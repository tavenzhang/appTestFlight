var WinRecord = /** @class */ (function () {
    function WinRecord(res) {
        this.date = res.getChildByName("date");
        this.type = res.getChildByName("type");
        this.total = res.getChildByName("total");
        this.date.text = "";
        this.type.text = "";
        this.total.text = "";
    }
    WinRecord.prototype.setData = function ($data) {
        var color;
        var type;
        switch ($data.rouletteLevel) {
            case 1:
                color = "#60f2ff";
                type = "白银轮盘";
                break;
            case 2:
                color = "#ffe68d";
                type = "黄金轮盘";
                break;
            case 3:
                color = "#ee95ff";
                type = "钻石轮盘";
                break;
        }
        // console.log("set", this.date, this.type, this.total)
        // try {
        this.date.text = this.beforeLast($data.createTime, " ");
        this.type.color = this.total.color = color;
        this.type.text = type;
        this.total.text = $data.prizeAmount.toString();
        // } catch ($e) {
        // }
    };
    WinRecord.prototype.hide = function () {
        try {
            this.date.text = "";
            this.type.text = "";
            this.total.text = "";
        }
        catch ($e) {
        }
    };
    WinRecord.prototype.beforeLast = function (p_string, p_char) {
        if (p_string === null) {
            return '';
        }
        var idx = p_string.lastIndexOf(p_char);
        if (idx === -1) {
            return '';
        }
        return p_string.substr(0, idx);
    };
    return WinRecord;
}());
//# sourceMappingURL=WinRecord.js.map