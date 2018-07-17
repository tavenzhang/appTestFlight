/**
 * Created by Sam on 2017/1/5.
 * Copyright © 2016年 JX. All rights reserved.
 */
import Toast from '../JXHelper/JXToast'
import InitHelper from './TCInitHelper'
import JXHelper from './JXHelper'
import NavigationService from '../../Page/Route/NavigationService'
import userStore from '../../Data/store/UserStore'

let initHelper = new InitHelper()
export default class Helper {
}

var navigator = null;

Helper.setNavigator = (args) => {
    navigator = args;
}

Helper.checkUserWhetherLogin = () => {
    if (userStore.userName && userStore.isLogin) return true
    return false
}

Helper.pushToBetHome = (rowData) => {
    NavigationService.pushToBetHome(rowData)
}

Helper.pushToBetBill = (title, gameName, cpInfoData, gameUniqueId, pagePathName) => {
    if (cpInfoData.rightData == null) {
        Toast.showShortCenter('网络连接似乎异常,稍后再试试')
        return
    }
    NavigationService.navigate("TCBetBill", {
        title: title,
        gameName: gameName,
        cpInfoData: cpInfoData,
        gameUniqueId: gameUniqueId,
        pagePathName: pagePathName
    });
}

Helper.pushToBetSucceed = ((data) => {
    NavigationService.navigate("TCBillSucceedPage", {...data});
})

Helper.pushToIntelligenceBet = ((data) => {
    NavigationService.navigate("IntelligenceBet", {...data});
})

Helper.pushToUserTransfer = (params) => {
    NavigationService.navigate("UserTransfer", params);
}

Helper.pushToOrderType = (params) => {
    NavigationService.navigate("UserOrderType", params);
}

Helper.pushToOrderRecord = (orderType) => {
    NavigationService.navigate("UserOderRecord", {initPage: orderType});
}

Helper.pushToOtherBetRecord = (platform) => {
    NavigationService.navigate("UserOtherBetRecords", {platform: platform});
}

Helper.pushToUserOrderDetail = (params) => {
    NavigationService.navigate("UserOrderDetail", params);
}

Helper.pushToUserAcountDetail = (params) => {
    NavigationService.navigate("UserAcountDetail", params);
}

Helper.pushToLotteryHistoryList = (data) => {
    NavigationService.navigate("TCLotteryHistory", {...data});
}


Helper.pushToOrderChaseItemList = (params) => {
    NavigationService.navigate("OrderChaseItemList", params);
}

Helper.pushToOrderItemList = (params) => {
    NavigationService.navigate("OrderItemList", params);
}

//用户账户明细
Helper.pushToUserAccount = (accountType) => {
    NavigationService.navigate("UserAcount", {initPage: accountType});
}

Helper.pushToUserTransferDetails = (params) => {
    NavigationService.navigate("UserTransferDetails", params);
}

/**
 * 用户充值提现转账
 * @param accountType：0-提现， 1-充值， 2-转账
 */
Helper.pushToUserPayAndWithDraw = (accountType, isBackToTop) => {
    NavigationService.navigate("UserAcountPay", {accountType: accountType, isBackToTop: isBackToTop});
}

Helper.pushToPay = () => {
    if (userStore.isGuest) {
        Toast.showShortCenter('对不起，试玩账号不能进行存取款操作!')
        return
    }
    NavigationService.navigate("UserPay");
}

Helper.pushtoPromotion = () => {
    NavigationService.navigate("TCPromotionList");
}
/**
 * 根据充值类型跳转
 * @param params
 */
Helper.pushToTopUp = (params) => {
    NavigationService.navigate("UserPayment", params);
}

Helper.pushToAliAndWechatPay = (params) => {
    NavigationService.navigate("UserAliAndWechatPay", params);
}

Helper.pushToUserAliAndWechatTransfer = (params) => {
    NavigationService.navigate("UserAliAndWechatTransfer", params);
}

Helper.pushToUserBankPayMessage = (params) => {
    NavigationService.navigate("UserBankPayMessage", params);
}

Helper.pushToHTMLPay = (params) => {
    NavigationService.navigate("UserHTMLPay", params);
}

