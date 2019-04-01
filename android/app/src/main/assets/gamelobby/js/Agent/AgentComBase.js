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
var AgentComBase = /** @class */ (function (_super) {
    __extends(AgentComBase, _super);
    function AgentComBase(node, conf) {
        var _this = _super.call(this) || this;
        _this.fatherNode = node;
        _this.init(conf);
        return _this;
    }
    AgentComBase.prototype.init = function (conf) {
        this.conf = conf;
        this.data = null;
        this.initBg();
        if (this.conf.pos) {
            this.pos(this.conf.pos.x, this.conf.pos.y);
        }
    };
    AgentComBase.prototype.initBg = function () {
        if (this.conf.bg) {
            var bg = Tools.addSprite(this, this.conf.bg);
        }
    };
    AgentComBase.prototype.setData = function (data) {
        this.data = data;
    };
    return AgentComBase;
}(Laya.Sprite));
//# sourceMappingURL=AgentComBase.js.map