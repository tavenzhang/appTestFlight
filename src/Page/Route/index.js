import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';
import React, {Component} from 'react';
import Helper from "../../Common/JXHelper/JXHelper"
import {Provider} from 'mobx-react'
import {BackHandler, ToastAndroid, Platform} from 'react-native'
import balanceStore from '../../Data/store/BalanceStore'

import NavigationService from './NavigationService'

//首页
import MainScreen from '../Main/TCMain'
import WebView from '../WebView/TCWebView'
import TCNoticeDetail from '../Home/View/TCNoticeDetail'
import TCTopWinnerDetail from '../Home/View/TCTopWinnerDetail'
import TCPromotionList from '../Home/View/TCPromotionList'
import PCDDShopping from '../../Page/ShoppingLobby/TCPCDDShopingLobby'

//彩票下注界面
import MarkSixBetHome from '../../Page/Bet/AllPlayingMethodView/MarkSix/TCMarkSixBetHome'
import ChongQingSSCBetHome from '../../Page/Bet/AllPlayingMethodView/ChongQingSSC/TCChongQingSSCBetHome';
import TCBJPK10BetHome from '../../Page/Bet/AllPlayingMethodView/BJPK10/TCBJPK10BetHome'
import TCKL10FBetHome from '../../Page/Bet/AllPlayingMethodView/KL10F/TCKL10FBetHome'
import TCShangDong115BetHome from '../../Page/Bet/AllPlayingMethodView/ShangDong_11_5/TCShangDong115BetHome'
import TCPCDDBetHome from '../../Page/Bet/AllPlayingMethodView/PCDD/TCPCDDBetHome'
import TCSSLBetHome from '../../Page/Bet/AllPlayingMethodView/SSL/TCSSLBetHome'
import QXCBetHome from '../../Page/Bet/AllPlayingMethodView/QXC/QXCBetHome'
import TCK3BetHome from '../../Page/Bet/AllPlayingMethodView/K3/TCK3BetHome'
import TCHappyPokerBetHome from '../../Page/Bet/AllPlayingMethodView/HappyPoker/TCHappyPokerBetHome'
import TCXYFTBetHome from '../../Page/Bet/AllPlayingMethodView/XYFT/TCXYFTBetHome'

//购彩
import TCBetBill from '../../Page/Bill/TCBetBill'
import TCBillSucceedPage from '../../Page/Bill/TCBillSucceedPage';
import IntelligenceBet from '../../Page/Bill/IntelligenceBet/TCIntelligence_bet';
import UserOderRecord from '../../Page/UserCenter/UserOrder/TCUserOrderSelectPage';
import UserOrderDetail from '../../Page/UserCenter/UserOrder/TCUserOrderDetail'
import TCLotteryHistory from '../../Page/LotteryLobby/TCLotteryHistoryList'
import OrderChaseItemList from '../../Page/UserCenter/UserOrder/TCUserOrderChaseBetList';
import OrderItemList from '../../Page/UserCenter/UserOrder/TCUserOrderItemList';

// 红包相关
import RedPacket from '../../Page/red_packet/home'
import RedPacketMine from '../../Page/red_packet/Mine'
import RedPacketWinList from '../../Page/red_packet/List'
import RedPacketRules from '../../Page/red_packet/Rules'


//个人收藏
import UserCollects from '../../Page/UserCenter/UserCollect/TCUserCollect'

