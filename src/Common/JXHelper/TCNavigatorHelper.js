/**
 * Created by Sam on 2017/1/5.
 * Copyright © 2016年 JX. All rights reserved.
 */
import Toast from '@remobile/react-native-toast'
import ChongQingSSCBetHome from '../../Page/Bet/AllPlayingMethodView/ChongQingSSC/TCChongQingSSCBetHome';
import MarkSixBetHome from '../../Page/Bet/AllPlayingMethodView/MarkSix/TCMarkSixBetHome'
import TCShangDong115BetHome from '../../Page/Bet/AllPlayingMethodView/ShangDong_11_5/TCShangDong115BetHome'
import TCBJPK10BetHome from '../../Page/Bet/AllPlayingMethodView/BJPK10/TCBJPK10BetHome'
import TCXYFTBetHome from '../../Page/Bet/AllPlayingMethodView/XYFT/TCXYFTBetHome'
import TCSSLBetHome from '../../Page/Bet/AllPlayingMethodView/SSL/TCSSLBetHome'
import TCKL10FBetHome from '../../Page/Bet/AllPlayingMethodView/KL10F/TCKL10FBetHome'
import TCPCDDBetHome from '../../Page/Bet/AllPlayingMethodView/PCDD/TCPCDDBetHome'
import TCK3BetHome from '../../Page/Bet/AllPlayingMethodView/K3/TCK3BetHome'
import TCHappyPokerBetHome from '../../Page/Bet/AllPlayingMethodView/HappyPoker/TCHappyPokerBetHome'
import QXCBetHome from '../../Page/Bet/AllPlayingMethodView/QXC/QXCBetHome'

import TCBetBill from '../../Page/Bill/TCBetBill'
import UserOderRecord from '../../Page/UserCenter/UserOrder/TCUserOrderSelectPage'
import TCLotteryHistory from '../../Page/LotteryLobby/TCLotteryHistoryList'
import UserAcount from '../../Page/UserCenter/UserAccount/TCUserAccountDetails'
import UserAcountPay from '../../Page/UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain'
import UserPay from  '../../Page/UserCenter/UserPay/TCUserPayType'
import UserLogin from '../../Page/UserCenter/TCUserLogin'
import UserRegisterWeb from '../../Page/UserCenter/TCUserRegisterWeb'
import UserRegister from '../../Page/UserCenter/TCUserRegister'
import UserFreePlay from '../../Page/UserCenter/TCUserFreePlay'
import WebView from  '../../Page/WebView/TCWebView'
import UserSetting from '../../Page/UserCenter/TCUserSetting'
import UserProtocol from '../../Page/UserCenter/TCUserProtocol'
import TCNoticeDetail from '../../Page/Home/View/TCNoticeDetail'
import TCTopWinnerDetail from '../../Page/Home/View/TCTopWinnerDetail'
import  InitHelper from './TCInitHelper'
import JXHelper from  './JXHelper'
import  UserCollect from '../../Page/UserCenter/UserCollect/TCUserCollect'
import PCDDShopping from '../../Page/ShoppingLobby/TCPCDDShopingLobby'
import AgentAddAccount from '../../Page/UserCenter/Agent/TCAgentAddAccount'
import TCPromotion from '../../Page/Home/View/TCPromotionList'
import AgentIntroduce from '../../Page/UserCenter/Agent/AgentCenter/TCAgentIntroduce'
import Usersheet from '../../Page/UserCenter/Agent/UserSheets/TCAgentSheets'
import AgentCenter from '../../Page/UserCenter/Agent/AgentCenter/TCAgentCenter'
import UserCollects from '../../Page/UserCenter/UserCollect/TCUserCollect'
import UserSecurityCenter from '../../Page/UserCenter/TCUserSecurityCenter'
import  UserAccountCenter from '../../Page/UserCenter/UserAccount/TCUserAccountCenter'
import UserDetailMsg from '../../Page/UserCenter/UserInfo/TCUserDetailMsg'
import UserWithdraw from '../../Page/UserCenter/UserWithdraw/TCUserWithdraw'
import  MessageList from '../../Page/UserCenter/UserMessage/TCUserMessagePage'
import UserInfo from '../../Page/UserCenter/UserInfo/TCAddUserInfo'
import AgentTeamList from '../../Page/UserCenter/Agent/Team/TCAgentTeamManager'
import AgentCommissionList from '../../Page/UserCenter/Agent/Commission/TCAgentCommissionList'
// 红包相关
import RedPacket from '../../Page/red_packet/home'
import RedPacketMine from '../../Page/red_packet/Mine'
import RedPacketWinList from '../../Page/red_packet/List'
import RedPacketRules from '../../Page/red_packet/Rules'
import  FeedbackList from '../../Page/UserCenter/FeedBack/TCUserFeedbackList'
let initHelper = new InitHelper()
export default class Helper {
}

