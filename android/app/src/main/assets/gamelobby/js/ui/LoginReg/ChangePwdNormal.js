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
var ChangePwdNormal = /** @class */ (function (_super) {
    __extends(ChangePwdNormal, _super);
    function ChangePwdNormal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePwdNormal.getObj = function () {
        return ChangePwdNormal.obj;
    };
    ChangePwdNormal.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!ChangePwdNormal.obj) {
            var o = new ChangePwdNormal();
            o.init(node, conf);
            o.setCloseListener(caller, callback);
            node.addChild(o);
        }
    };
    ChangePwdNormal.prototype.destroy = function (b) {
        ChangePwdNormal.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    ChangePwdNormal.prototype.init = function (node, conf) {
        ChangePwdNormal.obj = this;
        _super.prototype.init.call(this, node, conf);
    };
    return ChangePwdNormal;
}(ChangePwd));
//# sourceMappingURL=ChangePwdNormal.js.map