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
            this.btn_yeb.visible = false; //todo:余额宝需要上的时候去掉这句即可
            this.setBtnGap();
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
            this.initAnim();
            Debug.log("home:" + ConfObjRead.getConfUrl().url.apihome);
        };
        //底部按钮排列
        LobbyView.prototype.setBtnGap = function () {
            var gap = Math.floor(20 * GameUtils.scaleX);
            var start = this.shopSp.x;
            var arr = [
                this.btn_tx,
                this.btn_yeb,
                this.btn_dl,
                this.btn_mail,
                this.btn_bind
            ];
            var prev;
            arr.forEach(function (btn, index) {
                if (index == 0) {
                    btn.x = start - gap - btn.width / 2;
                }
                else {
                    if (prev)
                        btn.x = prev.x - gap - prev.width / 2 - btn.width / 2;
                    else
                        btn.x = start - gap - btn.width / 2;
                }
                if (btn.visible)
                    prev = btn;
            });
        };
        LobbyView.prototype.initAnim = function () {
            this.girlSp.x = -this.girlSp.width * 2;
            this.iconbox.x = Laya.stage.width;
            this.TLbox.y = -this.TLbox.height * 2;
            this.bottomBg.y = Laya.stage.height + this.bottomBg.height;
            this.bottomGroup.y = Laya.stage.height + this.bottomGroup.height;
            this.rightBtn.right = -this.rightBtn.width * 2;
            var easeing = Laya.Ease.cubicOut;
            var time = 250;
            Laya.Tween.to(this.TLbox, { y: 0 }, time, easeing, null, 100);
            Laya.Tween.to(this.bottomBg, { y: 681 }, time, easeing, null, 100);
            Laya.Tween.to(this.bottomGroup, { y: 644 }, time, easeing, null, 100);
            Laya.Tween.to(this.girlSp, { x: 36 }, 600, Laya.Ease.backOut, null, 200);
            Laya.Tween.to(this.iconbox, { x: 0 }, 600, Laya.Ease.backOut, null, 200);
            Laya.Tween.to(this.rightBtn, { right: GameUtils.posOffset }, 300, Laya.Ease.backOut, null, 800);
            Laya.timer.once(1000, this, this.checkDlg);
        };
        //检查默认弹框
        LobbyView.prototype.checkDlg = function () {
            LobbyDataManager.checkActivity();
            QueueTask.checkQueue([QueueType.bindPhoneActiv]);
            this.playEnd = true;
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
                view.dlg.NoticeDlg.show(DlgCmd.activityCenter);
            });
            //公告
            EventManager.addTouchScaleListener(this.noticeBtn, this, function () {
                SoundPlayer.enterPanelSound();
                view.dlg.NoticeDlg.show(DlgCmd.noticeCenter);
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
                view.dlg.AgentCenterDlg.show();
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
            //余额宝
            EventManager.addTouchScaleListener(this.btn_yeb, this, function () {
                SoundPlayer.enterPanelSound();
                view.dlg.BalanceDlg.show();
            });
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
            EventManager.register("closeNotice", this, this.checkUnreadNotice);
        };
        LobbyView.prototype.checkUnreadMail = function (jobj) {
            var total = jobj.total || 0;
            this.mailDot.visible = Boolean(total > 0);
        };
        LobbyView.prototype.lifeCycleHandler = function (state) {
            Debug.log("前后台切换：", state);
        };
        //从游戏返回到大厅
        LobbyView.prototype.gameToHall = function () {
            Debug.log("进入大厅，开始播放动画");
            //恢复动画播放
            if (this.girlAinm)
                this.girlAinm.resume();
            if (this.czAinm)
                this.czAinm.resume();
            if (this.publicUI)
                this.publicUI.resume();
            if (this.cycleView)
                this.cycleView.addTimer();
            /**
             * 刷新相关数据
             * 目前包括：游戏图标，余额，邮件提示，轮播图，活动提示
             */
            if (this.gameList)
                this.gameList.updateIcons();
            LobbyDataManager.refreshMoney();
            LobbyDataManager.getUnreadMail();
            this.requestCycelData();
            this.checkUnreadNotice();
        };
        //从大厅进入游戏
        LobbyView.prototype.hallToGame = function () {
            Debug.log("进入游戏，暂停动画播放");
            this.requestCycelData();
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
            this.showAgencyBtn();
            this.publicUI.showUserInfo();
        };
        LobbyView.prototype.checkBindPhone = function () {
            if (!Common.bindPhoneInfo || !Common.userInfo_current)
                return;
            var bind = Common.userInfo_current.certifiedPhone;
            if (GameData.bindOpen) {
                if ((!GameData.isGetBindAward && bind) || !bind) {
                    this.btn_bind.visible = true;
                    if (GameData.joinLobbyType == JoinLobbyType.loginJoin) {
                        QueueTask.addQueue(QueueType.bindPhoneActiv);
                        if (this.playEnd)
                            QueueTask.checkQueue([QueueType.bindPhoneActiv]);
                    }
                }
            }
        };
        LobbyView.prototype.hideBindBtn = function () {
            this.btn_bind.visible = false;
            LobbyDataManager.refreshMoney();
            LobbyDataManager.reqUserCurrentInfo();
        };
        LobbyView.prototype.requestCycelData = function () {
            HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getCarouselInfo, this, this.initCycelView);
        };
        LobbyView.prototype.showAgencyBtn = function () {
            if (Common.userInfo) {
                this.btn_dl.visible = Common.userInfo.userRole != "PLAYER";
            }
            this.setBtnGap();
        };
        //检查是否有新的活动
        LobbyView.prototype.checkUnreadNotice = function () {
            var _this = this;
            HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.attention_new, this, function (suc, jobj) {
                LayaMain.getInstance().showCircleLoading(false);
                if (suc) {
                    jobj.forEach(function (data, idx) {
                        var counter = 0;
                        if (data.noticeList) {
                            data.noticeList.forEach(function (data) {
                                if (data.bread === false) {
                                    counter++;
                                }
                            });
                        }
                        if (idx === 0) {
                            var alert_1 = _this.noticeBtn.getChildByName("alert");
                            alert_1.visible = counter > 0;
                            // this.noticeBtn.visible = counter > 0;
                        }
                        else if (idx === 1) {
                            var alert_2 = _this.actBtn.getChildByName("alert");
                            alert_2.visible = counter > 0;
                            // this.actBtn.visible = counter > 0;
                        }
                    });
                }
            });
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
            Debug.log("cyc:", data); //debugxxx
            var arr;
            if (data && data.carousels) {
                var urls = data.carousels;
                arr = [];
                urls.forEach(function (value) {
                    arr.push(value);
                });
            }
            if (!arr || arr.length == 0)
                return;
            if (!this.cycleView) {
                this.cycleView = new CyclePageBox(378, 198);
                this.cycleView.init(arr, 3000);
                this.cycleView.pos(-this.cycleView.width * 2, 506);
                this.addChild(this.cycleView);
                Laya.Tween.to(this.cycleView, { x: GameUtils.posOffset }, 600, Laya.Ease.backOut, null, 200);
            }
            else {
                this.cycleView.flushData(arr);
            }
        };
        /**
         * 销毁
         */
        LobbyView.prototype.dispose = function () {
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