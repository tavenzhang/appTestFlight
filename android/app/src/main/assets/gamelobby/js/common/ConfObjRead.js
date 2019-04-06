var ConfObjRead = /** @class */ (function () {
    function ConfObjRead() {
    }
    ConfObjRead.getConfListDescTest = function () {
        if (ConfObjRead.agentlistdesctestObj) {
            return ConfObjRead.agentlistdesctestObj;
        }
        ConfObjRead.agentlistdesctestObj = Laya.Loader.getRes("./assets/conf/agent/listdesctest.json");
        return ConfObjRead.agentlistdesctestObj;
    };
    ConfObjRead.getConfListDesc = function () {
        if (ConfObjRead.agentlistdescObj) {
            return ConfObjRead.agentlistdescObj;
        }
        ConfObjRead.agentlistdescObj = Laya.Loader.getRes("./assets/conf/agent/listdesc.json");
        return ConfObjRead.agentlistdescObj;
    };
    ConfObjRead.getConfAgentIncomeTest = function () {
        if (ConfObjRead.agenttestdataincomeObj) {
            return ConfObjRead.agenttestdataincomeObj;
        }
        ConfObjRead.agenttestdataincomeObj = Laya.Loader.getRes("./assets/conf/agent/listincometest.json");
        return ConfObjRead.agenttestdataincomeObj;
    };
    ConfObjRead.getConfAgentListIncome = function () {
        if (ConfObjRead.agentlistincomeObj) {
            return ConfObjRead.agentlistincomeObj;
        }
        ConfObjRead.agentlistincomeObj = Laya.Loader.getRes("./assets/conf/agent/listincome.json");
        return ConfObjRead.agentlistincomeObj;
    };
    ConfObjRead.getConfAgentChildrenTest = function () {
        if (ConfObjRead.agenttestdatachildrenObj) {
            return ConfObjRead.agenttestdatachildrenObj;
        }
        ConfObjRead.agenttestdatachildrenObj = Laya.Loader.getRes("./assets/conf/agent/listmychildrentest.json");
        return ConfObjRead.agenttestdatachildrenObj;
    };
    ConfObjRead.getConfAgentListChildren = function () {
        if (ConfObjRead.agentlistchildrenObj) {
            return ConfObjRead.agentlistchildrenObj;
        }
        ConfObjRead.agentlistchildrenObj = Laya.Loader.getRes("./assets/conf/agent/listmychildren.json");
        return ConfObjRead.agentlistchildrenObj;
    };
    ConfObjRead.getConfAgentDialogAddUser = function () {
        if (ConfObjRead.agentAdduserObj) {
            return ConfObjRead.agentAdduserObj;
        }
        ConfObjRead.agentAdduserObj = Laya.Loader.getRes("./assets/conf/agent/agentadduser.json");
        return ConfObjRead.agentAdduserObj;
    };
    ConfObjRead.getConfAgentDialogEditAccountType = function () {
        if (ConfObjRead.agentEditAccountTypeObj) {
            return ConfObjRead.agentEditAccountTypeObj;
        }
        ConfObjRead.agentEditAccountTypeObj = Laya.Loader.getRes("./assets/conf/agent/agenteditaccounttype.json");
        return ConfObjRead.agentEditAccountTypeObj;
    };
    ConfObjRead.getConfAgentInviChildrenTest = function () {
        if (ConfObjRead.agentInvitestdatachildrenObj) {
            return ConfObjRead.agentInvitestdatachildrenObj;
        }
        ConfObjRead.agentInvitestdatachildrenObj = Laya.Loader.getRes("./assets/conf/agent/listinvichildrentest.json");
        return ConfObjRead.agentInvitestdatachildrenObj;
    };
    ConfObjRead.getConfAgentInvitationChildren = function () {
        if (ConfObjRead.agentInvilistchildrenObj) {
            return ConfObjRead.agentInvilistchildrenObj;
        }
        ConfObjRead.agentInvilistchildrenObj = Laya.Loader.getRes("./assets/conf/agent/listinvichildren.json");
        return ConfObjRead.agentInvilistchildrenObj;
    };
    ConfObjRead.getConfAgentDialogInvitation = function () {
        if (ConfObjRead.agentInvitationObj) {
            return ConfObjRead.agentInvitationObj;
        }
        ConfObjRead.agentInvitationObj = Laya.Loader.getRes("./assets/conf/agent/agentinvitation.json");
        return ConfObjRead.agentInvitationObj;
    };
    ConfObjRead.getConfAgentDialogDeleteInvitation = function () {
        if (ConfObjRead.agentDeleteInvitationObj) {
            return ConfObjRead.agentDeleteInvitationObj;
        }
        ConfObjRead.agentDeleteInvitationObj = Laya.Loader.getRes("./assets/conf/agent/agentdeleteinvitation.json");
        return ConfObjRead.agentDeleteInvitationObj;
    };
    ConfObjRead.getConfAgentContentDesc = function () {
        if (ConfObjRead.agentCtDescObj) {
            return ConfObjRead.agentCtDescObj;
        }
        ConfObjRead.agentCtDescObj = Laya.Loader.getRes("./assets/conf/agent/agentctdesc.json");
        return ConfObjRead.agentCtDescObj;
    };
    ConfObjRead.getConfAgentContentInvation = function () {
        if (ConfObjRead.agentCtInvationObj) {
            return ConfObjRead.agentCtInvationObj;
        }
        ConfObjRead.agentCtInvationObj = Laya.Loader.getRes("./assets/conf/agent/agentctinvation.json");
        return ConfObjRead.agentCtInvationObj;
    };
    ConfObjRead.getConfAgentContentMyIncome = function () {
        if (ConfObjRead.agentCtMyIncomeObj) {
            return ConfObjRead.agentCtMyIncomeObj;
        }
        ConfObjRead.agentCtMyIncomeObj = Laya.Loader.getRes("./assets/conf/agent/agentctmyincome.json");
        return ConfObjRead.agentCtMyIncomeObj;
    };
    ConfObjRead.getConfAgentContentMyChildren = function () {
        if (ConfObjRead.agentCtMychildrenObj) {
            return ConfObjRead.agentCtMychildrenObj;
        }
        ConfObjRead.agentCtMychildrenObj = Laya.Loader.getRes("./assets/conf/agent/agentctmychildren.json");
        return ConfObjRead.agentCtMychildrenObj;
    };
    ConfObjRead.getConfAgentContentInfo = function () {
        if (ConfObjRead.agentCtinfoObj) {
            return ConfObjRead.agentCtinfoObj;
        }
        ConfObjRead.agentCtinfoObj = Laya.Loader.getRes("./assets/conf/agent/agentctinfo.json");
        return ConfObjRead.agentCtinfoObj;
    };
    ConfObjRead.getConfAgentContent = function () {
        if (ConfObjRead.agentCtObj) {
            return ConfObjRead.agentCtObj;
        }
        ConfObjRead.agentCtObj = Laya.Loader.getRes("./assets/conf/agent/agentct.json");
        return ConfObjRead.agentCtObj;
    };
    ConfObjRead.getConfAgentTab = function () {
        if (ConfObjRead.agentTabObj) {
            return ConfObjRead.agentTabObj;
        }
        ConfObjRead.agentTabObj = Laya.Loader.getRes("./assets/conf/agent/agenttab.json");
        return ConfObjRead.agentTabObj;
    };
    ConfObjRead.getConfAgentTitle = function () {
        if (ConfObjRead.agentTitleObj) {
            return ConfObjRead.agentTitleObj;
        }
        ConfObjRead.agentTitleObj = Laya.Loader.getRes("./assets/conf/agent/agenttitle.json");
        return ConfObjRead.agentTitleObj;
    };
    ConfObjRead.getConfAgentPad = function () {
        if (ConfObjRead.agentPadObj) {
            return ConfObjRead.agentPadObj;
        }
        ConfObjRead.agentPadObj = Laya.Loader.getRes("./assets/conf/agent/agentpad.json");
        return ConfObjRead.agentPadObj;
    };
    ConfObjRead.getConfAgent = function () {
        if (ConfObjRead.agentObj) {
            return ConfObjRead.agentObj;
        }
        ConfObjRead.agentObj = Laya.Loader.getRes("./assets/conf/agent/agent.json");
        return ConfObjRead.agentObj;
    };
    ConfObjRead.getConfAccountCenter = function () {
        if (ConfObjRead.accenterObj) {
            return ConfObjRead.accenterObj;
        }
        if (AppData.IS_NATIVE_APP) {
            if (AppData.isAndroidHack) {
                ConfObjRead.accenterObj = Laya.Loader.getRes("./assets/conf/accountcenter/accountpad_app_temp.json");
            }
            else {
                ConfObjRead.accenterObj = Laya.Loader.getRes("./assets/conf/accountcenter/accountpad_app.json");
            }
        }
        else {
            ConfObjRead.accenterObj = Laya.Loader.getRes("./assets/conf/accountcenter/accountpad.json");
        }
        return ConfObjRead.accenterObj;
    };
    ConfObjRead.getConfGirlManager = function () {
        if (ConfObjRead.girlObj) {
            return ConfObjRead.girlObj;
        }
        if (AppData.IS_NATIVE_APP) {
            ConfObjRead.girlObj = Laya.Loader.getRes("./assets/conf/girl_app.json");
        }
        else {
            ConfObjRead.girlObj = Laya.Loader.getRes("./assets/conf/girl.json");
        }
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
    ConfObjRead.getGameIconSrcByAlias = function (alias) {
        var obj = ConfObjRead.getGameIconAnim();
        for (var i = 0; i < obj.icons.length; i++) {
            if (obj.icons[i].alias == alias) {
                return obj.icons[i].src;
            }
        }
        return obj.defaultIcon.src;
    };
    ConfObjRead.getGameIconAnimByAlias = function (alias) {
        var obj = ConfObjRead.getGameIconAnim();
        for (var i = 0; i < obj.icons.length; i++) {
            if (obj.icons[i].alias == alias) {
                return obj.icons[i].anim;
            }
        }
        return obj.defaultIcon.anim;
    };
    ConfObjRead.getGameIconAnimBySrcX = function (src) {
        var obj = ConfObjRead.getGameIconAnim();
        for (var i = 0; i < obj.icons.length; i++) {
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
        if (AppData.IS_NATIVE_APP) {
            // if( !AppData.isAndroidHack )
            // {
            //     ConfObjRead.commonObj = Laya.Loader.getRes("./assets/conf/common/config_app_temp.json");
            // }else{
            ConfObjRead.commonObj = Laya.Loader.getRes("./assets/conf/common/config_app.json");
            // }
        }
        else {
            ConfObjRead.commonObj = Laya.Loader.getRes("./assets/conf/common/config.json");
        }
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
        if (AppData.IS_NATIVE_APP) {
            if (!AppData.isAndroidHack) {
                ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator_app.json");
            }
            else {
                ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator_app_temp.json");
            }
        }
        else {
            ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator.json");
        }
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
            if (!AppData.isAndroidHack) {
                ConfObjRead.room_titlebarObj = Laya.Loader.getRes("./assets/conf/titlebar_app.json");
            }
            else {
                ConfObjRead.room_titlebarObj = Laya.Loader.getRes("./assets/conf/titlebar_app_temp.json");
            }
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
            if (!AppData.isAndroidHack) {
                ConfObjRead.minemenuObj = Laya.Loader.getRes("./assets/conf/bottommenus/minemenus_app.json");
            }
            else {
                ConfObjRead.minemenuObj = Laya.Loader.getRes("./assets/conf/bottommenus/minemenus_app_temp.json");
            }
        }
        else {
            ConfObjRead.minemenuObj = Laya.Loader.getRes("./assets/conf/bottommenus/minemenus.json");
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
    ConfObjRead.getConfChangePwdQk = function () {
        if (ConfObjRead.changpwdqkObj) {
            return ConfObjRead.changpwdqkObj;
        }
        ConfObjRead.changpwdqkObj = Laya.Loader.getRes("./assets/conf/login/changepwdqk.json");
        return ConfObjRead.changpwdqkObj;
    };
    ConfObjRead.getConfChangePwdIn = function () {
        if (ConfObjRead.changpwdinObj) {
            return ConfObjRead.changpwdinObj;
        }
        ConfObjRead.changpwdinObj = Laya.Loader.getRes("./assets/conf/login/changepwdin.json");
        return ConfObjRead.changpwdinObj;
    };
    ConfObjRead.getConfChangePwd = function () {
        if (ConfObjRead.changpwdObj) {
            return ConfObjRead.changpwdObj;
        }
        ConfObjRead.changpwdObj = Laya.Loader.getRes("./assets/conf/login/changepwd.json");
        return ConfObjRead.changpwdObj;
    };
    ConfObjRead.getConfLoginQuick = function () {
        if (ConfObjRead.loginquickObj) {
            return ConfObjRead.loginquickObj;
        }
        ConfObjRead.loginquickObj = Laya.Loader.getRes("./assets/conf/login/quicklogin.json");
        return ConfObjRead.loginquickObj;
    };
    ConfObjRead.getConfYZM = function () {
        if (ConfObjRead.yzmObj) {
            return ConfObjRead.yzmObj;
        }
        ConfObjRead.yzmObj = Laya.Loader.getRes("./assets/conf/login/yzm_quicklogin.json");
        return ConfObjRead.yzmObj;
    };
    ConfObjRead.getConfLoginChoose = function () {
        if (ConfObjRead.loginchooseObj) {
            return ConfObjRead.loginchooseObj;
        }
        ConfObjRead.loginchooseObj = Laya.Loader.getRes("./assets/conf/login/chooselogin.json");
        return ConfObjRead.loginchooseObj;
    };
    ConfObjRead.getConfLoginOther = function () {
        if (ConfObjRead.loginotherObj) {
            return ConfObjRead.loginotherObj;
        }
        ConfObjRead.loginotherObj = Laya.Loader.getRes("./assets/conf/login/loginother.json");
        return ConfObjRead.loginotherObj;
    };
    ConfObjRead.getConfLogin = function () {
        if (ConfObjRead.loginObj) {
            return ConfObjRead.loginObj;
        }
        ConfObjRead.loginObj = Laya.Loader.getRes("./assets/conf/login/loginreg.json");
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
    ConfObjRead.agentlistdesctestObj = null;
    ConfObjRead.agentlistdescObj = null;
    ConfObjRead.agenttestdataincomeObj = null;
    ConfObjRead.agentlistincomeObj = null;
    ConfObjRead.agenttestdatachildrenObj = null;
    ConfObjRead.agentlistchildrenObj = null;
    ConfObjRead.agentAdduserObj = null;
    ConfObjRead.agentEditAccountTypeObj = null;
    ConfObjRead.agentInvitestdatachildrenObj = null;
    ConfObjRead.agentInvilistchildrenObj = null;
    ConfObjRead.agentInvitationObj = null;
    ConfObjRead.agentDeleteInvitationObj = null;
    ConfObjRead.agentCtDescObj = null;
    ConfObjRead.agentCtInvationObj = null;
    ConfObjRead.agentCtMyIncomeObj = null;
    ConfObjRead.agentCtMychildrenObj = null;
    ConfObjRead.agentCtinfoObj = null;
    ConfObjRead.agentCtObj = null;
    ConfObjRead.agentTabObj = null;
    ConfObjRead.agentTitleObj = null;
    ConfObjRead.agentPadObj = null;
    ConfObjRead.agentObj = null;
    ConfObjRead.accenterObj = null;
    ConfObjRead.girlObj = null;
    ConfObjRead.dataNumObj = null;
    ConfObjRead.htmlObj = null;
    ConfObjRead.giconAnimObj = null;
    ConfObjRead.gamepanelObj = null;
    ConfObjRead.runningmsgObj = null;
    ConfObjRead.commonObj = null;
    ConfObjRead.urlObj = null;
    ConfObjRead.room_roompadObj = null;
    ConfObjRead.roomlistObj = null;
    ConfObjRead.avatorObj = null;
    ConfObjRead.room_avatorObj = null;
    ConfObjRead.settingpadObj = null;
    ConfObjRead.attentionObj = null;
    ConfObjRead.noticeDialogObj = null;
    ConfObjRead.room_helpObj = null;
    ConfObjRead.nomoneyObj = null;
    ConfObjRead.room_toastObj = null;
    ConfObjRead.room_saiziObj = null;
    ConfObjRead.room_historyObj = null;
    ConfObjRead.room_bottomObj = null;
    ConfObjRead.room_noticeObj = null;
    ConfObjRead.room_titlebarObj = null;
    ConfObjRead.rmttbObj = null;
    ConfObjRead.room_bgObj = null;
    ConfObjRead.peoplesObj = null;
    ConfObjRead.minemenuObj = null;
    ConfObjRead.leftMenuObj = null;
    ConfObjRead.versionObj = null;
    ConfObjRead.betMenuObj = null;
    ConfObjRead.roadObj = null;
    ConfObjRead.animObj = null;
    ConfObjRead.changpwdqkObj = null;
    ConfObjRead.changpwdinObj = null;
    ConfObjRead.changpwdObj = null;
    ConfObjRead.loginquickObj = null;
    ConfObjRead.yzmObj = null;
    ConfObjRead.loginchooseObj = null;
    ConfObjRead.loginotherObj = null;
    ConfObjRead.loginObj = null;
    ConfObjRead.uibgObj = null;
    ConfObjRead.dealerObj = null;
    ConfObjRead.musicObj = null;
    return ConfObjRead;
}());
//# sourceMappingURL=ConfObjRead.js.map