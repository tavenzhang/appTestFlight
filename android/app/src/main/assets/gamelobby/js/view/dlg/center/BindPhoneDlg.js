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
             * 绑定手机
             */
            var BindPhoneDlg = /** @class */ (function (_super) {
                __extends(BindPhoneDlg, _super);
                function BindPhoneDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                /**
                 * 显示入口
                 */
                BindPhoneDlg.show = function () {
                    var dlg = new BindPhoneDlg();
                    dlg.popup(false, true);
                };
                BindPhoneDlg.prototype.initView = function () {
                    var _this = this;
                    this.awardTxt.text = this.awardTxt.text.replace("x", GameData.bindAward.toString());
                    this.awardTxt.visible = GameData.bindOpen;
                    //
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //绑定手机
                    EventManager.addTouchScaleListener(this.bindBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.doBindPhone();
                    });
                    //获取验证码
                    EventManager.addTouchScaleListener(this.getCodeBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.getPhoneVerCode();
                    });
                    EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
                };
                BindPhoneDlg.prototype.lostFocusInputText = function () {
                    this.numTxt.focus = false;
                    this.codeTxt.focus = false;
                };
                BindPhoneDlg.prototype.doBindPhone = function () {
                    var _this = this;
                    if (this.numTxt.text == "") {
                        Toast.showToast("手机号不能为空");
                        return;
                    }
                    if (this.codeTxt.text == "") {
                        Toast.showToast("验证码不能为空");
                        return;
                    }
                    this.clearCodeTime();
                    LayaMain.getInstance().showCircleLoading(true);
                    var data = {
                        phoneNumber: this.numTxt.text,
                        verificationCode: this.codeTxt.text,
                        device: "WAP",
                        deviceId: GameUtils.deviceToken
                    };
                    HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.bindPhone, data, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            GameData.isGetBindAward = true;
                            Toast.showToast("手机绑定成功");
                            _this.close(null, true);
                            EventManager.dispath(EventType.GETBINDAWARD_SUCC, _this.numTxt.text);
                        }
                        else {
                            _this.getCodeBtn.visible = true;
                            var err = jobj.http.response;
                            var obj = JSON.parse(err);
                            var str = obj.message || "";
                            //设备号限制(绑定成功,但是不能在此设备领取)(备注：由于后端没法区分错误code，临时通过文字判断解决)
                            if (str.indexOf("绑定成功") != -1 && str.indexOf("绑定手机次数过多") != -1 && str.indexOf("无法获得彩金奖励") != -1) {
                                GameData.isGetBindAward = true;
                                EventManager.dispath(EventType.GETBINDAWARD_SUCC, _this.numTxt.text);
                                _this.close(null, true);
                            }
                            // if (obj.code == 1003) {//设备号限制(绑定成功,但是不能在此设备领取)
                            // 	GameData.isGetBindAward = true;
                            // 	EventManager.dispath(EventType.GETBINDAWARD_SUCC, this.numTxt.text);
                            // 	this.close(null, true);
                            // }
                        }
                    });
                };
                BindPhoneDlg.prototype.getPhoneVerCode = function () {
                    if (this.numTxt.text == "") {
                        Toast.showToast("手机号不能为空");
                        return;
                    }
                    this.codeTxt.text = "";
                    this.getCodeBtn.visible = false;
                    this.codeTime = 60;
                    this.timeTxt.text = this.codeTime.toString();
                    Laya.timer.loop(1000, this, this.updateCodeTime);
                    HttpRequester.getPhoneVercode(this.numTxt.text, true, VerCodeType.MSG_BIND_MOBILE, null, null);
                };
                BindPhoneDlg.prototype.updateCodeTime = function () {
                    this.codeTime--;
                    this.timeTxt.text = this.codeTime.toString();
                    if (this.codeTime <= 0) {
                        this.clearCodeTime();
                        this.getCodeBtn.visible = true;
                    }
                };
                BindPhoneDlg.prototype.clearCodeTime = function () {
                    Laya.timer.clear(this, this.updateCodeTime);
                };
                BindPhoneDlg.prototype.onClosed = function (type) {
                    this.clearCodeTime();
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BindPhoneDlg;
            }(ui.dlg.center.BindPhoneDlgUI));
            center.BindPhoneDlg = BindPhoneDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BindPhoneDlg.js.map