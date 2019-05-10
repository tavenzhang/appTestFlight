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
var view;
(function (view) {
    var dlg;
    (function (dlg_1) {
        dlg_1.dialogs = { active: null };
        var AgentDlg = /** @class */ (function (_super) {
            __extends(AgentDlg, _super);
            function AgentDlg() {
                var _this = _super.call(this) || this;
                // public dialog: Dialog;
                _this._realTabs = [];
                _this._tabs = [];
                _this.initView();
                return _this;
            }
            AgentDlg.show = function ($data) {
                if (dlg_1.dialogs.active) {
                    dlg_1.dialogs.active.loadTab($data);
                    return;
                }
                var dlg = new AgentDlg();
                dlg.popup(false, true);
                // dlg.pop(dlg);
                // dlg.popup(true, $data === "home");
                dlg.update($data);
                dlg.loadTab($data);
                dlg_1.dialogs.active = dlg;
            };
            // public pop(dlg): void {
            //     dlg.alpha = 1;
            //     dlg.y = 0;
            //     Laya.Tween.from(dlg, { alpha: 0, y: 20 }, 250);
            // }
            // public close(type?: string, showEffect?: boolean): void {
            //     Laya.Tween.to(this, { alpha: 0, y: 20 }, 250, null, new Laya.Handler(this, super.close, [type, showEffect]));
            // }
            AgentDlg.updateSideTab = function () {
                if (AgentData.role === "USER") {
                    // dialogs.active.tabAffiliates.visible = false;
                    // dialogs.active.tabAchievement.visible = false;
                    // dialogs.active.tabCodes.visible = false;
                    // dialogs.active.tabDescription.y = dialogs.active.tabAffiliates.y;
                }
            };
            AgentDlg.prototype.initView = function () {
                var _this = this;
                var w2 = Laya.stage.width - this.width;
                this.x = w2 / 2;
                this.y = (Laya.stage.height - this.width) / 2;
                this.control.x = this.x + this.width;
                if (Laya.stage.width <= 1334) {
                    var buffer = 50;
                    this.control.x += buffer - 30;
                    this.label.x += buffer * 2;
                    this.contentList.x = this.label.x;
                    this.contents.x = this.contentList.x + 318 - 10; //this.contentList.width - 10;
                }
                this.btnComRecords.x = this.control.x - this.control.width - 170;
                EventManager.addTouchScaleListener(this.control, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, false);
                });
            };
            AgentDlg.prototype.update = function ($data) {
                for (var i = 0; i < 5; i++) {
                    var dummy = this.content_tabs.getChildByName("tab" + i);
                    dummy.on(Laya.Event.CLICK, this, this.onTabClick);
                    var tab = new AgentSideTab();
                    tab.init(dummy);
                    this.content_tabs.addChild(tab);
                    var gap = 10;
                    tab.y = (tab.height + gap) * i;
                    tab.y += dummy.y;
                    this._tabs.push(tab);
                    this._realTabs.push(dummy);
                }
                this._tabs[0].active();
            };
            AgentDlg.prototype.onTabClick = function ($e) {
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var tab = _a[_i];
                    tab.deactive();
                }
                var idx = this._realTabs.indexOf($e.currentTarget);
                this._tabs[idx].active();
                switch ($e.currentTarget) {
                    case this.tabHome:
                        this.loadTab("home");
                        break;
                    case this.tabAffiliates:
                        this.loadTab("affiliates");
                        break;
                    case this.tabAchievement:
                        this.loadTab("achievement");
                        break;
                    case this.tabCodes:
                        this.loadTab("codes");
                        break;
                    case this.tabDescription:
                        this.loadTab("description");
                        break;
                }
                Laya.SoundManager.playSound("assets/raw/sfx_click.mp3");
            };
            AgentDlg.prototype.loadTab = function ($id) {
                if ($id === "codes")
                    return;
                this.contents.destroyChildren();
                this.contents.removeChildren();
                var content;
                switch ($id) {
                    case "home":
                        content = new AgentContentInfo(this, ConfObjRead.getConfAgentContentInfo());
                        break;
                    case "affiliates":
                        content = new AgentContentMyChildren(this, ConfObjRead.getConfAgentContentMyChildren());
                        break;
                    case "achievement":
                        content = new AgentContentMyIncome(this, ConfObjRead.getConfAgentContentMyIncome());
                        break;
                    case "codes":
                        // content = new AgentContentInvation(this, ConfObjRead.getConfAgentContentInvation());
                        break;
                    case "description":
                        content = new AgentContentDesc(this, ConfObjRead.getConfAgentContentDesc());
                        break;
                }
                content.x = content.y = 0;
                this.contents.addChild(content);
            };
            AgentDlg.prototype.onClosed = function (type) {
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var tab = _a[_i];
                    tab.destroy();
                }
                //     Laya.SoundManager.playSound("assets/raw/sfx_close.mp3");
                EventManager.removeAllEvents(this);
                dlg_1.dialogs.active = null;
                // EventManager.removeEvent(EventType.FLUSH_HEADICON, this, this.setHeadIcon);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return AgentDlg;
        }(ui.dlg.AgentDlgUI));
        dlg_1.AgentDlg = AgentDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AgentDlg.js.map