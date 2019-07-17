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
             * 身份验证
             */
            var UserAuthenDlg = /** @class */ (function (_super) {
                __extends(UserAuthenDlg, _super);
                function UserAuthenDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                UserAuthenDlg.show = function (money) {
                    var dlg = new UserAuthenDlg();
                    dlg.money = money;
                    dlg.popup(false, true);
                };
                UserAuthenDlg.prototype.initView = function () {
                    var _this = this;
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        var bl = GameUtils.checkStr(_this.pwdTxt.text, "请输入余额宝密码");
                        if (!bl)
                            return;
                        LayaMain.getInstance().showCircleLoading(true);
                        HttpRequester.postHttpData(ConfObjRead.httpCmd.yuebaoWithdraw, { amount: _this.money, yebPassword: _this.pwdTxt.text }, _this, _this.withdrawCallback);
                    });
                    EventManager.addTouchScaleListener(this.setPwdBtn, this, function () {
                        SoundPlayer.enterPanelSound();
                        view.dlg.balance.BalanceChangePwdDlg.show();
                    });
                };
                UserAuthenDlg.prototype.withdrawCallback = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        this.close(null, true);
                        dlg_1.TipsDlg.show("成功取出：" + this.money + "元");
                        LobbyDataManager.refreshMoney();
                        EventManager.dispath(EventType.FLUSH_YUEBAOINFO);
                    }
                };
                UserAuthenDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return UserAuthenDlg;
            }(ui.dlg.balance.UserAuthenDlgUI));
            balance.UserAuthenDlg = UserAuthenDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=UserAuthenDlg.js.map