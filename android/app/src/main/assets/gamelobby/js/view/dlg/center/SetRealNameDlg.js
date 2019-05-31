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
             * 修改持卡人真实姓名
             */
            var SetRealNameDlg = /** @class */ (function (_super) {
                __extends(SetRealNameDlg, _super);
                function SetRealNameDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                /**
                 * 入口
                 */
                SetRealNameDlg.show = function () {
                    var dlg = new SetRealNameDlg();
                    dlg.popup(false, true);
                };
                SetRealNameDlg.prototype.initView = function () {
                    var _this = this;
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        var bl = GameUtils.checkStr(_this.nameTxt.text, "姓名不能为空");
                        if (!bl)
                            return;
                        HttpRequester.setRealName(_this.nameTxt.text, _this, function (suc, jobj) {
                            if (suc) {
                                Toast.showToast("提交成功");
                            }
                            _this.close(null, true);
                        });
                    });
                };
                SetRealNameDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return SetRealNameDlg;
            }(ui.dlg.center.SetRealNameDlgUI));
            center.SetRealNameDlg = SetRealNameDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SetRealNameDlg.js.map