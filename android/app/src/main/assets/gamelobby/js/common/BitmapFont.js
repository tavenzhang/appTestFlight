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
/*
* 位图字体
*注意：素材要保持高度一致
*要设置了text后才能正常获取宽和高
*/
var BitmapFont = /** @class */ (function (_super) {
    __extends(BitmapFont, _super);
    function BitmapFont(config) {
        var _this = _super.call(this) || this;
        _this._spacing = 0;
        _this.bits = [];
        _this.config = config;
        return _this;
    }
    Object.defineProperty(BitmapFont.prototype, "text", {
        /**
         * 设置文本内容
         */
        set: function (value) {
            this._txt = value;
            this.reset();
            this.creatFont();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFont.prototype, "spacing", {
        /**
         * 设置字间距(def=0)
         */
        set: function (value) {
            var _this = this;
            this._spacing = value;
            var index = 0;
            var tox = 0;
            this.bits.forEach(function (bit) {
                bit.x = tox;
                index++;
                tox += bit.width + _this._spacing;
            });
            if (tox > 0)
                this.width = tox - this._spacing;
        },
        enumerable: true,
        configurable: true
    });
    BitmapFont.prototype.reset = function () {
        this.bits.forEach(function (bit) {
            bit.destroy(true);
        });
        this.bits.length = 0;
    };
    BitmapFont.prototype.creatFont = function () {
        var _this = this;
        var strArr = this._txt.split("");
        var index = 0;
        var tox = 0;
        var maxH = 0;
        strArr.forEach(function (str) {
            var url = _this.config[str];
            if (url) {
                var bit = new Laya.Image(url);
                bit.x = tox;
                _this.addChild(bit);
                _this.bits.push(bit);
                index++;
                tox += bit.width + _this._spacing;
                if (bit.height > maxH)
                    maxH = bit.height;
            }
        });
        this.width = tox - this._spacing;
        this.height = maxH;
    };
    BitmapFont.prototype.destroy = function () {
        this.reset();
        this.bits = null;
        _super.prototype.destroy.call(this, true);
    };
    return BitmapFont;
}(Laya.Sprite));
//# sourceMappingURL=BitmapFont.js.map