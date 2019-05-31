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
    var comp;
    (function (comp) {
        var CombItemView = /** @class */ (function (_super) {
            __extends(CombItemView, _super);
            function CombItemView() {
                var _this = _super.call(this) || this;
                _this.index = 0;
                _this.mouseEnabled = true;
                return _this;
            }
            return CombItemView;
        }(ui.comp.CombItemViewUI));
        comp.CombItemView = CombItemView;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=CombItemView.js.map