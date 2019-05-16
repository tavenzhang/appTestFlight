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
        this.view.goldTxt.text = "";
        this.initGoldView();
        this.requestInfo();
        this.initEvents();
    };
    UserInfoView.prototype.initEvents = function () {
        //头像点击
        EventManager.addTouchScaleListener(this.view.headIcon, this, function () {
            SoundPlayer.enterPanelSound();
            view.dlg.MyCenterDlg.show();
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
            this.requestUserInfoCurrent(Common.access_token);
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
    UserInfoView.prototype.requestUserInfoCurrent = function (token) {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfo +
            "?access_token=" + token;
        NetManager.getObj().HttpConnect(url, this, this.responseUserInfoCurrent);
    };
    UserInfoView.prototype.responseUserInfoCurrent = function (s, stat, hr) {
        if (stat == "complete") {
            Common.userInfo_current = s;
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
        var v = data.userBalance.balance;
        v = Tools.FormatMoney(v, 2);
        this.lb_num.setNum(v);
    };
    //金币视图
    UserInfoView.prototype.initGoldView = function () {
        this.goldAnim = new DragonBoneAnim();
        this.goldAnim.loadInit({ skUrl: "./assets/ui/animation/coins/money_icon.sk" });
        this.view.goldAnim.addChild(this.goldAnim);
        this.view.addBtn.visible = !AppData.isAndroidHack;
        //充值
        EventManager.addTouchScaleListener(this.view.addBtn, this, function () {
            SoundPlayer.enterPanelSound();
            Tools.jump2module(ConfObjRead.getConfUrl().url.g_recharge, "recharge");
        });
        //金币显示
        this.lb_num = new DataNum(ConfObjRead.getConfDataNum());
        this.view.goldUI.addChild(this.lb_num);
        this.lb_num.setNum("0");
        this.lb_num.pos(this.view.goldTxt.x, this.view.goldTxt.y);
    };
    UserInfoView.prototype.dispose = function () {
        EventManager.removeEvent(EventType.FLUSH_USERINFO, this, this.flushUserInfo);
        EventManager.removeEvent(EventType.FLUSH_HEADICON, this, this.flushHeadIcon);
        EventManager.removeAllEvents(this);
        if (this.goldAnim) {
            this.goldAnim.destroy();
            this.goldAnim = null;
        }
    };
    return UserInfoView;
}());
//# sourceMappingURL=UserInfoView.js.map