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
var MySwitchBtn = /** @class */ (function (_super) {
    __extends(MySwitchBtn, _super);
    function MySwitchBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclick = true; //是否可以点击
        _this.iSwitchId = 0;
        _this.query = null;
        return _this;
    }
    MySwitchBtn.prototype.setQuery = function (a) {
        this.query = a;
    };
    MySwitchBtn.prototype.getQuery = function () {
        return this.query;
    };
    MySwitchBtn.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.btnCallback = callback;
        this.res = this.conf.src;
        if (this.res.length > 0) {
            this.btn_ui = new Laya.Sprite();
            this.btn_ui.loadImage(this.res[0]);
            this.btn_ui.pos(0, 0);
            this.addChild(this.btn_ui);
            // Laya.loader.load(this.res, Laya.Handler.create(this, this.onResLoaded));
            if (this.bclick) {
                this.btn_ui.on(Laya.Event.CLICK, this, this.onBtnClick);
                this.btn_ui.on(Laya.Event.MOUSE_DOWN, this, this.onBtnDown);
                this.btn_ui.on(Laya.Event.MOUSE_UP, this, this.onBtnUp);
                this.btn_ui.on(Laya.Event.MOUSE_OUT, this, this.onBtnOut);
                // this.btn_ui.on(Event.MOUSE_MOVE, this, this.onBtnMove);
            }
        }
        if (this.conf.font) {
            //文字
            this.btn_name = Tools.newLabel(
            // this.textStr,
            this.conf.font.text, 
            // this.width,this.height,
            this.conf.size.w, this.conf.size.h, this.conf.font.size, this.conf.font.color);
            this.btn_name.pos(this.conf.font.pos.x, this.conf.font.pos.y);
            if (this.conf.font.borderColor) {
                this.btn_name.borderColor = this.conf.font.borderColor;
            }
            this.addChild(this.btn_name);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    MySwitchBtn.prototype.onResLoaded = function () {
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        this.btn_ui.graphics.drawTexture(t, 0, 0);
        this.btn_ui.size(t.width, t.height);
        this.iSwitchId = 0;
        this.switchChange();
        if (this.bclick) {
            this.btn_ui.on(Laya.Event.CLICK, this, this.onBtnClick);
            this.btn_ui.on(Laya.Event.MOUSE_DOWN, this, this.onBtnDown);
            this.btn_ui.on(Laya.Event.MOUSE_UP, this, this.onBtnUp);
            this.btn_ui.on(Laya.Event.MOUSE_OUT, this, this.onBtnOut);
            // this.btn_ui.on(Event.MOUSE_MOVE, this, this.onBtnMove);
        }
    };
    MySwitchBtn.prototype.showName = function (b) {
        this.btn_name.visible = b;
    };
    //本按钮被按下了，要干嘛？？
    MySwitchBtn.prototype.onBtnClick = function (s) {
        if (this.bclick) {
            this.switchChange();
            //去掉点击后的回调
            this.btnCallback.apply(this.caller, [this]);
            //播放音效
            if (this.conf.sfx) {
                Laya.SoundManager.playSound(this.conf.sfx);
            }
        }
    };
    MySwitchBtn.prototype.isOn = function () {
        return this.iSwitchId;
    };
    MySwitchBtn.prototype.setOn = function (n, banim) {
        if (banim === void 0) { banim = false; }
        this.iSwitchId = n;
        // Debug.trace('setOn n:'+n+' '+this.conf.font.text);
        // Debug.trace(this.res);
        this.btn_ui.graphics.clear();
        var t = Laya.loader.getRes(Tools.getSrc(this.res[this.iSwitchId]));
        this.btn_ui.graphics.drawTexture(t, 0, 0);
    };
    MySwitchBtn.prototype.switchChange = function () {
        if (this.iSwitchId == 0) {
            this.iSwitchId = 1;
        }
        else {
            this.iSwitchId = 0;
        }
        this.setOn(this.iSwitchId);
    };
    MySwitchBtn.prototype.onBtnDown = function (s) {
        // this.switchChange();
    };
    MySwitchBtn.prototype.onBtnUp = function (s) {
    };
    MySwitchBtn.prototype.releaseBtn = function () {
    };
    MySwitchBtn.prototype.onBtnOut = function (s) {
    };
    return MySwitchBtn;
}(Laya.Sprite));
//# sourceMappingURL=MySwitchBtn.js.map