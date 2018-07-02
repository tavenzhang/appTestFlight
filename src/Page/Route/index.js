import {TabNavigator , StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {UIManager, StatusBar, View} from 'react-native';
import {Provider} from 'mobx-react'

import NavigationService from './NavigationService'
// 主页
import Home from '../Home/TCHome';
import ShopingLobby from '../ShoppingLobby/TCShopingLobby';
import LotteryLobby from '../LotteryLobby/TCLotteryLobby';
import WelfareCenter from '../UserCenter/welfare/TCWelfareCenter';
import UserCenter from '../UserCenter/TCUserCenterNew';
//首页
import MainScreen from '../Main/TCMain'
import WebView from '../WebView/TCWebView'
import TCNoticeDetail from '../Home/View/TCNoticeDetail'
import TCTopWinnerDetail from '../Home/View/TCTopWinnerDetail'
import TCPromotionList from '../Home/View/TCPromotionList'
import PCDDShopping from '../../Page/ShoppingLobby/TCPCDDShopingLobby'
//彩票下注界面
import MarkSixBetHome from '../../Page/Bet/AllPlayingMethodView/MarkSix/TCMarkSixBetHome'
import ChongQingSSCBetHome
    from '../../Page/Bet/AllPlayingMethodView/ChongQingSSC/TCChongQingSSCBetHome';
import TCBJPK10BetHome from '../../Page/Bet/AllPlayingMethodView/BJPK10/TCBJPK10BetHome'
import TCKL10FBetHome from '../../Page/Bet/AllPlayingMethodView/KL10F/TCKL10FBetHome'
import TCShangDong115BetHome
    from '../../Page/Bet/AllPlayingMethodView/ShangDong_11_5/TCShangDong115BetHome'
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
import WorldCup from '../../Page/WorldCup/JXWorldCup'

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
import UserTransferDetails from '../../Page/UserCenter/UserAccount/TCUserTransferDetails'
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
import PersonalCommissionDetail
    from '../../Page/UserCenter/Agent/Commission/TCPersonalCommissionDetail'
import TCUserBankPayMessageNew from "../UserCenter/UserPay/TCUserBankPayMessageNew";
import TCInviteFriends from "../UserCenter/share/TCInviteFriends";
import TCWelfareCenter from "../UserCenter/welfare/TCWelfareCenter";
import TCWallet from "../UserCenter/wallet";
import TCUserOrderType from "../UserCenter/UserOrder/TCUserOrderType";
import TCUserTransfer from "../UserCenter/transfer/TCUserTransfer";
//趋势图webView
import TCWebTrendView from "../WebView/TCWebTrendView";


import jdAppStore from '../../Data/store/JDAppStore'
import mainStore from '../../Data/store/MainStore'
import initAppStore from '../../Data/store/InitAppStore'
import userStore from '../../Data/store/UserStore'


const appStores = {
    jdAppStore,
    mainStore,
    initAppStore,
    userStore
}

import TCUserOtherBetRecords from "../UserCenter/UserOrder/TCUserOtherBetRecords";
//电子游戏列表
import DZGameListView from "../game/DZGameListView";
//用于体育与电子游戏的专属webView
import TCWebGameView from "../WebView/TCWebGameView";
import TCUserIMBetDetail from "../UserCenter/UserOrder/TCUserIMBetDetail";
import TCUserSSBetDetail from "../UserCenter/UserOrder/TCUserSSBetDetail";
import TCUserMGBetDetail from "../UserCenter/UserOrder/TCUserMGBetDetail";
//个人报表
import TCUserStatementsType from "../UserCenter/Agent/UserSheets/TCUserStatementsType";
import TCUserStatements from "../UserCenter/Agent/UserSheets/TCUserStatements";

import TabBarIcon from "../../Common/View/widget/TabBarIcon";
import {home} from "../resouce/images";
import {indexBgColor, indexTxtColor} from "../resouce/theme";
//vip 奖励
import TCVipAwardView from "../UserCenter/vip/TCVipAwardView";


//用于增加通用navigator view 属性 特殊 处理
function viewRoutHelp(component) {
    return {screen: component}
}

const Components = {
    Main: viewRoutHelp(MainScreen),
    WebView: viewRoutHelp(WebView),
    TCNoticeDetail: viewRoutHelp(TCNoticeDetail),
    TCTopWinnerDetail: viewRoutHelp(TCTopWinnerDetail),
    TCPromotionList: viewRoutHelp(TCPromotionList),
    PCDDShopping: viewRoutHelp(PCDDShopping),
    MarkSixBetHome: viewRoutHelp(MarkSixBetHome),
    ChongQingSSCBetHome: viewRoutHelp(ChongQingSSCBetHome),
    TCShangDong115BetHome: viewRoutHelp(TCShangDong115BetHome),
    TCBJPK10BetHome: viewRoutHelp(TCBJPK10BetHome),
    TCKL10FBetHome: viewRoutHelp(TCKL10FBetHome),
    TCPCDDBetHome: viewRoutHelp(TCPCDDBetHome),
    TCSSLBetHome: viewRoutHelp(TCSSLBetHome),
    QXCBetHome: viewRoutHelp(QXCBetHome),
    TCK3BetHome: viewRoutHelp(TCK3BetHome),
    TCHappyPokerBetHome: viewRoutHelp(TCHappyPokerBetHome),
    TCXYFTBetHome: viewRoutHelp(TCXYFTBetHome),
    TCBetBill: viewRoutHelp(TCBetBill),
    TCBillSucceedPage: viewRoutHelp(TCBillSucceedPage),
    IntelligenceBet: viewRoutHelp(IntelligenceBet),
    UserTransfer: viewRoutHelp(TCUserTransfer),
    UserOrderType: viewRoutHelp(TCUserOrderType),
    UserOderRecord: viewRoutHelp(UserOderRecord),
    UserIMBetDetail: viewRoutHelp(TCUserIMBetDetail),
    UserSSBetDetail: viewRoutHelp(TCUserSSBetDetail),
    UserMGBetDetail: viewRoutHelp(TCUserMGBetDetail),
    UserOtherBetRecords: viewRoutHelp(TCUserOtherBetRecords),
    TCLotteryHistory: viewRoutHelp(TCLotteryHistory),
    UserCollects: viewRoutHelp(UserCollects),
    OrderChaseItemList: viewRoutHelp(OrderChaseItemList),
    OrderItemList: viewRoutHelp(OrderItemList),
    UserLogin: viewRoutHelp(UserLogin),
    UserRegister: viewRoutHelp(UserRegister),
    UserRegisterWeb: viewRoutHelp(UserRegisterWeb),
    UserFreePlay: viewRoutHelp(UserFreePlay),
    UserSetting: viewRoutHelp(UserSetting),
    UserProtocol: viewRoutHelp(UserProtocol),
    UserSecurityCenter: viewRoutHelp(UserSecurityCenter),
    UserAccountCenter: viewRoutHelp(UserAccountCenter),
    UserDetailMsg: viewRoutHelp(UserDetailMsg),
    UserWithdraw: viewRoutHelp(UserWithdraw),
    MessageList: viewRoutHelp(MessageList),
    RedPacket: viewRoutHelp(RedPacket),
    RedPacketMine: viewRoutHelp(RedPacketMine),
    RedPacketWinList: viewRoutHelp(RedPacketWinList),
    RedPacketRules: viewRoutHelp(RedPacketRules),
    FeedbackList: viewRoutHelp(FeedbackList),
    UserAcount: viewRoutHelp(UserAcount),
    UserAcountPay: viewRoutHelp(UserAcountPay),
    UserPay: viewRoutHelp(UserPay),
    UserOrderDetail: viewRoutHelp(UserOrderDetail),
    UserAcountDetail: viewRoutHelp(UserAcountDetail),
    UserTransferDetails: viewRoutHelp(UserTransferDetails),
    UserInfo: viewRoutHelp(UserInfo),
    Feedback: viewRoutHelp(Feedback),
    FeedbackView: viewRoutHelp(FeedbackView),
    UserBankManager: viewRoutHelp(UserBankManager),
    UserForgotPassword: viewRoutHelp(UserForgotPassword),
    ModifyPassword: viewRoutHelp(ModifyPassword),
    ModifySecurityPwd: viewRoutHelp(ModifySecurityPwd),
    UserMessage: viewRoutHelp(UserMessage),
    UserPayment: viewRoutHelp(UserPayment),
    UserAliAndWechatTransfer: viewRoutHelp(UserAliAndWechatTransfer),
    UserAliAndWechatPay: viewRoutHelp(UserAliAndWechatPay),
    UserBankPayMessage: viewRoutHelp(TCUserBankPayMessageNew),
    UserHTMLPay: viewRoutHelp(UserHTMLPay),
    UserPayProgress: viewRoutHelp(UserPayProgress),
    UserAliPayAndWechatMessage: viewRoutHelp(UserAliPayAndWechatMessage),
    AgentCenter: viewRoutHelp(AgentCenter),
    AgentAddAccount: viewRoutHelp(AgentAddAccount),
    AgentTeamList: viewRoutHelp(AgentTeamList),
    AgentCommissionList: viewRoutHelp(AgentCommissionList),
    AgentSheet: viewRoutHelp(AgentSheet),
    UserStatementsType: viewRoutHelp(TCUserStatementsType),
    UserStatements: viewRoutHelp(TCUserStatements),
    CommissionDetail: viewRoutHelp(CommissionDetail),
    PersonalCommissionDetail: viewRoutHelp(PersonalCommissionDetail),
    InviteFriends: viewRoutHelp(TCInviteFriends),
    WelfareCenter: viewRoutHelp(TCWelfareCenter),
    TCWebTrendView: viewRoutHelp(TCWebTrendView),
    Wallet: viewRoutHelp(TCWallet),
    DZGameListView: viewRoutHelp(DZGameListView),
    TCWebGameView: viewRoutHelp(TCWebGameView),
    WorldCup:viewRoutHelp(WorldCup),
    TCVipAwardView:viewRoutHelp(TCVipAwardView)
}
//为所有组件增加增加routName 配合 JX_Compones  用于 通用 pushtoView 跳转 避免使用纯string
for (let key in Components) {
    if (Components[key]) {
        Components[key].routName = key
    }
}

global.JX_Compones = Components

const MainTabNavigator = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarIcon tintColor={tintColor} focused={focused}
                            normalIcon={home.indexHomeNormal}
                            pressedIcon={home.indexHomePressed}/>
            ),
            tabBarOnPress: ({navigation}) => {
                navigation.navigate('Home')
            }
        }
    },
    ShopingLobby: {
        screen: ShopingLobby,
        navigationOptions: {
            tabBarLabel: '购彩',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarIcon tintColor={tintColor} focused={focused}
                            normalIcon={home.indexShoppingNormal}
                            pressedIcon={home.indexShoppingPressed}/>
            ),
            tabBarOnPress: ({navigation}) => {
                navigation.navigate('ShopingLobby')
            }
        }
    },
    LotteryLobby: {
        screen: LotteryLobby,
        navigationOptions: {
            tabBarLabel: '开奖',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarIcon tintColor={tintColor} focused={focused}
                            normalIcon={home.indexLotteryNormal}
                            pressedIcon={home.indexLotteryPressed}/>
            ),
            tabBarOnPress: ({navigation}) => {
                navigation.navigate('LotteryLobby')
            }
        }
    },
    WelfareCenter: {
        screen: WelfareCenter,
        navigationOptions: {
            tabBarLabel: '福利',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarIcon tintColor={tintColor} focused={focused}
                            normalIcon={home.indexPromotionNormal}
                            pressedIcon={home.indexPromotionPressed}/>
            ),
            tabBarOnPress: ({navigation}) => {
                navigation.navigate('WelfareCenter')
            }
        }
    },
    UserCenter: {
        screen: UserCenter,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarIcon tintColor={tintColor} focused={focused}
                            normalIcon={home.indexMineNormal}
                            pressedIcon={home.indexMinePressed}/>
            ),
            tabBarOnPress: ({navigation}) => {
                navigation.navigate('UserCenter')
            }
        }
    },
}, {
    navigationOptions: {
        gesturesEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        backBehavior: 'none', // 按back键是否跳转到第一个Tab，none为不跳转
        tabBarOptions: {
            activeTintColor: indexTxtColor.bottomMenuTitlePressed,
            inactiveTintColor: indexTxtColor.bottomMenuTitleNormal,
            showIcon: true,
            style: {
                backgroundColor: indexBgColor.tabBg, // TabBar背景色
                paddingBottom: 0,
            },
            labelStyle: {
                fontSize: 14 // label字体大小
            },
            indicatorStyle: {
                height: 0
            }
        },
    }
})

const MainStackNavigator = StackNavigator({
    ...Components
}, {
    navigationOptions: {
        header: null
    }
})

export default class Main extends Component {

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Provider  {...appStores}>
                <View style={{flex: 1}}>
                    <StatusBar
                        hidden={false}
                        animated={true}
                        translucent={true}
                        backgroundColor={'transparent'}
                        barStyle="light-content"/>
                    <MainStackNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                        }}
                    />
                </View>
            </Provider>
        )
    }
}
