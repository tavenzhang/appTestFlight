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
             * 余额宝-修改密码
             */
            var BalanceChangePwdDlg = /** @class */ (function (_super) {
                __extends(BalanceChangePwdDlg, _super);
                function BalanceChangePwdDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                BalanceChangePwdDlg.show = function () {
                    var dlg = new BalanceChangePwdDlg();
                    dlg.popup(false, true);
                };
                BalanceChangePwdDlg.prototype.initView = function () {
                    var _this = this;
                    this.view = new SetPwdView(this.pwdView);
                    var bindPhone = Common.userInfo_current.certifiedPhone; //是否绑定过手机
                    if (!bindPhone) {
                        this.view.setGrayIndex(1, true);
                        this.pwdView.checkGroup2.alpha = 0.5;
                    }
                    this.view.selectIndex = 0;
                    //确定修改
                    EventManager.addTouchScaleListener(this.pwdView.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (_this.view.isOldPwd) { //旧密码修改
                            if (!_this.view.checkOldPwdInfos())
                                return;
                            _this.reqChangePwd();
                        }
                        else { //短信验证修改
                            if (!_this.view.checkPhoneCodePwdInfos())
                                return;
                            _this.reqChangePwdBycode();
                        }
                    });
                    //获取验证
                    EventManager.addTouchScaleListener(this.pwdView.getCodeBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.view.getPhoneVercode(VerCodeType.MSG_RESET_PWD);
                    });
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                };
                BalanceChangePwdDlg.prototype.reqChangePwd = function () {
                    var _this = this;
                    LayaMain.getInstance().showCircleLoading(true);
                    var oldpwd = this.pwdView.pwdTxt1.text;
                    var newpwd = this.pwdView.pwdTxt2.text;
                    var data = {
                        yebPassword: oldpwd,
                        newYebPassword: newpwd
                    };
                    var cmd = ConfObjRead.httpCmd.yuebaoChangePwdByoldpwd;
                    HttpRequester.postHttpData(cmd, data, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            _this.close(null, true);
                            Toast.showToast("余额宝密码修改成功");
                        }
                    });
                };
                BalanceChangePwdDlg.prototype.reqChangePwdBycode = function () {
                    var _this = this;
                    LayaMain.getInstance().showCircleLoading(true);
                    var newpwd = this.pwdView.pwdTxt4.text;
                    var data = {
                        newYebPassword: newpwd,
                        phoneNumber: this.pwdView.phoneTxt.text,
                        verificationCode: this.pwdView.codeTxt.text
                    };
                    var cmd = ConfObjRead.httpCmd.yuebaoChangePwdBycode;
                    HttpRequester.postHttpData(cmd, data, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            _this.close(null, true);
                            Toast.showToast("余额宝密码修改成功");
                        }
                    });
                };
                BalanceChangePwdDlg.prototype.onClosed = function (type) {
                    this.view.destroy();
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BalanceChangePwdDlg;
            }(ui.dlg.balance.BalanceChangePwdDlgUI));
            balance.BalanceChangePwdDlg = BalanceChangePwdDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BalanceChangePwdDlg.js.map