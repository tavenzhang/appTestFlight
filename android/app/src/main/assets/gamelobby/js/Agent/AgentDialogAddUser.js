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
var AgentDialogAddUser = /** @class */ (function (_super) {
    __extends(AgentDialogAddUser, _super);
    function AgentDialogAddUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentDialogAddUser.getObj = function () {
        return AgentDialogAddUser.obj;
    };
    AgentDialogAddUser.showDialog = function (node, conf) {
        if (!AgentDialogAddUser.obj) {
            var o = new AgentDialogAddUser();
            o.init(node, conf);
            node.addChild(o);
        }
    };
    AgentDialogAddUser.prototype.destroy = function (b) {
        AgentDialogAddUser.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AgentDialogAddUser.prototype.init = function (node, conf) {
        _super.prototype.init.call(this, node, conf);
        this.size(this.conf.bg.size.w, this.conf.bg.size.h);
        this.initContent();
        this.initBtns();
    };
    AgentDialogAddUser.prototype.initContent = function () {
        var lb = Tools.addLabels(this, this.conf.lbTest);
        if (this.conf.name) {
            // var lb = Tools.addSprite(this, this.conf.name.label);
            var inputbg = Tools.addSprite(this, this.conf.name.inputbg);
            this.inputName = Tools.addInput(this, this.conf.name.input);
        }
        if (this.conf.pwd) {
            // var lb = Tools.addSprite(this, this.conf.pwd.label);
            var inputbg = Tools.addSprite(this, this.conf.pwd.inputbg);
            this.inputPwd = Tools.addInput(this, this.conf.pwd.input);
        }
    };
    AgentDialogAddUser.prototype.initBtns = function () {
        if (this.conf.btnreg) {
            this.btnreg = new MyButton();
            this.btnreg.init(this.conf.btnreg, this, this.onRegClick);
            this.btnreg.pos(this.conf.btnreg.pos.x, this.conf.btnreg.pos.y);
            this.addChild(this.btnreg);
        }
    };
    AgentDialogAddUser.prototype.onRegClick = function (e) {
        RegPad.showPad(LoginScene.getObj(), ConfObjRead.getConfLogin().reg);
    };
    return AgentDialogAddUser;
}(AgentDialogBase));
//# sourceMappingURL=AgentDialogAddUser.js.map