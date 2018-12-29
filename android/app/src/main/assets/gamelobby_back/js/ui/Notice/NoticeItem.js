var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NoticeItem = /** @class */ (function (_super) {
    __extends(NoticeItem, _super);
    function NoticeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoticeItem.prototype.init = function (conf, data, caller, closeCallback) {
        this.conf = conf;
        this.data = data;
        this.caller = caller;
        this.closeCallback = closeCallback;
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        this.bg = new Laya.Sprite();
        this.bg.loadImage(this.conf.bg.src);
        this.bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        this.addChild(this.bg);
        //如果有注册点
        if (this.conf.bg.pivot) {
            this.bg.pivot(this.conf.bg.pivot.x, this.conf.bg.pivot.y);
        }
        var scx = this.conf.bg.size.w / this.bg.width;
        var scy = this.conf.bg.size.h / this.bg.height;
        this.bg.scale(scx, scy);
        this.lb_content = Tools.newLabel("---", this.conf.lbcontent.size.w, this.conf.lbcontent.size.h, this.conf.lbcontent.font.size, this.conf.lbcontent.font.color, this.conf.lbcontent.font.align, this.conf.lbcontent.font.valign, this.conf.lbcontent.font.name, this.conf.lbcontent.font.wrap);
        if (this.conf.lbcontent.font.borderColor) {
            this.lb_content.borderColor = this.conf.lbcontent.font.borderColor;
        }
        this.addChild(this.lb_content);
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.setData(data);
    };
    NoticeItem.prototype.setData = function (data) {
        this.data = data;
        if (this.data.img) {
            this.setBg(this.data.img);
        }
        this.lb_content.text = data.notice;
    };
    NoticeItem.prototype.setBg = function (src) {
        Laya.loader.load(src, new Laya.Handler(this, this.bgLoaded));
    };
    NoticeItem.prototype.bgLoaded = function (e) {
        this.bg.graphics.clear();
        this.bg.graphics.drawTexture(e, 0, 0, this.bg.width, this.bg.height);
        // this.sp_icon.size(e.width,e.height);
    };
    NoticeItem.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    NoticeItem.prototype.onClose = function (s) {
        this.showDialog(false);
        this.closeCallback.apply(this.caller, [this]);
    };
    NoticeItem.prototype.showDialog = function (b) {
        this.visible = b;
    };
    return NoticeItem;
}(Laya.Sprite));
//# sourceMappingURL=NoticeItem.js.map