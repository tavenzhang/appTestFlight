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
        var agent;
        (function (agent) {
            /**
             * 我的业绩item
             */
            var EnterpriseItem = /** @class */ (function (_super) {
                __extends(EnterpriseItem, _super);
                function EnterpriseItem() {
                    return _super.call(this) || this;
                }
                EnterpriseItem.prototype.initData = function (data, index) {
                    if (index % 2 != 0)
                        this.bgIcon.skin = "ui/agent/img_daili_tiaodibian02.png";
                    this.etxt1.text = data.username;
                    this.etxt2.text = data.subBet.toString();
                    this.etxt3.text = data.teamBet.toString();
                    this.etxt4.text = data.directCount.toString();
                    this.etxt5.text = data.teamCount.toString();
                    this.etxt6.text = data.brokerage.toString();
                };
                return EnterpriseItem;
            }(ui.dlg.agent.EnterpriseItemUI));
            agent.EnterpriseItem = EnterpriseItem;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=EnterpriseItem.js.map