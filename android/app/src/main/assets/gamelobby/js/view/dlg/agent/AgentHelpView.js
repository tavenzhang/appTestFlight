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
             * 代理说明
             */
            var AgentHelpView = /** @class */ (function (_super) {
                __extends(AgentHelpView, _super);
                function AgentHelpView() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                AgentHelpView.prototype.initView = function () {
                    this.centerX = 0;
                    this.y = 14;
                    this.itemPanel.vScrollBarSkin = "";
                    this.titleTxt.text = AgentModel.customerServiceUrl;
                    if (AgentModel.customerServiceUrl == "") {
                        this.itemPanel.y = 0;
                        this.itemPanel.height += this.titleTxt.height;
                        this.titleTxt.visible = false;
                    }
                };
                return AgentHelpView;
            }(ui.dlg.agent.AgentHelpViewUI));
            agent.AgentHelpView = AgentHelpView;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AgentHelpView.js.map