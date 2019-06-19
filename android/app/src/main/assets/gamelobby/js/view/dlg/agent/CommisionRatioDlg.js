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
        var agent;
        (function (agent) {
            /**
             * 返佣比例
             */
            var CommisionRatioDlg = /** @class */ (function (_super) {
                __extends(CommisionRatioDlg, _super);
                function CommisionRatioDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                CommisionRatioDlg.show = function () {
                    var dlg = new CommisionRatioDlg();
                    dlg.popup(null, true);
                };
                CommisionRatioDlg.prototype.initView = function () {
                    var _this = this;
                    this.itemPanel.vScrollBarSkin = "";
                    LayaMain.getInstance().showCircleLoading();
                    HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.agentbrokerage, this, this.brokerageCallback);
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                };
                CommisionRatioDlg.prototype.brokerageCallback = function (suc, jobj) {
                    var _this = this;
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        var list = jobj.resultObj;
                        var item_1;
                        list.forEach(function (value, index) {
                            item_1 = new view.dlg.agent.CRatioItem();
                            item_1.initData(value, index);
                            item_1.x = 2;
                            item_1.y = index * item_1.height;
                            _this.itemPanel.addChild(item_1);
                        });
                    }
                };
                CommisionRatioDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return CommisionRatioDlg;
            }(ui.dlg.agent.CommisionRatioDlgUI));
            agent.CommisionRatioDlg = CommisionRatioDlg;
        })(agent = dlg_1.agent || (dlg_1.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=CommisionRatioDlg.js.map