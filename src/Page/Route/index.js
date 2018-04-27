import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';
import React, {Component} from 'react';
import Helper from "../../Common/JXHelper/JXHelper"
import {Provider} from 'mobx-react'


import NavigationService from './NavigationService'

//首页
import MainScreen from '../Main/TCMain'
import WebView from '../WebView/TCWebView'
import TCNoticeDetail from '../Home/View/TCNoticeDetail'
import TCTopWinnerDetail from '../Home/View/TCTopWinnerDetail'
import TCPromotionList from  '../Home/View/TCPromotionList'
import PCDDShopping from '../../Page/ShoppingLobby/TCPCDDShopingLobby'

//彩票下注界面
import MarkSixBetHome from '../../Page/Bet/AllPlayingMethodView/MarkSix/TCMarkSixBetHome'
// import ChongQingSSCBetHome from '../../Page/Bet/AllPlayingMethodView/ChongQingSSC/TCChongQingSSCBetHome';
// import TCBJPK10BetHome from '../../Page/Bet/AllPlayingMethodView/BJPK10/TCBJPK10BetHome'
// import TCKL10FBetHome from '../../Page/Bet/AllPlayingMethodView/KL10F/TCKL10FBetHome'
// import TCShangDong115BetHome from '../../Page/Bet/AllPlayingMethodView/ShangDong_11_5/TCShangDong115BetHome'
// import TCPCDDBetHome from '../../Page/Bet/AllPlayingMethodView/PCDD/TCPCDDBetHome'
// import TCSSLBetHome from '../../Page/Bet/AllPlayingMethodView/SSL/TCSSLBetHome'
// import QXCBetHome from '../../Page/Bet/AllPlayingMethodView/QXC/QXCBetHome'
// import TCK3BetHome from '../../Page/Bet/AllPlayingMethodView/K3/TCK3BetHome'
// import TCHappyPokerBetHome from '../../Page/Bet/AllPlayingMethodView/HappyPoker/TCHappyPokerBetHome'
// import TCXYFTBetHome from '../../Page/Bet/AllPlayingMethodView/XYFT/TCXYFTBetHome'

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
import  UserAccountCenter from '../../Page/UserCenter/UserAccount/TCUserAccountCenter'
import UserDetailMsg from '../../Page/UserCenter/UserInfo/TCUserDetailMsg'
import UserWithdraw from '../../Page/UserCenter/UserWithdraw/TCUserWithdraw'
import  MessageList from '../../Page/UserCenter/UserMessage/TCUserMessagePage'
import UserInfo from '../../Page/UserCenter/UserInfo/TCAddUserInfo'
import  FeedbackList from '../../Page/UserCenter/FeedBack/TCUserFeedbackList'
import UserAcount from '../../Page/UserCenter/UserAccount/TCUserAccountDetails'
import UserAcountDetail from '../../Page/UserCenter/UserAccount/TCUserAccountBillingDetails'
import Feedback from '../../Page/UserCenter/FeedBack/TCUserFeedback';
import FeedbackView from '../../Page/UserCenter/FeedBack/TCUserFeedbackView';
import UserBankManager from '../../Page/UserCenter/UserBank/TCUserBankManager'
import UserForgotPassword from '../../Page/UserCenter/UserInfo/TCForgotPassword'
import ModifyPassword from '../../Page/UserCenter/UserInfo/TCModifyPassword'
import ModifySecurityPwd from '../../Page/UserCenter/UserInfo/TCModifySecurityPwd'
import UserMessage from '../../Page/UserCenter/UserInfo/TCUserMessage'
import UserAcountPay from '../../Page/UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain'
import UserPay from  '../../Page/UserCenter/UserPay/TCUserPayType'
import UserPayment from  '../../Page/UserCenter/UserPay/TCUserPayNew'
import UserAliAndWechatTransfer from  '../../Page/UserCenter/UserPay/TCUserAliAndWechatTransfer'
import UserAliAndWechatPay from  '../../Page/UserCenter/UserPay/TCUserAliAndWechatPay'
import UserBankPayMessage from  '../../Page/UserCenter/UserPay/TCUserBankPayMessage'
import UserHTMLPay from  '../../Page/UserCenter/UserPay/TCUserHTMLPay'
import UserPayProgress from  '../../Page/UserCenter/UserPay/TCUserPayProgress'
import UserAliPayAndWechatMessage from  '../../Page/UserCenter/UserPay/TCUserAliPayAndWechatMessage'

