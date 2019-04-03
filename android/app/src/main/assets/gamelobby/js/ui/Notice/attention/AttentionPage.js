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
var AttentionPage = /** @class */ (function (_super) {
    __extends(AttentionPage, _super);
    function AttentionPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        _this.bScrollTxt = false;
        _this.prevX = 0;
        _this.prevY = 0;
        return _this;
    }
    AttentionPage.getObj = function () {
        return AttentionPage.obj;
    };
    AttentionPage.prototype.destroy = function (b) {
        AttentionPage.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AttentionPage.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        AttentionPage.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    AttentionPage.prototype.init = function (conf, data) {
        AttentionPage.obj = this;
        this.conf = conf;
        this.data = data;
        this.sp_content = new MySprite();
        this.addChild(this.sp_content);
        this.title_bg = Tools.addSprite(this.sp_content, this.conf.bgTitle);
        this.lbTitle = Tools.addLabels(this.sp_content, this.conf.lbTitle);
        this.txtContent = Tools.addText(this.sp_content, this.conf.txtContent, this, this.scrollContent);
        this.lbAuthor = Tools.addLabels(this.sp_content, this.conf.lbAuthor);
        this.setData(data);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    AttentionPage.prototype.scrollContent = function (e) {
        // Debug.trace("AttentionPage.scrollContent");
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.prevX = this.txtContent.mouseX;
                this.prevY = this.txtContent.mouseY;
                this.bScrollTxt = true;
                break;
            case Laya.Event.MOUSE_MOVE:
                if (!this.bScrollTxt) {
                    break;
                }
                var nowX = this.txtContent.mouseX;
                var nowY = this.txtContent.mouseY;
                this.txtContent.scrollX += this.prevX - nowX;
                this.txtContent.scrollY += this.prevY - nowY;
                this.prevX = nowX;
                this.prevY = nowY;
                break;
            case Laya.Event.MOUSE_UP:
            case Laya.Event.MOUSE_OUT:
                this.bScrollTxt = false;
                break;
        }
    };
    AttentionPage.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        // Debug.trace('onMouseEvent e:');
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downPos.x = x;
                this.downPos.y = y;
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.downPos.y > 0) {
                    var sumy = y - this.downPos.y;
                    this.downPos.y = y;
                    // this.moveAllItem(sumy);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                this.downPos.x = 0;
                this.downPos.y = 0;
                this.bDrag = false;
                // this.scrollbar.moveEnd();
                break;
        }
    };
    AttentionPage.prototype.clearData = function () {
        if (this.title_bg) {
            this.title_bg.visible = false;
        }
        if (this.lbTitle) {
            this.lbTitle.text = "";
        }
        // if( this.lbContent )
        // {
        //     this.lbContent.text = "";
        // }
        if (this.txtContent) {
            this.txtContent.text = "";
        }
        if (this.lbAuthor) {
            this.lbAuthor.text = "";
        }
        if (this.img) {
            this.removeChild(this.img);
            this.img.destroy(true);
            this.img = null;
        }
    };
    AttentionPage.prototype.setData = function (data) {
        this.data = data;
        if (this.lbTitle) {
            this.lbTitle.text = this.data.title;
            this.title_bg.visible = true;
        }
        // if( this.lbContent )
        // {
        //     this.lbContent.text = this.data.content;
        // }
        if (this.txtContent) {
            this.txtContent.text = this.conf.txtContent.pretext + this.data.content;
        }
        if (this.lbAuthor) {
            this.lbAuthor.text = this.data.author;
        }
        if (this.img) {
            this.img.skin = this.data.img.src;
            this.img.size(this.data.img.size.w, this.data.img.size.h);
        }
        else {
            if (this.data.type == 1) {
                this.clearData();
                this.img = new Laya.Image(this.data.img.src);
                this.img.size(this.data.img.size.w, this.data.img.size.h);
                this.img.pos(this.conf.img.pos.x, this.conf.img.pos.y);
                this.addChild(this.img);
            }
        }
    };
    AttentionPage.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AttentionPage.prototype.onClose = function (s) {
        this.showDialog(false);
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    AttentionPage.prototype.showDialog = function (b) {
        this.visible = b;
    };
    return AttentionPage;
}(MySprite));
//# sourceMappingURL=AttentionPage.js.map