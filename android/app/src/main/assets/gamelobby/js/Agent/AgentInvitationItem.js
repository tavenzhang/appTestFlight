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
var AgentInvitationItem = /** @class */ (function (_super) {
    __extends(AgentInvitationItem, _super);
    function AgentInvitationItem() {
        return _super.call(this) || this;
    }
    AgentInvitationItem.prototype.init = function (conf) {
        Tools.addSprite(this, conf.bg);
        this._code = Tools.newLabel(conf.code.font.text, conf.code.size.w, conf.code.size.h, conf.code.font.size, conf.code.font.color, conf.code.font.align, conf.code.font.valign, conf.code.font.name, conf.code.font.wrap, conf.code.font.underline);
        this._code.pos(conf.code.pos.x, conf.code.pos.y);
        this.addChild(this._code);
        if (conf.inputlink) {
            this._link = Tools.addInput(this, conf.inputlink);
        }
        this._copyBtn = new MyButton();
        this._copyBtn.init(conf.btnCopy, this, this.onClickBtn);
        this._copyBtn.pos(conf.btnCopy.pos.x, conf.btnCopy.pos.y);
        this.addChild(this._copyBtn);
        this._shareBtn = new MyButton();
        this._shareBtn.init(conf.btnShare, this, this.onClickBtn);
        this._shareBtn.pos(conf.btnShare.pos.x, conf.btnShare.pos.y);
        this.addChild(this._shareBtn);
        this._delBtn = new MyButton();
        this._delBtn.init(conf.btnDelete, this, this.onClickBtn);
        this._delBtn.pos(conf.btnDelete.pos.x, conf.btnDelete.pos.y);
        this.addChild(this._delBtn);
        this._qr = Tools.newSprite(conf.qr);
        this.addChild(this._qr);
        this._qr.pivot(this._qr.width / 2, this._qr.height / 2);
        this._qr.on(Laya.Event.MOUSE_DOWN, this, this.onClickBtn);
    };
    AgentInvitationItem.prototype.onClickBtn = function (e) {
        var btn = e;
        switch (btn) {
            case this._qr:
                var scalesx = this._qr.scaleX;
                var scalesy = this._qr.scaleY;
                var scalestoX = this._qr.scaleX + .05;
                var scalestoY = this._qr.scaleY + .05;
                Laya.Tween.to(this._qr, { scaleX: scalestoX, scaleY: scalestoY }, 80);
                Laya.Tween.to(this._qr, { scaleX: scalesx, scaleY: scalesy }, 80, Laya.Ease.backOut, null, 80);
                break;
            case this._delBtn:
                AgentDialogDeleteInvitation.showDialog(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAgentDialogDeleteInvitation());
                break;
        }
    };
    AgentInvitationItem.prototype.setData = function (d) {
        this.data = d;
    };
    return AgentInvitationItem;
}(MySprite));
//# sourceMappingURL=AgentInvitationItem.js.map