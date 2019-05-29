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
var Notice_Share = /** @class */ (function (_super) {
    __extends(Notice_Share, _super);
    function Notice_Share() {
        var _this = _super.call(this) || this;
        _this.limit = 0;
        return _this;
    }
    Notice_Share.prototype.init = function (node) {
        this.node = node;
        this.friend_up.visible = true;
        this.friend_down.visible = false;
        this.circle_up.visible = true;
        this.circle_down.visible = false;
        this.friend_up.on(Laya.Event.MOUSE_DOWN, this, this.onclick);
        this.friend_down.on(Laya.Event.MOUSE_UP, this, this.onclick);
        this.circle_up.on(Laya.Event.MOUSE_DOWN, this, this.onclick);
        this.circle_down.on(Laya.Event.MOUSE_UP, this, this.onclick);
        this.on(Laya.Event.MOUSE_UP, this, this.onclick);
        this.limit = 0;
    };
    Notice_Share.prototype.setData = function ($data) {
        this.noticeid = $data.noticeid;
        this.image.skin = $data.img;
        this.limit = $data.noticeShare.upperLimit;
    };
    Notice_Share.prototype.onclick = function ($e) {
        if ($e.type === Laya.Event.MOUSE_DOWN) {
            switch ($e.currentTarget) {
                case this.friend_up:
                    this.friend_up.visible = false;
                    this.friend_down.visible = true;
                    break;
                case this.circle_up:
                    this.circle_up.visible = false;
                    this.circle_down.visible = true;
                    break;
            }
        }
        else if ($e.type === Laya.Event.MOUSE_UP) {
            switch ($e.currentTarget) {
                case this.friend_up:
                case this.friend_down:
                    this.friend_up.visible = true;
                    this.friend_down.visible = false;
                    this.circle_up.visible = true;
                    this.circle_down.visible = false;
                    PostMHelp.game_common({ "do": "share", "type": "friend", "param": this.noticeid });
                    // let message: string;
                    // if (this.limit > 0) {
                    //     this.limit--;
                    //     message = "分享成功，请前往邮件领取奖励";
                    // }
                    // else {
                    //     message = "分享成功，请多点和朋友分享乐趣吧";
                    // }
                    // Laya.timer.once(1000, this,
                    //     AgentDialogSucess.showDialog, [this.node, ConfObjRead.getConfAgentDialogDeleteInvitation(), message]
                    // );
                    break;
                case this.circle_up:
                case this.circle_down:
                    this.friend_up.visible = true;
                    this.friend_down.visible = false;
                    this.circle_up.visible = true;
                    this.circle_down.visible = false;
                    PostMHelp.game_common({ "do": "share", "type": "circle", "param": this.noticeid });
                    // let message2: string;
                    // if (this.limit > 0) {
                    //     this.limit--;
                    //     message2 = "分享成功，请前往邮件领取奖励";
                    // }
                    // else {
                    //     message2 = "分享成功，请多点和朋友分享乐趣吧";
                    // }
                    // Laya.timer.once(1000, this,
                    //     AgentDialogSucess.showDialog, [this.node, ConfObjRead.getConfAgentDialogDeleteInvitation(), message2]
                    // );
                    break;
                default:
                    {
                        this.friend_up.visible = true;
                        this.friend_down.visible = false;
                        this.circle_up.visible = true;
                        this.circle_down.visible = false;
                    }
            }
        }
        // switch ($e.currentTarget) {
        //     case this.friend_up:
        //         break;
        // }
    };
    Notice_Share.prototype.shareSucess = function ($type) {
        var message;
        if ($type === "friend") {
            if (this.limit > 0) {
                this.limit--;
                message = "分享成功，请前往邮件领取奖励";
            }
            else {
                message = "分享成功，请多点和朋友分享乐趣吧";
            }
            AgentDialogSucess.showDialog(this.node, ConfObjRead.getConfAgentDialogDeleteInvitation(), message);
        }
        else if ($type === "circle") {
            if (this.limit > 0) {
                this.limit--;
                message = "分享成功，请前往邮件领取奖励";
            }
            else {
                message = "分享成功，请多点和朋友分享乐趣吧";
            }
            AgentDialogSucess.showDialog(this.node, ConfObjRead.getConfAgentDialogDeleteInvitation(), message);
        }
    };
    return Notice_Share;
}(ui.dlg.notice.NoticeShareUI));
//# sourceMappingURL=Notice_Share.js.map