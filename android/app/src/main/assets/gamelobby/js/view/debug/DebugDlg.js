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
    var debug;
    (function (debug) {
        var DebugDlg = /** @class */ (function (_super) {
            __extends(DebugDlg, _super);
            function DebugDlg() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            DebugDlg.show = function () {
                var dlg = new DebugDlg();
                dlg.popup(false, true);
            };
            DebugDlg.prototype.initView = function () {
                var _this = this;
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                });
                EventManager.addTouchScaleListener(this.okBtn, this, function () {
                    SoundPlayer.clickSound();
                    if (_this.cmdTxt.text == "openDebug") {
                        PostMHelp.game_common({ "do": "openDebug" });
                        _this.close(null, true);
                    }
                    else {
                        Toast.showToast("cmd is error!");
                    }
                });
            };
            DebugDlg.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return DebugDlg;
        }(ui.debug.DebugDlgUI));
        debug.DebugDlg = DebugDlg;
    })(debug = view.debug || (view.debug = {}));
})(view || (view = {}));
//# sourceMappingURL=DebugDlg.js.map