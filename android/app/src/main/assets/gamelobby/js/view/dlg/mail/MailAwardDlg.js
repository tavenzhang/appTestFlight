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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var dlg;
    (function (dlg_1) {
        var mail;
        (function (mail) {
            /**
             * 邮件领取奖励弹框
             */
            var MailAwardDlg = /** @class */ (function (_super) {
                __extends(MailAwardDlg, _super);
                function MailAwardDlg(money) {
                    var _this = _super.call(this) || this;
                    _this.money = money;
                    _this.initView();
                    return _this;
                }
                MailAwardDlg.show = function (money) {
                    var dlg = new MailAwardDlg(money);
                    dlg.popup(false, true);
                };
                MailAwardDlg.prototype.initView = function () {
                    var _this = this;
                    this.bitFont = new BitmapFont(ResConfig.bitFont_mail);
                    this.bitFont.text = "x" + this.money;
                    this.fontBox.addChild(this.bitFont);
                    this.bitFont.y = this.fontBox.height - this.bitFont.height >> 1;
                    //
                    Laya.timer.frameLoop(1, this, this.frameHandler);
                    Laya.timer.once(3000, this, function () {
                        Laya.timer.clear(_this, _this.frameHandler);
                        _this.close(null, true);
                    });
                };
                MailAwardDlg.prototype.frameHandler = function () {
                    this.cirPic.rotation++;
                };
                MailAwardDlg.prototype.onClosed = function (type) {
                    if (this.bitFont)
                        this.bitFont.destroy();
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return MailAwardDlg;
            }(ui.dlg.mail.MailAwardDlgUI));
            mail.MailAwardDlg = MailAwardDlg;
        })(mail = dlg_1.mail || (dlg_1.mail = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=MailAwardDlg.js.map