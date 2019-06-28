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
             * 我的直属
             */
            var DirectlyView = /** @class */ (function (_super) {
                __extends(DirectlyView, _super);
                function DirectlyView() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                DirectlyView.prototype.initView = function () {
                    var _this = this;
                    this.centerX = 0;
                    this.y = 40;
                    this.itemPanel.vScrollBarSkin = "";
                    this.reqSubList();
                    if (AgentModel.role != "AGENT" && AgentModel.role != "GENERAL_AGENT") {
                        this.addBtn.gray = true;
                        this.addBtn.mouseEnabled = false;
                    }
                    else {
                        //添加用户
                        EventManager.addTouchScaleListener(this.addBtn, this, function () {
                            SoundPlayer.enterPanelSound();
                            view.dlg.agent.AddUserDlg.show(_this, _this.reqSubList);
                        });
                    }
                    //搜索
                    EventManager.addTouchScaleListener(this.seachBtn, this, function () {
                        SoundPlayer.clickSound();
                        var str = _this.inputTxt.text;
                        if (str.length <= 0) {
                            _this.reqSubList();
                        }
                        else {
                            AgentModel.getSubList({ size: 200, start: 0, username: str.toLowerCase() }, _this, _this.subListCallback);
                        }
                    });
                };
                DirectlyView.prototype.reqSubList = function () {
                    AgentModel.getSubList({ size: 200, start: 0, username: Common.userInfo.username }, this, this.subListCallback);
                };
                DirectlyView.prototype.subListCallback = function (jobj) {
                    var _this = this;
                    this.clearList();
                    var list = jobj.datas;
                    var item;
                    list.forEach(function (value, index) {
                        item = new view.dlg.agent.DirectlyItem();
                        item.initData(value, index);
                        item.y = index * item.height;
                        _this.itemPanel.addChild(item);
                    });
                };
                DirectlyView.prototype.clearList = function () {
                    if (this.itemPanel.numChildren > 0) {
                        this.itemPanel.removeChildren();
                        this.itemPanel.scrollTo(0, 0);
                    }
                };
                DirectlyView.prototype.destroy = function () {
                    this.itemPanel.removeChildren();
                    _super.prototype.destroy.call(this, true);
                };
                return DirectlyView;
            }(ui.dlg.agent.DirectlyViewUI));
            agent.DirectlyView = DirectlyView;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=DirectlyView.js.map