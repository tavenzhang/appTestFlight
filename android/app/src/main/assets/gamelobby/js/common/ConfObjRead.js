var ConfObjRead = /** @class */ (function () {
    function ConfObjRead() {
    }
    ConfObjRead.getConfAccountCenter = function () {
        if (ConfObjRead.accenterObj) {
            return ConfObjRead.accenterObj;
        }
        ConfObjRead.accenterObj = Laya.Loader.getRes("./assets/conf/accountpad.json");
        return ConfObjRead.accenterObj;
    };
    ConfObjRead.getConfGirlManager = function () {
        if (ConfObjRead.girlObj) {
            return ConfObjRead.girlObj;
        }
        ConfObjRead.girlObj = Laya.Loader.getRes("./assets/conf/girl.json");
        return ConfObjRead.girlObj;
    };
    ConfObjRead.getConfDataNum = function () {
        if (ConfObjRead.dataNumObj) {
            return ConfObjRead.dataNumObj;
        }
        ConfObjRead.dataNumObj = Laya.Loader.getRes("./assets/conf/datanum.json");
        return ConfObjRead.dataNumObj;
    };
    ConfObjRead.getConfHtmlLabel = function () {
        if (ConfObjRead.htmlObj) {
            return ConfObjRead.htmlObj;
        }
        ConfObjRead.htmlObj = Laya.Loader.getRes("./assets/conf/libhtml.json");
        return ConfObjRead.htmlObj;
    };
    ConfObjRead.getGameIconAnim = function () {
        if (ConfObjRead.giconAnimObj) {
            return ConfObjRead.giconAnimObj;
        }
        ConfObjRead.giconAnimObj = Laya.Loader.getRes("./assets/conf/gameiconanim.json");
        return ConfObjRead.giconAnimObj;
    };
    ConfObjRead.getGameIconAnimBySrc = function (src) {
        var obj = ConfObjRead.getGameIconAnim();
        for (var i = 0; i < obj.icons.length; i++) {
            // if( obj.icons[i].src == src )
            if (src.indexOf(obj.icons[i].src) >= 0) {
                return obj.icons[i].anim;
            }
        }
        return null;
    };
    ConfObjRead.getConfGamepanel = function () {
        if (ConfObjRead.gamepanelObj) {
            return ConfObjRead.gamepanelObj;
        }
        ConfObjRead.gamepanelObj = Laya.Loader.getRes("./assets/conf/gamepanel.json");
        return ConfObjRead.gamepanelObj;
    };
    ConfObjRead.getConfRunningmsg = function () {
        if (ConfObjRead.runningmsgObj) {
            return ConfObjRead.runningmsgObj;
        }
        ConfObjRead.runningmsgObj = Laya.Loader.getRes("./assets/conf/runningmsg.json");
        return ConfObjRead.runningmsgObj;
    };
    ConfObjRead.getConfCommon = function () {
        if (ConfObjRead.commonObj) {
            return ConfObjRead.commonObj;
        }
        ConfObjRead.commonObj = Laya.Loader.getRes("./assets/conf/config.json");
        return ConfObjRead.commonObj;
    };
    ConfObjRead.getConfUrl = function () {
        if (ConfObjRead.urlObj) {
            return ConfObjRead.urlObj;
        }
        ConfObjRead.urlObj = Laya.Loader.getRes("./assets/conf/urls.json");
        return ConfObjRead.urlObj;
    };
    ConfObjRead.getConfRoomPad = function () {
        if (ConfObjRead.room_roompadObj) {
            return ConfObjRead.room_roompadObj;
        }
        ConfObjRead.room_roompadObj = Laya.Loader.getRes("./assets/conf/roompad.json");
        return ConfObjRead.room_roompadObj;
    };
    ConfObjRead.getConfRoomPanel = function () {
        if (ConfObjRead.roomlistObj) {
            return ConfObjRead.roomlistObj;
        }
        ConfObjRead.roomlistObj = Laya.Loader.getRes("./assets/conf/roompanel.json");
        return ConfObjRead.roomlistObj;
    };
    ConfObjRead.getConfAvator = function () {
        if (ConfObjRead.avatorObj) {
            return ConfObjRead.avatorObj;
        }
        ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator.json");
        return ConfObjRead.avatorObj;
    };
    ConfObjRead.getConfAvatorPad = function () {
        if (ConfObjRead.room_avatorObj) {
            return ConfObjRead.room_avatorObj;
        }
        ConfObjRead.room_avatorObj = Laya.Loader.getRes("./assets/conf/avatorpad.json");
        return ConfObjRead.room_avatorObj;
    };
    ConfObjRead.getConfSetting = function () {
        if (ConfObjRead.settingpadObj) {
            return ConfObjRead.settingpadObj;
        }
        ConfObjRead.settingpadObj = Laya.Loader.getRes("./assets/conf/setting.json");
        // Debug.trace("SettingPad conf:");
        // Debug.trace(ConfObjRead.settingpadObj);
        return ConfObjRead.settingpadObj;
    };
    ConfObjRead.getConfAttention = function () {
        if (ConfObjRead.attentionObj) {
            return ConfObjRead.attentionObj;
        }
        ConfObjRead.attentionObj = Laya.Loader.getRes("./assets/conf/attention.json");
        return ConfObjRead.attentionObj;
    };
    ConfObjRead.getConfNoticeDialog = function () {
        if (ConfObjRead.noticeDialogObj) {
            return ConfObjRead.noticeDialogObj;
        }
        ConfObjRead.noticeDialogObj = Laya.Loader.getRes("./assets/conf/NoticeDialog.json");
        return ConfObjRead.noticeDialogObj;
    };
    ConfObjRead.getConfHelppad = function () {
        if (ConfObjRead.room_helpObj) {
            return ConfObjRead.room_helpObj;
        }
        ConfObjRead.room_helpObj = Laya.Loader.getRes("./assets/conf/helppad.json");
        return ConfObjRead.room_helpObj;
    };
    ConfObjRead.getConfNoMoney = function () {
        if (ConfObjRead.nomoneyObj) {
            return ConfObjRead.nomoneyObj;
        }
        ConfObjRead.nomoneyObj = Laya.Loader.getRes("./assets/conf/nomoney.json");
        return ConfObjRead.nomoneyObj;
    };
    ConfObjRead.getConfToast = function () {
        if (ConfObjRead.room_toastObj) {
            return ConfObjRead.room_toastObj;
        }
        ConfObjRead.room_toastObj = Laya.Loader.getRes("./assets/conf/toast.json");
        return ConfObjRead.room_toastObj;
    };
    ConfObjRead.getConfCLoading = function () {
        if (ConfObjRead.room_saiziObj) {
            return ConfObjRead.room_saiziObj;
        }
        ConfObjRead.room_saiziObj = Laya.Loader.getRes("./assets/conf/cloading.json");
        return ConfObjRead.room_saiziObj;
    };
    ConfObjRead.getConfHistorypad = function () {
        if (ConfObjRead.room_historyObj) {
            return ConfObjRead.room_historyObj;
        }
        ConfObjRead.room_historyObj = Laya.Loader.getRes("./assets/conf/history.json");
        return ConfObjRead.room_historyObj;
    };
    ConfObjRead.getConfBottommenu = function () {
        if (ConfObjRead.room_bottomObj) {
            return ConfObjRead.room_bottomObj;
        }
        ConfObjRead.room_bottomObj = Laya.Loader.getRes("./assets/conf/bottommenu.json");
        return ConfObjRead.room_bottomObj;
    };
    ConfObjRead.getConfNotice = function () {
        if (ConfObjRead.room_noticeObj) {
            return ConfObjRead.room_noticeObj;
        }
        ConfObjRead.room_noticeObj = Laya.Loader.getRes("./assets/conf/notice.json");
        return ConfObjRead.room_noticeObj;
    };
    ConfObjRead.getConfTitlebar = function () {
        if (ConfObjRead.room_titlebarObj) {
            return ConfObjRead.room_titlebarObj;
        }
        if (AppData.IS_NATIVE_APP) {
            ConfObjRead.room_titlebarObj = Laya.Loader.getRes("./assets/conf/titlebar_app.json");
        }
        else {
            ConfObjRead.room_titlebarObj = Laya.Loader.getRes("./assets/conf/titlebar.json");
        }
        return ConfObjRead.room_titlebarObj;
    };
    ConfObjRead.getConfRoomTitlebar = function () {
        if (ConfObjRead.rmttbObj) {
            return ConfObjRead.rmttbObj;
        }
        ConfObjRead.rmttbObj = Laya.Loader.getRes("./assets/conf/roomtitlebar.json");
        return ConfObjRead.rmttbObj;
    };
    ConfObjRead.getRoombgConf = function () {
        if (ConfObjRead.room_bgObj) {
            return ConfObjRead.room_bgObj;
        }
        ConfObjRead.room_bgObj = Laya.Loader.getRes("./assets/conf/roombg.json");
        return ConfObjRead.room_bgObj;
    };
    ConfObjRead.getConfPeoples = function () {
        if (ConfObjRead.peoplesObj) {
            return ConfObjRead.peoplesObj;
        }
        ConfObjRead.peoplesObj = Laya.Loader.getRes("./assets/conf/peoples.json");
        return ConfObjRead.peoplesObj;
    };
    ConfObjRead.getConfMinemenus = function () {
        if (ConfObjRead.minemenuObj) {
            return ConfObjRead.minemenuObj;
        }
        if (AppData.IS_NATIVE_APP) {
            ConfObjRead.minemenuObj = Laya.Loader.getRes("./assets/conf/minemenus_app.json");
        }
        else {
            ConfObjRead.minemenuObj = Laya.Loader.getRes("./assets/conf/minemenus.json");
        }
        return ConfObjRead.minemenuObj;
    };
    ConfObjRead.getConfLeftmenus = function () {
        if (ConfObjRead.leftMenuObj) {
            return ConfObjRead.leftMenuObj;
        }
        ConfObjRead.leftMenuObj = Laya.Loader.getRes("./assets/conf/leftmenus.json");
        return ConfObjRead.leftMenuObj;
    };
    ConfObjRead.getConfVersion = function () {
        if (ConfObjRead.versionObj) {
            return ConfObjRead.versionObj;
        }
        ConfObjRead.versionObj = Laya.Loader.getRes("./assets/conf/version.json");
        return ConfObjRead.versionObj;
    };
    ConfObjRead.getBetMenusCoinsConf = function () {
        if (ConfObjRead.betMenuObj) {
            return ConfObjRead.betMenuObj;
        }
        ConfObjRead.betMenuObj = Laya.Loader.getRes("./assets/conf/betbuttons.json");
        return ConfObjRead.betMenuObj;
    };
    ConfObjRead.getRoadMapConf = function () {
        if (ConfObjRead.roadObj) {
            return ConfObjRead.roadObj;
        }
        ConfObjRead.roadObj = Laya.Loader.getRes("./assets/conf/roadmap.json");
        return ConfObjRead.roadObj;
    };
    ConfObjRead.getAnimConf = function () {
        if (ConfObjRead.animObj) {
            return ConfObjRead.animObj;
        }
        ConfObjRead.animObj = Laya.Loader.getRes("./assets/conf/animations.json");
        return ConfObjRead.animObj;
    };
    ConfObjRead.getConfLogin = function () {
        if (ConfObjRead.loginObj) {
            return ConfObjRead.loginObj;
        }
        ConfObjRead.loginObj = Laya.Loader.getRes("./assets/conf/loginreg.json");
        return ConfObjRead.loginObj;
    };
    ConfObjRead.getConfUiBg = function () {
        if (ConfObjRead.uibgObj) {
            return ConfObjRead.uibgObj;
        }
        ConfObjRead.uibgObj = Laya.Loader.getRes("./assets/conf/bgbig.json");
        return ConfObjRead.uibgObj;
    };
    ConfObjRead.getDealerConf = function () {
        if (ConfObjRead.dealerObj) {
            return ConfObjRead.dealerObj;
        }
        ConfObjRead.dealerObj = Laya.Loader.getRes("./assets/conf/dealer.json");
        return ConfObjRead.dealerObj;
    };
    ConfObjRead.getConfMusic = function () {
        if (ConfObjRead.musicObj && ConfObjRead.musicObj) {
            return ConfObjRead.musicObj;
        }
        ConfObjRead.musicObj = Laya.Loader.getRes("./assets/conf/music.json");
        return ConfObjRead.musicObj;
    };
    ConfObjRead.accenterObj = null;
    ConfObjRead.girlObj = null;
    ConfObjRead.dataNumObj = null;
    ConfObjRead.htmlObj = null;
    ConfObjRead.giconAnimObj = null;
    ConfObjRead.gamepanelObj = null;
    //跑马灯消息
    ConfObjRead.runningmsgObj = null;
    ConfObjRead.commonObj = null;
    ConfObjRead.urlObj = null;
    ConfObjRead.room_roompadObj = null;
    ConfObjRead.roomlistObj = null;
    ConfObjRead.avatorObj = null;
    //获取头像修改面板配置
    ConfObjRead.room_avatorObj = null;
    ConfObjRead.settingpadObj = null;
    //公告弹窗配置
    ConfObjRead.attentionObj = null;
    ConfObjRead.noticeDialogObj = null;
    ConfObjRead.room_helpObj = null;
    //金钱不足的对话框
    ConfObjRead.nomoneyObj = null;
    //读取提示信息
    ConfObjRead.room_toastObj = null;
    //加载进度框样式配置
    ConfObjRead.room_saiziObj = null;
    //读取战绩配置
    ConfObjRead.room_historyObj = null;
    //底部菜单
    ConfObjRead.room_bottomObj = null;
    //公告滚动消息框
    ConfObjRead.room_noticeObj = null;
    //标题栏
    ConfObjRead.room_titlebarObj = null;
    ConfObjRead.rmttbObj = null;
    //房间背景配置
    ConfObjRead.room_bgObj = null;
    ConfObjRead.peoplesObj = null;
    ConfObjRead.minemenuObj = null;
    ConfObjRead.leftMenuObj = null;
    ConfObjRead.versionObj = null;
    ConfObjRead.betMenuObj = null;
    ConfObjRead.roadObj = null;
    ConfObjRead.animObj = null;
    ConfObjRead.loginObj = null;
    ConfObjRead.uibgObj = null;
    ConfObjRead.dealerObj = null;
    ConfObjRead.musicObj = null;
    return ConfObjRead;
}());
//# sourceMappingURL=ConfObjRead.js.map