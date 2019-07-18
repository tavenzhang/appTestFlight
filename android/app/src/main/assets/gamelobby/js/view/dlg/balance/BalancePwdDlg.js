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
             * 余额宝密码设置
             */
            var BalancePwdDlg = /** @class */ (function (_super) {
                __extends(BalancePwdDlg, _super);
                function BalancePwdDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                BalancePwdDlg.show = function (money) {
                    var dlg = new BalancePwdDlg();
                    dlg.money = money;
                    dlg.popup(false, true);
                };
                BalancePwdDlg.prototype.initView = function () {
                    var _this = this;
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        var bl = GameUtils.checkStr(_this.pwdTxt1.text, "密码不能为空");
                        if (!bl)
                            return;
                        if (_this.pwdTxt1.text != _this.pwdTxt2.text) {
                            Toast.showToast("确认密码输入错误");
                            return;
                        }
                        LayaMain.getInstance().showCircleLoading();
                        HttpRequester.postHttpData(ConfObjRead.httpCmd.yuebaoSetPwd, { newYebPassword: _this.pwdTxt2.text }, _this, _this.setPwdCallback);
                    });
                    EventManager.pushEvent(this.lookBtn1, Laya.Event.CHANGE, this, this.togglePwdInput, [this.pwdTxt1]);
                    EventManager.pushEvent(this.lookBtn2, Laya.Event.CHANGE, this, this.togglePwdInput, [this.pwdTxt2]);
                };
                BalancePwdDlg.prototype.setPwdCallback = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        this.close(null, true);
                        Toast.showToast("余额宝密码设置成功");
                        view.dlg.balance.UserAuthenDlg.show(this.money);
                    }
                };
                BalancePwdDlg.prototype.togglePwdInput = function (txt) {
                    GameUtils.onShowPwd(txt);
                };
                BalancePwdDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BalancePwdDlg;
            }(ui.dlg.balance.BalancePwdDlgUI));
            balance.BalancePwdDlg = BalancePwdDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BalancePwdDlg.js.map