var navigator = null;

Helper.setNavigator = (args) => {
    navigator = args;
}

Helper.checkUserWhetherLogin = () => {
    if (TCUSER_DATA.username && TCUSER_DATA.islogin) return true
    return false
}

Helper.pushToBetHome = (rowData) => {
    let page = null
    switch (rowData.gameUniqueId) {
        case 'HF_JSMS':
        case 'MARK_SIX':
        case '六合彩': {
            page = MarkSixBetHome
        }
            break
        case 'HF_FFSSC':
        case 'HF_LFSSC':
        case "HF_CQSSC":
        case 'HF_TJSSC':
        case 'HF_XJSSC':
        case 'HF_JXSSC':
        case '重庆时时彩': {
            page = ChongQingSSCBetHome
        }
            break
        case 'HF_LFD11':
        case 'HF_GDD11':
        case 'HF_AHD11':
        case 'HF_JXD11':
        case 'HF_SDD11':
        case 'HF_SHD11':
        case '山东11选5': {
            page = TCShangDong115BetHome
        }
            break
        case 'HF_FFPK10':
        case 'HF_LFPK10':
        case 'HF_BJPK10':
        case '北京PK10': {
            page = TCBJPK10BetHome
        }
            break
        case 'HF_CQKL10F':
        case 'HF_TJKL10F':
        case 'HF_GDKL10F':
        case '重庆快乐十分': {
            page = TCKL10FBetHome
        }
            break

        case 'HF_JND28':
        case 'HF_LF28':
        case 'HF_SG28':
        case 'HF_BJ28': {
            page = TCPCDDBetHome
        }
            break

        case 'X3D':
        case '福彩3D':
        case 'HF_SHSSL':
        case 'PL3': {
            page = TCSSLBetHome
        }
            break
        // 七星彩
        case 'QXC':{
            page = QXCBetHome
        }
        break

        case 'HF_FFK3':
        case 'HF_LFK3':
        case 'HF_BJK3':
        case 'HF_JLK3':
        case 'HF_AHK3':
        case 'HF_GXK3':
        case 'HF_JSK3':
        case 'HF_KUAI3': {
            page = TCK3BetHome
        }
            break
        case 'HF_LFKLPK':
            page = TCHappyPokerBetHome
            break
        case 'HF_XYFT':
        case 'HF_XYSM':
            page = TCXYFTBetHome
            break
    }

    let model = JXHelper.getGameInfoWithUniqueId(rowData.gameUniqueId)
    if (!model || !model.status || model.status != 'NORMAL') {
        Toast.showShortCenter('该玩法维护中暂停开放')
        return
    }

    if (navigator && page) {
        navigator.push({
            name: 'detail',
            component: page,
            passProps: {title: rowData.gameNameInChinese, gameUniqueId: rowData.gameUniqueId}
        })
    } else {
        Toast.showShortCenter('该玩法暂未开放')
    }
}

Helper.pushToBetBill = (title, gameName, cpInfoData, gameUniqueId) => {
    if (cpInfoData.rightData == null) {
        Toast.showShortCenter('网络连接似乎异常,稍后再试试')
        return
    }
    if (navigator) {
        navigator.push({
            name: 'detail',
            component: TCBetBill,
            passProps: {
                title: title,
                gameName: gameName,
                cpInfoData: cpInfoData,
                gameUniqueId: gameUniqueId
            }
        })
    }
}

Helper.pushToOrderRecord = (orderType) => {
    let page = UserOderRecord;
    if (navigator) {
        if (!Helper.checkUserWhetherLogin()) {
            Helper.pushToUserLogin()
            return
        }
        navigator.push({
            name: 'orderRecord', component: page, passProps: {initPage: orderType}
        });
    }
}

