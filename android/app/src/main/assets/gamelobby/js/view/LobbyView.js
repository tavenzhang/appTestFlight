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
            this.gameView = GamePanel.getInstance(this.iconbox, ConfObjRead.getConfGamepanel(), this, this.gamepanelOver);
            this.gameView.arrowBtn = this.moveBtn;
            this.initGirl();
            //
            this.initTitleBar();
            //
            this.initBottomMenu();
            this.initEvents();
            this.resize();
        };
        LobbyView.prototype.initEvents = function () {
            var _this = this;
            //箭头按钮
            EventManager.addTouchScaleListener(this.moveBtn, this, function () {
                SoundPlayer.clicksfxSound();
                _this.gameView.flipNext(3);
            }, null, 1);
            //重置大小
            EventManager.register(EventType.RESIZE, this, this.resize);
            EventManager.register(EventType.FLUSH_AGENCYBTN, this, this.showAgencyBtn);
        };
        //刷新代理按钮
        LobbyView.prototype.showAgencyBtn = function () {
            this.btn_dl.visible = userData.role != "PLAYER";
        };
        //left-girl
        LobbyView.prototype.initGirl = function () {
            var vo = new AnimVo();
            vo.textPath = "./assets/ui/animation/girl/girl.png";
            vo.animPath = "./assets/ui/animation/girl/girl.sk";
            vo.loopdelay = 0;
            this.girlAinm = new MyBoneAnim();
            this.girlAinm.init(vo);
            this.girlAinm.scale(-2, 2);
            this.girlSp.addChild(this.girlAinm);
            this.girlAinm.pos(this.girlSp.width >> 1, this.girlSp.height >> 1);
            this.girlAinm.playAnim(0, true);
            this.girlSp.mouseEnabled = false;
        };
        //右上角按钮
        LobbyView.prototype.initTitleBar = function () {
            //活动
            EventManager.addTouchScaleListener(this.actBtn, this, function () {
                SoundPlayer.enterPanelSound();
                AttentionDialog.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAttention(), AttentionDialog.TYPE_OPEN_MANUAL);
                AttentionDialog.obj.show();
                // view.dlg.NoticeDlg.show(AttentionDialog.TYPE_OPEN_AUTO);
            });
            //客服
            EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
                SoundPlayer.enterPanelSound();
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
            });
        };
        //底部菜单按钮
        LobbyView.prototype.initBottomMenu = function () {
            if (AppData.isAndroidHack) {
                this.btn_tx.visible = false;
                this.shopSp.visible = false;
            }
            //充值动画
            var vo = new AnimVo();
            vo.textPath = "./assets/ui/animation/shopicon/shopicon.png";
            vo.animPath = "./assets/ui/animation/shopicon/shopicon.sk";
            vo.loopdelay = 3000;
            this.czAinm = new MyBoneAnim();
            this.czAinm.init(vo);
            this.czAinm.pos(this.shopSp.width >> 1, this.shopSp.height >> 1);
            this.shopSp.addChild(this.czAinm);
            this.czAinm.playAnim(0, true);
            // 本次不上分享
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
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_redraw, "redraw");
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
            this.publicUI.x = gap;
            if (this.gameView) {
                this.gameView.resetView();
            }
        };
        LobbyView.prototype.gamepanelOver = function () { };
        LobbyView.prototype.dispose = function () {
            if (this.publicUI)
                this.publicUI.dispose();
            if (this.arrowAnim)
                this.arrowAnim.stop();
            EventManager.removeEvent(EventType.RESIZE, this, this.resize);
            EventManager.removeAllEvents(this);
            if (this.girlAinm) {
                this.girlAinm.destroy(true);
                this.girlAinm = null;
            }
            if (this.czAinm) {
                this.czAinm.destroy(true);
                this.czAinm = null;
            }
            this.gameView.destroy(true);
            this.destroy(true);
        };
        return LobbyView;
    }(ui.LobbyViewUI));
    view.LobbyView = LobbyView;
})(view || (view = {}));
//# sourceMappingURL=LobbyView.js.map