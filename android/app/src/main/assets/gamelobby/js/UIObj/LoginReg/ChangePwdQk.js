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
var ChangePwdQk = /** @class */ (function (_super) {
    __extends(ChangePwdQk, _super);
    function ChangePwdQk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePwdQk.getObj = function () {
        return ChangePwdQk.obj;
    };
    ChangePwdQk.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!ChangePwdQk.obj) {
            var o = new ChangePwdQk();
            o.init(node, conf);
            o.setCloseListener(caller, callback);
            node.addChild(o);
        }
    };
    ChangePwdQk.prototype.destroy = function (b) {
        ChangePwdQk.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    ChangePwdQk.prototype.init = function (node, conf) {
        ChangePwdQk.obj = this;
        _super.prototype.init.call(this, node, conf);
    };
    ChangePwdQk.prototype.setOldPwd = function (pwd) {
        var o = this.getInputByData("oldpwd");
        o.text = pwd;
    };
    return ChangePwdQk;
}(ChangePwd));
//# sourceMappingURL=ChangePwdQk.js.map