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
var AgentPad = /** @class */ (function (_super) {
    __extends(AgentPad, _super);
    function AgentPad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentPad.getObj = function () {
        return AgentPad.obj;
    };
    AgentPad.showPad = function (node, conf) {
        if (!AgentPad.obj) {
            var o = new AgentPad();
            o.init(node, conf);
            node.addChild(o);
        }
    };
    AgentPad.prototype.destroy = function (b) {
        AgentPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AgentPad.prototype.init = function (node, conf) {
        AgentPad.obj = this;
        _super.prototype.init.call(this, node, conf);
        this.initContent();
    };
    AgentPad.prototype.setData = function (data) {
        this.data = data;
    };
    AgentPad.prototype.initContent = function () {
        var tt = new AgentTitle(this, ConfObjRead.getConfAgentTitle());
        this.addChild(tt);
        // var ct = new AgentContentInfo(this,ConfObjRead.getConfAgentContentInfo());
        // this.addChild(ct);
        this.contentpage = new Laya.Sprite();
        this.addChild(this.contentpage);
        var tab = new AgentTab(this, ConfObjRead.getConfAgentTab());
        tab.setListener(this, this.switchTab);
        this.addChild(tab);
        if (tab.arr_btns.length > 0) {
            tab.onClickBtn(tab.arr_btns[this.conf.defaultTabId]);
        }
        // AgentDialogAddUser.showDialog(this,ConfObjRead.getConfAgentDialogAddUser());
    };
    AgentPad.prototype.clearContent = function () {
        this.contentpage.destroyChildren();
    };
    AgentPad.prototype.switchTab = function (target, cmd) {
        this.clearContent();
        switch (cmd) {
            case "agentinfo":
                var ct1 = new AgentContentInfo(this, ConfObjRead.getConfAgentContentInfo());
                this.contentpage.addChild(ct1);
                break;
            case "mychildren":
                var ct2 = new AgentContentMyChildren(this, ConfObjRead.getConfAgentContentMyChildren());
                this.contentpage.addChild(ct2);
                break;
            case "myincome":
                var ct3 = new AgentContentMyIncome(this, ConfObjRead.getConfAgentContentMyIncome());
                this.contentpage.addChild(ct3);
                break;
            case "invation":
                var ct4 = new AgentContentInvation(this, ConfObjRead.getConfAgentContentInvation());
                this.contentpage.addChild(ct4);
                break;
            case "agentdesc":
                var ct5 = new AgentContentDesc(this, ConfObjRead.getConfAgentContentDesc());
                this.contentpage.addChild(ct5);
                break;
        }
    };
    return AgentPad;
}(AgentDialogBase));
//# sourceMappingURL=AgentPad.js.map