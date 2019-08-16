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
var AttentionDialog = /** @class */ (function () {
    function AttentionDialog() {
    }
    AttentionDialog.TYPE_OPEN_MANUAL = 1;
    AttentionDialog.TYPE_OPEN_AUTO = 2;
    return AttentionDialog;
}());
var NoticeData = {
    shareId: 0,
    shareLimit: 0,
    currentTab: 0,
    noticeid: -1,
};
var view;
(function (view) {
    var dlg;
    (function (dlg_1) {
        /**
         * 活动/公告
         */
        var NoticeDlg = /** @class */ (function (_super) {
            __extends(NoticeDlg, _super);
            function NoticeDlg() {
                var _this = _super.call(this) || this;
                _this._tabs = [];
                _this.initView();
                return _this;
            }
            NoticeDlg.show = function ($type, noticeid) {
                if (noticeid === void 0) { noticeid = -1; }
                NoticeData.currentTab = $type;
                NoticeData.noticeid = noticeid;
                var dlg = new NoticeDlg();
                dlg.width = Laya.stage.width;
                dlg.game_counter.visible = false;
                dlg.notice_counter.visible = false;
                dlg.popup(false, true);
            };
            NoticeDlg.prototype.initView = function () {
                var _this = this;
                this.label.left = GameUtils.getScreencOffset(-48, 0);
                this.controls.right = GameUtils.getScreencOffset(-55, 0);
                this.contentList.left = GameUtils.getScreencOffset(-48, 0);
                this.contents.centerX = GameUtils.getScreencOffset(128, 150);
                this.tabPanel.vScrollBarSkin = "";
                this.tabPanel.on(Laya.Event.MOUSE_UP, this, this.tabHandler);
                //tab点击事件
                this.tab_notice.on(Laya.Event.CLICK, this, this.onTabClick);
                this.tab_game.on(Laya.Event.CLICK, this, this.onTabClick);
                //返回按钮
                EventManager.addTouchScaleListener(this.controls, this, function () {
                    SoundPlayer.returnLobbySound();
                    EventManager.dispath("closeNotice");
                    _this.close(null, true);
                }, null, 1);
                this.arrow.visible = false;
                //设置默认tab
                this._currentCategoryTab = NoticeData.currentTab === DlgCmd.activityCenter ? 1 : 0;
                this.updateCategoryTab(false);
            };
            NoticeDlg.prototype.tabHandler = function (evt) {
                if (evt.target instanceof view.dlg.notice.NoticeTabView) {
                    SoundPlayer.enterPanelSound();
                    var tab = evt.target;
                    tab.active();
                    tab.onRead();
                    this.updateCurrentTotalReadCounter();
                    this.loadTab(tab.id);
                    if (this.prevTab && this.prevTab != tab) {
                        this.prevTab.deactive();
                    }
                    this.prevTab = tab;
                }
            };
            //箭头动画
            NoticeDlg.prototype.loopArrow = function () {
                this.arrow.y = 620;
                Laya.Tween.to(this.arrow, { y: 630 }, 500, Laya.Ease.linearNone, new Laya.Handler(this, this.loopArrow));
            };
            NoticeDlg.prototype.requestData = function () {
                var _this = this;
                //打开Loading加载遮罩
                LayaMain.getInstance().showCircleLoading();
                //请求活动/公告数据
                HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.attention_new, this, function (suc, jobj) {
                    //隐藏Loading加载条
                    LayaMain.getInstance().showCircleLoading(false);
                    //数据请求成功
                    if (suc) {
                        _this._data = jobj; //缓存数据
                        _this.update(jobj); //更新显示
                    }
                });
            };
            NoticeDlg.prototype.update = function (data) {
                var _this = this;
                this.prevTab = null;
                this.tabPanel.destroyChildren();
                this.tabPanel.refresh();
                this._tabs.length = 0;
                var curData = data[this._currentCategoryTab];
                var list = curData.noticeList;
                var tab;
                var tab0;
                list.forEach(function (value, index) {
                    tab = new view.dlg.notice.NoticeTabView();
                    tab.y = index * (tab.height - 5);
                    _this.tabPanel.addChild(tab);
                    _this._tabs.push(tab);
                    tab.id = index;
                    tab.readData(value);
                    if (tab.noticeid == NoticeData.noticeid) {
                        tab.active();
                        _this.loadTab(tab.id);
                        _this.prevTab = tab;
                    }
                    if (index == 0)
                        tab0 = tab;
                });
                this.arrow.visible = list.length > 6;
                if (this.arrow.visible)
                    this.loopArrow();
                else
                    Laya.Tween.clearTween(this.arrow);
                if (!this.prevTab) {
                    if (tab0) {
                        tab0.active();
                        this.loadTab(0);
                        this.prevTab = tab0;
                    }
                }
                this.updateTotalReadCounter();
            };
            NoticeDlg.prototype.updateTotalReadCounter = function () {
                var _this = this;
                this._data.forEach(function (data, idx) {
                    var target = idx === 0 ? _this.game_counter : _this.notice_counter;
                    var counter = 0;
                    if (data.noticeList) {
                        data.noticeList.forEach(function (data) {
                            if (data.bread === false) {
                                counter++;
                            }
                        });
                    }
                    target.visible = counter > 0;
                });
            };
            NoticeDlg.prototype.onTabClick = function ($e) {
                switch ($e.currentTarget) {
                    case this.tab_notice: //活动
                        this._currentCategoryTab = 1;
                        break;
                    case this.tab_game: //公告
                        this._currentCategoryTab = 0;
                        break;
                }
                this.updateCategoryTab();
            };
            NoticeDlg.prototype.updateCategoryTab = function (play) {
                if (play === void 0) { play = true; }
                var bl = Boolean(this._currentCategoryTab == 1);
                this.tab_notice.alpha = bl ? 1 : 0;
                this.tab_game.alpha = bl ? 0 : 1;
                this.contents.destroyChildren();
                this.contents.removeChildren();
                this.requestData();
                if (play)
                    SoundPlayer.enterPanelSound(true);
            };
            NoticeDlg.prototype.updateCurrentTotalReadCounter = function () {
                var counter = 0;
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var tab = _a[_i];
                    if (tab.newInd.visible) {
                        counter++;
                    }
                }
                var target = this._currentCategoryTab === 0 ? this.game_counter : this.notice_counter;
                target.visible = counter > 0;
            };
            NoticeDlg.prototype.loadTab = function ($id) {
                this.contents.destroyChildren();
                this.contents.removeChildren();
                var data = this._data[this._currentCategoryTab].noticeList[$id];
                var content;
                switch (data.noticeActivityType) {
                    case "NORMAL":
                        content = new Notice_Message();
                        content.setData(data);
                        break;
                    case "SHARE_DAILY":
                        content = new Notice_Share();
                        content.init(this);
                        content.setData(data);
                        NoticeData.shareLimit = data.noticeShare.upperLimit;
                        break;
                    case "ROULETTE_DRAW":
                        content = new Notice_Roullette();
                        content.setData(data);
                        break;
                    default:
                        // 游戏公告全是文本
                        content = new Notice_Message();
                        content.setData(data);
                        break;
                }
                content.x = content.y = 0;
                this.contents.addChild(content);
                this.requestRead(this._data[this._currentCategoryTab].noticeList[$id].noticeid);
            };
            NoticeDlg.prototype.requestRead = function (id) {
                var _this = this;
                var cmd = ConfObjRead.getConfUrl().cmd.attention_read + id;
                HttpRequester.putHttpData(cmd, null, this, function (suc, jobj) {
                    if (suc) {
                        var list = _this._data[_this._currentCategoryTab].noticeList;
                        list.forEach(function (data, index) {
                            if (data.noticeid === jobj.noticeid || data.noticeid === jobj.noticeId) {
                                _this._tabs[index].onRead();
                            }
                        });
                    }
                });
            };
            /**
             * 分享调用
             * @param type
             */
            NoticeDlg.shareSucess = function ($type) {
                var message;
                if ($type === "friend") {
                    if (NoticeData.shareLimit > 0) {
                        share();
                    }
                    else {
                        message = "分享成功，请多点和朋友分享乐趣吧";
                        view.dlg.TipsDlg.show(message);
                    }
                }
                else if ($type === "circle") {
                    if (NoticeData.shareLimit > 0) {
                        share();
                    }
                    else {
                        message = "分享成功，请多点和朋友分享乐趣吧";
                        view.dlg.TipsDlg.show(message);
                    }
                }
                function share() {
                    var url = ConfObjRead.getConfUrl().url.apihome;
                    url += ConfObjRead.getConfUrl().cmd.share + "?noticeId=" + NoticeData.shareId;
                    url += "&access_token=" + Common.access_token;
                    var header = [
                        "Accept", "application/json"
                    ];
                    HttpRequester.httpConnect(url, this, function (s, stat, hr) {
                        if (stat == "complete") {
                            NoticeData.shareLimit--;
                            message = "分享成功，请前往邮件查看";
                            view.dlg.TipsDlg.show(message);
                        }
                        else if (hr.http.code === 1002) {
                            message = "分享成功，请多点和朋友分享乐趣吧";
                            view.dlg.TipsDlg.show(message);
                        }
                    }, header, //:any=null,
                    null, //data:any=null,
                    "post", //metod:any="get",
                    "json" //restype:any="json"
                    );
                }
            };
            NoticeDlg.prototype.onOpened = function () {
                this.on("closeNoticeDlg", this, this.close);
            };
            NoticeDlg.prototype.onClosed = function (type) {
                this.off("closeNoticeDlg", this, this.close);
                EventManager.removeAllEvents(this);
                this.tabPanel.off(Laya.Event.MOUSE_UP, this, this.tabHandler);
                this.tab_notice.off(Laya.Event.CLICK, this, this.onTabClick);
                this.tab_game.off(Laya.Event.CLICK, this, this.onTabClick);
                //检测绑定送金
                QueueTask.checkQueue([QueueType.bindPhoneActiv]);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
                // PageManager.clearDlgRes(DlgCmd.activityCenter);
            };
            return NoticeDlg;
        }(ui.dlg.NoticeDlgUI));
        dlg_1.NoticeDlg = NoticeDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=NoticeDlg.js.map