Helper.pushToLotteryHistoryList = (title, gameUniqueId, betBack) => {
    if (navigator) {
        navigator.push({
            name: 'detail',
            component: TCLotteryHistory,
            passProps: {title: title, gameUniqueId: gameUniqueId, betBack: betBack}
        })
    }
}

//用户账户明细
Helper.pushToUserAccount = (accountType) => {

    let page = UserAcount;
    if (navigator) {
        navigator.push({
            name: 'userAccount', component: page, passProps: {initPage: accountType}
        });
    }
}
//用户充值提现
Helper.pushToUserPayAndWithDraw = (accountType) => {

    let page = UserAcountPay;
    if (navigator) {
        navigator.push({
            name: 'userAccount', component: page, passProps: {accountType: accountType}
        });
    }
}

Helper.pushToPay = () => {
    if (initHelper.isGuestUser()) {
        Toast.showShortCenter('对不起，试玩账号不能进行存取款操作!')
        return
    }
    let page = UserPay;
    if (navigator) {
        navigator.push({
            name: 'pushToPay', component: page
        });
    }
}

Helper.pushtoPromotion = () => {
    if (navigator) {
        navigator.push({
            name: 'pushtoPromotion', component: TCPromotion
        });
    }
}
Helper.pushToTopUp = () => {
    if (navigator) {
        navigator.push({
            name: 'userPay',
            component: UserPay,
        })
    }
}

Helper.pushToUserLogin = (gotoCenter, userName, shouldReplace, isFromRegister) => {
    let page = UserLogin;
    TCPUSH_TO_LOGIN = true
    if (navigator) {
        if (shouldReplace) {
            navigator.replace({
                name: 'userLogin',
                component: page,
                passProps: {gotoCenter: gotoCenter, userName: userName, isFromRegister: isFromRegister}
            });
        } else {
            if (routInStack('userLogin', navigator)) {
                navigator.pop();
            } else {
                navigator.push({
                    name: 'userLogin',
                    component: page,
                    passProps: {gotoCenter: gotoCenter, userName: userName}
                });
            }
        }
    }
}

Helper.pushToUserCollect = () => {
    let page = UserCollect;
    if (navigator) {
        navigator.push({name: 'userCollect', component: page});
    }
}

Helper.pushToUserRegister = (fromLoginToRegister) => {
    let registerURL = JXHelper.getWebUserRegister()
    if (registerURL && registerURL.length > 0 && navigator) {
        navigator.push({name: 'userRegister', component: UserRegisterWeb, passProps: {fromLoginToRegister}});
    } else {
        if (routInStack('userRegister', navigator)) {
            navigator.pop();
        } else {
            navigator.push({name: 'userRegister', component: UserRegister});
        }
    }
}

