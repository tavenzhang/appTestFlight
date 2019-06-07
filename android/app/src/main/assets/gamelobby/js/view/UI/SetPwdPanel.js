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
    var UI;
    (function (UI) {
        /**
         * 修改密码通用面版(包括登录密码和取款密码)
         */
        var SetPwdPanel = /** @class */ (function (_super) {
            __extends(SetPwdPanel, _super);
            function SetPwdPanel() {
                var _this = _super.call(this) || this;
                _this.codeTime = 0;
                _this.initView();
                return _this;
            }
            SetPwdPanel.prototype.initView = function () {
                this.radiobox = new RadioBox([this.checkBtn1, this.checkBtn2], this, this.checkPwdType);
                //添加密码框切换事件
                for (var i = 1; i < 5; i++) {
                    var txt = this["pwdTxt" + i];
                    var lookbtn = this["lookBtn" + i];
                    EventManager.pushEvent(lookbtn, Laya.Event.CHANGE, this, this.togglePwdInput, [txt]);
                }
                EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
            };
            SetPwdPanel.prototype.lostFocusInputText = function () {
                if (this.visible) {
                    this.pwdTxt1.focus = false;
                    this.pwdTxt2.focus = false;
                    this.pwdTxt3.focus = false;
                    this.pwdTxt4.focus = false;
                    this.pwdTxt5.focus = false;
                    this.phoneTxt.focus = false;
                    this.codeTxt.focus = false;
                }
            };
            SetPwdPanel.prototype.togglePwdInput = function (txt) {
                GameUtils.onShowPwd(txt);
            };
            SetPwdPanel.prototype.checkPwdType = function () {
                if (this.radiobox.selectIndex == 0) { //旧密码修改
                    this.panel1.visible = true;
                    this.panel2.visible = false;
                }
                else { //短信验证修改
                    this.phoneTxt.text = Common.userInfo_current.phoneNumber;
                    this.phoneTxt.editable = false;
                    this.phoneTxt.mouseEnabled = false;
                    this.panel1.visible = false;
                    this.panel2.visible = true;
                }
            };
            Object.defineProperty(SetPwdPanel.prototype, "selectIndex", {
                //--------------------------public--------------
                set: function (value) {
                    this.radiobox.selectIndex = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SetPwdPanel.prototype, "isOldPwd", {
                /**
                 * 是否为旧密码修改
                 */
                get: function () {
                    return Boolean(this.radiobox.selectIndex == 0);
                },
                enumerable: true,
                configurable: true
            });
            SetPwdPanel.prototype.setGrayIndex = function (index, gray) {
                this.radiobox.setGrayIndex(index, gray);
            };
            SetPwdPanel.prototype.checkOldPwdInfos = function () {
                var bl = true;
                bl = GameUtils.checkStr(this.pwdTxt1.text, "请填写旧密码");
                if (!bl)
                    return bl;
                bl = GameUtils.checkStr(this.pwdTxt2.text, "请填写新密码");
                if (!bl)
                    return bl;
                if (this.pwdTxt2.text != this.pwdTxt3.text) {
                    Toast.showToast("两次密码输入不正确，请重新填写");
                    return false;
                }
                return true;
            };
            SetPwdPanel.prototype.checkPhoneCodePwdInfos = function () {
                var bl = true;
                bl = GameUtils.checkStr(this.phoneTxt.text, "请填写手机号");
                if (!bl)
                    return bl;
                bl = GameUtils.checkStr(this.codeTxt.text, "请填写验证码");
                if (!bl)
                    return bl;
                bl = GameUtils.checkStr(this.pwdTxt4.text, "请输入密码");
                if (!bl)
                    return bl;
                if (this.pwdTxt4.text != this.pwdTxt5.text) {
                    Toast.showToast("两次密码输入不正确，请重新填写");
                    return false;
                }
                return true;
            };
            /**
             * 获取验证码
             * @param type
             */
            SetPwdPanel.prototype.getPhoneVercode = function (type) {
                var bl = GameUtils.checkStr(this.phoneTxt.text, "请填写手机号");
                if (!bl)
                    return;
                this.getCodeBtn.visible = false;
                this.codeTime = 60;
                this.timeTxt.text = this.codeTime.toString();
                Laya.timer.loop(1000, this, this.updateCodeTime);
                HttpRequester.getPhoneVercode(this.phoneTxt.text, true, VerCodeType.MSG_RESET_PWD, null, null);
            };
            SetPwdPanel.prototype.updateCodeTime = function () {
                this.codeTime--;
                this.timeTxt.text = this.codeTime.toString();
                if (this.codeTime <= 0) {
                    this.clearCodeTime();
                    this.getCodeBtn.visible = true;
                }
            };
            SetPwdPanel.prototype.clearCodeTime = function () {
                Laya.timer.clear(this, this.updateCodeTime);
            };
            SetPwdPanel.prototype.resetView = function () {
                this.panel1.visible = false;
                this.panel2.visible = false;
                this.pwdTxt1.text = this.pwdTxt2.text = this.pwdTxt3.text = "";
                this.pwdTxt1.type = this.pwdTxt2.type = this.pwdTxt3.type = "password";
                this.lookBtn1.selected = this.lookBtn2.selected = this.lookBtn3.selected = false;
                if (this.codeTime <= 0) {
                    this.phoneTxt.text = this.codeTxt.text = "";
                    this.pwdTxt4.text = this.pwdTxt5.text = "";
                    this.pwdTxt4.type = this.pwdTxt5.type = "password";
                    this.lookBtn4.selected = this.lookBtn5.selected = false;
                }
                this.radiobox.reset();
            };
            SetPwdPanel.prototype.clearInput = function () {
                if (this.radiobox.selectIndex == 0) {
                    this.pwdTxt1.text = this.pwdTxt2.text = this.pwdTxt3.text = "";
                    this.pwdTxt1.type = this.pwdTxt2.type = this.pwdTxt3.type = "password";
                    this.lookBtn1.selected = this.lookBtn2.selected = this.lookBtn3.selected = false;
                }
                else {
                    this.phoneTxt.text = this.codeTxt.text = "";
                    this.pwdTxt4.text = this.pwdTxt5.text = "";
                    this.pwdTxt4.type = this.pwdTxt5.type = "password";
                    this.lookBtn4.selected = this.lookBtn5.selected = false;
                }
            };
            SetPwdPanel.prototype.destroy = function () {
                this.clearCodeTime();
                this.radiobox.destory();
                this.radiobox = null;
                EventManager.removeAllEvents(this);
                _super.prototype.destroy.call(this, true);
            };
            return SetPwdPanel;
        }(ui.UI.SetPwdPanelUI));
        UI.SetPwdPanel = SetPwdPanel;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=SetPwdPanel.js.map