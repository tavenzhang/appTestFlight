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
var SeanLabel = /** @class */ (function (_super) {
    __extends(SeanLabel, _super);
    function SeanLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeanLabel.prototype.setData = function (nodeData) {
        this.nodeData = nodeData;
    };
    SeanLabel.prototype.getData = function () {
        return this.nodeData;
    };
    //检查当前标签的节点数据中是否有换行
    SeanLabel.prototype.isWrap = function () {
        var f = false;
        for (var i = 0; i < this.nodeData.attr.length; i++) {
            var at = this.nodeData.attr[i];
            if (at.indexOf("wrap") != -1) {
                //有换行属性
                //并且换行属性是第一次,才能换行，使用过的就不能用了
                if (this.attrCount(at) <= 2) {
                    f = true;
                    return f;
                }
            }
        }
        return f;
    };
    //该节点的换行属性用过几次了？
    SeanLabel.prototype.attrCount = function (at) {
        var arr = at.split("-");
        return arr.length;
    };
    //获取是否有缩进属性，没有返回-1，有就返回具体缩进值
    SeanLabel.prototype.getIndent = function () {
        var f = -1;
        for (var i = 0; i < this.nodeData.attr.length; i++) {
            var at = this.nodeData.attr[i];
            if (at.indexOf("fontindent") != -1) {
                //有
                //确保该属性是第一次
                if (this.attrCount(at) <= 2) {
                    var arr = at.split("-");
                    return Number(arr[1]);
                }
            }
        }
        return f;
    };
    return SeanLabel;
}(Laya.Label));
//# sourceMappingURL=SeanLabel.js.map