//个人中心
import UserLogin from '../../Page/UserCenter/TCUserLogin'
import UserRegisterWeb from '../../Page/UserCenter/TCUserRegisterWeb'
import UserRegister from '../../Page/UserCenter/TCUserRegister'
import UserFreePlay from '../../Page/UserCenter/TCUserFreePlay'
import UserSetting from '../../Page/UserCenter/TCUserSetting'
import UserProtocol from '../../Page/UserCenter/TCUserProtocol'
import UserSecurityCenter from '../../Page/UserCenter/TCUserSecurityCenter'
import UserAccountCenter from '../../Page/UserCenter/UserAccount/TCUserAccountCenter'
import UserDetailMsg from '../../Page/UserCenter/UserInfo/TCUserDetailMsg'
import UserWithdraw from '../../Page/UserCenter/UserWithdraw/TCUserWithdraw'
import MessageList from '../../Page/UserCenter/UserMessage/TCUserMessagePage'
import UserInfo from '../../Page/UserCenter/UserInfo/TCAddUserInfo'
import FeedbackList from '../../Page/UserCenter/FeedBack/TCUserFeedbackList'
import UserAcount from '../../Page/UserCenter/UserAccount/TCUserAccountDetailsNew'
import UserAcountDetail from '../../Page/UserCenter/UserAccount/TCUserAccountBillingDetails'
import Feedback from '../../Page/UserCenter/FeedBack/TCUserFeedback';
import FeedbackView from '../../Page/UserCenter/FeedBack/TCUserFeedbackView';
import UserBankManager from '../../Page/UserCenter/UserBank/TCUserBankManager'
import UserForgotPassword from '../../Page/UserCenter/UserInfo/TCForgotPassword'
import ModifyPassword from '../../Page/UserCenter/UserInfo/TCModifyPassword'
import ModifySecurityPwd from '../../Page/UserCenter/UserInfo/TCModifySecurityPwd'
import UserMessage from '../../Page/UserCenter/UserInfo/TCUserMessage'
import UserAcountPay from '../../Page/UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain'
import UserPay from '../../Page/UserCenter/UserPay/TCUserPayType'
import UserPayment from '../../Page/UserCenter/UserPay/TCUserPayNew'
import UserAliAndWechatTransfer from '../../Page/UserCenter/UserPay/TCUserAliAndWechatTransfer'
import UserAliAndWechatPay from '../../Page/UserCenter/UserPay/TCUserAliAndWechatPay'
import UserBankPayMessage from '../../Page/UserCenter/UserPay/TCUserBankPayMessage'
import UserHTMLPay from '../../Page/UserCenter/UserPay/TCUserHTMLPay'
import UserPayProgress from '../../Page/UserCenter/UserPay/TCUserPayProgress'
import UserAliPayAndWechatMessage from '../../Page/UserCenter/UserPay/TCUserAliPayAndWechatMessage'

//代理中心
import AgentCenter from '../../Page/UserCenter/Agent/AgentCenter/TCAgentCenter'
import AgentAddAccount from '../../Page/UserCenter/Agent/TCAgentAddAccount'
import AgentTeamList from '../../Page/UserCenter/Agent/Team/TCAgentTeamManager'
import AgentCommissionList from '../../Page/UserCenter/Agent/Commission/TCAgentCommissionList'
import AgentSheet from '../../Page/UserCenter/Agent/UserSheets/TCAgentSheets'
import CommissionDetail from '../../Page/UserCenter/Agent/Commission/TCAgentCommissionDetail'
import PersonalCommissionDetail from '../../Page/UserCenter/Agent/Commission/TCPersonalCommissionDetail'
import TCUserBankPayMessageNew from "../UserCenter/UserPay/TCUserBankPayMessageNew";
import TCInviteFriends from "../UserCenter/share/TCInviteFriends";
import TCWelfareCenter from "../UserCenter/welfare/TCWelfareCenter";
import TCUserOrderType from "../UserCenter/UserOrder/TCUserOrderType";
import TCUserTransfer from "../UserCenter/transfer/TCUserTransfer";
import rootStore from "../../Data/store/RootStore";
//趋势图webView
import TCWebTrendView from "../WebView/TCWebTrendView";

//用于增加通用navigator view 属性 特殊 处理
 function viewRoutHelp(component){
     return {screen:component}
    }

