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
        var NoticeDlg = /** @class */ (function (_super) {
            __extends(NoticeDlg, _super);
            function NoticeDlg() {
                return _super.call(this) || this;
            }
            NoticeDlg.show = function () {
                var dlg = new NoticeDlg();
                dlg.popup(false, true);
            };
            return NoticeDlg;
        }(ui.dlg.NoticeDlgUI));
        dlg_1.NoticeDlg = NoticeDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=NoticeDlg.js.map