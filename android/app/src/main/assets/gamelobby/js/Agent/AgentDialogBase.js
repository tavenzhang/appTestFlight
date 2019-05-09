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
var AgentDialogBase = /** @class */ (function (_super) {
    __extends(AgentDialogBase, _super);
    function AgentDialogBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dlgbox = new Laya.Sprite();
        return _this;
    }
    AgentDialogBase.prototype.init = function (node, conf) {
        this.fatherNode = node;
        this.conf = conf;
        this.initAlphaBg();
        this.addChild(this.dlgbox);
        this.initBg();
        this.initClose();
        if (this.conf.pos) {
            this.pos(this.conf.pos.x, this.conf.pos.y);
        }
    };
    AgentDialogBase.prototype.setCloseListener = function (c_caller, c_callback) {
        this.close_caller = c_caller;
        this.close_callback = c_callback;
    };
    AgentDialogBase.prototype.initClose = function () {
        if (!this.conf.close) {
            return;
        }
        var close = new MyButton();
        close.init(this.conf.close, this, this.onClose);
        close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
        this.dlgbox.addChild(close);
    };
    AgentDialogBase.prototype.onClose = function (s, bcallback) {
        if (bcallback === void 0) { bcallback = true; }
        this.destroy(true);
        if (bcallback) {
            if (this.close_caller && this.close_callback) {
                this.close_callback.apply(this.close_caller, [this]);
            }
        }
    };
    AgentDialogBase.prototype.initBg = function () {
        if (!this.conf.bg) {
            return;
        }
        var bg = Tools.addSprite(this.dlgbox, this.conf.bg);
    };
    AgentDialogBase.prototype.initAlphaBg = function () {
        if (this.conf.alphabg) {
            //todo:xxx
            // var alphabg:MySprite = new MySprite();
            // Tools.drawRectWithAlpha(alphabg,
            //     0,0,
            //     this.conf.alphabg.size.w,this.conf.alphabg.size.h,
            //     this.conf.alphabg.color,
            //     this.conf.alphabg.alpha);
            // this.addChild(alphabg);
            // alphabg.size(this.conf.alphabg.size.w,this.conf.alphabg.size.h);
            // alphabg.pos(-this.conf.alphabg.pos.x,-this.conf.alphabg.pos.y);
            var alphabg = Tools.creatDlgBg();
            this.addChild(alphabg);
            alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
            alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
            alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        }
    };
    AgentDialogBase.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    return AgentDialogBase;
}(Laya.View));
//# sourceMappingURL=AgentDialogBase.js.map