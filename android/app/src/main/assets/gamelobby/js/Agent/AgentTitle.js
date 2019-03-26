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
var AgentTitle = /** @class */ (function (_super) {
    __extends(AgentTitle, _super);
    function AgentTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentTitle.prototype.init = function (conf) {
        _super.prototype.init.call(this, conf);
        this.initContent();
    };
    AgentTitle.prototype.initContent = function () {
        // var lb = Tools.addLabels(this,this.conf.lbTest);
        if (this.conf.sprites) {
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                Tools.addSprite(this, spconf);
            }
        }
        if (this.conf.animations) {
            var len = this.conf.animations.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.animations[i];
                Tools.addAnimation(this, spconf);
            }
        }
    };
    return AgentTitle;
}(AgentComBase));
//# sourceMappingURL=AgentTitle.js.map