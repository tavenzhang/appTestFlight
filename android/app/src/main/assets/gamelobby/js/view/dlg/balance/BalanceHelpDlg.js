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
        var balance;
        (function (balance) {
            /**
             * 帮助说明
             */
            var BalanceHelpDlg = /** @class */ (function (_super) {
                __extends(BalanceHelpDlg, _super);
                function BalanceHelpDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                BalanceHelpDlg.show = function () {
                    var dlg = new BalanceHelpDlg();
                    dlg.popup(false, true);
                };
                BalanceHelpDlg.prototype.initView = function () {
                    var _this = this;
                    this.infoPanel.vScrollBarSkin = "";
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                };
                BalanceHelpDlg.prototype.onClosed = function (type) {
                    this.infoPanel.destroy(true);
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BalanceHelpDlg;
            }(ui.dlg.balance.BalanceHelpDlgUI));
            balance.BalanceHelpDlg = BalanceHelpDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BalanceHelpDlg.js.map