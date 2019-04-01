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
    SeanLabel.prototype.isWrap = function () {
        var f = false;
        for (var i = 0; i < this.nodeData.attr.length; i++) {
            var at = this.nodeData.attr[i];
            if (at.indexOf("wrap") != -1) {
                if (this.attrCount(at) <= 2) {
                    f = true;
                    return f;
                }
            }
        }
        return f;
    };
    SeanLabel.prototype.attrCount = function (at) {
        var arr = at.split("-");
        return arr.length;
    };
    SeanLabel.prototype.getIndent = function () {
        var f = -1;
        for (var i = 0; i < this.nodeData.attr.length; i++) {
            var at = this.nodeData.attr[i];
            if (at.indexOf("fontindent") != -1) {
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