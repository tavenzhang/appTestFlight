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
        var agent;
        (function (agent) {
            /**
             * 添加用户
             */
            var AddUserDlg = /** @class */ (function (_super) {
                __extends(AddUserDlg, _super);
                function AddUserDlg() {
                    var _this = _super.call(this) || this;
                    _this.typeStr = "AGENT";
                    _this.initView();
                    return _this;
                }
                AddUserDlg.show = function (caller, callback) {
                    var dlg = new AddUserDlg();
                    dlg.caller = caller;
                    dlg.callback = callback;
                    dlg.popup(null, true);
                };
                AddUserDlg.prototype.initView = function () {
                    var _this = this;
                    if (AgentModel.level >= 8) {
                        this.typeIcon.skin = "ui/agent/img_daili_zi_wanjia.png";
                        this.typeStr = "PLAYER";
                    }
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        var bl = GameUtils.checkStr(_this.userTxt.text, "用户名不能为空");
                        if (!bl)
                            return;
                        var pwd = _this.pwdTxt.text;
                        if (pwd == "")
                            pwd = "123456";
                        var jobj = {
                            memberType: _this.typeStr,
                            password: window['SecretUtils'].rsaEncodePWD(pwd),
                            username: _this.userTxt.text,
                            prizeGroup: 1960
                        };
                        LayaMain.getInstance().showCircleLoading();
                        HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.createEncryptUser, jobj, _this, _this.createCallback);
                    });
                };
                AddUserDlg.prototype.createCallback = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        view.dlg.TipsDlg.show("开户成功");
                        this.close(null, true);
                        if (this.caller && this.callback) {
                            this.callback.call(this.caller);
                        }
                    }
                };
                AddUserDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return AddUserDlg;
            }(ui.dlg.agent.AddUserDlgUI));
            agent.AddUserDlg = AddUserDlg;
        })(agent = dlg_1.agent || (dlg_1.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AddUserDlg.js.map