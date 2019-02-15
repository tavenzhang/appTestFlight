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
var PageArrow = /** @class */ (function (_super) {
    __extends(PageArrow, _super);
    function PageArrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.conf = null;
        return _this;
    }
    PageArrow.prototype.init = function (conf) {
        this.conf = conf;
        this.sp_arrow = Tools.addSprite(this, this.conf.src);
        if (this.conf.bclick) {
            this.sp_arrow.on(Laya.Event.CLICK, this, this.onClick);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.leftOk();
    };
    PageArrow.prototype.setPanel = function (p) {
        this.gamepanel = p;
    };
    //被点击了
    PageArrow.prototype.onClick = function () {
        // Debug.traceObj("PageArrow.onClick");
        // Debug.traceObj(this);
        this.gamepanel.flip(1);
    };
    PageArrow.prototype.leftOk = function () {
        // Laya.timer.frameLoop(this.conf.framedelay,this,this.loop);
        var tween = Laya.Tween.to(this.sp_arrow, {
            x: this.conf.right.pos.x,
            y: this.conf.right.pos.y
        }, this.conf.right.duration, 
        // Laya.Ease["backIn"],
        Laya.Ease[this.conf.right.easeName], new Laya.Handler(this, this.rightOk));
    };
    PageArrow.prototype.rightOk = function () {
        var tween = Laya.Tween.to(this.sp_arrow, {
            x: this.conf.left.pos.x,
            y: this.conf.left.pos.y
        }, this.conf.left.duration, 
        // Laya.Ease["backIn"],
        Laya.Ease[this.conf.left.easeName], new Laya.Handler(this, this.leftOk));
    };
    return PageArrow;
}(Laya.Sprite));
//# sourceMappingURL=PageArrow.js.map