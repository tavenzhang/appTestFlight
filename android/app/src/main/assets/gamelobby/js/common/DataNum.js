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
//数码管
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
        Debug.trace("DataNum.setNum:" + num);
        this.num = num;
        this.releaseNum();
        this.createNum();
    };
    DataNum.prototype.releaseNum = function () {
        for (var a = 0; a < this.arr_sp_num.length; a++) {
            var sp = this.arr_sp_num[a];
            sp.destroy(true);
        }
        this.arr_sp_num.splice(0, this.arr_sp_num.length);
    };
    DataNum.prototype.createNum = function () {
        //将数字切分为独立的单个数字
        var arr_num = Tools.splitString(this.num);
        //遍历字符串数组
        var id = 0;
        var lastRight = 0;
        for (var a = 0; a < arr_num.length; a++) {
            //逐个转数字，直接从资源数组中取出对应资源，创建sp
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
    //获取该数值的宽度
    DataNum.prototype.getWidth = function () {
        var w = 0;
        //遍历所有数字，累加所有的宽度
        for (var i = 0; i < this.arr_sp_num.length; i++) {
            var sp = this.arr_sp_num[i];
            var wid = sp.width;
            w += wid;
        }
        return w;
    };
    return DataNum;
}(Laya.Sprite));
//# sourceMappingURL=DataNum.js.map