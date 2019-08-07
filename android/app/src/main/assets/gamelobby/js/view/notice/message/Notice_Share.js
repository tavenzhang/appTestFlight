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
        AgentModel.checkAndCreatAffcode();
    };
    Notice_Share.prototype.setData = function ($data) {
        this.data = $data;
        this.noticeid = $data.noticeid;
        //延时打开图片遮罩
        Laya.timer.once(10, this, this.showImageLoading);
        //加载图片
        Laya.loader.load($data.img, Laya.Handler.create(this, function () {
            if (this.destroyed)
                return; //如果已经被销毁了，则不执行后面逻辑
            //test
            //Laya.timer.once(2500, this, this.hideImageLoading);
            //关闭遮罩显示计时器
            Laya.timer.clear(this, this.showImageLoading);
            //关闭图片加载遮罩
            this.hideImageLoading();
            //设置图片
            this.image.skin = $data.img;
            if ($data.jumpHref != "") {
                this.image.on(Laya.Event.CLICK, this, this.requestJump);
            }
        }));
        this.limit = $data.noticeShare.upperLimit;
    };
    /**
     * 打开图片加载遮罩
     */
    Notice_Share.prototype.showImageLoading = function () {
        if (!this.embedLoading) {
            this.embedLoading = new view.EmbedLoadingView();
        }
        this.embedLoading.EmbedBox(this);
    };
    /**
     * 关闭图片加载遮罩
     */
    Notice_Share.prototype.hideImageLoading = function () {
        if (this.embedLoading) {
            this.embedLoading.destroy();
            this.embedLoading = null;
        }
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
            var invatVo = void 0;
            var affcode = null;
            switch ($e.currentTarget) {
                case this.friend_up:
                case this.friend_down:
                    this.friend_up.visible = true;
                    this.friend_down.visible = false;
                    this.circle_up.visible = true;
                    this.circle_down.visible = false;
                    invatVo = AgentModel.invationVo;
                    if (invatVo && invatVo.length > 0) {
                        affcode = invatVo[0].affCode;
                    }
                    if (!affcode) {
                        Toast.showToast("邀请码数据异常,请稍后再试");
                        break;
                    }
                    PostMHelp.game_common({ "do": "share", "type": "friend", "param": "", "image": this.image.skin, "affcode": affcode });
                    NoticeData.shareId = this.noticeid;
                    break;
                case this.circle_up:
                case this.circle_down:
                    this.friend_up.visible = true;
                    this.friend_down.visible = false;
                    this.circle_up.visible = true;
                    this.circle_down.visible = false;
                    invatVo = AgentModel.invationVo;
                    if (invatVo && invatVo.length > 0) {
                        affcode = invatVo[0].affCode;
                    }
                    if (!affcode) {
                        Toast.showToast("邀请码数据异常,请稍后再试");
                        break;
                    }
                    PostMHelp.game_common({ "do": "share", "type": "circle", "param": "", "image": this.image.skin, "affcode": affcode });
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
        var inApp = true;
        if (!this.data.jumpGame && !this.data.jumpInner) {
            inApp = false;
            if (GameUtils.isNativeApp)
                PostMHelp.game_common({ name: "openWeb", param: this.data.jumpHref });
            else
                window.open(this.data.jumpHref);
        }
        else if (this.data.jumpGame) {
            EventManager.dispath(EventType.JUMP_GAME, this.data.jumpHref);
            this.event("closeNoticeDlg");
        }
        else {
            var s = this.data.jumpHref.toString();
            InnerJumpUtil.doJump(DlgCmd[s]);
            this.event("closeNoticeDlg");
        }
        this.event("jump", { inApp: inApp });
    };
    /**
    * 销毁
    */
    Notice_Share.prototype.destroy = function () {
        //关闭图片加载计时器
        Laya.timer.clear(this, this.showImageLoading);
        //
        _super.prototype.destroy.call(this, true);
    };
    return Notice_Share;
}(ui.dlg.notice.NoticeShareUI));
//# sourceMappingURL=Notice_Share.js.map