//代理中心
import AgentCenter from '../../Page/UserCenter/Agent/AgentCenter/TCAgentCenter'
import AgentAddAccount from '../../Page/UserCenter/Agent/TCAgentAddAccount'
import AgentTeamList from '../../Page/UserCenter/Agent/Team/TCAgentTeamManager'
import AgentCommissionList from '../../Page/UserCenter/Agent/Commission/TCAgentCommissionList'
import AgentSheet from '../../Page/UserCenter/Agent/UserSheets/TCAgentSheets'
import CommissionDetail from '../../Page/UserCenter/Agent/Commission/TCAgentCommissionDetail'
import PersonalCommissionDetail from '../../Page/UserCenter/Agent/Commission/TCPersonalCommissionDetail'


const Components = {
    Main: {screen: MainScreen},
    WebView: {screen: WebView},
    TCNoticeDetail: {screen: TCNoticeDetail},
    TCTopWinnerDetail: {screen: TCTopWinnerDetail},
    TCPromotionList: {screen: TCPromotionList},
    PCDDShopping: {screen: PCDDShopping},
    MarkSixBetHome: {screen: MarkSixBetHome},
    // ChongQingSSCBetHome: {screen: ChongQingSSCBetHome},
    // TCShangDong115BetHome: {screen: TCShangDong115BetHome},
    // TCBJPK10BetHome: {screen: TCBJPK10BetHome},
    // TCKL10FBetHome: {screen: TCKL10FBetHome},
    // TCPCDDBetHome: {screen: TCPCDDBetHome},
    // TCSSLBetHome: {screen: TCSSLBetHome},
    // QXCBetHome: {screen: QXCBetHome},
    // TCK3BetHome: {screen: TCK3BetHome},
    // TCHappyPokerBetHome: {screen: TCHappyPokerBetHome},
    // TCXYFTBetHome: {screen: TCXYFTBetHome},
    TCBetBill: {screen: TCBetBill},
    TCBillSucceedPage: {screen: TCBillSucceedPage},
    IntelligenceBet: {screen: IntelligenceBet},
    UserOderRecord: {screen: UserOderRecord},
    TCLotteryHistory: {screen: TCLotteryHistory},
    UserCollects: {screen: UserCollects},
    OrderChaseItemList: {screen: OrderChaseItemList},
    OrderItemList: {screen: OrderItemList},
    UserLogin: {screen: UserLogin},
    UserRegister: {screen: UserRegister},
    UserRegisterWeb: {screen: UserRegisterWeb},
    UserFreePlay: {screen: UserFreePlay},
    UserSetting: {screen: UserSetting},
    UserProtocol: {screen: UserProtocol},
    UserSecurityCenter: {screen: UserSecurityCenter},
    UserAccountCenter: {screen: UserAccountCenter},
    UserDetailMsg: {screen: UserDetailMsg},
    UserWithdraw: {screen: UserWithdraw},
    MessageList: {screen: MessageList},
    RedPacket: {screen: RedPacket},
    RedPacketMine: {screen: RedPacketMine},
    RedPacketWinList: {screen: RedPacketWinList},
    RedPacketRules: {screen: RedPacketRules},
    FeedbackList: {screen: FeedbackList},
    UserAcount: {screen: UserAcount},
    UserAcountPay: {screen: UserAcountPay},
    UserPay: {screen: UserPay},
    UserOrderDetail: {screen: UserOrderDetail},
    UserAcountDetail: {screen: UserAcountDetail},
    UserInfo: {screen: UserInfo},
    Feedback: {screen: Feedback},
    FeedbackView: {screen: FeedbackView},
    UserBankManager: {screen: UserBankManager},
    UserForgotPassword: {screen: UserForgotPassword},
    ModifyPassword: {screen: ModifyPassword},
    ModifySecurityPwd: {screen: ModifySecurityPwd},
    UserMessage: {screen: UserMessage},
    UserPayment: {screen: UserPayment},
    UserAliAndWechatTransfer: {screen: UserAliAndWechatTransfer},
    UserAliAndWechatPay: {screen: UserAliAndWechatPay},
    UserBankPayMessage: {screen: UserBankPayMessage},
    UserHTMLPay: {screen: UserHTMLPay},
    UserPayProgress: {screen: UserPayProgress},
    UserAliPayAndWechatMessage: {screen: UserAliPayAndWechatMessage},
    AgentCenter: {screen: AgentCenter},
    AgentAddAccount: {screen: AgentAddAccount},
    AgentTeamList: {screen: AgentTeamList},
    AgentCommissionList: {screen: AgentCommissionList},
    AgentSheet: {screen: AgentSheet},
    CommissionDetail: {screen: CommissionDetail},
    PersonalCommissionDetail: {screen: PersonalCommissionDetail},
}

const MainStackNavigator = StackNavigator({
    ...Components
}, {
    navigationOptions: {
        header: null
    }
})

export default class Main extends Component {
    render() {
        return (
            <MainStackNavigator
                ref={
                    navigatiorRef => {
                        NavigationService.setTopLevelNavigator(navigatiorRef)
                    }
                }
            />
        )
    }
}