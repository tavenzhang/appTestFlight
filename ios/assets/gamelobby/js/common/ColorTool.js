/**
 * 颜色工具类
 */
var ColorTool = /** @class */ (function () {
    function ColorTool() {
        this._targetsValue = 16777215;
        this._targetsLastValue = null;
        this.targetsFilter = null;
        this._persent = 0;
        // this.targets = new Array<Laya.Sprite>();
    }
    /**
    * 实例
    */
    ColorTool.getInstance = function () {
        if (ColorTool.instance == null) {
            ColorTool.instance = new ColorTool();
        }
        return ColorTool.instance;
    };
    /**
    * 添加颜色改变对象
    * @param target
    */
    // public addColorTarget(target: Laya.Sprite): void {
    //     this.targets.push(target);
    // } 
    /**
    * 设置颜色改变值
    * @param color
    */
    ColorTool.prototype.targetsChangeColor = function (color) {
        this._targetsLastValue = this._targetsValue;
        this._targetsValue = color;
    };
    /**
    * 设置改变时间
    * @param time
    */
    ColorTool.prototype.colorChange = function (time) {
        Laya.Tween.to(ColorTool.getInstance(), { persent: 1 }, time * 1000, null, Laya.Handler.create(this, this.setPersent, [0]));
    };
    /**
    * 颜色改变函数
    * @param color 目标色值
    * @param lastColor 当前色值
    * @param persent 差值
    */
    ColorTool.prototype.colorFilter = function (color, lastColor, persent) {
        var spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        var result = spliceColor(color);
        var lastResult = spliceColor(lastColor);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = lastResult.r / 255 + (result.r - lastResult.r) / 255 * persent;
        colorMatrix[6] = lastResult.g / 255 + (result.g - lastResult.g) / 255 * persent;
        colorMatrix[12] = lastResult.b / 255 + (result.b - lastResult.b) / 255 * persent;
        return new Laya.ColorFilter(colorMatrix);
    };
    ColorTool.prototype.getColorMatrix = function () {
        var color = this._targetsValue;
        var lastColor = this._targetsLastValue;
        var persent = 1;
        var spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        var result = spliceColor(color);
        var lastResult = spliceColor(lastColor);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = lastResult.r / 255 + (result.r - lastResult.r) / 255 * persent;
        colorMatrix[6] = lastResult.g / 255 + (result.g - lastResult.g) / 255 * persent;
        colorMatrix[12] = lastResult.b / 255 + (result.b - lastResult.b) / 255 * persent;
        return colorMatrix;
    };
    ColorTool.prototype.colorFilterNone = function (color) {
        var spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        var result = spliceColor(color);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        return new Laya.ColorFilter(colorMatrix);
    };
    Object.defineProperty(ColorTool.prototype, "persent", {
        get: function () {
            return this._persent;
        },
        set: function (persent) {
            this._persent = persent;
            var newTargetColorFilter = this.colorFilter(//ColorTool.colorFilter( //
            this._targetsValue, this._targetsLastValue, persent);
            // if (this.targets != null) 
            // {
            //     for (let i = 0; i < this.targets.length; i++) 
            //     {
            //         if (this.targets[i] != null) 
            //         {
            //             this.targets[i].filters = [newTargetColorFilter];
            //         }
            //     }
            // }
        },
        enumerable: true,
        configurable: true
    });
    ColorTool.prototype.setPersent = function (persent) {
        this._persent = persent;
    };
    /**
    * 绿色滤镜
    */
    ColorTool.prototype.getGreenFilter = function () {
        return this.colorFilterNone(0x32CD32);
    };
    /**
    * 灰色滤镜
    */
    ColorTool.prototype.getGrayFilter = function () {
        return this.colorFilterNone(0x6C7B8B);
    };
    /**
    * 黑色滤镜
    */
    ColorTool.prototype.getBlackFilter = function () {
        return this.colorFilterNone(0x000000);
    };
    /**
    * 红色滤镜
    */
    ColorTool.prototype.getRedFilter = function () {
        return this.colorFilterNone(0xFF0000);
    };
    /**
    * 白色滤镜
    */
    ColorTool.prototype.getWhiteFilter = function () {
        return this.colorFilterNone(0xffffff);
    };
    ColorTool.prototype.destroy = function () {
        // if (this.targets != null) 
        // {
        //     this.targets = null;
        // }
        ColorTool.instance = null;
    };
    // private targets: Array<Laya.Sprite> = null;
    ColorTool.instance = null;
    return ColorTool;
}());
//# sourceMappingURL=ColorTool.js.map