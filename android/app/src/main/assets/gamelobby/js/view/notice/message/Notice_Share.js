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
        this.data = $data;
        this.noticeid = $data.noticeid;
        Laya.timer.once(500, this, this.showLoading);
        Laya.loader.load($data.img, Laya.Handler.create(this, function () {
            Laya.timer.clear(this, this.showLoading);
            LayaMain.getInstance().showCircleLoading(false);
            this.image.skin = $data.img;
            if ($data.jumpHref != "") {
                this.image.once(Laya.Event.CLICK, this, this.requestJump);
            }
        }));
        this.limit = $data.noticeShare.upperLimit;
    };
    Notice_Share.prototype.showLoading = function () {
        LayaMain.getInstance().showCircleLoading();
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
            SoundPlayer.enterPanelSound();
        }
        else if ($e.type === Laya.Event.MOUSE_UP) {
            switch ($e.currentTarget) {
                case this.friend_up:
                case this.friend_down:
                    this.friend_up.visible = true;
                    this.friend_down.visible = false;
                    this.circle_up.visible = true;
                    this.circle_down.visible = false;
                    PostMHelp.game_common({ "do": "share", "type": "friend", "param": this.image.skin });
                    NoticeData.shareId = this.noticeid;
                    break;
                case this.circle_up:
                case this.circle_down:
                    this.friend_up.visible = true;
                    this.friend_down.visible = false;
                    this.circle_up.visible = true;
                    this.circle_down.visible = false;
                    PostMHelp.game_common({ "do": "share", "type": "circle", "param": this.image.skin });
                    NoticeData.shareId = this.noticeid;
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
    Notice_Share.prototype.requestJump = function () {
        if (!this.data.jumpGame && !this.data.jumpInner) {
            if (GameUtils.isNativeApp)
                PostMHelp.game_common({ name: "openWeb", param: this.data.jumpHref });
            else
                window.open(this.data.jumpHref);
        }
        else if (this.data.jumpGame) {
            EventManager.dispath(EventType.JUMP_GAME, this.data.jumpHref);
        }
        else {
            var s = this.data.jumpHref.toString();
            InnerJumpUtil.doJump(DlgCmd[s]);
        }
        this.event("jump");
    };
    return Notice_Share;
}(ui.dlg.notice.NoticeShareUI));
//# sourceMappingURL=Notice_Share.js.map