Helper.pushToUserPayProgress = (params) => {
    NavigationService.navigate("UserPayProgress", params);
}


Helper.pushToUserAliPayAndWechatMessage = (params) => {
    NavigationService.navigate("UserAliPayAndWechatMessage", params);
}


Helper.pushToUserLogin = (gotoCenter, userName, shouldReplace, isFromRegister) => {
    setTimeout(() => {
        NavigationService.navigate("UserLogin", {
            gotoCenter: gotoCenter,
            userName: userName,
            isFromRegister: isFromRegister
        });
    }, 1000)
}

Helper.pushToUserRegister = (fromLoginToRegister) => {
    let registerURL = JXHelper.getWebUserRegister();
    if (registerURL && registerURL.length > 0 && navigator) {
        NavigationService.navigate("UserRegisterWeb", {fromLoginToRegister});
    } else {
        NavigationService.navigate("UserRegister")
    }
}

Helper.pushToForgetPwd = () => {
    NavigationService.navigate("UserForgotPassword");
}

Helper.pushToUserFreePlay = () => {
    let registerURL = JXHelper.getWebUserRegister()
    if (registerURL && registerURL.length > 0 && navigator) {
        NavigationService.navigate("UserRegisterWeb", {isGuest: true});
    } else {
        NavigationService.navigate("UserFreePlay", {gotoCenter: true});
    }
}


Helper.pushToAgentInroduce = () => {
    let res = JXHelper.getAgentInstruction()
    if (res) {
        Helper.pushToWebView(res, '代理说明')
    } else {
        Toast.showShortCenter("服务器异常，请稍后再试!")
    }
}

Helper.pushToUserTeamManager = (wantPopToN) => {
    NavigationService.navigate("AgentTeamList", {wantPopToN});
}

// 跳转到代理佣金页面
Helper.pushToAgentCommission = () => {
    NavigationService.navigate("AgentCommissionList");
}

Helper.pushToAgentCommissionDetail = (params) => {
    NavigationService.navigate("CommissionDetail", params);
}

Helper.pushToUserStatementsType = () => {
    NavigationService.navigate("UserStatementsType");
}

Helper.pushToUserStatements = (platform) => {
    NavigationService.navigate("UserStatements", {platform});
}

Helper.pushToUserSheet = (isUserSheet, username, prizeGroup) => {
    NavigationService.navigate("AgentSheet", {
        isUserSheet,
        username,
        prizeGroup,
    });
}

// 跳转到反馈页面
Helper.pushToFeedback = () => {
    NavigationService.navigate("Feedback");
}

Helper.pushToFeedbackView = (params) => {
    NavigationService.navigate("FeedbackView", params);
}

// 跳转到代理中心
Helper.pushToAgentCenter = () => {
    NavigationService.navigate("AgentCenter");
}

// 跳转到收藏界面
Helper.pushToUserCollect = () => {
    NavigationService.navigate("UserCollects");
}

// 跳转到消息列表界面
Helper.pushToMessagelist = () => {
    NavigationService.navigate("MessageList");
}

// 跳转到用户详情界面
Helper.pushToUserDetail = () => {
    NavigationService.navigate("UserDetailMsg");
}

// 跳转到安全中心
Helper.pushToUserSecurityCenter = () => {
    NavigationService.navigate("UserSecurityCenter");
}

Helper.pushToAddBank = () => {
    NavigationService.navigate("UserInfo");
}

// 跳转到修改用户登录密码页面
Helper.pushToModifyPassword = () => {
    NavigationService.navigate("ModifyPassword");
}

// 跳转到修改取款密码页面
Helper.pushToModifySecurityPwd = () => {
    NavigationService.navigate("ModifySecurityPwd");
}

// 跳转到银行卡管理页面
Helper.pushToUserBankManager = () => {
    if (!userStore.realName) {
        NavigationService.navigate("UserInfo");
    } else {
        NavigationService.navigate("UserBankManager");
    }
}

// 跳转到取款界面
Helper.pushToWithdraw = () => {
    if (userStore.isGuest) {
        Toast.showShortCenter('对不起，试玩账号不能进行存取款操作!')
        return
    }
    if (!userStore.realName) {
        NavigationService.navigate("UserInfo");
    } else {
        NavigationService.navigate("UserWithdraw");
    }
}

