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
             * 修改头像框
             */
            var SetHeadBorderDlg = /** @class */ (function (_super) {
                __extends(SetHeadBorderDlg, _super);
                function SetHeadBorderDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                /**
                 * 入口
                 */
                SetHeadBorderDlg.show = function () {
                    var dlg = new SetHeadBorderDlg();
                    dlg.popup(false, true);
                };
                SetHeadBorderDlg.prototype.initView = function () {
                };
                SetHeadBorderDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return SetHeadBorderDlg;
            }(ui.dlg.center.SetHeadBorderDlgUI));
            center.SetHeadBorderDlg = SetHeadBorderDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SetHeadBorderDlg.js.map