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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentDialogBase.prototype.init = function (node, conf) {
        this.fatherNode = node;
        this.conf = conf;
        this.initAlphaBg();
        this.initBg();
        this.initClose();
        if (this.conf.pos) {
            this.pos(this.conf.pos.x, this.conf.pos.y);
        }
    };
    AgentDialogBase.prototype.initClose = function () {
        if (!this.conf.close) {
            return;
        }
        var close = new MyButton();
        close.init(this.conf.close, this, this.onClose);
        close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
        this.addChild(close);
    };
    AgentDialogBase.prototype.onClose = function (s) {
        this.destroy(true);
    };
    AgentDialogBase.prototype.initBg = function () {
        if (!this.conf.bg) {
            return;
        }
        var bg = Tools.addSprite(this, this.conf.bg);
    };
    AgentDialogBase.prototype.initAlphaBg = function () {
        if (this.conf.alphabg) {
            var alphabg = new Laya.Sprite();
            Tools.drawRectWithAlpha(alphabg, 0, 0, this.conf.alphabg.size.w, this.conf.alphabg.size.h, this.conf.alphabg.color, this.conf.alphabg.alpha);
            this.addChild(alphabg);
            alphabg.size(this.conf.alphabg.size.w, this.conf.alphabg.size.h);
            alphabg.pos(-this.conf.alphabg.pos.x, -this.conf.alphabg.pos.y);
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
}(Laya.Sprite));
//# sourceMappingURL=AgentDialogBase.js.map