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
         * 修改登录密码面板
         */
        var PasswordSettingDlg = /** @class */ (function (_super) {
            __extends(PasswordSettingDlg, _super);
            function PasswordSettingDlg() {
                return _super.call(this) || this;
            }
            /**
             * 显示入口
             */
            PasswordSettingDlg.show = function () {
                var dlg = new PasswordSettingDlg();
                dlg.popup(false, true);
            };
            PasswordSettingDlg.prototype.onOpened = function () {
                _super.prototype.onOpened.call(this);
                if (Common.loginType == Common.TYPE_LOGIN_QK) {
                    var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
                    var bchangepwd = SaveManager.getObj().get(SaveManager.KEY_QK_PWD_CHANGED, false);
                    if (!bchangepwd) {
                        this.oldTxt.text = pwd;
                    }
                }
                this.newTxt1.type = "password";
                this.newTxt2.type = "password";
                this.oldTxt.type = "password";
                this.initSwitchBtn();
                this.initEvents();
            };
            PasswordSettingDlg.prototype.initSwitchBtn = function () {
                this.txtOldSwitch = new dlg_1.SwitchButton(this.lookOldBtn, "ui/setPassword/eye_01.png", "ui/setPassword/eye_00.png");
                this.txtOldSwitch.switch = false;
                this.txtSwitch1 = new dlg_1.SwitchButton(this.lookBtn1, "ui/setPassword/eye_01.png", "ui/setPassword/eye_00.png");
                this.txtSwitch1.switch = false;
                this.txtSwitch2 = new dlg_1.SwitchButton(this.lookBtn2, "ui/setPassword/eye_01.png", "ui/setPassword/eye_00.png");
                this.txtSwitch2.switch = false;
            };
            PasswordSettingDlg.prototype.initEvents = function () {
                var _this = this;
                //关闭
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                });
                //确定修改按钮
                EventManager.addTouchScaleListener(this.amendBtn, this, function () {
                    SoundPlayer.clickSound();
                    var pwd = _this.oldTxt.text;
                    var newpwd = _this.newTxt1.text;
                    var confirmpwd = _this.newTxt2.text;
                    var verify = Tools.verifyChangePw(pwd, newpwd, confirmpwd);
                    if (!verify.bRight) {
                        Toast.showToast(Tools.getStringByKey(verify.msg));
                        return;
                    }
                    _this.requestChange(pwd, newpwd, confirmpwd);
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
                EventManager.addTouchScaleListener(this.lookOldBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.txtOldSwitch.switch = !_this.txtOldSwitch.switch;
                    _this.oldTxt.type = _this.txtOldSwitch.switch ? "input" : "password";
                    _this.oldTxt.focus = true;
                });
                EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
            };
            PasswordSettingDlg.prototype.lostFocusInputText = function () {
                this.oldTxt.focus = false;
                this.newTxt1.focus = false;
                this.newTxt2.focus = false;
            };
            PasswordSettingDlg.prototype.requestChange = function (pwd, newpwd, confirmpwd) {
                try {
                    var url = ConfObjRead.getConfUrl().url.apihome +
                        ConfObjRead.getConfUrl().cmd.changepwd +
                        "?access_token=" + Common.access_token;
                    LayaMain.getInstance().showCircleLoading(true);
                    var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
                    var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
                    var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
                    var data = {
                        mode: "PASSWORD",
                        password: ePwd,
                        newPassword: eNpwd
                    };
                    var jd = JSON.stringify(data);
                    NetManager.getObj().HttpConnect(url, this, this.responseChange, header, jd, "POST", "JSON");
                }
                catch (e) { }
            };
            PasswordSettingDlg.prototype.responseChange = function (s, stat, hr) {
                LayaMain.getInstance().showCircleLoading(false);
                var err = hr.http.status;
                if (err == 204) {
                    this.changeSuc(this.newTxt1.text);
                }
                else {
                    var response = hr.http.response;
                    var jobj;
                    try {
                        jobj = JSON.parse(response);
                    }
                    catch (e) {
                        Debug.trace(e);
                        jobj = response;
                    }
                    var msg = jobj.message;
                    Toast.showToast(msg);
                    this.oldTxt.text = "";
                    this.newTxt1.text = "";
                    this.newTxt2.text = "";
                }
            };
            //修改成功
            PasswordSettingDlg.prototype.changeSuc = function (newpwd) {
                Common.loginInfo.strongPwd = true;
                SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, newpwd);
                SaveManager.getObj().save(SaveManager.KEY_QK_PWD_CHANGED, true);
                SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                LayaMain.getInstance().loginOut();
                Toast.showToast(ConfObjRead.getConfChangePwdQk().textChanged);
                if (Common.loginType == Common.TYPE_LOGIN_QK) {
                    SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, newpwd);
                    Common.loginInfo.strongPwd = true;
                    SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
                }
            };
            PasswordSettingDlg.prototype.onClosed = function (type) {
                EventManager.removeEvent(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return PasswordSettingDlg;
        }(ui.dlg.PasswordSettingDlgUI));
        dlg_1.PasswordSettingDlg = PasswordSettingDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=PasswordSettingDlg.js.map