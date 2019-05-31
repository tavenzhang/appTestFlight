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
         * 系统弹框
         */
        var SystemDlg = /** @class */ (function (_super) {
            __extends(SystemDlg, _super);
            function SystemDlg() {
                return _super.call(this) || this;
            }
            /**
             * 入口
             */
            SystemDlg.show = function (info, caller, callback) {
                if (caller === void 0) { caller = null; }
                if (callback === void 0) { callback = null; }
                var dlg = new SystemDlg();
                dlg.init(info, caller, callback);
                dlg.popup(false, true);
            };
            SystemDlg.prototype.init = function (info, caller, callback) {
                var _this = this;
                this.infoTxt.text = info;
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.close(null, true);
                });
                EventManager.addTouchScaleListener(this.cancelBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.close(null, true);
                });
                EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.close(null, true);
                    if (caller && callback) {
                        callback.call(caller);
                    }
                });
            };
            SystemDlg.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return SystemDlg;
        }(ui.dlg.SystemDlgUI));
        dlg_1.SystemDlg = SystemDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SystemDlg.js.map