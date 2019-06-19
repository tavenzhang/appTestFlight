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
             * 邀请码
             */
            var InviteCodeView = /** @class */ (function (_super) {
                __extends(InviteCodeView, _super);
                function InviteCodeView() {
                    var _this = _super.call(this) || this;
                    _this.itemArr = [];
                    _this.initView();
                    return _this;
                }
                InviteCodeView.prototype.initView = function () {
                    var _this = this;
                    this.centerX = 0;
                    this.y = 42;
                    AgentModel.searchAgentInvatCode(this, this.searchCallback);
                    if (AgentModel.role != "AGENT") {
                        this.creatBtn.mouseEnabled = false;
                        this.creatBtn.gray = true;
                    }
                    else {
                        //生成邀请码
                        EventManager.addTouchScaleListener(this.creatBtn, this, function () {
                            SoundPlayer.enterPanelSound();
                            dlg.agent.CreatInviteCodeDlg.show(_this, _this.flushList);
                        });
                    }
                };
                InviteCodeView.prototype.flushList = function () {
                    AgentModel.searchAgentInvatCode(this, this.searchCallback);
                };
                InviteCodeView.prototype.searchCallback = function () {
                    var url = "";
                    var info = AgentModel.agentInfo;
                    var list = AgentModel.invationVo;
                    if (AppData.IS_NATIVE_APP) {
                        url = info.appShareUrl;
                    }
                    else {
                        url = info.wapShareUrl;
                    }
                    if (list.length > 0) {
                        this.addItems();
                        if (list.length > 9 || AgentModel.role != "AGENT") {
                            this.creatBtn.mouseEnabled = false;
                            this.creatBtn.gray = true;
                        }
                        else {
                            this.creatBtn.mouseEnabled = true;
                            this.creatBtn.gray = false;
                        }
                    }
                };
                InviteCodeView.prototype.addItems = function () {
                    var _this = this;
                    this.clearItems();
                    var list = AgentModel.invationVo;
                    var item;
                    var len = list.length;
                    list.forEach(function (value, index) {
                        item = new view.dlg.agent.InviteCodeItem();
                        item.initData(value);
                        item.y = index * (item.height + 6);
                        _this.itemPanel.addChild(item);
                        _this.itemArr.push(item);
                        if (len == 1)
                            item.delBtn.visible = false;
                        else {
                            item.addDelEvent(_this, _this.doDelItem);
                        }
                    });
                };
                InviteCodeView.prototype.doDelItem = function () {
                    var _this = this;
                    LayaMain.getInstance().showCircleLoading(true);
                    var cmd = ConfObjRead.getConfUrl().cmd.agent_affiliates + "/" + agent.InviteCodeItem.curID;
                    HttpRequester.deleteHttpData(cmd, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            Toast.showToast("邀请码已删除");
                            //刷新列表(待优化为不掉用接口的方式刷新列表)
                            AgentModel.searchAgentInvatCode(_this, _this.searchCallback);
                        }
                    });
                };
                InviteCodeView.prototype.clearItems = function () {
                    this.itemArr.forEach(function (item) { return item.destroy(); });
                    this.itemArr.length = 0;
                    this.itemPanel.refresh();
                };
                InviteCodeView.prototype.destroy = function () {
                    this.itemArr.forEach(function (item) { return item.destroy(); });
                    this.itemArr = null;
                    this.itemPanel.destroy();
                    EventManager.removeAllEvents(this);
                    _super.prototype.destroy.call(this, true);
                };
                return InviteCodeView;
            }(ui.dlg.agent.InviteCodeViewUI));
            agent.InviteCodeView = InviteCodeView;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=InviteCodeView.js.map