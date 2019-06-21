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
             * 我的业绩
             */
            var EnterpriseView = /** @class */ (function (_super) {
                __extends(EnterpriseView, _super);
                function EnterpriseView() {
                    var _this = _super.call(this) || this;
                    _this.typeArr = ["TODAY", "YESTERDAY", "WEEK", "LAST_WEEK", "MONTH"];
                    _this.isdef = true;
                    _this.initView();
                    return _this;
                }
                EnterpriseView.prototype.initView = function () {
                    this.centerX = 0;
                    this.y = 40;
                    this.itemPanel.vScrollBarSkin = "";
                    this.radiobox = new RadioBox([this.check1, this.check2, this.check3, this.check4, this.check5], this, this.checkHandler);
                    this.radiobox.selectIndex = 0;
                };
                EnterpriseView.prototype.checkHandler = function () {
                    if (!this.isdef)
                        SoundPlayer.clickSound();
                    this.isdef = false;
                    var data = { start: 0, size: 20, type: this.typeArr[this.radiobox.selectIndex] };
                    AgentModel.getAchievement(data, this, this.reqestCallback);
                };
                EnterpriseView.prototype.reqestCallback = function (jobj) {
                    var _this = this;
                    if (this.itemPanel.numChildren > 0) {
                        this.itemPanel.removeChildren();
                        this.itemPanel.scrollTo(0, 0);
                    }
                    var list = jobj.datas;
                    var item;
                    list.forEach(function (value, index) {
                        item = new view.dlg.agent.EnterpriseItem();
                        item.initData(value, index);
                        item.y = index * item.height;
                        _this.itemPanel.addChild(item);
                    });
                };
                EnterpriseView.prototype.destroy = function () {
                    this.itemPanel.removeChildren();
                    _super.prototype.destroy.call(this, true);
                };
                return EnterpriseView;
            }(ui.dlg.agent.EnterpriseViewUI));
            agent.EnterpriseView = EnterpriseView;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=EnterpriseView.js.map