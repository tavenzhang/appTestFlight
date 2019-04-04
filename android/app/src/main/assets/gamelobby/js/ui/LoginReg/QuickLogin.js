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
var QuickLogin = /** @class */ (function (_super) {
    __extends(QuickLogin, _super);
    function QuickLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yzm = null;
        return _this;
    }
    QuickLogin.getObj = function () {
        return QuickLogin.obj;
    };
    QuickLogin.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!QuickLogin.obj) {
            var o = new QuickLogin(node, conf);
            o.caller = caller;
            o.callback = callback;
            node.addChild(o);
        }
    };
    QuickLogin.prototype.destroy = function (b) {
        QuickLogin.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    QuickLogin.prototype.init = function (conf) {
        QuickLogin.obj = this;
        _super.prototype.init.call(this, conf);
        this.initContent();
    };
    QuickLogin.prototype.initContent = function () {
        if (this.conf.sprites) {
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                Tools.addSprite(this, spconf);
            }
        }
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
        if (this.conf.yzm) {
            this.yzm = new YZM();
            this.yzm.init(this, ConfObjRead.getConfYZM());
            this.addChild(this.yzm);
        }
    };
    QuickLogin.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "login":
                break;
            case "other":
                if (this.callback && this.caller) {
                    this.callback.apply(this.caller, [cmd]);
                }
                break;
        }
    };
    return QuickLogin;
}(AgentComBase));
//# sourceMappingURL=QuickLogin.js.map