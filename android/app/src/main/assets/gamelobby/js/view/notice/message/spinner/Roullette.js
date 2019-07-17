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
/**
* name
*/
var component;
(function (component) {
    var Notice;
    (function (Notice) {
        var Roullette = /** @class */ (function (_super) {
            __extends(Roullette, _super);
            function Roullette() {
                var _this = _super.call(this) || this;
                /**
                 * -1未初始化 0停止 1待机 2游戏 3停止中 4回弹中 5结算中
                 */
                _this.state = -1;
                //旋转参数
                _this.speedStandby = 3; //待机时速度
                _this.speedGame = 270; //抽奖时速度速度
                _this.speedOver = 30; //结束回弹速度
                _this.overRat = 10; //超过角度
                _this.targetRat = 0; //目标结束角度
                /**
                 * 轮盘类型(1:白银,2:黄金,3:钻石)
                 */
                _this.rouletteLevel = 0;
                //获取组件
                _this.itemLabels = [];
                for (var index = 0; index < _this.labelBox.numChildren; index++) {
                    var itemLabel = _this.labelBox.getChildByName("amount" + index);
                    itemLabel.text = "-";
                    _this.itemLabels.push(itemLabel);
                }
                _this.shellList = [];
                for (var index = 0; index < 3; index++) {
                    var shell = _this.getChildByName("shell" + index);
                    shell.visible = false;
                    _this.shellList.push(shell);
                }
                _this.shellList[0].visible = true;
                //打开帧更新
                _this.frameLoop(1, _this, _this.updateRotate);
                //
                _this.state = 0;
                return _this;
            }
            Roullette.prototype.destroy = function () {
                this.state = -1;
                this.clearTimer(this, this.updateRotate);
                this.closeAllEct();
                _super.prototype.destroy.call(this, true);
            };
            Roullette.prototype.closeAllEct = function () {
                this.ectBtnGo.stop();
                this.ectBtnGo.visible = false;
                this.animBtnLight.stop();
                this.animBtnLight.visible = false;
                this.etcWinLight.stop();
                this.etcWinLight.visible = false;
            };
            //缓动帧调用
            Roullette.prototype.updateRotate = function () {
                if (this.state <= 0 || this.state >= 5)
                    return;
                switch (this.state) {
                    case 1: {
                        var addRotate = Laya.timer.delta / 1000 * this.speedStandby;
                        this.plateNode.rotation += addRotate;
                        break;
                    }
                    case 2: {
                        var addRotate = Laya.timer.delta / 1000 * this.speedGame;
                        this.plateNode.rotation += addRotate;
                        break;
                    }
                    case 3: {
                        var addRotate = Laya.timer.delta / 1000 * this.speedGame;
                        this.plateNode.rotation += addRotate;
                        if (this.plateNode.rotation >= this.targetRat) {
                            this.state = 4;
                            this.targetRat += this.overRat;
                        }
                        break;
                    }
                    case 4: {
                        if (this.plateNode.rotation < this.targetRat) {
                            var addRotate = Laya.timer.delta / 1000 * this.speedOver;
                            this.plateNode.rotation += addRotate;
                            if (this.plateNode.rotation >= this.targetRat) {
                                this.targetRat -= this.overRat;
                            }
                        }
                        else {
                            var addRotate = Laya.timer.delta / 1000 * this.speedOver;
                            this.plateNode.rotation -= addRotate;
                            if (this.plateNode.rotation <= this.targetRat) {
                                this.plateNode.rotation = this.targetRat;
                                this.state = 5;
                                this.etcWinLight.play(0, false, "win");
                                this.etcWinLight.visible = true;
                                this.etcWinLight.on(Laya.Event.COMPLETE, this, function onComplete() {
                                    this.etcWinLight.play(0, true, "light");
                                    this.etcWinLight.offAll(Laya.Event.COMPLETE);
                                    this.event("roulleteStoped", this);
                                });
                            }
                        }
                        break;
                    }
                }
            };
            /**
             * 设置转盘数据
             * @param prizes 礼物数量列表
             * @param reqPoints 花费积分数量
             */
            Roullette.prototype.SetData = function (lotteryList) {
                //设置转盘礼物数据
                this.lotteryList = lotteryList;
                this.rouletteLevel = -1;
                this.ChangeType(1);
            };
            /**
             * 更换转盘类型
             * @param type (1:白银,2:黄金,3:钻石)
             */
            Roullette.prototype.ChangeType = function (type) {
                if (!this.lotteryList)
                    return;
                if (this.rouletteLevel != type) {
                    this.rouletteLevel = type;
                    var rindex = this.rouletteLevel - 1;
                    this.curAwardCountList = this.lotteryList[rindex].prizeLevelList;
                    for (var index = 0; index < this.curAwardCountList.length; index++) {
                        var awardCount = this.curAwardCountList[index];
                        var itemLabe = this.itemLabels[index];
                        itemLabe.text = awardCount.toString();
                    }
                    this.labelBox.reCache();
                    //设置花费积分数据
                    this.curPoint = this.lotteryList[rindex].requiredPoints;
                    this.reqNumLabel.text = this.curPoint.toString();
                    //设置转盘外壳
                    for (var index = 0; index < this.shellList.length; index++) {
                        var shell = this.shellList[index];
                        shell.visible = (index == rindex);
                    }
                }
            };
            /**
             * 待机
             */
            Roullette.prototype.Standby = function () {
                //转盘待机
                this.state = 1;
                //播放按钮闪光与心跳特效
                this.ectBtnGo.play(0, true, "heart");
                this.ectBtnGo.visible = true;
                this.animBtnLight.play(0, true, "light");
                this.animBtnLight.visible = true;
                //关闭胜利特效
                this.etcWinLight.stop();
                this.etcWinLight.visible = false;
            };
            /**
             * 游戏中
             */
            Roullette.prototype.PlayGame = function () {
                this.state = 2;
                this.targetRat = 0;
                //
                this.ectBtnGo.play(0, false, "heart");
                this.ectBtnGo.visible = true;
                this.animBtnLight.stop();
                this.animBtnLight.visible = false;
            };
            /**
             * 结束游戏
             * @param targetAwardCount 奖励数量
             * @param completed 停止后回调
             */
            Roullette.prototype.StopGame = function (targetAwardCount) {
                this.state = 3;
                var targetIndex = 0;
                for (var index = 0; index < this.curAwardCountList.length; index++) {
                    var awardCount = this.curAwardCountList[index];
                    if (targetAwardCount == awardCount) {
                        targetIndex = index;
                        break;
                    }
                }
                var turns = Math.floor(this.plateNode.rotation / 360);
                this.plateNode.rotation -= turns * 360;
                this.targetRat = (targetIndex + 1) * (360 / this.itemLabels.length) + 360;
            };
            Roullette.prototype.Reset = function () {
                this.state = 0;
                //关闭所有特效
                this.closeAllEct();
                //复位转盘
                this.plateNode.rotation = 0;
            };
            return Roullette;
        }(ui.dlg.notice.roulette.GameRouletteUI));
        Notice.Roullette = Roullette;
    })(Notice = component.Notice || (component.Notice = {}));
})(component || (component = {}));
//# sourceMappingURL=Roullette.js.map