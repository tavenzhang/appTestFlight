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
        var _this = _super.call(this) || this;
        _this.limit = 0;
        return _this;
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
        this.limit = 0;
        this.setData(data);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    SharePage.prototype.onClick = function ($e) {
        // if (this.limit > 0) {
        //     this.limit--;
        switch ($e) {
            case this.share:
                PostMHelp.game_common({ "do": "share", "type": "circle", "param": this.data });
                SharePageNotice.showDialog(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfSharePageNoticeDialog(), "circle");
                break;
            case this.send:
                PostMHelp.game_common({ "do": "share", "type": "friend", "param": this.data });
                SharePageNotice.showDialog(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfSharePageNoticeDialog(), "friend");
                break;
        }
        // }
        // else {
        //     SharePageNotice.showDialog(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfSharePageNoticeDialog(), "empty");
        // }
    };
    SharePage.prototype.setData = function (data) {
        this.limit = data.noticeShare.upperLimit;
        Laya.loader.load(data.img, Laya.Handler.create(this, function () {
            var t = Laya.loader.getRes(data.img);
            var img = new Laya.Sprite();
            img.graphics.drawTexture(t, 0, 0);
            this.addChildAt(img, 0);
            img.pos(0, 0);
        }));
        this.data = data;
    };
    return SharePage;
}(MySprite));
//# sourceMappingURL=SharePage.js.map