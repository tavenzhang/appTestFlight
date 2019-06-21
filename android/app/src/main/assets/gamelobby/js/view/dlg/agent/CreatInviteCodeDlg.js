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
             * 邀请码创建弹框
             */
            var CreatInviteCodeDlg = /** @class */ (function (_super) {
                __extends(CreatInviteCodeDlg, _super);
                function CreatInviteCodeDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                CreatInviteCodeDlg.show = function (caller, callback) {
                    var dlg = new CreatInviteCodeDlg();
                    dlg.caller = caller;
                    dlg.callback = callback;
                    dlg.popup(false, true);
                };
                CreatInviteCodeDlg.prototype.initView = function () {
                    var _this = this;
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.creatBtn, this, function () {
                        SoundPlayer.clickSound();
                        var max = Math.floor(Math.random() * 12) + 4;
                        _this.codeTxt.text = Math.random().toString(36).substr(2, max);
                    });
                    EventManager.addTouchScaleListener(this.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (_this.codeTxt.text.length < 4) {
                            Toast.showToast("请输入4-12位字母或数字");
                            return;
                        }
                        LayaMain.getInstance().showCircleLoading(true);
                        var cmd = ConfObjRead.getConfUrl().cmd.agent_affiliates;
                        var data = {
                            affCode: _this.codeTxt.text,
                            memberType: "AGENT",
                            prizeGroup: 1960,
                            status: "ON"
                        };
                        HttpRequester.postHttpData(cmd, data, _this, _this.creatCallback);
                    });
                };
                CreatInviteCodeDlg.prototype.creatCallback = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        if (this.caller && this.callback) {
                            this.callback.call(this.caller);
                        }
                        this.close(null, true);
                        Toast.showToast("成功生成邀请码");
                    }
                };
                CreatInviteCodeDlg.prototype.onClosed = function ($type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, $type);
                    this.destroy(true);
                };
                return CreatInviteCodeDlg;
            }(ui.dlg.agent.CreatInviteCodeDlgUI));
            agent.CreatInviteCodeDlg = CreatInviteCodeDlg;
        })(agent = dlg_1.agent || (dlg_1.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=CreatInviteCodeDlg.js.map