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
             * 直属item
             */
            var DirectlyItem = /** @class */ (function (_super) {
                __extends(DirectlyItem, _super);
                function DirectlyItem() {
                    var _this = _super.call(this) || this;
                    // this.mouseEnabled = true;
                    _this.setBtn.visible = false; //暂不能操作
                    return _this;
                }
                DirectlyItem.prototype.initData = function (data, index) {
                    if (index % 2 != 0)
                        this.itemBg.skin = "ui/agent/img_daili_tiaodibian02.png";
                    this.dtxt1.text = data.username;
                    this.dtxt2.text = data.role;
                    this.dtxt3.text = data.subBet.toString();
                    this.dtxt4.text = data.teamBet.toString();
                    this.dtxt5.text = data.subMembers.toString();
                    this.dtxt6.text = data.teamMembers.toString();
                };
                return DirectlyItem;
            }(ui.dlg.agent.DirectlyItemUI));
            agent.DirectlyItem = DirectlyItem;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=DirectlyItem.js.map