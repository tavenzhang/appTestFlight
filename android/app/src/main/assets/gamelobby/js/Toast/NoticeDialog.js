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
var NoticeDialog = /** @class */ (function (_super) {
    __extends(NoticeDialog, _super);
    function NoticeDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        return _this;
    }
    NoticeDialog.getObj = function () {
        return NoticeDialog.obj;
    };
    NoticeDialog.showPad = function (str, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!NoticeDialog.obj) {
            var o = new NoticeDialog();
            o.init(conf);
            o.caller = caller;
            o.callback = callback;
            LayaMain.getInstance().getRootNode().addChild(o);
        }
        NoticeDialog.obj.show(str);
    };
    NoticeDialog.prototype.show = function (str) {
        if (this.lb_content) {
            if (str == null) {
                this.lb_content.text = Tools.getStringByKey(this.conf.content.label.font.text);
            }
            else {
                this.lb_content.text = Tools.getStringByKey(str);
            }
        }
        this.visible = true;
    };
    NoticeDialog.prototype.destroy = function (b) {
        NoticeDialog.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    NoticeDialog.prototype.hide = function () {
        this.lb_content.text = "";
        this.visible = false;
        NoticeDialog.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
    };
    NoticeDialog.prototype.init = function (conf) {
        NoticeDialog.obj = this;
        this.conf = conf;
        this.alphabg = new MySprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        this.bg = Tools.addSprite(this, this.conf.bg);
        this.sp_title_lb = Tools.addSprite(this, this.conf.title.lb);
        this.sp_content = new MySprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        if (this.conf.content.label) {
            this.lb_content = Tools.newLabel(this.conf.content.label.font.text, this.conf.content.label.size.w, this.conf.content.label.size.h, this.conf.content.label.font.size, this.conf.content.label.font.color, this.conf.content.label.font.align, this.conf.content.label.font.valign, this.conf.content.label.font.name, this.conf.content.label.font.wrap, this.conf.content.label.font.underline);
            if (this.conf.content.label.font.borderColor) {
                this.lb_content.borderColor = this.conf.content.label.font.borderColor;
            }
            if (this.conf.content.label.font.alpha) {
                this.lb_content.alpha = this.conf.content.label.font.alpha;
            }
            this.lb_content.pos(this.conf.content.label.pos.x, this.conf.content.label.pos.y);
            this.addChild(this.lb_content);
        }
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        if (this.conf.recharge) {
            this.recharge = new MyButton();
            this.recharge.init(this.conf.recharge, this, this.onRecharge);
            this.recharge.pos(this.conf.recharge.pos.x, this.conf.recharge.pos.y);
            this.addChild(this.recharge);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    NoticeDialog.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        // Debug.trace('onMouseEvent e:');
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downPos.x = x;
                this.downPos.y = y;
                // this.scrollbar.moveStart();
                break;
            case Laya.Event.MOUSE_MOVE:
                // if( this.downPos.x > 0 )
                // {
                //     var sumx = x - this.downPos.x;
                //     this.downPos.x = x;
                // this.moveAllItem(sumx);
                // }
                if (this.downPos.y > 0) {
                    var sumy = y - this.downPos.y;
                    this.downPos.y = y;
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
    NoticeDialog.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    NoticeDialog.prototype.onClose = function (s) {
        this.hide();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    NoticeDialog.prototype.onRecharge = function (s) {
        this.hide();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    return NoticeDialog;
}(MySprite));
//# sourceMappingURL=NoticeDialog.js.map