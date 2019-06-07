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
    /**
     * 大厅视图
     */
    var LobbyView = /** @class */ (function (_super) {
        __extends(LobbyView, _super);
        function LobbyView() {
            return _super.call(this) || this;
        }
        LobbyView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //公共部分
            this.publicUI = new view.PublicView();
            this.uibox.addChild(this.publicUI);
            //游戏列表
            this.gameList = new GameListManager(this.iconbox);
            this.gameList.rightArrowBtn = this.rightBtn;
            this.gameList.leftArrowBtn = this.leftBtn;
            this.leftBtn.visible = false;
            //女孩动画
            this.girlAinm = new DragonBoneAnim();
            this.girlAinm.loadInit({ skUrl: "./assets/animation/girl/girl.sk" });
            this.girlAinm.scale(-2, 2);
            this.girlSp.addChild(this.girlAinm);
            this.girlAinm.pos(this.girlSp.width >> 1, this.girlSp.height >> 1);
            this.girlSp.mouseEnabled = false;
            //
            if (AppData.isAndroidHack) {
                this.btn_tx.visible = false;
                this.shopSp.visible = false;
            }
            this.btn_bind.visible = false;
            this.mailDot.visible = false;
            //充值动画
            var vo = {};
            vo.skUrl = "./assets/animation/shopicon/shopicon.sk";
            vo.loopDelay = 3000;
            this.czAinm = new DragonBoneAnim();
            this.czAinm.loadInit(vo);
            this.czAinm.pos(this.shopSp.width >> 1, this.shopSp.height >> 1);
            this.shopSp.addChild(this.czAinm);
            this.showAgencyBtn();
            this.checkUnreadNotice();
            this.requestCycelData();
            this.initEvents();
            this.resize();
            LobbyDataManager.getUnreadMail();
        };
        LobbyView.prototype.initEvents = function () {
            var _this = this;
            //箭头按钮
            EventManager.addTouchScaleListener(this.rightBtn, this, function () {
                SoundPlayer.clickSound();
                if (_this.gameList)
                    _this.gameList.doRightArrow(548);
            }, null, 1);
            EventManager.addTouchScaleListener(this.leftBtn, this, function () {
                SoundPlayer.clickSound();
                if (_this.gameList)
                    _this.gameList.doLeftArrow(548);
            }, null, 1);
            //----------------top-btn-------------------
            //活动
            EventManager.addTouchScaleListener(this.actBtn, this, function () {
                SoundPlayer.enterPanelSound();
                view.dlg.NoticeDlg.show();
            });
            //客服
            EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
                SoundPlayer.enterPanelSound();
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
            });
            //-----------------bottom-btn--------------
            //邮箱
            EventManager.addTouchScaleListener(this.btn_mail, this, function () {
                SoundPlayer.enterPanelSound();
                view.dlg.MailboxDlg.show();
            });
            //代理
            EventManager.addTouchScaleListener(this.btn_dl, this, function () {
                SoundPlayer.enterPanelSound();
                view.dlg.AgentDlg.show("home");
            }, 123);
            //提现
            EventManager.addTouchScaleListener(this.btn_tx, this, function () {
                SoundPlayer.enterPanelSound();
                //如果没有修改过密码则需要先修改密码
                if (Common.userInfo_current && Common.userInfo_current.needResetPwd) {
                    view.dlg.QuickSetPassWordDlg.show();
                }
                else {
                    Tools.jump2module(ConfObjRead.getConfUrl().url.g_redraw, "redraw");
                }
            });
            //绑定送金
            EventManager.addTouchScaleListener(this.btn_bind, this, function () {
                SoundPlayer.enterPanelSound();
                view.dlg.bindPhone.BindPhoneActiveDlg.show();
            });
            //充值
            EventManager.addTouchScaleListener(this.shopSp, this, function () {
                SoundPlayer.enterPanelSound();
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
            }, null, 1);
            //重置大小
            EventManager.register(EventType.RESIZE, this, this.resize);
            EventManager.register(EventType.GETBINDAWARD_SUCC, this, this.hideBindBtn);
            EventManager.register(EventType.LIFE_CYCLE, this, this.lifeCycleHandler);
            EventManager.register(EventType.GAMETOHALL, this, this.gameToHall);
            EventManager.register(EventType.HALLTOGAME, this, this.hallToGame);
            EventManager.register(EventType.GETUSER_CURRENT, this, this.checkBindPhone);
            EventManager.register(EventType.BINDPHONE_INFO, this, this.checkBindPhone);
            EventManager.register(EventType.GETUSERS_INFO, this, this.showUserInfo);
            EventManager.register(EventType.CHECK_UNREADMAIL, this, this.checkUnreadMail);
        };
        LobbyView.prototype.checkUnreadMail = function (jobj) {
            var total = jobj.total || 0;
            this.mailDot.visible = Boolean(total > 0);
        };
        LobbyView.prototype.lifeCycleHandler = function (state) {
            Debug.outputLog("前后台切换：", state);
            if (state == 0) { //前台到后台
                this.flushCycleImage();
            }
            else {
                Laya.timer.clear(this, this.requestCycelData);
            }
        };
        LobbyView.prototype.gameToHall = function () {
            Debug.outputLog("进入大厅，开始播放动画"); //debugxxx
            Laya.timer.clear(this, this.requestCycelData);
            //恢复动画播放
            if (this.girlAinm)
                this.girlAinm.resume();
            if (this.czAinm)
                this.czAinm.resume();
            if (this.publicUI)
                this.publicUI.resume();
            if (this.cycleView)
                this.cycleView.addTimer();
            if (this.gameList)
                this.gameList.resume();
        };
        LobbyView.prototype.hallToGame = function () {
            Debug.outputLog("进入游戏，暂停动画播放"); //debugxxx
            this.flushCycleImage();
            //暂停动画播放
            if (this.girlAinm)
                this.girlAinm.pause();
            if (this.czAinm)
                this.czAinm.pause();
            if (this.publicUI)
                this.publicUI.pause();
            if (this.cycleView)
                this.cycleView.stopTimer();
            if (this.gameList)
                this.gameList.pause();
        };
        LobbyView.prototype.showUserInfo = function () {
            this.btn_dl.visible = userData.role != "PLAYER";
            this.publicUI.showUserInfo();
        };
        LobbyView.prototype.checkBindPhone = function () {
            if (!Common.bindPhoneInfo || !Common.userInfo_current)
                return;
            var bind = Common.userInfo_current.certifiedPhone;
            if (TempData.bindOpen) {
                if ((!TempData.isGetBindAward && bind) || !bind) {
                    this.btn_bind.visible = true;
                    if (TempData.joinLobbyType == JoinLobbyType.loginJoin) {
                        view.dlg.bindPhone.BindPhoneActiveDlg.show();
                    }
                }
            }
        };
        LobbyView.prototype.hideBindBtn = function () {
            this.btn_bind.visible = false;
            LobbyDataManager.refreshMoney();
            LobbyDataManager.reqUserCurrentInfo();
        };
        LobbyView.prototype.flushCycleImage = function () {
            Laya.timer.clear(this, this.requestCycelData);
            Laya.timer.once(60000 * 5, this, this.requestCycelData);
        };
        LobbyView.prototype.requestCycelData = function () {
            HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getCarouselInfo, this, this.initCycelView);
        };
        LobbyView.prototype.showAgencyBtn = function () {
            this.btn_dl.visible = userData.role != "PLAYER";
        };
        //检查是否有新的活动
        LobbyView.prototype.checkUnreadNotice = function () {
            var alert = this.actBtn.getChildByName("alert");
            alert.visible = false;
            EventManager.register("unreadNotice", this, function ($unread) {
                alert.visible = $unread;
            });
            view.dlg.NoticeDlg.checkUnread();
        };
        //重置屏幕大小
        LobbyView.prototype.resize = function () {
            this.width = Laya.stage.width;
            var gap = GameUtils.posOffset;
            this.bottomGroup.right = gap;
            this.TLbox.right = gap;
            this.rightBtn.right = gap;
            if (this.gameList)
                this.gameList.resetView();
        };
        //轮播图
        LobbyView.prototype.initCycelView = function (suc, data) {
            if (!suc)
                return;
            var arr;
            if (data && data.carousels) {
                var urls = data.carousels;
                arr = [];
                urls.forEach(function (value) {
                    arr.push({ url: value.carouselUrl, linkUrl: value.carouselHref, jumpInner: value.jumpInner });
                });
            }
            if (!arr || arr.length == 0)
                return;
            if (!this.cycleView) {
                this.cycleView = new CyclePageBox(378, 198);
                this.cycleView.init(arr, 3000);
                this.cycleView.pos(GameUtils.posOffset, 506); //GameUtils.getScreencOffset(36, 114)
                this.addChild(this.cycleView);
            }
            else {
                this.cycleView.flushData(arr);
            }
        };
        /**
         * 销毁
         */
        LobbyView.prototype.dispose = function () {
            Laya.timer.clear(this, this.requestCycelData);
            if (this.publicUI)
                this.publicUI.dispose();
            if (this.arrowAnim)
                this.arrowAnim.stop();
            EventManager.removeAllEvents(this);
            if (this.girlAinm) {
                this.girlAinm.destroy(true);
                this.girlAinm = null;
            }
            if (this.czAinm) {
                this.czAinm.destroy(true);
                this.czAinm = null;
            }
            if (this.cycleView) {
                this.cycleView.destroy(true);
                this.cycleView = null;
            }
            if (this.gameList)
                this.gameList.destory();
            this.destroy(true);
        };
        return LobbyView;
    }(ui.LobbyViewUI));
    view.LobbyView = LobbyView;
})(view || (view = {}));
//# sourceMappingURL=LobbyView.js.map