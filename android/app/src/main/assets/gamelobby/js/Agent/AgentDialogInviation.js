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
var AgentDialogInvitation = /** @class */ (function (_super) {
    __extends(AgentDialogInvitation, _super);
    function AgentDialogInvitation() {
        return _super.call(this) || this;
    }
    AgentDialogInvitation.getContainer = function () {
        return AgentDialogAddUser.container;
    };
    AgentDialogInvitation.getObj = function () {
        return AgentDialogInvitation.obj;
    };
    AgentDialogInvitation.showDialog = function (node, conf) {
        if (!AgentDialogInvitation.obj) {
            var o = new AgentDialogInvitation();
            // o.size(conf.bg.size.w, conf.bg.size.h);
            o.init(node, conf);
            node.addChild(o);
        }
    };
    AgentDialogInvitation.prototype.destroy = function (b) {
        AgentDialogInvitation.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AgentDialogInvitation.prototype.init = function (node, conf) {
        var container = AgentDialogInvitation.container = new Laya.Sprite();
        _super.prototype.init.call(this, node, conf);
        this.size(this.conf.bg.size.w, this.conf.bg.size.h);
        this.initContent();
        this.initBtns();
        this.addChild(container);
        // container.size(200, 300)
        container.width = this.conf.bg.size.w;
        container.height = this.conf.bg.size.h;
        container.pivotX = this.conf.bg.size.w / 2;
        container.pivotY = this.conf.bg.size.h / 2;
        container.x = this.conf.alphabg.size.w / 2;
        container.y = this.conf.alphabg.size.h / 2;
        Laya.Tween.from(container, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
    };
    AgentDialogInvitation.prototype.initClose = function () {
        if (!this.conf.close) {
            return;
        }
        var container = AgentDialogInvitation.container;
        var close = new MyButton();
        close.init(this.conf.close, this, this.onClose);
        close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
        container.addChild(close);
    };
    AgentDialogInvitation.prototype.initBg = function () {
        var container = AgentDialogInvitation.container;
        if (!this.conf.bg) {
            return;
        }
        var bg = Tools.addSprite(container, this.conf.bg);
    };
    AgentDialogInvitation.prototype.initContent = function () {
        // var lb = Tools.addLabels(this, this.conf.lbTest);
        // if (this.conf.label) {
        var container = AgentDialogInvitation.container;
        Tools.addSprite(container, this.conf.label);
        Tools.addSprite(container, this.conf.pattern);
        var inputbg = Tools.addSprite(container, this.conf.name.inputbg);
        this.inputCode = Tools.addInput(container, this.conf.name.input);
    };
    AgentDialogInvitation.prototype.initBtns = function () {
        var container = AgentDialogInvitation.container;
        if (this.conf.btnok) {
            this.btnok = new MyButton();
            this.btnok.init(this.conf.btnok, this, this.onRegClick);
            this.btnok.pos(this.conf.btnok.pos.x, this.conf.btnok.pos.y);
            container.addChild(this.btnok);
        }
        this.btnInvi = new MyButton();
        this.btnInvi.init(this.conf.btnInvi, this, this.onRegClick);
        this.btnInvi.pos(this.conf.btnInvi.pos.x, this.conf.btnInvi.pos.y);
        container.addChild(this.btnInvi);
    };
    AgentDialogInvitation.prototype.onRegClick = function (e) {
        // RegPad.showPad(LoginScene.getObj(), ConfObjRead.getConfLogin().reg);
    };
    return AgentDialogInvitation;
}(AgentDialogBase));
//# sourceMappingURL=AgentDialogInviation.js.map