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
var AgentContentInvation = /** @class */ (function (_super) {
    __extends(AgentContentInvation, _super);
    function AgentContentInvation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContentInvation.prototype.initContent = function () {
        _super.prototype.initContent.call(this);
        this.sp_content = new MySprite();
        this.addChild(this.sp_content);
        // container.graphics.drawTexture(container, 200, 300);
        this.btnGenInvi = new MyButton();
        this.btnGenInvi.init(this.conf.btnInvi, this, this.onClickBtn);
        this.btnGenInvi.pos(this.conf.btnInvi.pos.x, this.conf.btnInvi.pos.y);
        this.addChild(this.btnGenInvi);
        Tools.addSprite(this, this.conf.infobar);
        this.list = new AgentInvitationList(this, ConfObjRead.getConfAgentInvitationChildren());
        this.addChild(this.list);
        this.list.setData(this.conf.invBlock, ConfObjRead.getConfAgentInviChildrenTest());
        // masker.graphics.drawRect(this.conf.masker.pos.x, this.conf.masker.pos.y, this.conf.masker.size.w, this.conf.masker.size.h, 0xff0000);
        // this.sp_content.x = this.conf.masker.pos.x;
        // this.sp_content.y = this.conf.masker.pos.y;
        // this.sp_content.scrollRect = new Laya.Rectangle(
        //     this.conf.masker.pos.x, this.conf.masker.pos.y, this.conf.masker.size.w, this.conf.masker.size.h
        // );
        // masker.graphics.drawTexture()
        // this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
    };
    //     public updatelist(): void {
    //         let total: number = 4;
    //         let startX: number = this.conf.infobar.pos.x;
    //         let startY: number = this.conf.infobar.pos.y + this.conf.infobar.size.h + 6;
    //         let container = this.sp_content;
    //         var h = 0;
    //         for (let i: number = 0; i < total; i++) {
    //             let block: AgentInvitationItem = new AgentInvitationItem();
    //             container.addChild(block);
    //             block.init(this.conf.invBlock);
    //             block.x = startX;
    //             block.y = i * (this.conf.invBlock.size.h) + startY;
    //             h + block.height;
    //         }
    // console.log("g", this.conf)
    //         this.sp_content.size(this.conf.list.size.w, h);
    //     }
    AgentContentInvation.prototype.onClickBtn = function (e) {
        AgentDialogInvitation.showDialog(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAgentDialogInvitation());
    };
    return AgentContentInvation;
}(AgentContent));
//# sourceMappingURL=AgentContentInvation.js.map