/*
* 用户信息相关视图：头像框，金币等
* 替代Avator.ts
*/
var userData = {
    avatarSkinId: "",
    role: "",
    prizeGroup: 0
};
var UserInfoView = /** @class */ (function () {
    function UserInfoView(view) {
        this.isFlushMoney = false;
        this.view = view;
        this.initView();
    }
    UserInfoView.prototype.initView = function () {
        TempData.bRequestStatus = 1;
        this.view.nameTxt.text = "--";
        this.initGoldView();
        this.requestInfo();
        this.initEvents();
    };
    UserInfoView.prototype.initEvents = function () {
        //头像点击
        EventManager.addTouchScaleListener(this.view.headIcon, this, function () {
            SoundPlayer.enterPanelSound();
            view.dlg.FullMyCenterDlg.show();
        }, null, 1);
        EventManager.register(EventType.FLUSH_USERINFO, this, this.flushUserInfo);
        EventManager.register(EventType.FLUSH_HEADICON, this, this.flushHeadIcon);
    };
    UserInfoView.prototype.flushHeadIcon = function (id) {
        var url = "touxiang/img_touxiang_" + id + ".jpg";
        this.view.headIcon.skin = url;
        userData.avatarSkinId = id;
    };
    /**
     * 刷新用户信息
     */
    UserInfoView.prototype.flushUserInfo = function () {
        this.isFlushMoney = true;
        this.requestInfo();
    };
    UserInfoView.prototype.requestInfo = function () {
        TempData.bRequestStatus = 1;
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.userinfobalance + "?access_token=" + Common.access_token;
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, this.responseUserInfo, header, null, "get", "json");
    };
    UserInfoView.prototype.responseUserInfo = function (s, stat) {
        if (stat == "complete") {
            Common.userInfo = s;
            Common.setLoginPlatform(s.loginPlatform);
            this.requestUserInfoCurrent();
            if (s.userRole) {
                userData.role = s.userRole;
            }
            if (s.prizeGroup) {
                userData.prizeGroup = s.prizeGroup;
            }
            EventManager.dispath(EventType.FLUSH_AGENCYBTN);
        }
        else {
            TempData.bRequestStatus = -1;
            Debug.trace("Avator.responseUserInfo bRequestStatus:" + TempData.bRequestStatus);
        }
    };
    UserInfoView.prototype.requestUserInfoCurrent = function () {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfo +
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responseUserInfoCurrent);
    };
    UserInfoView.prototype.responseUserInfoCurrent = function (s, stat, hr) {
        if (stat == "complete") {
            Common.userInfo_current = s;
            EventManager.dispath(EventType.GET_USERCURRENT, s.certifiedPhone);
            this.requestUserAvator(ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.avatorget +
                "?access_token=" + Common.access_token);
        }
        else {
            TempData.bRequestStatus = -1;
            Debug.trace("Avator.responseUserInfoCurrent bRequestStatus:" + TempData.bRequestStatus);
        }
    };
    UserInfoView.prototype.requestUserAvator = function (url) {
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, this.responseUserAvator, header, null, "get", "json");
    };
    UserInfoView.prototype.responseUserAvator = function (s, stat, hr) {
        if (stat == "complete") {
            Common.userInfo.avatorInfo = s;
            var tempId = Common.userInfo.avatorInfo.avatar;
            if (!tempId) {
                tempId = "05";
            }
            tempId = Tools.FormatNumber(parseInt(tempId), 2);
            Common.userInfo.avatorId = tempId;
            var aId = SaveManager.getObj().get(SaveManager.KEY_AVATOR_ID, tempId);
            this.readUserInfo(Common.userInfo);
            TempData.bRequestStatus = 0;
        }
        else {
            TempData.bRequestStatus = -1;
            Toast.showToast(s);
        }
    };
    UserInfoView.prototype.readUserInfo = function (data) {
        var nameStr = data.nickname || data.username;
        this.view.nameTxt.text = nameStr;
        this.flushHeadIcon(data.avatorId);
        //金币
        var gold = data.userBalance.balance;
        this.bitFont.text = Tools.FormatMoney(gold, 2);
    };
    //金币视图
    UserInfoView.prototype.initGoldView = function () {
        var _this = this;
        this.goldAnim = new DragonBoneAnim();
        this.goldAnim.loadInit({ skUrl: "./assets/animation/coins/money_icon.sk" });
        this.view.goldAnim.addChild(this.goldAnim);
        this.view.addBtn.visible = !AppData.isAndroidHack;
        //充值
        EventManager.addTouchScaleListener(this.view.addBtn, this, function () {
            SoundPlayer.enterPanelSound();
            Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
        });
        //刷新
        EventManager.addTouchScaleListener(this.view.refreshBtn, this, function () {
            SoundPlayer.clickSound();
            _this.refreshMoney();
        });
        //金币显示
        this.bitFont = new BitmapFont(ResConfig.bitFont_norm);
        this.view.fontBox.addChild(this.bitFont);
        this.bitFont.text = "0";
        this.bitFont.y = this.view.fontBox.height - this.bitFont.height >> 1;
    };
    UserInfoView.prototype.refreshMoney = function () {
        var _this = this;
        var url = ConfObjRead.getConfUrl().url.apihome + ConfObjRead.getConfUrl().cmd.getMoney + "?access_token=" + Common.access_token;
        var header = ["Accept", "application/json"];
        HttpRequester.doRequest(url, header, null, this, function (suc, jobj) {
            if (suc) {
                if (_this.bitFont) {
                    var money = Tools.FormatMoney(jobj.balance, 2);
                    _this.bitFont.text = money;
                }
            }
        }, "get");
    };
    UserInfoView.prototype.dispose = function () {
        EventManager.removeAllEvents(this);
        if (this.bitFont)
            this.bitFont.destroy();
        this.bitFont = null;
        if (this.goldAnim) {
            this.goldAnim.destroy();
            this.goldAnim = null;
        }
    };
    return UserInfoView;
}());
//# sourceMappingURL=UserInfoView.js.map