// 跳转到交易明细
Helper.pushToUserAccountCenter = () => {
    NavigationService.navigate("UserAccountCenter");
}

Helper.pushToWebView = (url, title) => {
    if (url && url.length > 0) {
        NavigationService.loadingWebViewWithUrl(url, title);
    }
}

Helper.pushToInviteFriends = () => {
    NavigationService.navigate("InviteFriends");
}

Helper.pushToWelfareCenter = () => {
    NavigationService.navigate("WelfareCenter");
}

Helper.pushToWallet = () => {
    NavigationService.navigate("Wallet");
}

Helper.gotoSetting = () => {
    NavigationService.navigate("UserSetting");
}

Helper.pushToFeedBack = () => {
    NavigationService.navigate("FeedbackList");
}


Helper.gotoProtocol = () => {
    NavigationService.navigate("UserProtocol");
}

Helper.gotoPCDD = (cpArray) => {
    NavigationService.navigate("PCDDShopping", {cpArray: cpArray});
}

Helper.pushToNotice = (announcement) => {
    NavigationService.navigate("TCNoticeDetail", {announcement: announcement});
}

Helper.pushToTopWinnerDetail = (target) => {
    NavigationService.navigate("TCTopWinnerDetail", {winnerTarget: target});
}

//代理
Helper.pushToAgentAddAccount = (fromTeamManager) => {
    NavigationService.navigate("AgentAddAccount", {isFromTeamManager: fromTeamManager});
}

// 红包相关
Helper.pushToRedPacket = () => {
    NavigationService.navigate("RedPacket");
}

Helper.pushToRedPacketMine = () => {
    NavigationService.navigate("RedPacketMine");
}

Helper.pushToRedPacketWinList = () => {
    NavigationService.navigate("RedPacketWinList");
}

Helper.pushToRedPacketRules = () => {
    NavigationService.navigate("RedPacketRules");
}

// 世界杯
Helper.pushToWorldCup = ()=>{
    NavigationService.navigate("WorldCup");
}

Helper.isTopPage = () => {
    return false;
}



/**
 * 通用----路由 pushView  配合JX_Componets, 减少 不断增加 pushToXXX的 需要
 * @param component
 * @param params
 */
Helper.pushView = (component, params) => {
    if (typeof component == 'string') {
        NavigationService.navigate(component, params)
    } else if (component && component.routName) {
        NavigationService.navigate(component.routName, params)
    }
}

Helper.popToBack = () => {
    NavigationService.goBack();
}

Helper.popToTop = () => {
    NavigationService.popToTop();
}

/**
 * 返回多级页面
 * @param n
 * @param routers
 * @param navigation
 */
Helper.popN = (n, routers, navigation) => {
    let length = routers.length;
    if (n === length - 1) {
        Helper.popToTop();
    } else if (n < length - 1) {
        let backRouter = routers[length - n - 1];
        navigation.goBack(backRouter.key);
    } else {
        return;
    }
}

Helper.popToN = (n) => {
    Helper.popN(n);
}

function routInStack(routeName, navigator) {
    let routes = navigator.getCurrentRoutes()
    if (routes.length >= 2) {
        let lastRoute = routes[routes.length - 2]
        if (lastRoute.name === routeName) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }

}

/**
 * 控制页面返回任意指定页面
 * @param routers
 * @param navigation
 */
Helper.goBack = (routers, navigation) => {
    if (!routers) {
        Helper.popToTop();
        return;
    }
    let curentRoute = routers[routers.length - 1];
    if (curentRoute.routeName === "TCBillSucceedPage") {
        let backToPathName = curentRoute.params.pagePathName;
        for (let i = 0; i < routers.length; i++) {
            if (routers[i].routeName === backToPathName) {
                // if (i + 1 === routers.length) {
                //     navigation.goBack(null);
                //     return;
                // }
                navigation.goBack(routers[i + 1].key);
                return;
            }
        }
    } else {
        Helper.popToBack();
    }

}

module.exports = Helper

