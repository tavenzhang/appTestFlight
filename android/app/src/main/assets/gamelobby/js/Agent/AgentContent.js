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
var AgentContent = /** @class */ (function (_super) {
    __extends(AgentContent, _super);
    function AgentContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContent.prototype.init = function (conf) {
        _super.prototype.init.call(this, conf);
        this.initContent();
    };
    AgentContent.prototype.initContent = function () {
        var lb = Tools.addLabels(this, this.conf.lbTest);
    };
    return AgentContent;
}(AgentComBase));
//# sourceMappingURL=AgentContent.js.map