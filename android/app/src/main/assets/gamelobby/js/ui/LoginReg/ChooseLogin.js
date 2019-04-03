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
var ChooseLogin = /** @class */ (function (_super) {
    __extends(ChooseLogin, _super);
    function ChooseLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChooseLogin.getObj = function () {
        return ChooseLogin.obj;
    };
    ChooseLogin.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!ChooseLogin.obj) {
            var o = new ChooseLogin(node, conf);
            o.caller = caller;
            o.callback = callback;
            node.addChild(o);
        }
    };
    ChooseLogin.prototype.destroy = function (b) {
        ChooseLogin.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    ChooseLogin.prototype.init = function (conf) {
        ChooseLogin.obj = this;
        _super.prototype.init.call(this, conf);
        this.initContent();
    };
    ChooseLogin.prototype.initContent = function () {
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
    };
    ChooseLogin.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [cmd]);
        }
        // switch(cmd)
        // {
        //     case "quicklogin":
        //     break;
        //     case "accountlogin":
        //     break;
        // }
    };
    return ChooseLogin;
}(AgentComBase));
//# sourceMappingURL=ChooseLogin.js.map