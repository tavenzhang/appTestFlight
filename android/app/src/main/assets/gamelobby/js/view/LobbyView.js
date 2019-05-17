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
            var _this = _super.call(this) || this;
            LobbyView.inst = _this;
            return _this;
        }
        LobbyView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.publicUI = new view.PublicView();
            this.uibox.addChild(this.publicUI);
            //游戏列表
            this.gameList = new GameListManager(this.iconbox);
            this.gameList.rightArrowBtn = this.moveBtn;
            this.initGirl();
            //
            this.initTitleBar();
            //
            this.initBottomMenu();
            HttpRequester.getPlayerMaterialInfo(this, this.initCycelView);
            this.initEvents();
            this.resize();
        };
        LobbyView.prototype.initEvents = function () {
            var _this = this;
            //箭头按钮
            EventManager.addTouchScaleListener(this.moveBtn, this, function () {
                SoundPlayer.clickSound();
                if (_this.gameList)
                    _this.gameList.doRightArrow(548);
            }, null, 1);
            //重置大小
            EventManager.register(EventType.RESIZE, this, this.resize);
            EventManager.register(EventType.FLUSH_AGENCYBTN, this, this.showAgencyBtn);
        };
        LobbyView.prototype.showAgencyBtn = function () {
            this.btn_dl.visible = userData.role != "PLAYER";
        };
        //left-girl
        LobbyView.prototype.initGirl = function () {
            this.girlAinm = new DragonBoneAnim();
            this.girlAinm.loadInit({ skUrl: "./assets/ui/animation/girl/girl.sk" });
            this.girlAinm.scale(-2, 2);
            this.girlSp.addChild(this.girlAinm);
            this.girlAinm.pos(this.girlSp.width >> 1, this.girlSp.height >> 1);
            this.girlSp.mouseEnabled = false;
        };
        //右上角按钮
        LobbyView.prototype.initTitleBar = function () {
            console.log("init title bar");
            //活动
            EventManager.addTouchScaleListener(this.actBtn, this, function () {
                SoundPlayer.enterPanelSound();
                //todo:xxx
                // AttentionDialog.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAttention(), AttentionDialog.TYPE_OPEN_MANUAL);
                // AttentionDialog.obj.show();
                // view.dlg.NoticeDlg.show(AttentionDialog.TYPE_OPEN_AUTO);
                console.log("panel click");
                view.dlg.NoticeDlg.show();
            });
            //客服
            EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
                console.log("customer click");
                SoundPlayer.enterPanelSound();
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
            });
            this.checkUnreadNotice();
        };
        LobbyView.prototype.checkUnreadNotice = function () {
            var alert = this.actBtn.getChildByName("alert");
            alert.visible = false;
            EventManager.register("unreadNotice", this, function ($unread) {
                alert.visible = $unread;
            });
            view.dlg.NoticeDlg.checkUnread();
        };
        //底部菜单按钮
        LobbyView.prototype.initBottomMenu = function () {
            if (AppData.isAndroidHack) {
                this.btn_tx.visible = false;
                this.shopSp.visible = false;
            }
            //充值动画
            var vo = {};
            vo.skUrl = "./assets/ui/animation/shopicon/shopicon.sk";
            vo.loopDelay = 3000;
            this.czAinm = new DragonBoneAnim();
            this.czAinm.loadInit(vo);
            this.czAinm.pos(this.shopSp.width >> 1, this.shopSp.height >> 1);
            this.shopSp.addChild(this.czAinm);
            this.shareBtn.visible = false;
            this.btn_dl.x = this.shareBtn.x;
            this.showAgencyBtn();
            //代理
            EventManager.addTouchScaleListener(this.btn_dl, this, function () {
                SoundPlayer.enterPanelSound();
                // AgentPad.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAgentPad());
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
            //分享
            EventManager.addTouchScaleListener(this.shareBtn, this, function () {
                SoundPlayer.enterPanelSound();
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "share");
            });
            //充值
            EventManager.addTouchScaleListener(this.shopSp, this, function () {
                SoundPlayer.enterPanelSound();
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
            }, null, 1);
        };
        //重置屏幕大小
        LobbyView.prototype.resize = function () {
            this.width = Laya.stage.width;
            var gap = GameUtils.posOffset;
            this.bottomGroup.right = gap;
            this.TLbox.right = gap;
            this.moveBtn.right = gap;
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
                    arr.push({ url: value.carouselUrl, linkUrl: value.carouselHref });
                });
            }
            if (!arr || arr.length == 0)
                return;
            this.cycleView = new CyclePageBox(378, 198);
            this.cycleView.init(arr, 3000);
            this.cycleView.pos(GameUtils.posOffset, 506); //GameUtils.getScreencOffset(36, 114)
            this.addChild(this.cycleView);
        };
        LobbyView.prototype.gamepanelOver = function () { };
        /**
         * 销毁
         */
        LobbyView.prototype.dispose = function () {
            if (this.publicUI)
                this.publicUI.dispose();
            if (this.arrowAnim)
                this.arrowAnim.stop();
            EventManager.removeEvent(EventType.RESIZE, this, this.resize);
            EventManager.removeEvent(EventType.FLUSH_AGENCYBTN, this, this.showAgencyBtn);
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