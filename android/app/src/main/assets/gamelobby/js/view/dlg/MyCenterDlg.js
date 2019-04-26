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
         * 个人中心
         */
        var MyCenterDlg = /** @class */ (function (_super) {
            __extends(MyCenterDlg, _super);
            function MyCenterDlg() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            /**
             * 显示入口
             */
            MyCenterDlg.show = function () {
                var dlg = new MyCenterDlg();
                dlg.popup(false, true);
            };
            MyCenterDlg.prototype.initView = function () {
                this.accBtn.visible = !AppData.isAndroidHack;
                this.showMoney();
                this.setHeadIcon();
                this.showUserName();
                this.initEvents();
            };
            MyCenterDlg.prototype.initEvents = function () {
                var _this = this;
                //关闭
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                });
                //更换头像
                EventManager.addTouchScaleListener(this.changeHeadBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    dlg_1.HeadListDlg.show();
                });
                //修改登录密码
                EventManager.addTouchScaleListener(this.amendLoginBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    dlg_1.PasswordSettingDlg.show();
                });
                //设置
                EventManager.addTouchScaleListener(this.settingBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    dlg_1.SettingDlg.show();
                });
                //账户信息
                EventManager.addTouchScaleListener(this.accBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    Tools.jump2module(ConfObjRead.getConfUrl().url.g_account, "account");
                });
                //退出账号
                EventManager.addTouchScaleListener(this.exitBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    LayaMain.getInstance().loginOut();
                });
                //头像更新
                EventManager.register(EventType.FLUSH_HEADICON, this, this.setHeadIcon);
            };
            MyCenterDlg.prototype.setHeadIcon = function () {
                var data = Common.userInfo;
                if (!data) {
                    console.error("data is null", this);
                    return;
                }
                var id = data.avatorId || "01";
                this.headIcon.skin = ResConfig.getHeadSkinByID(id);
            };
            MyCenterDlg.prototype.showUserName = function () {
                var data = Common.userInfo;
                this.idTxt.text = data.username || "";
            };
            MyCenterDlg.prototype.showMoney = function () {
                this.goldTxt.visible = false;
                var value = Common.userInfo.userBalance.balance;
                value = Tools.FormatMoney(value, 2);
                //金币显示
                this.goldNumTxt = new DataNum(ConfObjRead.getConfDataNum());
                this.uiGroup.addChild(this.goldNumTxt);
                this.goldNumTxt.setNum(value);
                this.goldNumTxt.pos(this.goldTxt.x, this.goldTxt.y);
            };
            MyCenterDlg.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                EventManager.removeEvent(EventType.FLUSH_HEADICON, this, this.setHeadIcon);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return MyCenterDlg;
        }(ui.dlg.MyCenterDlgUI));
        dlg_1.MyCenterDlg = MyCenterDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=MyCenterDlg.js.map