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
        /**
         * 代理中心
         */
        var AgentCenterDlg = /** @class */ (function (_super) {
            __extends(AgentCenterDlg, _super);
            function AgentCenterDlg() {
                var _this = _super.call(this) || this;
                _this.curTabId = 0; //当前tab-id
                _this.tabArr = [];
                _this.isdef = true;
                _this.initView();
                return _this;
            }
            AgentCenterDlg.show = function () {
                var dlg = new AgentCenterDlg();
                dlg.width = Laya.stage.width;
                dlg.popup(null, true);
            };
            AgentCenterDlg.prototype.initView = function () {
                var _this = this;
                this.topLeftGroup.left = GameUtils.getScreencOffset(-40, 0);
                this.topRightGroup.right = GameUtils.getScreencOffset(-55, 0);
                //邀请码暂未开放
                this.tab3.visible = false;
                this.tab4.y = this.tab3.y;
                //
                var btn;
                for (var i = 0; i <= 4; i++) {
                    btn = this["tab" + i];
                    var tab = new AgentTab();
                    tab.init(btn.getChildByName("tab_on"));
                    this.tabArr.push(tab);
                    EventManager.addTouchScaleListener(btn, this, this.tabHandler, i, 1);
                }
                this.tabHandler(null, 0);
                EventManager.addTouchScaleListener(this.backBtn, this, function () {
                    SoundPlayer.returnLobbySound();
                    _this.close(null, true);
                }, null, 1);
                //返佣比例
                EventManager.addTouchScaleListener(this.rebateBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.agent.CommisionRatioDlg.show();
                });
                //提佣记录
                EventManager.addTouchScaleListener(this.recordBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.agent.CommisionRecordDlg.show();
                });
            };
            AgentCenterDlg.prototype.tabHandler = function (evt, id) {
                if (!this.isdef)
                    SoundPlayer.enterPanelSound();
                this.isdef = false;
                var tab = this.tabArr[id];
                if (tab.selected)
                    return;
                tab.selected = true;
                if (this.prevTab)
                    this.prevTab.selected = false;
                this.prevTab = tab;
                this.showTabView(id);
            };
            AgentCenterDlg.prototype.showTabView = function (id) {
                this.curTabId = id;
                this.clearTabView();
                switch (id) {
                    case 0:
                        this.tabView = new view.dlg.agent.AgentInfoView();
                        break; //代理信息
                    case 1:
                        this.tabView = new view.dlg.agent.DirectlyView();
                        break; //我的直属
                    case 2:
                        this.tabView = new view.dlg.agent.EnterpriseView();
                        break; //我的业绩
                    case 3:
                        this.tabView = new view.dlg.agent.InviteCodeView();
                        break; //邀请码
                    case 4:
                        this.tabView = new view.dlg.agent.AgentHelpView();
                        break; //代理说明
                }
                if (this.tabView) {
                    this.viewBox.addChild(this.tabView);
                }
            };
            AgentCenterDlg.prototype.clearTabView = function () {
                if (this.tabView) {
                    this.tabView.destroy();
                    this.tabView = null;
                }
            };
            AgentCenterDlg.prototype.onClosed = function (type) {
                this.tabArr.forEach(function (tab) { return tab.destroy(); });
                this.tabArr = null;
                this.clearTabView();
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return AgentCenterDlg;
        }(ui.dlg.AgentCenterDlgUI));
        dlg_1.AgentCenterDlg = AgentCenterDlg;
        /**
         * tab菜单
         */
        var AgentTab = /** @class */ (function () {
            function AgentTab() {
            }
            AgentTab.prototype.init = function (tabOn) {
                this.tabOn = tabOn;
                this.tabOn.alpha = 0;
                this.anim = new DragonBoneAnim();
                this.anim.loadInit({ skUrl: "./assets/animation/agent/btn.sk", autoPlay: false });
                this.tabOn.addChild(this.anim);
                this.anim.pos(180, 55);
            };
            Object.defineProperty(AgentTab.prototype, "selected", {
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    this._selected = value;
                    if (value) {
                        this.tabOn.x = -30;
                        Laya.Tween.clearTween(this.tabOn);
                        Laya.Tween.to(this.tabOn, { alpha: 1, x: 0 }, 400);
                        this.anim.resume();
                    }
                    else {
                        Laya.Tween.clearTween(this.tabOn);
                        Laya.Tween.to(this.tabOn, { alpha: 0 }, 200);
                        this.anim.pause();
                    }
                },
                enumerable: true,
                configurable: true
            });
            AgentTab.prototype.destroy = function () {
                if (this.anim) {
                    this.anim.destroy(true);
                    this.anim = null;
                }
            };
            return AgentTab;
        }());
        dlg_1.AgentTab = AgentTab;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AgentCenterDlg.js.map