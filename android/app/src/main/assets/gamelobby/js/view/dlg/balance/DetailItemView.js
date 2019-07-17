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
    (function (dlg) {
        var balance;
        (function (balance) {
            var DetailItemView = /** @class */ (function (_super) {
                __extends(DetailItemView, _super);
                function DetailItemView() {
                    return _super.call(this) || this;
                }
                DetailItemView.prototype.readData = function (data) {
                    this.txt1.text = data.type || "";
                    this.txt2.text = data.subType || "";
                    this.txt3.text = data.processTime;
                    var num = data.delta;
                    var color = num > 0 ? "#0dfd2f" : "#ff1b1b";
                    var mstr = num > 0 ? "+" + num : "" + num;
                    this.txt4.text = mstr;
                    this.txt4.color = color;
                    this.txt5.text = data.curAmount + "";
                };
                return DetailItemView;
            }(ui.dlg.balance.DetailItemViewUI));
            balance.DetailItemView = DetailItemView;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=DetailItemView.js.map