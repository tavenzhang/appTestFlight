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
var Notice_Message = /** @class */ (function (_super) {
    __extends(Notice_Message, _super);
    function Notice_Message() {
        return _super.call(this) || this;
    }
    Notice_Message.prototype.setData = function ($data) {
        if ($data.img != "") {
            this.image.visible = true;
            this.frame.visible = true;
            this.message.visible = false;
            // console.log("share", $data.img)
            // Laya.Timer
            Laya.timer.once(500, this, this.showLoading);
            Laya.loader.load($data.img, Laya.Handler.create(this, function () {
                Laya.timer.clear(this, this.showLoading);
                LayaMain.getInstance().showCircleLoading(false);
                this.image.skin = $data.img;
            }));
        }
        else {
            this.image.visible = false;
            this.frame.visible = false;
            this.message.visible = true;
            var title = this.message.getChildByName("title");
            title.text = $data.title;
            var content = this.message.getChildByName("content");
            content.text = $data.content;
            var date = this.message.getChildByName("date");
            date.text = $data.author;
        }
    };
    Notice_Message.prototype.showLoading = function () {
        LayaMain.getInstance().showCircleLoading();
    };
    return Notice_Message;
}(ui.dlg.notice.NoticeMessageUI));
//# sourceMappingURL=Notice_Message.js.map