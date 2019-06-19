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
         * 邮箱
         */
        var MailboxDlg = /** @class */ (function (_super) {
            __extends(MailboxDlg, _super);
            function MailboxDlg() {
                var _this = _super.call(this) || this;
                _this.itemArr = [];
                _this.awardCount = 0; //可领取奖励的邮件数量
                _this.initView();
                return _this;
            }
            /**
             * 入口
             */
            MailboxDlg.show = function () {
                var dlg = new MailboxDlg();
                dlg.width = Laya.stage.width;
                dlg.popup(false, true);
            };
            MailboxDlg.prototype.initView = function () {
                var _this = this;
                this.titleGroup.left = GameUtils.getScreencOffset(-48, 0);
                this.listGroup.left = GameUtils.getScreencOffset(-48, 0);
                this.backBtn.right = GameUtils.getScreencOffset(-55, 0);
                this.detailsGroup.visible = false;
                this.hintGroup.visible = false;
                this.itemList.vScrollBarSkin = "";
                this.getAllBtn.visible = false;
                this.delAllBtn.visible = false;
                this.reqMailList();
                //events--------------------
                EventManager.addTouchScaleListener(this.backBtn, this, function () {
                    SoundPlayer.returnLobbySound();
                    LobbyDataManager.refreshMoney();
                    LobbyDataManager.getUnreadMail();
                    _this.close(null, true);
                }, null, 1);
                //一键领取
                EventManager.addTouchScaleListener(this.getAllBtn, this, function () {
                    SoundPlayer.clickSound();
                    LayaMain.getInstance().showCircleLoading(true);
                    HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.receiveAllMailAward, _this, _this.getAllBack);
                });
                //一键删除
                EventManager.addTouchScaleListener(this.delAllBtn, this, function () {
                    SoundPlayer.clickSound();
                    HttpRequester.deleteHttpData(ConfObjRead.getConfUrl().cmd.delAllMail, _this, _this.delAllBack);
                });
                //领取当前
                EventManager.addTouchScaleListener(this.getCurBtn, this, function () {
                    SoundPlayer.clickSound();
                    if (_this.curItem) {
                        LayaMain.getInstance().showCircleLoading(true);
                        var cmd = ConfObjRead.getConfUrl().cmd.receiveMailAward + _this.curItem.mailId;
                        HttpRequester.getHttpData(cmd, _this, _this.getCurBack);
                    }
                });
                //删除当前
                EventManager.addTouchScaleListener(this.delCurBtn, this, function () {
                    SoundPlayer.clickSound();
                    if (_this.curItem) {
                        LayaMain.getInstance().showCircleLoading(true);
                        var cmd = ConfObjRead.getConfUrl().cmd.delMail + _this.curItem.mailId;
                        HttpRequester.deleteHttpData(cmd, _this, _this.delCurBack);
                    }
                });
            };
            //请求邮件列表
            MailboxDlg.prototype.reqMailList = function () {
                LayaMain.getInstance().showCircleLoading(true);
                HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getMailList, this, this.responseMailList);
            };
            //一键领取数据返回
            MailboxDlg.prototype.getAllBack = function (suc, jobj) {
                LayaMain.getInstance().showCircleLoading(false);
                if (suc) {
                    var money = jobj.amount || 0;
                    if (money > 0)
                        view.dlg.mail.MailAwardDlg.show(money);
                    this.awardCount = 0;
                    this.updateGetAndDelBtn();
                    this.reqMailList();
                }
            };
            //一键删除数据返回
            MailboxDlg.prototype.delAllBack = function (suc, jobj) {
                LayaMain.getInstance().showCircleLoading(false);
                if (suc) {
                    this.resetList();
                    this.hintGroup.visible = true;
                }
            };
            //领取当前邮件返回数据
            MailboxDlg.prototype.getCurBack = function (suc, jobj) {
                LayaMain.getInstance().showCircleLoading(false);
                if (suc) {
                    var money = jobj.amount || 0;
                    if (money > 0)
                        view.dlg.mail.MailAwardDlg.show(this.curDetailsVo.amount);
                    if (this.curItem)
                        this.curItem.markReceived();
                    this.awardCount--;
                    this.updateGetAndDelBtn();
                    //刷新显示
                    if (this.curDetailsVo)
                        this.reqDetail(this.curDetailsVo.mailId);
                }
            };
            //删除当前邮件返回数据
            MailboxDlg.prototype.delCurBack = function (suc, jobj) {
                if (suc) {
                    var dex_1 = this.itemArr.indexOf(this.curItem);
                    this.curItem.removeSelf();
                    this.curItem = null;
                    this.itemArr.forEach(function (value, id) {
                        if (id > dex_1)
                            Laya.Tween.to(value, { y: (id - 1) * (value.height + 8) }, 300);
                    });
                    this.itemArr.splice(dex_1, 1);
                    Laya.timer.once(320, this.itemList, this.itemList.refresh);
                    if (this.itemArr.length > 0) { //删除后默认第一条为选中状态
                        var def = this.itemArr[0];
                        this.selectItem(def);
                    }
                    else {
                        this.hintGroup.visible = true;
                        this.resetList();
                    }
                }
                LayaMain.getInstance().showCircleLoading(false);
            };
            //邮件列表数据返回
            MailboxDlg.prototype.responseMailList = function (suc, jobj) {
                LayaMain.getInstance().showCircleLoading(false);
                if (suc) {
                    this.mlistData = jobj.datas;
                    var total = jobj.totalCount;
                    if (total > 0) {
                        this.addMailList();
                        this.hintGroup.visible = false;
                    }
                    else {
                        this.hintGroup.visible = true;
                        this.resetList();
                    }
                }
            };
            //添加邮件列表
            MailboxDlg.prototype.addMailList = function () {
                var _this = this;
                this.resetList();
                var item;
                var lw = this.itemList.width;
                this.mlistData.forEach(function (value, index) {
                    item = new view.UI.MailItemView();
                    item.readData(value);
                    item.x = lw - item.width >> 1;
                    item.y = index * (item.height + 8);
                    _this.itemList.addChild(item);
                    _this.itemArr.push(item);
                    if (index == 0) { //默认选中第一条
                        _this.selectItem(item);
                    }
                    if (item.award) {
                        _this.awardCount++;
                    }
                });
                this.updateGetAndDelBtn();
                this.itemList.on(Laya.Event.CLICK, this, this.itemHandler);
            };
            MailboxDlg.prototype.updateGetAndDelBtn = function () {
                this.getAllBtn.visible = Boolean(this.awardCount > 0);
                this.delAllBtn.visible = Boolean(this.awardCount <= 0);
            };
            //重置邮件列表
            MailboxDlg.prototype.resetList = function () {
                this.awardCount = 0;
                if (this.itemList.numChildren > 0)
                    this.itemList.removeChildren();
                this.itemArr.length = 0;
                this.curItem = null;
                this.curDetailsVo = null;
                this.detailsGroup.visible = false;
                this.getAllBtn.visible = false;
                this.delAllBtn.visible = false;
            };
            //点击邮件
            MailboxDlg.prototype.itemHandler = function (e) {
                if (e.target instanceof view.UI.MailItemView) {
                    SoundPlayer.clickSound();
                    var cur = e.target;
                    this.selectItem(cur);
                }
            };
            MailboxDlg.prototype.selectItem = function (cur) {
                if (!cur.selected) {
                    this.reqDetail(cur.mailId);
                    cur.selected = true;
                    if (this.curItem) {
                        this.curItem.selected = false;
                    }
                    this.curItem = cur;
                }
            };
            //请求邮件详情
            MailboxDlg.prototype.reqDetail = function (id) {
                var _this = this;
                var cmd = ConfObjRead.getConfUrl().cmd.getMailDetail + id;
                LayaMain.getInstance().showCircleLoading(true);
                HttpRequester.getHttpData(cmd, this, function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        _this.showDetails(jobj);
                    }
                });
            };
            //显示详情
            MailboxDlg.prototype.showDetails = function (vo) {
                if (this.curItem)
                    this.curItem.markRead();
                this.curDetailsVo = vo;
                this.ctitleTxt.text = vo.title;
                this.contentTxt.text = vo.content || "";
                var state = MailState[vo.state];
                var showAward; //是否显示奖励相关
                if (vo.amount && vo.amount > 0) {
                    if (state == MailState.UNCLAIMED || state == MailState.READUNCLAIMED) {
                        showAward = true;
                    }
                }
                this.awardGroup.visible = showAward;
                this.getCurBtn.visible = showAward;
                this.delCurBtn.visible = !showAward;
                if (showAward) {
                    var scl = 0.42; //字体需要缩放处理
                    if (!this.bitFont) {
                        this.bitFont = new BitmapFont(ResConfig.bitFont_mail);
                        this.bitFont.scale(scl, scl);
                        this.bitFont.text = "0";
                        this.goldBox.addChild(this.bitFont);
                        this.bitFont.y = this.goldBox.height - this.bitFont.height * scl >> 1;
                    }
                    this.bitFont.text = "x" + vo.amount;
                    this.bitFont.x = this.goldBox.width - this.bitFont.width * scl >> 1;
                    this.ctxtList.height = 210;
                }
                else {
                    this.ctxtList.height = 376;
                }
                this.detailsGroup.visible = true;
            };
            MailboxDlg.prototype.onClosed = function (type) {
                this.itemList.off(Laya.Event.CLICK, this, this.itemHandler);
                EventManager.removeAllEvents(this);
                if (this.bitFont)
                    this.bitFont.destroy();
                this.itemArr = null;
                this.mlistData = null;
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return MailboxDlg;
        }(ui.dlg.MailboxDlgUI));
        dlg_1.MailboxDlg = MailboxDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=MailboxDlg.js.map