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
         * 全屏个人中心
         */
        var FullMyCenterDlg = /** @class */ (function (_super) {
            __extends(FullMyCenterDlg, _super);
            function FullMyCenterDlg() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            /**
             * 入口
             */
            FullMyCenterDlg.show = function () {
                var dlg = new FullMyCenterDlg();
                dlg.width = Laya.stage.width;
                dlg.popup(false, true);
            };
            FullMyCenterDlg.prototype.initView = function () {
                var _this = this;
                var info = Common.userInfo;
                var current = Common.userInfo_current;
                this.accTxt.text = info.username;
                this.setNickBtn.visible = false; //todo:暂未开放
                var value = info.userBalance.balance;
                this.moneyTxt.text = value.toFixed(2);
                this.bindPhoneBtn.visible = !Boolean(current.certifiedPhone);
                this.phoneTxt.text = this.bindPhoneBtn.visible ? "未绑定" : current.phoneNumber;
                this.setHeadIcon();
                var msc = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
                this.musicBtn.selected = Boolean(msc);
                var sdx = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
                this.soundBtn.selected = Boolean(sdx);
                //events---------------
                EventManager.addTouchScaleListener(this.backBtn, this, function () {
                    SoundPlayer.returnLobbySound();
                    _this.close(null, true);
                }, null, 1);
                //更换头像
                EventManager.addTouchScaleListener(this.setHeadBtn, this, function () {
                    SoundPlayer.clickSound();
                    view.dlg.center.SetHeadDlg.show();
                });
                // //更换头像框(todo:暂未开放)
                // EventManager.addTouchScaleListener(this.setBorderBtn, this, () => {
                // 	SoundPlayer.clickSound();
                // 	view.dlg.center.SetHeadBorderDlg.show();
                // });
                //账户信息
                EventManager.addTouchScaleListener(this.accInfoBtn, this, function () {
                    SoundPlayer.clickSound();
                    view.dlg.center.AccountInfoDlg.show();
                });
                //退出账号
                EventManager.addTouchScaleListener(this.backAccBtn, this, function () {
                    SoundPlayer.clickSound();
                    dlg_1.SystemDlg.show("确定退出该账号吗？", LayaMain.getInstance(), LayaMain.getInstance().loginOut);
                });
                //复制账号
                EventManager.addTouchScaleListener(this.accCopyBtn, this, function () {
                    SoundPlayer.clickSound();
                    PostMHelp.game_common({ "do": "copylink", "param": _this.accTxt.text, "hint": "复制成功" });
                });
                //修改昵称
                EventManager.addTouchScaleListener(this.setNickBtn, this, function () {
                    SoundPlayer.clickSound();
                    //todo:暂未开放
                });
                //绑定手机号
                EventManager.addTouchScaleListener(this.bindPhoneBtn, this, function () {
                    SoundPlayer.clickSound();
                    if (TempData.bindOpen)
                        view.dlg.bindPhone.BindPhoneActiveDlg.show();
                    else
                        view.dlg.center.BindPhoneDlg.show();
                });
                //头像更新
                EventManager.register(EventType.FLUSH_HEADICON, this, this.setHeadIcon);
                this.soundBtn.on(Laya.Event.CHANGE, this, this.selectSound);
                this.musicBtn.on(Laya.Event.CHANGE, this, this.selectMusic);
            };
            FullMyCenterDlg.prototype.selectMusic = function () {
                if (this.musicBtn.selected) { //打开
                    Laya.SoundManager.playMusic(ResConfig.musicUrl);
                    Laya.SoundManager.setMusicVolume(1);
                }
                else {
                    Laya.SoundManager.setMusicVolume(0);
                }
            };
            FullMyCenterDlg.prototype.selectSound = function () {
                if (this.soundBtn.selected) { //打开
                    Laya.SoundManager.setSoundVolume(1);
                }
                else {
                    Laya.SoundManager.setSoundVolume(0);
                }
            };
            FullMyCenterDlg.prototype.setHeadIcon = function () {
                var data = Common.avatorInfo;
                if (!data) {
                    console.error("userInfo is null", this);
                    return;
                }
                var id = data.avatorId || "01";
                this.headIcon.skin = ResConfig.getHeadSkinByID(id);
            };
            FullMyCenterDlg.prototype.onClosed = function (type) {
                SaveManager.getObj().save(SaveManager.KEY_MUSIC_SWITCH, this.musicBtn.selected ? 1 : 0);
                SaveManager.getObj().save(SaveManager.KEY_SFX_SWITCH, this.soundBtn.selected ? 1 : 0);
                this.soundBtn.off(Laya.Event.CHANGE, this, this.selectSound);
                this.musicBtn.off(Laya.Event.CHANGE, this, this.selectMusic);
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return FullMyCenterDlg;
        }(ui.dlg.FullMyCenterDlgUI));
        dlg_1.FullMyCenterDlg = FullMyCenterDlg;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=FullMyCenterDlg.js.map