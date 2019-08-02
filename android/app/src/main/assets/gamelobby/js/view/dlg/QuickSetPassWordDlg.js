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
        /**
         * 修改密码框
         * 用于提现时使用，如果提现时没有修改过密码就需要先修改密码
         */
        var QuickSetPassWordDlg = /** @class */ (function (_super) {
            __extends(QuickSetPassWordDlg, _super);
            function QuickSetPassWordDlg() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            /**
             * 显示入口
             */
            QuickSetPassWordDlg.show = function () {
                var dlg = new QuickSetPassWordDlg();
                dlg.popup(false, true);
            };
            QuickSetPassWordDlg.prototype.initView = function () {
                this.newTxt1.type = "password";
                this.newTxt2.type = "password";
                this.initEvents();
            };
            QuickSetPassWordDlg.prototype.initEvents = function () {
                var _this = this;
                //关闭
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                    //关闭时打开提现界面
                    Tools.jump2module(ConfObjRead.getConfUrl().url.g_redraw, "redraw");
                });
                //确定修改按钮
                EventManager.addTouchScaleListener(this.amendBtn, this, function () {
                    SoundPlayer.clickSound();
                    var pwd;
                    switch (Common.loginType) {
                        case LoginType.Fast:
                            pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
                            break;
                        case LoginType.Phone:
                            pwd = SaveManager.getObj().get(SaveManager.KEY_PHONEPWD, "");
                            break;
                        case LoginType.WeChat:
                            pwd = SaveManager.getObj().get(SaveManager.KEY_WEICHATPWD, "");
                            break;
                        default: pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
                    }
                    var newpwd = _this.newTxt1.text;
                    var confirmpwd = _this.newTxt2.text;
                    var verify = Tools.verifyChangePw(pwd, newpwd, confirmpwd);
                    if (!verify.bRight) {
                        Toast.showToast(Tools.getStringByKey(verify.msg));
                        return;
                    }
                    HttpRequester.changePassword(pwd, newpwd, true, _this, _this.requestResult);
                });
                EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
                EventManager.pushEvent(this.lookBtn1, Laya.Event.CHANGE, this, this.togglePwdInput, [this.newTxt1]);
                EventManager.pushEvent(this.lookBtn2, Laya.Event.CHANGE, this, this.togglePwdInput, [this.newTxt2]);
            };
            QuickSetPassWordDlg.prototype.togglePwdInput = function (txt) {
                GameUtils.onShowPwd(txt);
            };
            QuickSetPassWordDlg.prototype.requestResult = function (suc, hr) {
                if (suc) { //修改成功
                    var npwd = this.newTxt1.text;
                    //这里只要是快捷账号就要保存密码
                    var fastName = SaveManager.getObj().get(SaveManager.KEY_QK_USERNAME, "");
                    var isfastName = fastName == Common.loginInfo.username;
                    if (Common.loginType == LoginType.Fast || isfastName) {
                        Common.loginInfo.strongPwd = true;
                        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, npwd);
                        SaveManager.getObj().save(SaveManager.KEY_QK_PWD_CHANGED, true);
                        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                    }
                    LayaMain.getInstance().loginOut();
                    Toast.showToast("密码修改成功,请重新登录");
                }
                else { //失败
                    this.newTxt1.text = "";
                    this.newTxt2.text = "";
                }
            };
            QuickSetPassWordDlg.prototype.lostFocusInputText = function () {
                this.newTxt1.focus = false;
                this.newTxt2.focus = false;
            };
            QuickSetPassWordDlg.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return QuickSetPassWordDlg;
        }(ui.dlg.QuickSetPassWordDlgUI));
        dlg_1.QuickSetPassWordDlg = QuickSetPassWordDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=QuickSetPassWordDlg.js.map