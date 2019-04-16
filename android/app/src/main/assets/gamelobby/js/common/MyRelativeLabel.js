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
var MyRelativeLabel = /** @class */ (function (_super) {
    __extends(MyRelativeLabel, _super);
    function MyRelativeLabel(bdebug) {
        if (bdebug === void 0) { bdebug = false; }
        var _this = _super.call(this) || this;
        _this.bDebug = false;
        _this.bSized = false;
        _this.bDebug = bdebug;
        return _this;
        // Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
    }
    MyRelativeLabel.prototype.trace = function (ct) {
        // Debug.trace("MyRelative.trace bDebug:"+this.bDebug+" ct:"+ct);
        if (!this.bDebug) {
            return;
        }
        Debug.trace(ct);
    };
    MyRelativeLabel.prototype.pos = function (x, y, speedMode) {
        if (speedMode === void 0) { speedMode = false; }
        _super.prototype.pos.call(this, x, y, false);
        this.trace("MyRelativeLabel.pos x:" + x + " y:" + y + " resize");
        this.onResize();
        return this;
    };
    MyRelativeLabel.prototype.getMinValue = function (a, b, c) {
        var obj = {};
        var min = 0;
        var id = -1;
        if (a <= 0) {
            obj.id = 0;
            obj.value = 0;
            return obj;
        }
        else if (b <= 0) {
            obj.id = 1;
            obj.value = 0;
            return obj;
        }
        else if (c <= 0) {
            obj.id = 2;
            obj.value = 0;
            return obj;
        }
        else {
            if (a < b) {
                if (a < c) {
                    min = a;
                    id = 0;
                }
                else {
                    min = c;
                    id = 2;
                }
            }
            else {
                if (b < c) {
                    min = b;
                    id = 1;
                }
                else {
                    min = c;
                    id = 2;
                }
            }
        }
        obj.id = id;
        obj.value = min;
        return obj;
    };
    MyRelativeLabel.prototype.onResize = function () {
        // if( !this.bSized )
        // {
        //     return;
        // }
        this.trace("MyRelativeLabel.resize");
        var w = this.width; //this.getGraphicBounds().width;//this.getSelfBounds().width;//this.getChildrenWidth();
        var h = this.height; //this.getGraphicBounds().height;//this.getSelfBounds().height;//this.getChildrenHeight();
        this.trace("MyRelativeLabel.onResize w:" + w + " h:" + h + " x:" + this.x + " y:" + this.y);
        var dX = this.x;
        var dY = this.y;
        var dScreenW = Laya.stage.designWidth;
        var dScreenH = Laya.stage.designHeight;
        var dCenterX = Laya.stage.designWidth / 2;
        var dCenterY = Laya.stage.designHeight / 2;
        var dW = w; //this.width;
        var dH = h; //this.height;
        var rW = Laya.stage.width;
        var rH = Laya.stage.height;
        var sumLeft = dX;
        var sumRight = (dScreenW - (dX + dW));
        var sumCenterX = Math.abs(dScreenW / 2 - (dX + dW / 2));
        this.trace("MyRelativeLabel.onResize rW:" + rW + " rH:" + rH + " dscreenw:" + dScreenW + " dw:" + dW + " sumLeft:" + sumLeft + " sumRight:" + sumRight + " sumCenter:" + sumCenterX);
        var p = 0, rX = 0;
        //找出距离最近的
        var minX = this.getMinValue(sumLeft, sumRight, sumCenterX);
        switch (minX.id) {
            case 0:
                //靠左最近，相对左边的百分比
                p = this.x / dScreenW;
                rX = rW * p;
                this.x = rX;
                break;
            case 1:
                //靠右
                p = sumRight / dScreenW;
                rX = rW * p;
                this.x = rW - rX - dW;
                break;
            default:
                //靠中
                p = sumCenterX / dScreenW;
                rX = rW * p;
                this.x = (rW / 2 - rX / 2 - dW / 2);
                break;
        }
        this.trace("MyRelativeLabel.onResize minX.id:" + minX.id + " p:" + p + " rX:" + rX + " this.x:" + this.x);
    };
    return MyRelativeLabel;
}(Laya.Label));
//# sourceMappingURL=MyRelativeLabel.js.map