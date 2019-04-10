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
var AgentButton = /** @class */ (function (_super) {
    __extends(AgentButton, _super);
    function AgentButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_middle = null;
        _this.sb_front = null;
        return _this;
    }
    AgentButton.prototype.init = function (conf, caller, callback) {
        _super.prototype.init.call(this, conf, caller, callback);
        this.initMiddle();
        this.initFront();
    };
    AgentButton.prototype.middleAnimation = function () {
        Laya.Tween.clearAll(this.sp_middle);
        this.sp_middle.pos(this.conf.animationSp.posLeft.x, this.conf.animationSp.posLeft.y);
        this.sp_middle.alpha = this.conf.animationSp.alphaLeft;
        var tween = Laya.Tween.to(this.sp_middle, {
            alpha: this.conf.animationSp.alpha,
            x: this.conf.animationSp.pos.x,
            y: this.conf.animationSp.pos.y
        }, this.conf.animationSp.duration, Laya.Ease[this.conf.animationSp.tweenName], //"backIn"],
        new Laya.Handler(this, this.scrollOutOk));
    };
    AgentButton.prototype.scrollOutOk = function (e) {
    };
    AgentButton.prototype.onTab = function (b) {
        if (this.sp_middle) {
            this.sp_middle.visible = b;
            if (b) {
                this.middleAnimation();
            }
        }
        if (this.sb_front) {
            this.sb_front.setOn(b ? 1 : 0);
        }
    };
    AgentButton.prototype.initMiddle = function () {
        if (!this.conf.animationSp) {
            return;
        }
        this.sp_middle = Tools.addSprite(this, this.conf.animationSp);
        this.sp_middle.visible = false;
        if (this.conf.animationSp.animation) {
            Tools.addAnimation(this.sp_middle, this.conf.animationSp.animation);
        }
    };
    AgentButton.prototype.initFront = function () {
        if (!this.conf.frontsp) {
            return;
        }
        this.sb_front = new MySwitchBtn();
        this.sb_front.init(this.conf.frontsp.switch, this.caller, this.btnCallback);
        this.addChild(this.sb_front);
    };
    return AgentButton;
}(MyButton));
//# sourceMappingURL=AgentButton.js.map