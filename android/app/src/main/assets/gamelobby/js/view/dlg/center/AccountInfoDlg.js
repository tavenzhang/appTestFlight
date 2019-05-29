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
             * 账户信息
             */
            var AccountInfoDlg = /** @class */ (function (_super) {
                __extends(AccountInfoDlg, _super);
                function AccountInfoDlg() {
                    var _this = _super.call(this) || this;
                    _this.bankCardInfo = null; //银行卡相关信息
                    _this.bankList = null; //银行列表
                    _this.initView();
                    return _this;
                }
                /**
                 * 入口
                 */
                AccountInfoDlg.show = function () {
                    var dlg = new AccountInfoDlg();
                    dlg.popup(false, true);
                };
                AccountInfoDlg.prototype.initView = function () {
                    var _this = this;
                    this.bankComb = new view.comp.CombBoxView();
                    this.bankComb.pos(this.bankPos.x, this.bankPos.y);
                    this.bankPos.visible = false;
                    this.yhkView.addChild(this.bankComb);
                    LayaMain.getInstance().showCircleLoading();
                    //请求绑定银行卡信息
                    HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getbankCardInfo, this, this.responseBankCardInfo);
                    this.hideAllPanel();
                    this.tabSelectView = new TabSelectView(this.tabSelect, "./assets/animation/agent/btn.sk");
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    }, null, 1);
                    for (var i = 1; i <= 3; i++) {
                        EventManager.addTouchScaleListener(this["tab" + i], this, this.tabHandler, i, 1);
                    }
                    EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
                };
                AccountInfoDlg.prototype.lostFocusInputText = function () {
                    if (this.tabId == 1) {
                        this.cardName.focus = false;
                        this.cardNum.focus = false;
                        this.subBank.focus = false;
                        this.cardPwd.focus = false;
                    }
                };
                //tab切换
                AccountInfoDlg.prototype.tabHandler = function (evt, id) {
                    this.tabId = id;
                    SoundPlayer.clickSound();
                    this.tabSelectView.show(this["tab" + id].y);
                    this.tabLabel.skin = "ui/fullMyCenter/img_grzx_cy0" + (id + 6) + ".png";
                    this.hideAllPanel();
                    switch (id) {
                        case 1:
                            this.showBackCardView();
                            break;
                        case 2:
                            this.showDepositView();
                            break;
                        case 3:
                            this.showLoginPwdView();
                            break;
                    }
                };
                AccountInfoDlg.prototype.responseBankCardInfo = function (suc, jobj) {
                    var _this = this;
                    if (suc) {
                        var arr = jobj.bankAccounts;
                        if (arr && arr.length > 0) {
                            this.bankCardInfo = arr[0];
                        }
                    }
                    //请求银行列表
                    HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getbankList, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            _this.bankList = [];
                            for (var id in jobj) {
                                _this.bankList.push(jobj[id]);
                            }
                        }
                        _this.tabHandler(null, 1);
                    });
                };
                //银行卡--------------------------------------------------------------
                AccountInfoDlg.prototype.showBackCardView = function () {
                    var _this = this;
                    if (this.bankCardInfo) { //有银行绑定信息
                        this.cardName.text = this.bankCardInfo.bankAccountName;
                        this.cardNum.text = this.bankCardInfo.bankCardNo;
                        this.subBank.text = this.bankCardInfo.bankAddress;
                        this.bankComb.labelTxt.text = this.bankCardInfo.bankName;
                        this.serviceInfo.visible = true;
                        this.openCardBtn.visible = false;
                    }
                    else {
                        this.serviceInfo.visible = false;
                        this.openCardBtn.visible = true;
                        if (!this.initBankView) {
                            //设置银行卡
                            EventManager.addTouchScaleListener(this.openCardBtn, this, function () {
                                SoundPlayer.clickSound();
                                _this.requestAddBankCard();
                            });
                        }
                    }
                    if (!this.initBankView) {
                        EventManager.pushEvent(this.cardPwdLook, Laya.Event.CHANGE, this, this.togglePwdInput, [this.cardPwd]);
                        //填充银行数据
                        var item_1;
                        this.bankList.forEach(function (value) {
                            item_1 = new view.comp.CombItemView();
                            item_1.data = value;
                            item_1.labelTxt.text = value.bankName;
                            _this.bankComb.addItem(item_1);
                        });
                    }
                    this.yhkView.visible = true;
                    this.initBankView = true;
                };
                AccountInfoDlg.prototype.requestAddBankCard = function () {
                    if (!this.checkCardInfos())
                        return;
                    var item = this.bankComb.selectItem;
                    var epwd = window['SecretUtils'].rsaEncodePWD(this.cardPwd.text);
                    var data = {
                        realName: this.cardName.text,
                        securityPassword: epwd,
                        userBankCardDto: {
                            bankAccountName: this.cardName.text,
                            bankAddress: this.subBank.text,
                            bankCardNo: this.cardNum.text,
                            bankCode: item ? item.data.bankCode : "",
                            bankName: this.bankComb.selectLabel
                        }
                    };
                    LayaMain.getInstance().showCircleLoading(true);
                    HttpRequester.addBankCard(data, this, this.responseAddBankCard);
                };
                AccountInfoDlg.prototype.responseAddBankCard = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        var str = this.bankCardInfo ? "银行卡修改成功" : "银行卡绑定成功";
                        Toast.showToast(str);
                        this.bankCardInfo = {
                            bankAccountName: this.cardName.text,
                            bankCardNo: this.cardNum.text,
                            bankName: this.bankComb.selectLabel,
                            bankAddress: this.subBank.text
                        };
                        this.openCardBtn.visible = false;
                        this.serviceInfo.visible = true;
                    }
                };
                //提现--------------------------------------------------------
                AccountInfoDlg.prototype.showDepositView = function () {
                    var _this = this;
                    if (!this.bankCardInfo) { //未绑定银行卡
                        this.tabHandler(null, 1);
                        Toast.showToast("请先绑定银行卡");
                        return;
                    }
                    var bindPhone = Common.userInfo_current.certifiedPhone; //是否绑定过手机
                    if (!this.moneyPwdView) {
                        this.moneyPwdView = new view.UI.SetPwdPanel();
                        this.moneyPwdView.pos(this.yhkView.x, this.yhkView.y);
                        this.addChild(this.moneyPwdView);
                    }
                    if (!bindPhone) {
                        this.moneyPwdView.setGrayIndex(1, true);
                    }
                    this.moneyPwdView.selectIndex = 0;
                    if (!this.initDepositPwdView) {
                        //确定修改
                        EventManager.addTouchScaleListener(this.moneyPwdView.cancelBtn, this, function () {
                            SoundPlayer.clickSound();
                            if (_this.moneyPwdView.isOldPwd) { //旧密码修改
                                if (!_this.moneyPwdView.checkOldPwdInfos())
                                    return;
                                LayaMain.getInstance().showCircleLoading(true);
                                HttpRequester.changePassword(_this.moneyPwdView.pwdTxt1.text, _this.moneyPwdView.pwdTxt2.text, false, _this, _this.responseMoneyPwdSeted);
                            }
                            else { //短信验证修改
                                if (!_this.moneyPwdView.checkPhoneCodePwdInfos())
                                    return;
                                LayaMain.getInstance().showCircleLoading(true);
                                HttpRequester.changePasswordWithPhone(_this.moneyPwdView.pwdTxt4.text, _this.moneyPwdView.phoneTxt.text, _this.moneyPwdView.codeTxt.text, false, _this, _this.responseMoneyPwdSeted);
                            }
                        });
                        //获取验证
                        EventManager.addTouchScaleListener(this.moneyPwdView.getCodeBtn, this, function () {
                            SoundPlayer.clickSound();
                            _this.moneyPwdView.getPhoneVercode(VerCodeType.MSG_RESET_PWD);
                        });
                    }
                    this.moneyPwdView.visible = true;
                    this.initDepositPwdView = true;
                };
                AccountInfoDlg.prototype.responseMoneyPwdSeted = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        Toast.showToast("提现密码修改成功");
                    }
                };
                //登录密码------------------------------------------------------
                AccountInfoDlg.prototype.showLoginPwdView = function () {
                    var _this = this;
                    var isReset = !Common.userInfo_current.needResetPwd; //是否重置过密码
                    var bindPhone = Common.userInfo_current.certifiedPhone; //是否绑定过手机
                    if (!this.loginPwdView) {
                        this.loginPwdView = new view.UI.SetPwdPanel();
                        this.loginPwdView.pos(this.yhkView.x, this.yhkView.y);
                        this.addChild(this.loginPwdView);
                    }
                    switch (Common.loginType) {
                        case LoginType.Fast: {
                            // 快捷账号未修改密码、未绑定手机号：旧密码修改（默认填写且不可修改）
                            // 快捷账号未修改密码、绑定过手机号：旧密码修改（默认填写且不可修改）、短信验证修改
                            // 快捷账号修改过密码，未绑定手机号：旧密码修改
                            // 快捷账号修改过密码、绑定了手机号：旧密码修改、短息验证修改
                            if (!bindPhone) {
                                this.loginPwdView.setGrayIndex(1, true);
                            }
                            if (!isReset) {
                                var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
                                this.loginPwdView.pwdTxt1.text = pwd;
                                this.loginPwdView.pwdTxt1.editable = false;
                                this.loginPwdView.pwdTxt1.mouseEnabled = false;
                            }
                            this.loginPwdView.selectIndex = 0;
                            break;
                        }
                        case LoginType.Account: {
                            // 账号注册登录用户未绑定手机号：旧密码修改
                            // 账号注册登录用户且绑定过手机号：旧密码修改、短信验证修改
                            if (!bindPhone) {
                                this.loginPwdView.setGrayIndex(1, true);
                            }
                            this.loginPwdView.selectIndex = 0;
                            break;
                        }
                        case LoginType.Phone: {
                            // 手机注册登录用户但没有修改过密码：旧密码修改（默认填写且不可修改）、短信验证修改
                            // 手机注册登录修改过密码：旧密码修改、短信验证修改
                            if (!isReset) {
                                var pwd = SaveManager.getObj().get(SaveManager.KEY_PHONEPWD, null);
                                if (pwd) {
                                    this.loginPwdView.pwdTxt1.text = pwd;
                                    this.loginPwdView.pwdTxt1.editable = false;
                                    this.loginPwdView.pwdTxt1.mouseEnabled = false;
                                }
                            }
                            this.loginPwdView.selectIndex = 0;
                            break;
                        }
                    }
                    if (!this.initLoginPwdView) {
                        //确定修改
                        EventManager.addTouchScaleListener(this.loginPwdView.cancelBtn, this, function () {
                            SoundPlayer.clickSound();
                            if (_this.loginPwdView.isOldPwd) { //旧密码修改
                                if (!_this.loginPwdView.checkOldPwdInfos())
                                    return;
                                LayaMain.getInstance().showCircleLoading(true);
                                HttpRequester.changePassword(_this.loginPwdView.pwdTxt1.text, _this.loginPwdView.pwdTxt2.text, true, _this, _this.responseLoginPwdSeted);
                            }
                            else { //短信验证修改
                                if (!_this.loginPwdView.checkPhoneCodePwdInfos())
                                    return;
                                LayaMain.getInstance().showCircleLoading(true);
                                HttpRequester.changePasswordWithPhone(_this.loginPwdView.pwdTxt4.text, _this.loginPwdView.phoneTxt.text, _this.loginPwdView.codeTxt.text, true, _this, _this.responseLoginPwdSeted);
                            }
                        });
                        //获取验证
                        EventManager.addTouchScaleListener(this.loginPwdView.getCodeBtn, this, function () {
                            SoundPlayer.clickSound();
                            _this.loginPwdView.getPhoneVercode(VerCodeType.MSG_RESET_PWD);
                        });
                    }
                    this.loginPwdView.visible = true;
                    this.initLoginPwdView = true;
                };
                AccountInfoDlg.prototype.responseLoginPwdSeted = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        if (Common.loginType == LoginType.Fast) {
                            Common.loginInfo.strongPwd = true;
                            var pwd = this.loginPwdView.isOldPwd ? this.loginPwdView.pwdTxt2.text : this.loginPwdView.pwdTxt4.text;
                            SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, pwd);
                            SaveManager.getObj().save(SaveManager.KEY_QK_PWD_CHANGED, true);
                            SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                        }
                        LayaMain.getInstance().loginOut();
                        Toast.showToast("登录密码修改成功，请重新登录");
                    }
                };
                AccountInfoDlg.prototype.togglePwdInput = function (txt) {
                    GameUtils.onShowPwd(txt);
                };
                AccountInfoDlg.prototype.hideAllPanel = function () {
                    this.yhkView.visible = false;
                    if (this.loginPwdView) {
                        this.loginPwdView.visible = false;
                        this.loginPwdView.resetView();
                    }
                    if (this.moneyPwdView) {
                        this.moneyPwdView.visible = false;
                        this.moneyPwdView.resetView();
                    }
                };
                AccountInfoDlg.prototype.checkCardInfos = function () {
                    var bl = true;
                    bl = GameUtils.checkStr(this.cardName.text, "请填写持卡人姓名");
                    if (!bl)
                        return bl;
                    bl = GameUtils.checkStr(this.cardNum.text, "请填写银行卡号");
                    if (!bl)
                        return bl;
                    bl = GameUtils.checkStr(this.bankComb.selectLabel, "请选择银行卡");
                    if (!bl)
                        return bl;
                    bl = GameUtils.checkStr(this.subBank.text, "请填写开户支行");
                    if (!bl)
                        return bl;
                    bl = GameUtils.checkStr(this.cardPwd.text, "请填写提现密码");
                    if (!bl)
                        return bl;
                    return bl;
                };
                AccountInfoDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    this.tabSelectView.destroy();
                    this.bankComb.destroy();
                    if (this.loginPwdView) {
                        this.loginPwdView.destroy();
                        this.loginPwdView = null;
                    }
                    if (this.moneyPwdView) {
                        this.moneyPwdView.destroy();
                        this.moneyPwdView = null;
                    }
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return AccountInfoDlg;
            }(ui.dlg.center.AccountInfoDlgUI));
            center.AccountInfoDlg = AccountInfoDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AccountInfoDlg.js.map