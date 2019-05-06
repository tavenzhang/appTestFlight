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
var AgentListMyChildren = /** @class */ (function (_super) {
    __extends(AgentListMyChildren, _super);
    function AgentListMyChildren() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentListMyChildren.prototype.addItem = function (d) {
        var sp = _super.prototype.addItem.call(this, d);
        if (d.usertype == "玩家") {
            var b = new MyButton();
            b.init(this.conf.list.btnmodify, this, this.onClickItem);
            b.setQuery(this.conf.list.btnmodify.cmd);
            sp.addChild(b);
            if (AgentData.level <= 8) {
                b.visible = false;
            }
        }
        return sp;
    };
    return AgentListMyChildren;
}(AgentList));
//# sourceMappingURL=AgentListMyChildren.js.map