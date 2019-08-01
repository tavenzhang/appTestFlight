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
                this.titleGroup.left = GameUtils.getScreencOffset(-48, 0);
                this.backBtn.right = GameUtils.getScreencOffset(-55, 0);
                var info = Common.userInfo;
                var current = Common.userInfo_current;
                this.accTxt.text = info.username;
                this.setNickBtn.visible = false; //todo:暂未开放
                var value = info.userBalance.balance;
                this.moneyTxt.text = value.toFixed(2);
                this.bindPhoneBtn.visible = !Boolean(current.certifiedPhone);
                this.phoneTxt.text = this.bindPhoneBtn.visible ? "未绑定" : current.phoneNumber;
                //绑定微信
                this.bindWeChat.visible = !Boolean(current.certifiedWeChat);
                this.wechatTxt.text = this.bindWeChat.visible ? "未绑定" : "已绑定";
                //监听微信绑定认证消息
                EventManager.register(EventType.WeChatBind, this, this.doWXBind);
                this.getBankCardInfo();
                this.setHeadIcon();
                var msc = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
                this.musicBtn.selected = Boolean(msc == 1);
                var sdx = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
                this.soundBtn.selected = Boolean(sdx == 1);
                //events---------------
                EventManager.addTouchScaleListener(this.backBtn, this, function () {
                    SoundPlayer.returnLobbySound();
                    _this.close(null, true);
                }, null, 1);
                //更换头像
                EventManager.addTouchScaleListener(this.setHeadBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.center.SetHeadDlg.show();
                });
                // //更换头像框(todo:暂未开放)
                // EventManager.addTouchScaleListener(this.setBorderBtn, this, () => {
                // 	SoundPlayer.enterPanelSound();
                // 	view.dlg.center.SetHeadBorderDlg.show();
                // });
                //账户信息
                EventManager.addTouchScaleListener(this.accInfoBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.center.AccountInfoDlg.show();
                });
                //退出账号
                EventManager.addTouchScaleListener(this.backAccBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    dlg_1.SystemDlg.show("确定退出该账号吗？", LayaMain.getInstance(), LayaMain.getInstance().loginOut);
                });
                //复制账号
                EventManager.addTouchScaleListener(this.accCopyBtn, this, function () {
                    SoundPlayer.clickSound();
                    PostMHelp.game_common({ "do": "copylink", "param": _this.accTxt.text, "hint": "复制成功" });
                });
                //修改昵称
                EventManager.addTouchScaleListener(this.setNickBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    //todo:暂未开放
                });
                //绑定微信
                EventManager.addTouchScaleListener(this.bindWeChat, this, function () {
                    SoundPlayer.enterPanelSound();
                    LayaMain.getInstance().weChatCertification(1);
                });
                //绑定手机号
                EventManager.addTouchScaleListener(this.bindPhoneBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    if (GameData.bindOpen)
                        view.dlg.bindPhone.BindPhoneActiveDlg.show();
                    else
                        view.dlg.center.BindPhoneDlg.show();
                });
                //绑定支付宝
                EventManager.addTouchScaleListener(this.bindAlipayBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.center.BindAlipayDlg.show();
                });
                //头像更新
                EventManager.register(EventType.FLUSH_HEADICON, this, this.setHeadIcon);
                EventManager.register(EventType.GET_BACKCARD_DETAIL, this, this.getBankCardInfo);
                EventManager.register(EventType.GETBINDAWARD_SUCC, this, this.bindPhoneSuc);
                EventManager.pushEvent(this.soundBtn, Laya.Event.CHANGE, this, this.selectSound);
                EventManager.pushEvent(this.musicBtn, Laya.Event.CHANGE, this, this.selectMusic);
            };
            FullMyCenterDlg.prototype.bindPhoneSuc = function (num) {
                var current = Common.userInfo_current;
                current.certifiedPhone = true;
                current.phoneNumber = num;
                this.bindPhoneBtn.visible = false;
                this.phoneTxt.text = this.bindPhoneBtn.visible ? "未绑定" : num;
            };
            FullMyCenterDlg.prototype.getBankCardInfo = function () {
                if (Common.alipayInfo) {
                    this.alipayTxt.text = Common.alipayInfo.bankCardNo;
                    this.bindAlipayBtn.visible = false;
                }
                else {
                    if (Common.cardInfo.enabledAlipayWithdraw) {
                        this.alipayTxt.text = "未绑定";
                        this.bindAlipayBtn.visible = true;
                    }
                    else {
                        this.alipayTxt.text = "暂未开放";
                        this.bindAlipayBtn.visible = false;
                    }
                }
            };
            FullMyCenterDlg.prototype.selectMusic = function () {
                var switchKey = this.musicBtn.selected ? 1 : 0;
                SaveManager.getObj().set(SaveManager.KEY_MUSIC_SWITCH, switchKey);
                SaveManager.getObj().set(SaveManager.KEY_MUSIC_VL, this.musicBtn.selected ? 1 : 0);
                SoundPlayer.ChangeMusicSwitch(switchKey);
                SaveManager.getObj().saveData();
            };
            FullMyCenterDlg.prototype.selectSound = function () {
                var switchKey = this.soundBtn.selected ? 1 : 0;
                SaveManager.getObj().set(SaveManager.KEY_SFX_SWITCH, switchKey);
                SaveManager.getObj().set(SaveManager.KEY_SFX_VL, this.soundBtn.selected ? 1 : 0);
                SoundPlayer.ChangeSoundSwitch(switchKey);
                SaveManager.getObj().saveData();
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
            /** 尝试微信绑定
            * @param message
            "data": {
                accessToken: "23_TjJ1OECp7ylnjb4g753d4Nh47L6Drptk-O1i_iJjQmPD88FFcMiQUZUV2STqSLrhf7SUpuXnT2ayvuwtPNMmAVUN5_0GVNxfSEzdTWTVvic"
                access_token: "23_TjJ1OECp7ylnjb4g753d4Nh47L6Drptk-O1i_iJjQmPD88FFcMiQUZUV2STqSLrhf7SUpuXnT2ayvuwtPNMmAVUN5_0GVNxfSEzdTWTVvic"
                city: "吉隆坡"
                country: "马来西亚"
                expiration: "1563787256811"
                expires_in: "1563787256811"
                gender: "0"
                iconurl: ""
                language: "zh_CN"
                name: "heheda"
                openid: "ohmBWxFiFc7HtECjZIxi7jyj5Uq8"
                profile_image_url: ""
                province: "吉隆坡"
                refreshToken: "23_ZtB9fOhyY8qcBGO7PGTOKeyXIIYOzD-32t1cJaNkbdGsYBjB_ZjiPMV0IfJA09RwwPicvhINKsQVNGnmkY5Fxv-C383WLa67cN07Au5ooFE"
                screen_name: "heheda"
                uid: "od7H61SmIbhKoz9IPO
            }
            */
            FullMyCenterDlg.prototype.doWXBind = function (message) {
                var _this = this;
                Debug.log("doWXBind = ", message); //debug
                //无数据直接跳出
                if (JSON.stringify(message.data) === '{}')
                    return;
                if (message.data.uid == null || message.data.uid == "") {
                    Toast.showToast("微信ID获取失败");
                    return;
                }
                //打开遮罩
                LayaMain.getInstance().showCircleLoading(true);
                //保存微信数据
                Common.weChatData = message.data;
                //微信ID加密
                var eWxId = window['SecretUtils'].rsaEncodePWD(message.data.uid);
                /** 发送服务器参数 */
                var data = {
                    wxId: eWxId,
                };
                //发送消息
                HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.wxBind_app, data, this, function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false); //关闭遮罩
                    Debug.log("resWXBind = ", jobj); //debug
                    if (suc) {
                        if (jobj.success) {
                            dlg_1.TipsDlg.show("微信绑定成功");
                            //绑定微信
                            _this.bindWeChat.visible = false;
                            _this.wechatTxt.text = "已绑定";
                            Common.userInfo_current.certifiedWeChat = true;
                        }
                        else {
                            dlg_1.TipsDlg.show(jobj.errorMsg);
                        }
                    }
                });
            };
            FullMyCenterDlg.prototype.onClosed = function (type) {
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