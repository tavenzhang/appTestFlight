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
        var NoticeDlg = /** @class */ (function (_super) {
            __extends(NoticeDlg, _super);
            function NoticeDlg() {
                var _this = _super.call(this) || this;
                _this._tabs = [];
                _this.downPos = {
                    "x": 0,
                    "y": 0
                };
                _this.downPt = new Laya.Point();
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
                dlg.tab_dummy.visible = false;
                dlg.popup(false, false);
                dlg.pop(dlg);
                // dlg.requestData();
                this.dlg = dlg;
            };
            NoticeDlg.checkUnread = function () {
                // let dlg = new NoticeDlg();
                // dlg.requestData();
            };
            NoticeDlg.prototype.pop = function (dlg) {
                // dlg.alpha = 1;
                // dlg.y = 0
                dlg.anchorX = 0.5;
                dlg.anchorY = 0.5;
                dlg.x = Laya.stage.width / 2;
                dlg.y = Laya.stage.height / 2;
                Laya.Tween.to(dlg, { scaleX: 1.1, scaleY: 1.1 }, 50, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
                    Laya.Tween.to(dlg, { scaleX: 1, scaleY: 1 }, 120);
                }));
            };
            NoticeDlg.prototype.initView = function () {
                this.label.left = GameUtils.getScreencOffset(-48, 0);
                this.controls.right = GameUtils.getScreencOffset(-55, 0);
                this.contentList.left = GameUtils.getScreencOffset(-48, 0);
                this.contents.centerX = GameUtils.getScreencOffset(128, 150);
                this.contentList.on(Laya.Event.MOUSE_DOWN, this, this.onScroll);
                // this.contentList.on(Laya.Event.MOUSE_UP, this, this.onScroll);
                this.on(Laya.Event.MOUSE_UP, this, this.onScroll);
                this.contentList.on(Laya.Event.MOUSE_MOVE, this, this.onScroll);
                this.tab_notice.on(Laya.Event.CLICK, this, this.onTabClick);
                this.tab_game.on(Laya.Event.CLICK, this, this.onTabClick);
                this.tab_game.alpha = 0;
                // EventManager.addTouchScaleListener(this.controls, this, () => {
                // 	console.log("close")
                // 	SoundPlayer.returnLobbySound();
                // 	this.close(null, false);
                // });
                this.controls.on(Laya.Event.CLICK, this, this.onCloseClick);
                this.loopArrow();
                this._currentCategoryTab = NoticeData.currentTab === DlgCmd.activityCenter ? 1 : 0;
                this.updateCategoryTab();
            };
            NoticeDlg.prototype.onCloseClick = function () {
                EventManager.dispath("closeNotice");
                Laya.Tween.to(this.controls, { scaleX: 1.1, scaleY: 1.1 }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
                    SoundPlayer.returnLobbySound();
                    this.close(null, false);
                }));
                // 	this.close(null, false);
            };
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
            NoticeDlg.prototype.update = function ($data) {
                var dummy = this.content_tabs.getChildByName("tab_dummy");
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var tab = _a[_i];
                    tab.destroy(true);
                    this.content_tabs.removeChild(tab);
                }
                this._tabs.length = 0;
                this._contentH = 0;
                var data = $data[this._currentCategoryTab];
                var list = data.noticeList;
                var activeTab = null;
                for (var i = 0; i < list.length; i++) {
                    var tab = new NoticeSideTab();
                    var tabData = list[i];
                    tab.id = i;
                    tab.noticeid = tabData.noticeid;
                    tab.init(dummy);
                    tab.setData(tabData);
                    this.content_tabs.addChild(tab);
                    // tab.on("tabclick", this, this.onSideTabClick);
                    var gap = 10;
                    tab.y = (tab.height + gap) * i;
                    tab.y += dummy.y;
                    this._contentH = tab.y + tab.height;
                    this._tabs.push(tab);
                    //保存激活tab
                    if (tab.noticeid == NoticeData.noticeid) {
                        activeTab = tab;
                    }
                }
                dummy.visible = false;
                if (activeTab) {
                    activeTab.active();
                    this.loadTab(activeTab.id);
                }
                else if (this._tabs.length > 0) {
                    this._tabs[0].active();
                    this.loadTab(0);
                }
                this.listLen = list.length;
                this.arrow.visible = this.enableDrag = list.length > 6;
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
                    if (idx === 0) {
                        EventManager.dispath("unreadNotice", counter > 0);
                    }
                    else if (idx === 1) {
                        EventManager.dispath("unreadActivities", counter > 0);
                    }
                    target.visible = counter > 0;
                    var label = target.getChildByName("label");
                    // label.text = counter.toString();
                    label.autoSize = true;
                    label.align = "right";
                    // target.width = label.width + 13;
                });
            };
            NoticeDlg.prototype.onTabClick = function ($e) {
                switch ($e.currentTarget) {
                    case this.tab_notice:
                        this._currentCategoryTab = 1;
                        break;
                    case this.tab_game:
                        this._currentCategoryTab = 0;
                        break;
                }
                this.updateCategoryTab();
            };
            NoticeDlg.prototype.updateCategoryTab = function () {
                switch (this._currentCategoryTab) {
                    case 1:
                        this.tab_notice.alpha = 1;
                        this.tab_game.alpha = 0;
                        this.loadCategoryTab(1);
                        break;
                    case 0:
                        this.tab_notice.alpha = 0;
                        this.tab_game.alpha = 1;
                        this.loadCategoryTab(0);
                        break;
                }
                SoundPlayer.enterPanelSound(true);
            };
            NoticeDlg.prototype.onSideTabClick = function ($e) {
                // if (thidds.isDrag) return;
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var tab_1 = _a[_i];
                    tab_1.deactive();
                }
                var tab = $e;
                tab.active();
                tab.updateRead();
                this.updateCurrentTotalReadCounter();
                SoundPlayer.enterPanelSound();
                this.loadTab(tab.id);
            };
            NoticeDlg.prototype.updateCurrentTotalReadCounter = function () {
                var counter = 0;
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var tab = _a[_i];
                    if (tab.ind.visible) {
                        counter++;
                    }
                }
                var target = this._currentCategoryTab === 0 ? this.game_counter : this.notice_counter;
                target.visible = counter > 0;
                var label = target.getChildByName("label");
                // label.text = counter.toString();
                label.autoSize = true;
                label.align = "right";
                // target.width = label.width + 13;
            };
            NoticeDlg.prototype.loadCategoryTab = function ($id) {
                this._currentCategoryTab = $id;
                this.contents.destroyChildren();
                this.contents.removeChildren();
                this.backActionAll(this.content_tabs, 23);
                this.requestData();
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
                this._currentContent = content;
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
                                _this._tabs[index].updateRead();
                            }
                        });
                    }
                });
            };
            NoticeDlg.prototype.onScroll = function ($e) {
                var x = $e.stageX;
                var y = $e.stageY;
                switch ($e.type) {
                    case Laya.Event.MOUSE_DOWN:
                        this.downPos.x = x;
                        this.downPos.y = y;
                        this.downTime = Laya.Browser.now();
                        this.downPt.setTo(x, y);
                        break;
                    case Laya.Event.MOUSE_UP:
                        var time = Laya.Browser.now() - this.downTime;
                        var dist = this.downPt.distance($e.stageX, $e.stageY);
                        if (time < 300 && dist < 8) {
                            if ($e.target.name === "btn") {
                                this.onSideTabClick($e.target.parent.parent);
                            }
                        }
                        else {
                            // if (this.isDrag) {
                            // Laya.timer.once(10, this, function () {
                            // });
                            this.downPos.x = 0;
                            this.downPos.y = 0;
                            this.backAllContent();
                        }
                        break;
                    case Laya.Event.MOUSE_MOVE:
                        if (this.downPos.y > 0 && this.enableDrag) {
                            var sumy = y - this.downPos.y;
                            this.downPos.y = y;
                            this.content_tabs.y += sumy;
                        }
                        break;
                }
            };
            NoticeDlg.prototype.backAllContent = function () {
                var ct = this.content_tabs;
                var yHead = ct.y;
                var miny = 23; //this.conf.btnitem.pos.y;
                var yEnd = miny + this._contentH + Math.abs(ct.y); //ct.y + ct.height;//this.conf.defaultItemConfs[i].size.h;
                var maxy = 642; //this.conf.content.size.h;
                var ctHeight = ct.height; //this.conf.defaultItemConfs[i].size.h;
                var showHeight = this._contentH; //this.conf.content.size.h;
                var toY;
                if (this.listLen <= 6 || ct.y > miny) {
                    this.backActionAll(ct, miny);
                }
                else if (ct.y + this._contentH < maxy) {
                    toY = miny - this._contentH + maxy - 5;
                    this.backActionAll(ct, toY);
                }
                // if(ct.y < miny && )
                // if (yHead <= miny && yEnd >= maxy) {
                // 	console.log("aa", miny)
                // 	// this.backActionAll(ct, miny);
                // }
                // else if (yHead > miny || ctHeight <= showHeight) {
                // 	backY = miny - yHead;
                // 	console.log("bb", backY)
                // 	this.backActionAll(ct, backY);
                // }
                // else if (yEnd < maxy) {
                // 	backY = maxy - yEnd;
                // 	console.log("cc", backY)
                // 	this.backActionAll(ct, backY);
                // }
                // else {
                // 	console.log("dd", maxy - yEnd)
                // }
            };
            NoticeDlg.prototype.backActionAll = function (sp, y) {
                var a = sp;
                var pos = {
                    "x": a.x,
                    // "y": a.y + y
                    "y": y
                };
                this.setAction(a, pos);
            };
            NoticeDlg.prototype.setAction = function (sp, pos) {
                var tween = Laya.Tween.to(sp, {
                    x: pos.x,
                    y: pos.y
                }, 200, Laya.Ease["backIn"]);
            };
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
            NoticeDlg.doShare = function () {
            };
            NoticeDlg.prototype.onOpened = function () {
                this.on("closeNoticeDlg", this, this.close);
            };
            NoticeDlg.prototype.onClosed = function (type) {
                this.off("closeNoticeDlg", this, this.close);
                EventManager.removeAllEvents(this);
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