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
var AgentContentDesc = /** @class */ (function (_super) {
    __extends(AgentContentDesc, _super);
    function AgentContentDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContentDesc.prototype.initContent = function () {
        _super.prototype.initContent.call(this);
        if (this.conf.sprites) {
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                Tools.addSprite(this, spconf);
            }
        }
        if (this.conf.labels) {
            var len = this.conf.labels.length;
            for (var i = 0; i < len; i++) {
                var lbconf = this.conf.labels[i];
                Tools.addLabels(this, lbconf);
            }
        }
        this.arr_btns = new Array();
        if (this.conf.menus) {
            var blen = this.conf.menus.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.menus[a];
                var b = new AgentButton();
                b.init(btnconf, this, this.onClickBtn);
                b.setQuery(btnconf.cmd);
                this.addChild(b);
                this.arr_btns.push(b);
            }
        }
    };
    AgentContentDesc.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "copyinvation":
                break;
            case "copylink":
                break;
            case "share":
                break;
        }
    };
    return AgentContentDesc;
}(AgentContent));
//# sourceMappingURL=AgentContentDesc.js.map