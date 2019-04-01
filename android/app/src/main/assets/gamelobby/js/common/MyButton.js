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
var MyButton = /** @class */ (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super.call(this) || this;
        _this.bclick = true;
        _this.actionDown = false;
        return _this;
    }
    MyButton.prototype.setQuery = function (q) {
        this.query = q;
    };
    MyButton.prototype.getQuery = function () {
        return this.query;
    };
    MyButton.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.btnCallback = callback;
        this.res = this.conf.src;
        if (this.res.length > 0) {
            this.btn_ui = new Laya.Sprite();
            this.btn_ui.pos(0, 0);
            this.addChild(this.btn_ui);
            this.onResLoaded();
        }
        if (this.conf.actionDown) {
            this.actionDown = this.conf.actionDown;
        }
        if (this.conf.font) {
            this.btn_name = Tools.newLabel(this.conf.font.text, this.conf.font.size.w, this.conf.font.size.h, this.conf.font.fontsize, this.conf.font.color, this.conf.font.align, this.conf.font.valign, this.conf.font.name, this.conf.font.wrap, this.conf.font.underline);
            this.btn_name.pos(this.conf.font.pos.x, this.conf.font.pos.y);
            if (this.conf.font.borderColor) {
                this.btn_name.borderColor = this.conf.font.borderColor;
            }
            if (this.conf.font.scale) {
                this.btn_name.scale(this.conf.font.scale.x, this.conf.font.scale.y);
            }
            this.addChild(this.btn_name);
        }
        if (this.conf.hint) {
            this.sp_hint = new Laya.Sprite();
            this.sp_hint.loadImage(this.conf.hint.src);
            this.sp_hint.pos(this.conf.hint.pos.x, this.conf.hint.pos.y);
            this.addChild(this.sp_hint);
            this.sp_hint.visible = false;
        }
        // if( this.conf.frontsp )
        // {
        // this.sp_label = new Laya.Sprite();
        // this.sp_label.loadImage(this.conf.frontsrc.src);
        // this.sp_label.pos(this.conf.frontsrc.pos.x,this.conf.frontsrc.pos.y);
        // this.addChild( this.sp_label );
        // 	this.sp_label = Tools.addSprite(this,this.conf.frontsp);
        // }
        if (this.conf.normalScale) {
            this.scaleBtn(this.conf.normalScale);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    MyButton.prototype.show = function (b) {
        if (b) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0;
        }
    };
    MyButton.prototype.showHint = function (b) {
        this.sp_hint.visible = b;
    };
    MyButton.prototype.onResLoaded = function () {
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        this.redraw(t);
        if (this.btn_ui) {
            this.btn_ui.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
            this.btn_ui.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
            this.btn_ui.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        }
    };
    MyButton.prototype.onDisResLoaded = function () {
    };
    MyButton.prototype.setRes = function (res) {
        this.res = res;
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        this.redraw(t);
    };
    MyButton.prototype.redraw = function (e) {
        try {
            this.btn_ui.graphics.clear();
            if (this.conf.size) {
                this.btn_ui.graphics.drawTexture(e, 0, 0, this.conf.size.w, this.conf.size.h);
                this.btn_ui.size(this.conf.size.w, this.conf.size.h);
            }
            else {
                this.btn_ui.graphics.drawTexture(e, 0, 0);
                this.btn_ui.size(e.width, e.height);
            }
            this.btn_ui.pivot(this.btn_ui.width / 2, this.btn_ui.height / 2);
            this.size(this.btn_ui.width, this.btn_ui.height);
        }
        catch (err) { }
    };
    MyButton.prototype.redrawTexture = function (res, e) {
        this.res[0] = res;
        this.btn_ui.graphics.clear();
        this.btn_ui.graphics.drawTexture(e, 0, 0);
        this.btn_ui.size(e.width, e.height);
    };
    MyButton.prototype.showName = function (b) {
        this.btn_name.visible = b;
    };
    MyButton.prototype.onMouseEvent = function (e) {
        if (!this.bclick) {
            return;
        }
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.downPos = { x: e.stageX, y: e.stageY };
                this.onBtnDown(e);
                break;
            case Laya.Event.MOUSE_MOVE:
                break;
            case Laya.Event.MOUSE_OUT:
                this.downPos = null;
                this.onBtnOut(e);
                break;
            case Laya.Event.MOUSE_UP:
                this.onBtnUp(e);
                if (this.downPos) {
                    var upPos = { x: e.stageX, y: e.stageY };
                    if (Tools.isClick(this.downPos, upPos)) {
                        this.onBtnClick(null);
                    }
                }
                break;
        }
    };
    MyButton.prototype.doClick = function () {
        this.btnCallback.apply(this.caller, [this]);
        if (this.conf.sfx) {
            Laya.SoundManager.playSound(this.conf.sfx);
        }
    };
    MyButton.prototype.onBtnClick = function (s) {
        if (this.bclick) {
            if (!this.actionDown) {
                this.doClick();
            }
        }
    };
    MyButton.prototype.onBtnDown = function (s) {
        if (this.res.length > 1) {
            var sp = s.target;
            if (sp == this.btn_ui) {
                this.btn_ui.graphics.clear();
                var t = Laya.loader.getRes(Tools.getSrc(this.res[1]));
                this.btn_ui.graphics.drawTexture(t, 0, 0);
            }
        }
        else {
            this.scaleBtn(this.conf.maxScale);
        }
        // Tools.setSpriteGlowFilter(this.btn_ui,ConfObjRead.getConfCommon().glowfilter);
        if (this.actionDown) {
            this.doClick();
        }
    };
    MyButton.prototype.scaleBtn = function (cf) {
        this.scale(cf.x, cf.y);
    };
    MyButton.prototype.onBtnUp = function (s) {
        this.releaseBtn();
    };
    MyButton.prototype.releaseBtn = function () {
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        this.redraw(t);
        this.scaleBtn(this.conf.normalScale);
        // Tools.clearSpriteFilter(this.btn_ui);
    };
    MyButton.prototype.onBtnOut = function (s) {
        this.releaseBtn();
    };
    MyButton.prototype.setEnabled = function (b, useImg) {
        if (useImg === void 0) { useImg = false; }
        this.bclick = b;
        if (useImg) {
            if (!b) {
                if (this.conf.disablesrc) {
                    Debug.trace("change disable src:");
                    Debug.trace(this.conf.disablesrc);
                    this.changeRes(this.conf.disablesrc);
                }
            }
            else {
                Debug.trace("change src:");
                Debug.trace(this.conf.src);
                this.changeRes(this.conf.src);
            }
        }
    };
    MyButton.prototype.changeRes = function (res) {
        var t = Laya.loader.getRes(Tools.getSrc(res[0]));
        this.redraw(t);
    };
    return MyButton;
}(Laya.Sprite));
//# sourceMappingURL=MyButton.js.map