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
var AgentTab = /** @class */ (function (_super) {
    __extends(AgentTab, _super);
    function AgentTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentTab.prototype.init = function (conf) {
        _super.prototype.init.call(this, conf);
        this.initContent();
    };
    AgentTab.prototype.initContent = function () {
        this.arr_btns = new Array();
        // var lb = Tools.addLabels(this,this.conf.lbTest);
        if (this.conf.menus) {
            var blen = this.conf.menus.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.menus[a];
                var b = new MyButton();
                b.init(btnconf, this, this.onClickBtn);
                b.setQuery(btnconf.cmd);
                this.addChild(b);
                this.arr_btns.push(b);
            }
        }
    };
    AgentTab.prototype.onClickBtn = function (e) {
        Debug.trace("AgentTab onClickBtn e:");
        Debug.trace(e);
    };
    return AgentTab;
}(AgentComBase));
//# sourceMappingURL=AgentTab.js.map