Helper.pushToUserFreePlay = () => {
    let registerURL = JXHelper.getWebUserRegister()
    if (registerURL && registerURL.length > 0 && navigator) {
        navigator.push({name: 'userRegister', component: UserRegisterWeb, passProps: {isGuest: true}});
    } else {
        navigator.push({name: 'freePlay', component: UserFreePlay, passProps: {gotoCenter: true}});
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

Helper.pushToUserTeamManager = () => {
    if (navigator) {
        navigator.push({
            name: 'userAgentTeam',
            component: AgentTeamList,
            passProps: {
                ...this.props,
            }
        })
    }
}

Helper.pushToAgentCommission = () => {
    if (navigator) {
        navigator.push({
            name: 'agentCommissionList',
            component: AgentCommissionList,
            passProps: {
                ...this.props,
            }
        })
    }
}

Helper.pushToUserSheet = (isUserSheet, username, prizeGroup) => {
    if (navigator) {
        navigator.push({
            name: 'userSheet',
            component: Usersheet,
            passProps: {
                isUserSheet,
                username,
                prizeGroup,
            }
        })
    }
}

// 跳转到代理中心
Helper.pushToAgentCenter = () => {
    if (navigator) {
        navigator.push({
            name: 'userAgentCenter',
            component: AgentCenter
        })
    }
}

// 跳转到收藏界面
Helper.pushToUserCollect = () => {
    if (navigator) {
        navigator.push({
            name: 'messageList',
            component: UserCollects
        })
    }
}

// 跳转到消息列表界面
Helper.pushToMessagelist = () => {
    if (navigator) {
        navigator.push({
            name: 'messageList',
            component: MessageList
        })
    }
}

// 跳转到用户详情界面
Helper.pushToUserDetail = () => {
    if (navigator) {
        navigator.push({
            name: 'userDetailMsg',
            component: UserDetailMsg
        })
    }
}

// 跳转到安全中心
Helper.pushToUserSecurityCenter = () => {
    if (navigator) {
        navigator.push({
            name: 'userDetailMsg',
            component: UserSecurityCenter
        })
    }
}

Helper.pushToAddBank = () => {
    if (navigator) {
        navigator.push({
            name: 'addBank',
            component: UserInfo,
            passProps: {
                ...this.props,
            }
        })
    }
}

// 跳转到取款界面
Helper.pushToWithdraw = () => {
    if (initHelper.isGuestUser()) {
        Toast.showShortCenter('对不起，试玩账号不能进行存取款操作!')
        return
    }
    if (navigator) {
        var page = UserWithdraw
        if (!TCUSER_DATA.realname) {
            page = UserInfo
        }
        navigator.push({
            name: 'userWithdraw',
            component: page,
        })
    }
}

// 跳转到交易明细
Helper.pushToUserAccountCenter = () => {
    if (navigator) {
        navigator.push({
            name: 'userAccountCenter',
            component: UserAccountCenter,
        })
    }
}


Helper.pushToWebView = (url, title) => {
    if (url && url.length > 0) {
        let page = WebView
        if (navigator) {
            navigator.push({'webView': '', component: page, passProps: {url: url, title: title}});
        }
    }
}


Helper.gotoSetting = () => {
    if (navigator) {
        navigator.push({
            name: 'userSetting',
            component: UserSetting,
            passProps: {
                ...this.props,
            }
        })
    }
}

Helper.pushToFeedBack = () => {
    if (navigator) {
        navigator.push({
            name: 'List',
            component: FeedbackList,
            passProps: {
                ...this.props,
            }
        })
    }
}


Helper.gotoProtocol = () => {
    if (navigator) {
        navigator.push({
            name: 'userProtocol',
            component: UserProtocol,
            passProps: {
                ...this.props,
            }
        })
    }
}

Helper.gotoPCDD = (cpArray) => {
    if (navigator) {
        navigator.push({
            name: 'pcdd',
            component: PCDDShopping,
            passProps: {
                ...this.props,
                cpArray: cpArray
            }
        })
    }
}


Helper.pushToNotice = (announcement) => {
    if (navigator) {
        navigator.push({
            name: 'TCNoticeDetail',
            component: TCNoticeDetail,
            passProps: {
                announcement: announcement
            }
        })
    }
}

Helper.pushToTopWinnerDetail = (target) => {
    if (navigator) {
        navigator.push({
            name: 'TCTopWinnerDetail',
            component: TCTopWinnerDetail,
            passProps: {
                winnerTarget: target,
            }
        })
    }
}

//代理
Helper.pushtoAgentAddAccount = () => {
    if (navigator) {
        navigator.push({
            name: 'AgentAddAccount',
            component: AgentAddAccount
        })
    }
}

// 红包相关
Helper.pushToRedPacket = () => {
    if (navigator) {
        navigator.push({
            name: 'RedPacket',
            component: RedPacket
        })
    }
}

Helper.pushToRedPacketMine = () => {
    if (navigator) {
        navigator.push({
            name: 'RedPacketMine',
            component: RedPacketMine
        })
    }
}

Helper.pushToRedPacketWinList = () => {
    if (navigator) {
        navigator.push({
            name: 'RedPacketWinList',
            component: RedPacketWinList
        })
    }
}

Helper.pushToRedPacketRules = () => {
    if (navigator) {
        navigator.push({
            name: 'RedPacketRules',
            component: RedPacketRules
        })
    }
}

Helper.isTopPage = () => {
    if (navigator) {
        return navigator.getCurrentRoutes().length === 1
    }
}

Helper.popToBack = () => {
    if (navigator) {
        navigator.pop()
    }
}

Helper.popToTop = () => {
    if (navigator) {
        navigator.popToTop()
    }
}

Helper.popN = (n) => {
    if (navigator) {
        navigator.popN(n)
    }
}

Helper.popToN = (n) => {
    if (navigator) {
        navigator.popToN(n)
    }
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

module.exports = Helper

