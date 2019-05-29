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
var SharePageNotice = /** @class */ (function (_super) {
    __extends(SharePageNotice, _super);
    function SharePageNotice() {
        return _super.call(this) || this;
    }
    SharePageNotice.getContainer = function () {
        return SharePageNotice.container;
    };
    SharePageNotice.getObj = function () {
        return SharePageNotice.obj;
    };
    SharePageNotice.showDialog = function (node, conf, data) {
        if (!SharePageNotice.obj) {
            var o = new SharePageNotice();
            // o.size(conf.bg.size.w, conf.bg.size.h);
            o.data = data;
            o.init(node, conf);
            node.addChild(o);
        }
    };
    SharePageNotice.prototype.destroy = function (b) {
        SharePageNotice.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    SharePageNotice.prototype.init = function (node, conf) {
        var container = SharePageNotice.container = new MySprite();
        _super.prototype.init.call(this, node, conf);
        this.size(this.conf.bg.size.w, this.conf.bg.size.h);
        this.initContent();
        this.initBtns();
        this.addChild(container);
        // container.size(200, 300)
        container.width = this.conf.bg.size.w;
        container.height = this.conf.bg.size.h;
        container.pivotX = this.conf.bg.size.w / 2;
        container.pivotY = this.conf.bg.size.h / 2;
        container.x = this.conf.alphabg.size.w / 2;
        container.y = this.conf.alphabg.size.h / 2;
        Laya.Tween.from(container, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
    };
    SharePageNotice.prototype.initClose = function () {
        if (!this.conf.close) {
            return;
        }
        var container = SharePageNotice.container;
        var close = new MyButton();
        close.init(this.conf.close, this, this.onClose);
        close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
        container.addChild(close);
    };
    SharePageNotice.prototype.initBg = function () {
        var container = SharePageNotice.container;
        if (!this.conf.bg) {
            return;
        }
        var bg = Tools.addSprite(container, this.conf.bg);
    };
    SharePageNotice.prototype.initContent = function () {
        // var lb = Tools.addLabels(this, this.conf.lbTest);
        // if (this.conf.label) {
        var container = SharePageNotice.container;
        Tools.addSprite(container, this.conf.label);
        this.lb_content = Tools.newLabel(this.conf.content.label.font.text, this.conf.content.label.size.w, this.conf.content.label.size.h, this.conf.content.label.font.size, this.conf.content.label.font.color, this.conf.content.label.font.align, this.conf.content.label.font.valign, this.conf.content.label.font.name, this.conf.content.label.font.wrap, this.conf.content.label.font.underline);
        if (this.conf.content.label.font.borderColor) {
            this.lb_content.borderColor = this.conf.content.label.font.borderColor;
        }
        if (this.conf.content.label.font.alpha) {
            this.lb_content.alpha = this.conf.content.label.font.alpha;
        }
        this.lb_content.pos(this.conf.content.label.pos.x, this.conf.content.label.pos.y);
        container.addChild(this.lb_content);
        this.lb_content.text = this.conf.type_content[this.data];
    };
    SharePageNotice.prototype.initBtns = function () {
        var container = SharePageNotice.container;
        if (this.conf.btnok) {
            this.btnok = new MyButton();
            this.btnok.init(this.conf.btnok, this, this.onClick);
            this.btnok.pos(this.conf.btnok.pos.x, this.conf.btnok.pos.y);
            container.addChild(this.btnok);
        }
    };
    SharePageNotice.prototype.onClick = function (e, bcallback) {
        if (bcallback === void 0) { bcallback = true; }
        this.onClose(null);
    };
    return SharePageNotice;
}(AgentDialogBase));
//# sourceMappingURL=SharePageNotice.js.map