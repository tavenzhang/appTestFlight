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
         * 余额宝
         */
        var BalanceDlg = /** @class */ (function (_super) {
            __extends(BalanceDlg, _super);
            function BalanceDlg() {
                var _this = _super.call(this) || this;
                _this.fontMap = new Laya.Dictionary();
                _this.fontArr = [];
                _this.initView();
                return _this;
            }
            BalanceDlg.show = function () {
                var dlg = new BalanceDlg();
                dlg.width = Laya.stage.width;
                dlg.popup(false, true);
            };
            BalanceDlg.prototype.initView = function () {
                var _this = this;
                this.TLgroup.left = GameUtils.getScreencOffset(-40, 0);
                this.TRgroup.right = GameUtils.getScreencOffset(-55, 0);
                this.reqInfo();
                EventManager.addTouchScaleListener(this.backBtn, this, function () {
                    SoundPlayer.returnLobbySound();
                    _this.close(null, true);
                }, null, 1);
                EventManager.addTouchScaleListener(this.helpBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.balance.BalanceHelpDlg.show();
                });
                //存取明细
                EventManager.addTouchScaleListener(this.accessBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.balance.AccessDetailDlg.show();
                });
                //输入全部金额
                EventManager.addTouchScaleListener(this.allBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.inputTxt.text = _this.yuebaoInfo.balanceAmt + "";
                });
                //取出
                EventManager.addTouchScaleListener(this.getBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    var money = parseFloat(_this.inputTxt.text);
                    if (isNaN(money) || money <= 0) {
                        Toast.showToast("请输入大于0的数字");
                        return;
                    }
                    else if (_this.inputTxt.text.indexOf(".") != -1) {
                        Toast.showToast("取出时，输入金额必须是整数");
                        return;
                    }
                    else if (money > _this.yuebaoInfo.amount) {
                        Toast.showToast("输入金额大于余额宝总金额，无法取出");
                        return;
                    }
                    if (_this.yuebaoInfo.isPasswordAvailable) { //身份验证
                        view.dlg.balance.UserAuthenDlg.show(money);
                    }
                    else { //设置密码
                        view.dlg.balance.BalancePwdDlg.show(money);
                    }
                });
                //存入
                EventManager.addTouchScaleListener(this.setBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    var money = parseFloat(_this.inputTxt.text);
                    if (isNaN(money) || money <= 0) {
                        Toast.showToast("请输入大于0的数字");
                        return;
                    }
                    else if (money > _this.yuebaoInfo.balanceAmt) {
                        Toast.showToast("输入金额大于个人账户余额，无法存入");
                        return;
                    }
                    _this.deposit(money);
                });
                EventManager.addTouchScaleListener(this.clearBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.inputTxt.text = "";
                });
                //
                EventManager.register(EventType.FLUSH_YUEBAOINFO, this, this.reqInfo);
            };
            BalanceDlg.prototype.reqInfo = function () {
                LayaMain.getInstance().showCircleLoading(true);
                HttpRequester.getHttpData(ConfObjRead.httpCmd.yuebaoInfo, this, this.infoCallback);
            };
            BalanceDlg.prototype.deposit = function (money) {
                var _this = this;
                LayaMain.getInstance().showCircleLoading(true);
                HttpRequester.postHttpData(ConfObjRead.httpCmd.yuebaoDeposit, { amount: money }, this, function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        dlg_1.TipsDlg.show("成功存入:" + money + "元");
                        _this.inputTxt.text = "";
                        _this.reqInfo();
                    }
                });
                ;
            };
            BalanceDlg.prototype.infoCallback = function (suc, jobj) {
                LayaMain.getInstance().showCircleLoading(false);
                if (suc) {
                    //保存数据
                    this.yuebaoInfo = jobj;
                    //玩家收益展示
                    this.showBitFont(this.bitBox1, FormatTool.dollarFormat(jobj.amount, ""));
                    this.showBitFont(this.bitBox2, FormatTool.dollarFormat(jobj.preIncome, ""));
                    this.showBitFont(this.bitBox3, FormatTool.dollarFormat(jobj.balanceAmt, ""));
                    //设置余额宝功能数据显示
                    this.showBitFont(this.bitBox4, FormatTool.dollarFormat(jobj.sumIncome, ""), 0.8);
                    this.showBitFont(this.bitBox5, FormatTool.dollarFormat(jobj.curIncome, ""), 0.8);
                    this.showBitFont(this.bitBox6, FormatTool.dollarFormat(jobj.myriadProfit, ""), 0.8);
                    this.showBitFont(this.bitBox7, jobj.sevenDayYearYield + "", 0.8);
                    //余额宝功能
                    if (jobj.isClose) { //余额宝关闭
                        //关闭存钱按钮点击
                        this.setBtn.disabled = true;
                        //
                        this.weihuMask.visible = true;
                    }
                    else {
                        //打开存钱按钮点击
                        this.setBtn.disabled = false;
                        //
                        this.weihuMask.visible = false;
                    }
                    //保存玩家当前钱包余额并通知玩家钱包变化
                    Common.userInfo.userBalance.balance = jobj.balanceAmt;
                    EventManager.dispath(EventType.FLUSH_MONEY);
                }
                else {
                    this.yuebaoInfo = { balanceAmt: 0, amount: 0 };
                }
            };
            BalanceDlg.prototype.showBitFont = function (sp, txt, scl) {
                if (scl === void 0) { scl = 1; }
                var font = this.fontMap.get(sp);
                if (!font) {
                    font = new BitmapFont(ResConfig.bitFont_norm);
                    if (scl != 1)
                        font.scale(scl, scl);
                    font.text = "0";
                    sp.addChild(font);
                    font.y = sp.height - font.height * scl >> 1;
                    this.fontArr.push(font);
                    this.fontMap.set(sp, font);
                }
                font.text = txt;
                font.x = sp.width - font.width * font.scaleX >> 1;
            };
            BalanceDlg.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                this.fontArr.forEach(function (bit) { return bit.destroy(); });
                this.fontArr = null;
                this.fontMap = null;
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return BalanceDlg;
        }(ui.dlg.BalanceDlgUI));
        dlg_1.BalanceDlg = BalanceDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BalanceDlg.js.map