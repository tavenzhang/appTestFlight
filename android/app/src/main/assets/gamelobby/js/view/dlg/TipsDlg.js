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
var view;
(function (view) {
    var dlg;
    (function (dlg_1) {
        var TipsDlg = /** @class */ (function (_super) {
            __extends(TipsDlg, _super);
            function TipsDlg() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            TipsDlg.show = function ($message) {
                var dlg = new TipsDlg();
                dlg.message.text = $message;
                dlg.popup(false, true);
            };
            TipsDlg.prototype.initView = function () {
                var _this = this;
                EventManager.addTouchScaleListener(this.btnClose, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                });
                EventManager.addTouchScaleListener(this.btnConfirm, this, function () {
                    SoundPlayer.clickSound();
                    _this.close(null, true);
                });
            };
            TipsDlg.prototype.onClosed = function ($type) {
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, $type);
                this.destroy(true);
            };
            return TipsDlg;
        }(ui.dlg.TipsDlgUI));
        dlg_1.TipsDlg = TipsDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=TipsDlg.js.map