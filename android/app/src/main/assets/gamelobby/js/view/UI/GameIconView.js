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
    var UI;
    (function (UI) {
        /**
         * 游戏图标视图
         */
        var GameIconView = /** @class */ (function (_super) {
            __extends(GameIconView, _super);
            function GameIconView() {
                var _this = _super.call(this) || this;
                _this.isclick = true;
                _this.gapTime = 350; //控制点击间隔时间
                _this.progressValue = 0;
                _this.index = 0;
                _this.resetView();
                return _this;
            }
            Object.defineProperty(GameIconView.prototype, "alias", {
                get: function () {
                    return this.gameVo.alias;
                },
                enumerable: true,
                configurable: true
            });
            GameIconView.prototype.resetView = function () {
                this.hotIcon.visible = false;
                this.updateIcon.visible = false;
                this.updateTxt.visible = false;
                this.expectIcon.visible = false;
                this.pauseIcon.visible = false;
                this.animbox.visible = false;
                this.normIcon.visible = false;
                this.grayIcon.visible = false;
                if (this.grayRect)
                    this.grayRect.height = this.grayIcon.height;
                if (this.anim)
                    this.anim.pause();
            };
            /**
             * 读取数据
             * @param vo
             */
            GameIconView.prototype.readData = function (vo) {
                this.gameVo = vo;
                this.config = ResConfig.getGameIconConfig(vo.alias);
                this.setGameState(GameState[vo.state]);
            };
            /**
             * 执行点击事件
             */
            GameIconView.prototype.doClick = function () {
                var _this = this;
                if (!this.isclick)
                    return;
                this.isclick = false;
                Laya.timer.once(this.gapTime, this, function () { return _this.isclick = true; });
                switch (this.gameState) {
                    case GameState.NORMAL:
                        this.onLaunchGame();
                        break;
                    case GameState.UPDATE:
                        this.onStartUpdate();
                        break;
                }
            };
            GameIconView.prototype.onLaunchGame = function () {
                SoundPlayer.enterGameSound();
                Common.gameId = this.gameVo.id;
                Common.wsUrl = this.gameVo.url;
                if (this.gameVo.jumpUrl) {
                    Tools.jump2game(this.gameVo.url);
                }
                else {
                    Toast.showToast("数据配置异常,无法进入房间");
                }
            };
            GameIconView.prototype.onStartUpdate = function () {
                if (!this.isupdating) {
                    var data = [
                        {
                            "alias": this.gameVo.alias,
                            "percent": this.progressValue
                        }
                    ];
                    UpdateMsgHandle.onUpdateMsg(data);
                    //发送游戏下载命令
                    PostMHelp.startUpdate({ "gameId": this.gameVo.id, "alias": this.gameVo.alias });
                }
            };
            /**
             * 设置当前游戏状态
             * @param state
             */
            GameIconView.prototype.setGameState = function (state) {
                if (this.gameState == GameState.PAUSE)
                    return; //维护状态不接受其他状态
                this.gameState = state;
                this.resetView();
                this.hotIcon.visible = this.gameVo.bhot;
                switch (this.gameState) {
                    case GameState.NORMAL:
                        this.showNorm();
                        break;
                    case GameState.PAUSE:
                        this.showPause();
                        break;
                    case GameState.EXPECTATION:
                        this.showExpectation();
                        break;
                    case GameState.UPDATE:
                        this.showUpdate();
                        break;
                }
            };
            /**
             * 游戏下载进度更新
             * @param value
             */
            GameIconView.prototype.doUpdateProgress = function (value) {
                if (this.gameState == GameState.PAUSE)
                    return; //维护状态不接受其他状态
                if (!this.isupdating || this.updateIcon.visible) {
                    this.showUpdating();
                }
                this.progressValue = value;
                this.refreshUpdateProgress();
            };
            GameIconView.prototype.refreshUpdateProgress = function () {
                if (!this.progressValue)
                    this.progressValue = 0;
                var value = Tools.FormatFloatNumber(this.progressValue * 100, 2);
                this.updateTxt.text = "已下载 " + value + "%";
                this.grayRect.height = this.grayHeight * (1 - this.progressValue);
                if (this.progressValue >= 1) {
                    this.isupdating = false;
                    this.setGameState(GameState.NORMAL);
                    UpdateMsgHandle.clearInfoByAlias(this.gameVo.alias);
                }
            };
            //----------------------------------------
            //正常模式
            GameIconView.prototype.showNorm = function () {
                if (!this.anim) {
                    this.anim = new DragonBoneAnim();
                    this.animbox.addChild(this.anim);
                    this.anim.loadInit({ skUrl: this.config.anim_sk });
                }
                else {
                    this.anim.resume();
                }
                this.animbox.visible = true;
            };
            //维护中
            GameIconView.prototype.showPause = function () {
                this.pauseIcon.visible = true;
                this.grayIcon.visible = true;
                if (!this.grayIcon.skin) {
                    this.grayIcon.skin = this.config.gray;
                }
            };
            //敬请期待
            GameIconView.prototype.showExpectation = function () {
                this.expectIcon.visible = true;
                this.grayIcon.visible = true;
                if (!this.grayIcon.skin) {
                    this.grayIcon.skin = this.config.gray;
                }
            };
            //待更新
            GameIconView.prototype.showUpdate = function () {
                this.updateIcon.visible = true;
                this.showNorm();
            };
            //更新中
            GameIconView.prototype.showUpdating = function () {
                this.isupdating = true;
                this.gameState = GameState.UPDATE;
                this.resetView();
                this.progressValue = 0.0;
                this.updateTxt.text = this.progressValue.toString();
                this.updateTxt.visible = true;
                if (!this.normIcon.skin)
                    this.normIcon.skin = this.config.norm;
                if (!this.grayIcon.skin)
                    this.grayIcon.skin = this.config.gray;
                this.normIcon.visible = true;
                this.grayIcon.visible = true;
                if (!this.grayRect)
                    this.grayRect = new Laya.Rectangle(0, 0, this.grayIcon.width || 200, this.grayIcon.height || 200);
                this.grayIcon.scrollRect = this.grayRect;
                this.grayHeight = this.grayRect.height;
            };
            /**
             * 销毁
             */
            GameIconView.prototype.destroy = function () {
                if (this.anim)
                    this.anim.destroy(true);
                if (this.grayRect)
                    this.grayRect = null;
                _super.prototype.destroy.call(this, true);
            };
            return GameIconView;
        }(ui.UI.GameIconViewUI));
        UI.GameIconView = GameIconView;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=GameIconView.js.map