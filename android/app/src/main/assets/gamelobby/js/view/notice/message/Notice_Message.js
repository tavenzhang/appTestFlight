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
var Notice_Message = /** @class */ (function (_super) {
    __extends(Notice_Message, _super);
    function Notice_Message() {
        return _super.call(this) || this;
    }
    Notice_Message.prototype.setData = function ($data) {
        var _this = this;
        this.data = $data;
        var url = $data.img;
        if (url && url.length > 3) {
            this.imgPanel.vScrollBarSkin = "";
            this.imgPanel.visible = true;
            this.message.visible = false;
            var texture = Laya.loader.getRes(url);
            if (texture) {
                this.image.skin = url;
                var scl = this.image.width / texture.width;
                this.image.skin = url;
                this.image.height = texture.height * scl;
                this.frame.height = this.image.height + 44;
            }
            else {
                this.showImageLoading();
                //加载图片
                Laya.loader.load(url, Laya.Handler.create(this, function () {
                    if (_this.destroyed)
                        return; //如果已经被销毁了，则不执行后面逻辑
                    //关闭图片加载遮罩
                    _this.hideImageLoading();
                    _this.image.skin = url;
                    var tt = _this.image.source;
                    if (tt) {
                        var scl = _this.image.width / tt.width;
                        _this.image.skin = url;
                        _this.image.height = tt.height * scl;
                        _this.frame.height = _this.image.height + 44;
                    }
                    else {
                        Debug.error("图片异常:" + url, tt);
                    }
                }), null, Laya.Loader.IMAGE);
            }
            //注册图片点击事件
            if ($data.jumpHref != "") {
                this.frame.mouseEnabled = true;
                this.imgPanel.on(Laya.Event.MOUSE_UP, this, this.requestJump);
            }
        }
        else {
            this.imgPanel.visible = false;
            this.message.visible = true;
            var title = this.message.getChildByName("title");
            title.text = $data.title;
            var content = this.message.getChildByName("content");
            content.text = $data.content;
            var date = this.message.getChildByName("date");
            date.text = $data.author;
        }
    };
    /**
     * 打开图片加载遮罩
     */
    Notice_Message.prototype.showImageLoading = function () {
        if (!this.embedLoading) {
            this.embedLoading = new view.EmbedLoadingView();
        }
        this.embedLoading.EmbedBox(this);
    };
    /**
     * 关闭图片加载遮罩
     */
    Notice_Message.prototype.hideImageLoading = function () {
        if (this.embedLoading) {
            this.embedLoading.destroy();
            this.embedLoading = null;
        }
    };
    /**
     * 图片公告/活动跳转逻辑
     */
    Notice_Message.prototype.requestJump = function (evt) {
        if (!(evt.target instanceof Laya.Image)) {
            return;
        }
        if (!this.data.jumpGame && !this.data.jumpInner) {
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
        this.event("jump");
    };
    /**
     * 销毁
     */
    Notice_Message.prototype.destroy = function () {
        this.hideImageLoading();
        //
        _super.prototype.destroy.call(this, true);
    };
    return Notice_Message;
}(ui.dlg.notice.NoticeMessageUI));
//# sourceMappingURL=Notice_Message.js.map