const Components = {
    Main: viewRoutHelp(MainScreen),
    WebView: viewRoutHelp(WebView),
    TCNoticeDetail:viewRoutHelp(TCNoticeDetail),
    TCTopWinnerDetail: viewRoutHelp(TCTopWinnerDetail),
    TCPromotionList: viewRoutHelp(TCPromotionList),
    PCDDShopping:viewRoutHelp(PCDDShopping),
    MarkSixBetHome: viewRoutHelp(MarkSixBetHome),
    ChongQingSSCBetHome: viewRoutHelp(ChongQingSSCBetHome),
    TCShangDong115BetHome: viewRoutHelp(TCShangDong115BetHome),
    TCBJPK10BetHome: viewRoutHelp(TCBJPK10BetHome),
    TCKL10FBetHome: viewRoutHelp(TCKL10FBetHome),
    TCPCDDBetHome:viewRoutHelp(TCPCDDBetHome),
    TCSSLBetHome:viewRoutHelp(TCSSLBetHome),
    QXCBetHome: viewRoutHelp(QXCBetHome),
    TCK3BetHome: viewRoutHelp(TCK3BetHome),
    TCHappyPokerBetHome:viewRoutHelp(TCHappyPokerBetHome),
    TCXYFTBetHome: viewRoutHelp(TCXYFTBetHome),
    TCBetBill: viewRoutHelp(TCBetBill),
    TCBillSucceedPage:viewRoutHelp(TCBillSucceedPage),
    IntelligenceBet:viewRoutHelp(IntelligenceBet),
    UserTransfer: viewRoutHelp(TCUserTransfer),
    UserOrderType: viewRoutHelp(TCUserOrderType),
    UserOderRecord:viewRoutHelp(UserOderRecord),
    TCLotteryHistory: viewRoutHelp(TCLotteryHistory),
    UserCollects: viewRoutHelp(UserCollects),
    OrderChaseItemList:viewRoutHelp(OrderChaseItemList),
    OrderItemList: viewRoutHelp(OrderItemList),
    UserLogin: viewRoutHelp(UserLogin),
    UserRegister: viewRoutHelp(UserRegister),
    UserRegisterWeb:viewRoutHelp(UserRegisterWeb),
    UserFreePlay: viewRoutHelp(UserFreePlay),
    UserSetting: viewRoutHelp(UserSetting),
    UserProtocol: viewRoutHelp(UserProtocol),
    UserSecurityCenter: viewRoutHelp(UserSecurityCenter),
    UserAccountCenter: viewRoutHelp(UserAccountCenter),
    UserDetailMsg: viewRoutHelp(UserDetailMsg),
    UserWithdraw: viewRoutHelp(UserWithdraw),
    MessageList:viewRoutHelp(MessageList),
    RedPacket: viewRoutHelp(RedPacket),
    RedPacketMine: viewRoutHelp(RedPacketMine),
    RedPacketWinList:viewRoutHelp(RedPacketWinList),
    RedPacketRules: viewRoutHelp(RedPacketRules),
    FeedbackList: viewRoutHelp(FeedbackList),
    UserAcount:viewRoutHelp(UserAcount),
    UserAcountPay: viewRoutHelp(UserAcountPay),
    UserPay: viewRoutHelp(UserPay),
    UserOrderDetail: viewRoutHelp(UserOrderDetail),
    UserAcountDetail: viewRoutHelp(UserAcountDetail),
    UserInfo: viewRoutHelp(UserInfo),
    Feedback: viewRoutHelp(Feedback),
    FeedbackView: viewRoutHelp(FeedbackView),
    UserBankManager: viewRoutHelp(UserBankManager),
    UserForgotPassword: viewRoutHelp(UserForgotPassword),
    ModifyPassword: viewRoutHelp(ModifyPassword),
    ModifySecurityPwd:  viewRoutHelp(ModifySecurityPwd),
    UserMessage:viewRoutHelp(UserMessage),
    UserPayment: viewRoutHelp(UserPayment),
    UserAliAndWechatTransfer:viewRoutHelp(UserAliAndWechatTransfer),
    UserAliAndWechatPay:viewRoutHelp(UserAliAndWechatPay),
    UserBankPayMessage: viewRoutHelp(TCUserBankPayMessageNew),
    UserHTMLPay:viewRoutHelp(UserHTMLPay),
    UserPayProgress:viewRoutHelp(UserPayProgress),
    UserAliPayAndWechatMessage: viewRoutHelp(UserAliPayAndWechatMessage),
    AgentCenter: viewRoutHelp(AgentCenter),
    AgentAddAccount: viewRoutHelp(AgentAddAccount),
    AgentTeamList: viewRoutHelp(AgentTeamList),
    AgentCommissionList:viewRoutHelp(AgentCommissionList),
    AgentSheet: viewRoutHelp(AgentSheet),
    CommissionDetail: viewRoutHelp(CommissionDetail),
    PersonalCommissionDetail: viewRoutHelp(PersonalCommissionDetail),
    InviteFriends: viewRoutHelp(TCInviteFriends),
    WelfareCenter:viewRoutHelp(TCWelfareCenter),
    TCWebTrendView:viewRoutHelp(TCWebTrendView),
}
//为所有组件增加增加routName 配合 JX_Compones  用于 通用 pushtoView 跳转 避免使用纯string
for(let key in Components){
     if(Components[key]){
         Components[key].routName=key
     }
}

global.JX_Compones = Components

const MainStackNavigator = StackNavigator({
    ...Components
}, {
    navigationOptions: {
        header: null
    }
})



export default class Main extends Component {
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Provider  rootStore={rootStore}>
                <MainStackNavigator
                    ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}}
                />
            </Provider>
        )
    }
}
