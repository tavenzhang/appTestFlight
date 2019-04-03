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
var AgentSwitchBtn = /** @class */ (function (_super) {
    __extends(AgentSwitchBtn, _super);
    function AgentSwitchBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentSwitchBtn.prototype.initLabels = function (conf) {
        this.spLabel = Tools.addSprite(this, conf.label);
        this.spExtern = Tools.addSprite(this, conf.extern);
        this.setOn(0);
    };
    AgentSwitchBtn.prototype.setOn = function (n) {
        _super.prototype.setOn.call(this, n, false);
        if (n == 1) {
            this.spExtern.visible = true;
        }
        else {
            this.spExtern.visible = false;
        }
    };
    return AgentSwitchBtn;
}(MySwitchBtn));
//# sourceMappingURL=AgentSwitchBtn.js.map