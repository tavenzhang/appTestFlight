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
        var center;
        (function (center) {
            /**
             * 绑定支付宝
             */
            var BindAlipayDlg = /** @class */ (function (_super) {
                __extends(BindAlipayDlg, _super);
                function BindAlipayDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                BindAlipayDlg.show = function () {
                    var dlg = new BindAlipayDlg();
                    dlg.popup(false, true);
                };
                BindAlipayDlg.prototype.initView = function () {
                    var _this = this;
                    this.pwdTxt.prompt = Common.cardInfo.hasBankCard ? "请输入提现密码(4位数字)" : "请设置提现密码(4位数字)";
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //绑定
                    EventManager.addTouchScaleListener(this.bindBtn, this, function () {
                        SoundPlayer.clickSound();
                        var bl = GameUtils.checkStr(_this.accTxt.text, "支付宝账号不能为空");
                        if (!bl)
                            return;
                        bl = GameUtils.checkStr(_this.nameTxt.text, "实名制名字不能为空");
                        if (!bl)
                            return;
                        bl = GameUtils.checkStr(_this.pwdTxt.text, "提现密码不能为空");
                        if (!bl)
                            return;
                        LayaMain.getInstance().showCircleLoading(true);
                        if (Common.cardInfo.hasBankCard) { //如果绑定了银行卡
                            _this.twiceBind();
                        }
                        else {
                            _this.onceBind();
                        }
                    });
                    EventManager.pushEvent(this.lookBtn, Laya.Event.CHANGE, this, this.togglePwdInput, [this.pwdTxt]);
                };
                BindAlipayDlg.prototype.togglePwdInput = function (txt) {
                    GameUtils.onShowPwd(txt);
                };
                //首次绑定
                BindAlipayDlg.prototype.onceBind = function () {
                    var epwd = window['SecretUtils'].rsaEncodePWD(this.pwdTxt.text);
                    var data = {
                        realName: this.nameTxt.text,
                        securityPassword: epwd,
                        userBankCardDto: {
                            bankAccountName: this.nameTxt.text,
                            bankAddress: "支付宝",
                            bankCardNo: this.accTxt.text,
                            bankCode: "ZHB",
                            bankName: "支付宝"
                        }
                    };
                    HttpRequester.putHttpData(ConfObjRead.getConfUrl().cmd.onceBindCard, data, this, this.responseBindCard);
                };
                //二次绑定
                BindAlipayDlg.prototype.twiceBind = function () {
                    var epwd = window['SecretUtils'].rsaEncodePWD(this.pwdTxt.text);
                    var data = {
                        bankAccountName: this.nameTxt.text,
                        bankAddress: "支付宝",
                        bankCardNo: this.accTxt.text,
                        bankCode: "ZHB",
                        bankName: "支付宝",
                        securityPassword: epwd
                    };
                    HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.twiceBindCard, data, this, this.responseBindCard);
                };
                BindAlipayDlg.prototype.responseBindCard = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        Toast.showToast("支付宝绑定成功");
                        LobbyDataManager.getCardInfo();
                        this.close(null, true);
                    }
                };
                BindAlipayDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BindAlipayDlg;
            }(ui.dlg.center.BindAlipayDlgUI));
            center.BindAlipayDlg = BindAlipayDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BindAlipayDlg.js.map