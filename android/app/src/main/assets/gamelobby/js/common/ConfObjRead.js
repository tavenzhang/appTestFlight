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
            ConfObjRead.girlObj = Laya.Loader.getRes("./assets/conf/girls/girl_app.json");
        }
        else {
            ConfObjRead.girlObj = Laya.Loader.getRes("./assets/conf/girls/girl.json");
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
    ConfObjRead.getGameIconAnim = function () {
        if (ConfObjRead.giconAnimObj) {
            return ConfObjRead.giconAnimObj;
        }
        ConfObjRead.giconAnimObj = Laya.Loader.getRes("./assets/conf/gamepanel/gameiconanim.json");
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
        ConfObjRead.gamepanelObj = Laya.Loader.getRes("./assets/conf/gamepanel/gamepanel.json");
        return ConfObjRead.gamepanelObj;
    };
    ConfObjRead.getConfText = function () {
        if (!ConfObjRead.textObj) {
            ConfObjRead.textObj = Laya.Loader.getRes("./assets/conf/textconf.json");
        }
        return ConfObjRead.textObj;
    };
    ConfObjRead.getConfCommon = function () {
        if (!this.commonObj) {
            this.commonObj = Laya.Loader.getRes("./assets/conf/config.json");
        }
        return this.commonObj;
    };
    ConfObjRead.getConfUrl = function () {
        if (!ConfObjRead.urlObj) {
            ConfObjRead.urlObj = Laya.Loader.getRes("./assets/conf/urls.json");
        }
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
        ConfObjRead.roomlistObj = Laya.Loader.getRes("./assets/conf/roompanel/roompanel.json");
        return ConfObjRead.roomlistObj;
    };
    ConfObjRead.getConfAvator = function () {
        if (ConfObjRead.avatorObj) {
            return ConfObjRead.avatorObj;
        }
        if (AppData.IS_NATIVE_APP) {
            if (!AppData.isAndroidHack) {
                ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator/avator_app.json");
            }
            else {
                ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator/avator_app_temp.json");
            }
        }
        else {
            ConfObjRead.avatorObj = Laya.Loader.getRes("./assets/conf/avator/avator.json");
        }
        return ConfObjRead.avatorObj;
    };
    ConfObjRead.getConfAvatorPad = function () {
        if (ConfObjRead.room_avatorObj) {
            return ConfObjRead.room_avatorObj;
        }
        ConfObjRead.room_avatorObj = Laya.Loader.getRes("./assets/conf/avator/avatorpad.json");
        return ConfObjRead.room_avatorObj;
    };
    ConfObjRead.getConfAttention = function () {
        if (ConfObjRead.attentionObj) {
            return ConfObjRead.attentionObj;
        }
        ConfObjRead.attentionObj = Laya.Loader.getRes("./assets/conf/notice/attention.json");
        return ConfObjRead.attentionObj;
    };
    ConfObjRead.getConfNoticeDialog = function () {
        if (ConfObjRead.noticeDialogObj) {
            return ConfObjRead.noticeDialogObj;
        }
        ConfObjRead.noticeDialogObj = Laya.Loader.getRes("./assets/conf/notice/NoticeDialog.json");
        return ConfObjRead.noticeDialogObj;
    };
    ConfObjRead.getConfSharePageNoticeDialog = function () {
        if (ConfObjRead.sharePageDialogObj) {
            return ConfObjRead.sharePageDialogObj;
        }
        ConfObjRead.sharePageDialogObj = Laya.Loader.getRes("./assets/conf/notice/SharePageNotice.json");
        return ConfObjRead.sharePageDialogObj;
    };
    ConfObjRead.getConfNoticeDialogLuckytDraw = function () {
        if (ConfObjRead.noticeDialogLuckyDrawObj) {
            return ConfObjRead.noticeDialogLuckyDrawObj;
        }
        ConfObjRead.noticeDialogLuckyDrawObj = Laya.Loader.getRes("./assets/conf/notice/luckydraw.json");
        return ConfObjRead.noticeDialogLuckyDrawObj;
    };
    ConfObjRead.getConfNoticeDialogSpinner = function () {
        if (ConfObjRead.noticeDialogSpinnerObj) {
            return ConfObjRead.noticeDialogSpinnerObj;
        }
        ConfObjRead.noticeDialogSpinnerObj = Laya.Loader.getRes("./assets/conf/notice/spinner.json");
        return ConfObjRead.noticeDialogSpinnerObj;
    };
    ConfObjRead.getConfHelppad = function () {
        if (ConfObjRead.room_helpObj) {
            return ConfObjRead.room_helpObj;
        }
        ConfObjRead.room_helpObj = Laya.Loader.getRes("./assets/conf/uiobj/helppad.json");
        return ConfObjRead.room_helpObj;
    };
    ConfObjRead.getConfNoMoney = function () {
        if (ConfObjRead.nomoneyObj) {
            return ConfObjRead.nomoneyObj;
        }
        ConfObjRead.nomoneyObj = Laya.Loader.getRes("./assets/conf/uiobj/nomoney.json");
        return ConfObjRead.nomoneyObj;
    };
    ConfObjRead.getConfHistorypad = function () {
        if (ConfObjRead.room_historyObj) {
            return ConfObjRead.room_historyObj;
        }
        ConfObjRead.room_historyObj = Laya.Loader.getRes("./assets/conf/uiobj/history.json");
        return ConfObjRead.room_historyObj;
    };
    ConfObjRead.getConfBottommenu = function () {
        if (ConfObjRead.room_bottomObj) {
            return ConfObjRead.room_bottomObj;
        }
        ConfObjRead.room_bottomObj = Laya.Loader.getRes("./assets/conf/bottommenus/bottommenu.json");
        return ConfObjRead.room_bottomObj;
    };
    ConfObjRead.getConfRoomTitlebar = function () {
        if (ConfObjRead.rmttbObj) {
            return ConfObjRead.rmttbObj;
        }
        ConfObjRead.rmttbObj = Laya.Loader.getRes("./assets/conf/roompanel/roomtitlebar.json");
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
        ConfObjRead.versionObj = Laya.Loader.getRes("./assets/conf/common/version.json");
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
    ConfObjRead.getDealerConf = function () {
        if (ConfObjRead.dealerObj) {
            return ConfObjRead.dealerObj;
        }
        ConfObjRead.dealerObj = Laya.Loader.getRes("./assets/conf/dealer.json");
        return ConfObjRead.dealerObj;
    };
    ConfObjRead.getGameIconConfig = function () {
        if (!this.gameIconConfig) {
            this.gameIconConfig = Laya.Loader.getRes("./assets/conf/gameIcons.json");
        }
        return this.gameIconConfig;
    };
    ConfObjRead.getVerConfig = function () {
        if (!this.verConfig) {
            this.verConfig = Laya.Loader.getRes("./assets/conf/version.json");
        }
        return this.verConfig;
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
    ConfObjRead.giconAnimObj = null;
    ConfObjRead.gamepanelObj = null;
    ConfObjRead.textObj = null;
    ConfObjRead.commonObj = null;
    ConfObjRead.urlObj = null;
    ConfObjRead.room_roompadObj = null;
    ConfObjRead.roomlistObj = null;
    ConfObjRead.avatorObj = null;
    ConfObjRead.room_avatorObj = null;
    ConfObjRead.attentionObj = null;
    ConfObjRead.noticeDialogObj = null;
    ConfObjRead.sharePageDialogObj = null;
    ConfObjRead.noticeDialogLuckyDrawObj = null;
    ConfObjRead.noticeDialogSpinnerObj = null;
    ConfObjRead.room_helpObj = null;
    ConfObjRead.nomoneyObj = null;
    ConfObjRead.room_historyObj = null;
    ConfObjRead.room_bottomObj = null;
    ConfObjRead.rmttbObj = null;
    ConfObjRead.room_bgObj = null;
    ConfObjRead.peoplesObj = null;
    ConfObjRead.minemenuObj = null;
    ConfObjRead.leftMenuObj = null;
    ConfObjRead.versionObj = null;
    ConfObjRead.betMenuObj = null;
    ConfObjRead.roadObj = null;
    ConfObjRead.animObj = null;
    ConfObjRead.dealerObj = null;
    /**
     * 游戏图标配置
     */
    ConfObjRead.gameIconConfig = null;
    ConfObjRead.verConfig = null;
    return ConfObjRead;
}());
//# sourceMappingURL=ConfObjRead.js.map