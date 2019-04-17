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
var SharePage = /** @class */ (function (_super) {
    __extends(SharePage, _super);
    function SharePage() {
        return _super.call(this) || this;
    }
    SharePage.getObj = function () {
        return SharePage.obj;
    };
    SharePage.prototype.destroy = function (b) {
        SharePage.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    SharePage.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        SharePage.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    SharePage.prototype.init = function (conf, data) {
        SharePage.obj = this;
        this.conf = conf;
        this.data = data;
        this.share = new MyButton();
        this.share.init(conf.share, this, this.onClick);
        this.share.pos(conf.share.pos.x, conf.share.pos.y);
        this.addChild(this.share);
        this.send = new MyButton();
        this.send.init(conf.send, this, this.onClick);
        this.send.pos(conf.send.pos.x, conf.send.pos.y);
        this.addChild(this.send);
        this.setData(data);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    SharePage.prototype.onClick = function ($e) {
    };
    SharePage.prototype.setData = function (data) {
    };
    return SharePage;
}(MySprite));
//# sourceMappingURL=SharePage.js.map