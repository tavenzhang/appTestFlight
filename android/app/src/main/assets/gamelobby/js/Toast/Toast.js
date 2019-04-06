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
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.label = null;
        return _this;
    }
    Toast.prototype.init = function (conf) {
        this.conf = conf;
        Toast.obj = this;
        this.bg = new MySprite();
        this.bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        this.addChild(this.bg);
        Tools.scaleSpriteV(this.bg, this.conf.bg.src, this.conf.bg.size.spliceV);
        if (this.conf.bg.pivot) {
            this.bg.pivot(this.conf.bg.pivot.x, this.conf.bg.pivot.y);
        }
        this.label = Tools.newLabel("toast text", this.conf.label.size.w, this.conf.label.size.h, this.conf.label.fontsize, this.conf.label.fontcolor, this.conf.label.align, this.conf.label.valign, this.conf.label.fontname, this.conf.label.wordwrap, this.conf.label.underline);
        this.label.pos(this.conf.label.pos.x, this.conf.label.pos.y);
        this.label.valign = "middle";
        this.label.align = "center";
        this.addChild(this.label);
        if (this.conf.label.borderColor) {
            this.label.borderColor = this.conf.label.borderColor;
        }
    };
    Toast.showToast = function (str) {
        if (!Toast.obj) {
            var a = new Toast();
            a.init(ConfObjRead.getConfToast());
            LayaMain.getInstance().getRootNode().addChild(a);
            // Toast.obj.zOrder = Common.IDX_TOP_TOAST;
        }
        Toast.obj.show(str);
    };
    Toast.prototype.destroy = function (b) {
        Toast.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    Toast.prototype.show = function (str) {
        this.label.text = Tools.getStringByKey(str);
        this.visible = true;
        // this.visible = false;
        // Debug.trace("this.label.align:"+this.label.valign);
        if (this.conf.bAnimStart) {
            this.posOut();
            this.moveIn();
        }
        else {
            this.moveInSuc();
        }
    };
    Toast.prototype.posOut = function () {
        this.pos(0, Common.GM_SCREEN_H);
    };
    Toast.prototype.moveIn = function () {
        var tween = Laya.Tween.to(this, {
            x: 0,
            y: 0
        }, this.conf.duration, Laya.Ease["backIn"], new Laya.Handler(this, this.moveInSuc));
    };
    Toast.prototype.moveInSuc = function () {
        Laya.timer.once(this.conf.dutimer, this, this.move2close);
    };
    Toast.prototype.move2close = function () {
        if (this.conf.bAnimEnd) {
            var tween = Laya.Tween.to(this, {
                x: this.x,
                y: Common.GM_SCREEN_H
            }, this.conf.duration, Laya.Ease["backIn"], new Laya.Handler(this, this.hide));
        }
        else {
            this.hide();
        }
    };
    Toast.prototype.hide = function () {
        this.label.text = "";
        this.visible = false;
        this.destroy(true);
        Toast.obj = null;
    };
    return Toast;
}(MySprite));
//# sourceMappingURL=Toast.js.map