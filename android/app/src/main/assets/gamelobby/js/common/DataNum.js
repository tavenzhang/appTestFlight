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
var DataNum = /** @class */ (function (_super) {
    __extends(DataNum, _super);
    function DataNum(conf) {
        var _this = _super.call(this) || this;
        _this.num = "00";
        _this.arr_sp_num = null;
        _this.init(conf);
        return _this;
    }
    DataNum.prototype.init = function (conf) {
        this.conf = conf;
        // this.createNum();
        this.arr_sp_num = new Array();
    };
    DataNum.prototype.setNum = function (num) {
        // Debug.trace("DataNum.setNum:"+num);
        this.num = num;
        this.releaseNum();
        this.createNum();
    };
    DataNum.prototype.releaseNum = function () {
        var len = this.arr_sp_num.length;
        if (len > 0) {
            for (var a = 0; a < len; a++) {
                var sp = this.arr_sp_num[a];
                sp.destroy(true);
            }
            this.arr_sp_num.splice(0, len);
        }
    };
    DataNum.prototype.createNum = function () {
        var arr_num = Tools.splitString(this.num);
        var id = 0;
        var lastRight = 0;
        for (var a = 0; a < arr_num.length; a++) {
            var str = arr_num[a];
            var src = this.getSrcByKey(str);
            if (src) {
                var conf = {
                    "src": src,
                    "pos": {
                        "x": 0,
                        "y": 0
                    }
                };
                var sp = Tools.addSprite(this, conf);
                this.arr_sp_num.push(sp);
                var w = sp.width;
                var h = sp.height;
                // var x = id * w;
                var x = lastRight; // + w;
                var y = 0;
                sp.pos(x, y);
                lastRight = x + w;
            }
            id++;
        }
    };
    DataNum.prototype.getSrcByKey = function (key) {
        for (var i = 0; i < this.conf.src.length; i++) {
            var obj = this.conf.src[i];
            if (obj.key == key) {
                return obj.src;
            }
        }
        return null;
    };
    DataNum.prototype.getWidth = function () {
        var w = 0;
        for (var i = 0; i < this.arr_sp_num.length; i++) {
            var sp = this.arr_sp_num[i];
            var wid = sp.width;
            w += wid;
        }
        return w;
    };
    return DataNum;
}(MySprite));
//# sourceMappingURL=DataNum.js.map