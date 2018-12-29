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
var RechargeHintPad = /** @class */ (function (_super) {
    __extends(RechargeHintPad, _super);
    function RechargeHintPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        }; //按下的坐标
        return _this;
    }
    RechargeHintPad.getObj = function () {
        return RechargeHintPad.obj;
    };
    RechargeHintPad.showPad = function (str, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!RechargeHintPad.obj) {
            var o = new RechargeHintPad();
            o.init(ConfObjRead.getConfNoMoney()); //Common.confObj.msgshowpad);
            o.caller = caller;
            o.callback = callback;
            Laya.stage.addChild(o);
        }
        RechargeHintPad.obj.show(str);
    };
    RechargeHintPad.prototype.show = function (str) {
        if (this.lb_content) {
            if (str == null) {
                this.lb_content.text = this.conf.content.label.font.text;
            }
            else {
                this.lb_content.text = str;
            }
        }
        this.visible = true;
    };
    RechargeHintPad.prototype.hide = function () {
        this.lb_content.text = "";
        this.visible = false;
        RechargeHintPad.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
    };
    RechargeHintPad.prototype.init = function (conf) {
        RechargeHintPad.obj = this;
        this.conf = conf;
        // this.data = data;
        // this.caller = caller;
        // this.closeCallback = closeCallback;
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        //背景图
        this.bg = Tools.addSprite(this, this.conf.bg);
        //标题
        this.sp_title_lb = Tools.addSprite(this, this.conf.title.lb);
        //内容容器
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        //设置内容容器里，只有部分区域可以渲染和绘制，类似蒙版功能
        // this.sp_content.scrollRect = new Laya.Rectangle(
        //     this.conf.ctmask.rect.x,this.conf.ctmask.rect.y,
        //     this.conf.ctmask.rect.w,this.conf.ctmask.rect.h,
        // );
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
        //关闭按钮
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        //充值按钮
        if (this.conf.recharge) {
            this.recharge = new MyButton();
            this.recharge.init(this.conf.recharge, this, this.onRecharge);
            this.recharge.pos(this.conf.recharge.pos.x, this.conf.recharge.pos.y);
            this.addChild(this.recharge);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //鼠标响应
    RechargeHintPad.prototype.onMouseEvent = function (e) {
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
    RechargeHintPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    RechargeHintPad.prototype.onClose = function (s) {
        this.hide();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    //点击充值按钮
    RechargeHintPad.prototype.onRecharge = function (s) {
        //跳转到充值模块
        Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge);
        // Debug.trace('onRecharge');
        // if( this.conf.clickrechargejump )
        // {
        //要跳转
        //     Tools.jump2url(Common.confObj.url.home);
        // }
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    return RechargeHintPad;
}(Laya.Sprite));
//# sourceMappingURL=RechargeHintPad.js.map