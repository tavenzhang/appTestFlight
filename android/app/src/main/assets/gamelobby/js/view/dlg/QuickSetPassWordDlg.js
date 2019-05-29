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
                this.initSwitchBtn();
                this.initEvents();
            };
            QuickSetPassWordDlg.prototype.initSwitchBtn = function () {
                this.txtSwitch1 = new dlg_1.SwitchButton(this.lookBtn1, "ui/setPassword/eye_01.png", "ui/setPassword/eye_00.png");
                this.txtSwitch1.switch = false;
                this.txtSwitch2 = new dlg_1.SwitchButton(this.lookBtn2, "ui/setPassword/eye_01.png", "ui/setPassword/eye_00.png");
                this.txtSwitch2.switch = false;
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
                //输入框密码可见开关
                EventManager.addTouchScaleListener(this.lookBtn1, this, function () {
                    SoundPlayer.clickSound();
                    _this.txtSwitch1.switch = !_this.txtSwitch1.switch;
                    _this.newTxt1.type = _this.txtSwitch1.switch ? "input" : "password";
                    _this.newTxt1.focus = true;
                });
                EventManager.addTouchScaleListener(this.lookBtn2, this, function () {
                    SoundPlayer.clickSound();
                    _this.txtSwitch2.switch = !_this.txtSwitch2.switch;
                    _this.newTxt2.type = _this.txtSwitch2.switch ? "input" : "password";
                    _this.newTxt2.focus = true;
                });
                //确定修改按钮
                EventManager.addTouchScaleListener(this.amendBtn, this, function () {
                    SoundPlayer.clickSound();
                    var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
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
            };
            QuickSetPassWordDlg.prototype.requestResult = function (suc, hr) {
                if (suc) { //修改成功
                    var npwd = this.newTxt1.text;
                    if (Common.loginType == LoginType.Fast) {
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