'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Platform,
    ListView,
    NativeModules,
    ImageBackground
} from 'react-native';

import {observer, inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Moment from 'moment'
import JXHelper from '../../Common/JXHelper/JXHelper'
import SoundHelper from '../../Common/JXHelper/SoundHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RequestUtils from '../../Common/Network/TCRequestUitls'
import {config} from '../../Common/Network/TCRequestConfig'
import UserIcon from '../../Common/View/TCUserIcon'
import {personal} from '../resouce/images'
import {
    indexBgColor,
    userCenterTxtColor,
    userCenterBorderColor,
    Size,
    width,
    height,
    listViewTxtColor,
} from '../resouce/theme'
import {JX_PLAT_INFO, ASSET_Screen} from '../asset'
import SignInModal from './SignIn/TCSignInModal'
import Toast from "../../Common/JXHelper/JXToast";

const USERCENTER_ITEMS = [
    [
        {
            key: "tzjl",
            name: '投注记录',
            description: "查看所参与的游戏记录",
            icon: personal.tzRecord
        },
        {
            key: "ctjl",
            name: '充提记录',
            description: "查看充值提款记录",
            icon: personal.ctRecord
        },
        {
            key: "zbjl",
            name: '账变记录',
            description: "查看账户资金变动记录",
            icon: personal.account
        },
        {
            key: "grbb",
            name: '个人报表',
            description: "查看自己的数据汇总",
            icon: personal.userSheet
        }
    ],
    [
        {
            key: "grxx",
            name: '个人信息',
            description: "查看或编辑个人资料",
            icon: personal.personalInfo
        },
        {
            key: "aqzx",
            name: '安全中心',
            description: "密码与银行卡管理",
            icon: personal.secure
        },
        {
            key: "wdxx",
            name: '我的消息',
            description: "查看系统消息",
            icon: personal.message
        },
        {
            key: "wdsc",
            name: '彩票收藏',
            description: "收藏关注的彩种",
            icon: personal.collect
        }
    ],
    [
        {
            key: "yhgl",
            name: '用户管理',
            description: "对下级成员管理",
            icon: personal.userManager
        },
        {
            key: "dlyj",
            name: '代理佣金',
            description: "查看下级贡献的佣金",
            icon: personal.agentCommission
        },
        {
            key: "tdbb",
            name: '团队报表',
            description: "查看团队的数据汇总",
            icon: personal.teamSheet
        },
        {
            key: "more",
            name: '代理中心',
            description: "代理中心的所有内容",
            icon: personal.more
        }
    ],
    [
        {
            key: "yjfk",
            name: '意见反馈',
            description: "意见提出与查看反馈",
            icon: personal.toolFeedBack
        },
        {
            key: "bzzx",
            name: '在线客服',
            description: "帮助中心",
            icon: personal.onlineServicer
        },
        {
            key: "fxhy",
            name: '分享好友',
            description: "邀请好友，赚取更多收益",
            icon: personal.shareFriends
        },
        {
            key: "flzx",
            name: '福利中心',
            description: "优惠与返利",
            icon: personal.promotions
        }
    ]
]
@inject("mainStore", "userStore")
@observer
export default class TCUserCenterNew extends Component {

    lastRequestTime = 0

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            unreadMessageCnt: TC_NEW_MSG_COUNT > 99 ? 99 : TC_NEW_MSG_COUNT,
            unreadFeedbackCnt: TC_FEEDBACK_COUNT > 99 ? 99 : TC_FEEDBACK_COUNT
        }
    }

    componentDidMount() {
        this.props.userStore.getSignInData()

        this.listener2 = RCTDeviceEventEmitter.addListener('userStateChange', (state) => {
            if (state === 'login') {
                this.props.userStore.getSignInData()
            }
        })

        this.listener3 = RCTDeviceEventEmitter.addListener('jx_app_active', () => {
            if (this.props.userStore.isLogin) {
                this.props.userStore.getSignInData()
            }
        })

        this.listener4 = RCTDeviceEventEmitter.addListener('unreadMessage', () => {
            console.log('UserCenter#unreadMessage() TC_NEW_MSG_COUNT=' + TC_NEW_MSG_COUNT + '; TC_FEEDBACK_COUNT=' + TC_FEEDBACK_COUNT)
            if (this.state.unreadMessageCnt !== TC_NEW_MSG_COUNT) {
                console.log('unread message count update. before count:' + this.state.unreadMessageCnt + ', current count:' + TC_NEW_MSG_COUNT)
                this.setState({unreadMessageCnt: TC_NEW_MSG_COUNT})
            }
            if (this.state.unreadFeedbackCnt !== TC_FEEDBACK_COUNT) {
                console.log('unread feedback count update. before count:' + this.state.unreadFeedbackCnt + ', current count:' + TC_FEEDBACK_COUNT)
                this.setState({unreadFeedbackCnt: TC_FEEDBACK_COUNT})
            }
        })
    }

    componentWillUnmount() {
        this.listener2 && this.listener2.remove()
        this.listener3 && this.listener3.remove()
        this.listener4 && this.listener4.remove()
    }

    render() {
        return (
            <View style={JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container}>
                <ScrollView bounces={false}>
                    <View>
                        <ImageBackground source={personal.userCenterBg} style={styles.imgTop}>
                            <View style={{flexDirection: 'row'}}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: Platform.OS === 'ios' ? 40 : 20,
                                        alignItems: 'center'
                                    }}>
                                    <TouchableOpacity onPress={() => this.gotoUserDetail()}>
                                        <UserIcon text={JXHelper.getUserIconShowName(this.userName)}
                                                  bgColor={this.props.userStore.userLogoColor}/>
                                    </TouchableOpacity>
                                    <View style={styles.userTitle}>
                                        <Text style={styles.userName}>{this.userName}</Text>
                                        {this.getSignButton()}
                                    </View>
                                    {this.showSignInModal()}
                                </View>
                                <View style={{position: 'absolute', top: Platform.OS === 'ios' ? 25 : 5, right: 5}}>
                                    <TouchableOpacity onPress={() => {
                                        if (TC_BUTTON_SOUND_STATUS) {
                                            SoundHelper.playSoundBundle();
                                        }
                                        NavigatorHelper.gotoSetting();
                                    }}>
                                        <Image source={personal.imgSet}
                                               style={{width: 24, height: 24, marginTop: 10, marginRight: 10}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.getSignInLabel()}
                        </ImageBackground>
                    </View>
                    <View style={{backgroundColor: indexBgColor.itemBg}}>
                        <MoneyLabel/>
                        <View style={styles.userPay}>
                            <TouchableOpacity onPress={() => {
                                this.gotoPay()
                            }}>
                                <View style={styles.payItem}>
                                    <Image source={personal.iconPay} style={styles.imgPay}/>
                                    <Text style={styles.payTxt}>充值</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{width: 1, height: 40, backgroundColor: indexBgColor.mainBg}}/>
                            <TouchableOpacity onPress={() => {
                                this.gotoWithdraw()
                            }}>
                                <View style={styles.payItem}>
                                    <Image source={personal.iconDraw} style={styles.imgOut}/>
                                    <Text style={[styles.payTxt, {color: userCenterTxtColor.withdraw}]}>提款</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{width: 1, height: 40, backgroundColor: indexBgColor.mainBg}}/>
                            <TouchableOpacity onPress={() => {
                                this.goTransfer()
                            }}>
                                <View style={styles.payItem}>
                                    <Image source={personal.iconTransfer} style={styles.imgOut}/>
                                    <Text style={[styles.payTxt, {color: userCenterTxtColor.withdraw}]}>转账</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ListView
                        contentContainerStyle={styles.listViewStyle}
                        horizontal={false}
                        removeClippedSubviews={false}
                        keyboardShouldPersistTaps={"always"}
                        dataSource={this.ds.cloneWithRowsAndSections(USERCENTER_ITEMS)}
                        renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                        renderSectionHeader={(sectionData, sectionId) => this._renderHeader(sectionData, sectionId)}
                        initialListSize={15}
                    />
                </ScrollView>
            </View>
        );
    };

    @computed get userName() {
        return this.props.userStore.userName;
    }

    @computed get keepSignInDays() {
        return this.props.userStore.keepSignInDays;
    }

    @computed get isSigned() {
        return this.props.userStore.isSigned;
    }

    @computed get isAgent() {
        return this.props.userStore.isAgent;
    }

    @computed get newMsgCount() {
        return this.props.userStore.newMsgCount;
    }

    @computed get newFeedbackCount() {
        return this.props.userStore.newFeedBackCount;
    }


    // 签到按钮
    getSignButton() {
        if (this.isSigned) {
            return (
                <View style={{
                    backgroundColor: userCenterTxtColor.signInBgColor,
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    borderWidth: TCLineW,
                    width: 120,
                    padding: 5,
                    borderRadius: 8,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: 'white', fontSize: Size.font15}}>{'已签到'}</Text>
                </View>

            )
        } else {
            return (<TouchableOpacity onPress={() => {
                this.props.userStore.singIn((res) => {
                    if (res.status) {
                        this.refs['SignInModal']._setModalVisible(true)
                    } else {
                        Toast.showShortCenter(res.message);
                    }
                })
            }}>
                <View style={{
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    borderWidth: TCLineW,
                    width: 120,
                    padding: 5,
                    borderRadius: 8,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: 'white', fontSize: Size.font15}}>{'今日签到'}</Text>
                </View>
            </TouchableOpacity>)
        }
    }

    getSignInLabel() {
        return (<Text style={{
            backgroundColor: 'transparent',
            width: width,
            textAlign: 'center',
            color: 'white',
            marginTop: 20,
            fontSize: Size.font14
        }}>您已连续签到{this.keepSignInDays}天 小投注大梦想</Text>)
    }

    // 签到modal
    showSignInModal() {
        return <SignInModal ref={'SignInModal'} data={this.props.userStore}/>
    }


    renderRow(rowData, sectionID, rowID) {
        if (sectionID === '2' && !this.isAgent) {
            return null;
        }
        if (rowData.key === "wdxx" || rowData.key === "yjfk") {
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => {
                    this.gotoPage(rowData.key)
                }}>
                    <View style={styles.itemView}>
                        <Image source={rowData.icon} style={styles.img}/>
                        <View style={styles.itemTxtView}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.mySettingLeftTxtStyle}>{rowData.name}</Text>
                                {this.getStatusTip(rowData.key === "wdxx" ? this.newMsgCount : this.newFeedbackCount)}
                            </View>
                            <Text style={styles.contentTxtStyle}>{rowData.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        let tempComponent = []
        if (rowData.key === 'yhgl') {
            tempComponent.push(
                <View style={{
                    width: width,
                    height: 35,
                    backgroundColor: '#FFF7EF',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15
                }}>
                    <View style={styles.emptyCircle}>
                        <Text style={{fontSize: Size.font10, textAlign: 'center', color: '#FF5A3F'}}>!</Text>
                    </View>
                    <Text style={{fontSize: Size.font13, color: userCenterTxtColor.menuItemTitle}}>注意：代理仅适用于彩票游戏</Text>
                </View>
            )
        }
        tempComponent.push(
            <TouchableOpacity style={styles.itemContainer} onPress={() => {
                this.gotoPage(rowData.key)
            }}>
                <View style={styles.itemView}>
                    <View style={{width: 1, height: 40, backgroundColor: indexBgColor.mainBg}}/>
                    <Image source={rowData.icon} style={styles.img}/>
                    <View style={styles.itemTxtView}>
                        <Text style={styles.mySettingLeftTxtStyle}>{rowData.name}</Text>
                        <Text style={styles.contentTxtStyle}>{rowData.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return tempComponent
    }

    _renderHeader(sectionData, sectionId) {
        if (sectionId === '2' && !this.isAgent) {
            return null;
        }
        return (<View style={{height: 5, width: width}}></View>)
    }

    // 获取红点提示
    getStatusTip(count) {
        count = count > 99 ? 99 : count;
        if (count === 0) {
            return null
        } else {
            return (<View style={styles.pointStyle}><Text style={styles.pointTxt}>{count}</Text></View>)
        }
    }

    /**
     * 根据key跳转到相应页面
     * @param key
     */
    gotoPage(key) {
        switch (key) {
            case 'tzjl':
                let otherPlatform = JXHelper.getDSFOpenList().dsfAll;
                if (otherPlatform && otherPlatform.length > 0) {
                    NavigatorHelper.pushToOrderType()
                } else {
                    NavigatorHelper.pushToOrderRecord(0)
                }
                break;
            case 'ctjl':
                NavigatorHelper.pushToUserAccountCenter()
                break;
            case 'zbjl':
                NavigatorHelper.pushToUserAccount(0)
                break;
            case 'grbb':
                otherPlatform = JXHelper.getDSFOpenList().dsfAll;
                if (otherPlatform && otherPlatform.length > 0) {
                    NavigatorHelper.pushToUserStatementsType()
                } else {
                    NavigatorHelper.pushToUserSheet(true)
                }
                break;
            case 'cwdl':
                NavigatorHelper.pushToAgentInroduce();
                break;
            case 'grxx':
                NavigatorHelper.pushToUserDetail();
                break;
            case 'aqzx':
                NavigatorHelper.pushToUserSecurityCenter();
                break;
            case 'wdxx':
                NavigatorHelper.pushToMessagelist();
                break;
            case 'wdsc':
                NavigatorHelper.pushToUserCollect();
                break;
            case 'yhgl':
                NavigatorHelper.pushToUserTeamManager();
                break;
            case 'dlyj':
                NavigatorHelper.pushToAgentCommission();
                break;
            case 'tdbb':
                NavigatorHelper.pushToUserSheet();
                break;
            case 'more':
                NavigatorHelper.pushToAgentCenter();
                break;
            case 'yjfk':
                NavigatorHelper.pushToFeedBack();
                break;
            case 'bzzx':
                this.gotoOnlineService()
                break;
            case 'fxhy':
                NavigatorHelper.pushToInviteFriends()
                break;
            case 'flzx':
                NavigatorHelper.pushToWelfareCenter()
                break;
        }
    }

    // 跳转到充值界面
    gotoPay() {
        NavigatorHelper.pushToPay()
    }

    // 跳转到用户详情界面
    gotoUserDetail() {
        NavigatorHelper.pushToUserDetail();
    }

    // 跳转到取款界面
    gotoWithdraw() {
        NavigatorHelper.pushToWithdraw()
    }

    // 跳转到转账页面
    goTransfer() {
        NavigatorHelper.pushToUserTransfer()
    }

    gotoOnlineService() {
        if (Platform.OS === 'ios') {
            NavigatorHelper.pushToWebView(JXHelper.getMenuIconsUrl('CUS_SERVICE'), '在线客服');
        } else {
            try {
                NativeModules.JXHelper.openWebViewFromJs(JXHelper.getMenuIconsUrl('CUS_SERVICE'));
            } catch (e) {
                NavigatorHelper.pushToWebView(JXHelper.getMenuIconsUrl('CUS_SERVICE'), '在线客服');
            }
        }
    }
}

@inject("userStore")
@observer
class MoneyLabel extends Component {

    render() {
        return (
            <View style={styles.account}>
                <View style={styles.accountData}>
                    <Text style={{fontSize: Size.font16, color: userCenterTxtColor.balanceTitle}}>余额:</Text>
                    <Text
                        style={styles.accountTxt}>{this.props.userStore.moneyIsVisable ? this.props.userStore.balance : '******'}</Text>
                    <TouchableOpacity onPress={() => {
                        this.props.userStore.changeMoneyIsVisable()
                    }}>
                        <Image
                            source={this.props.userStore.moneyIsVisable ? personal.imgEye : personal.imgEye2}
                            style={styles.imgAccount} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', width: width * 0.4, justifyContent: 'flex-end', paddingRight: 10}}>
                    <TouchableOpacity style={styles.accountDetail} onPress={() => {
                        NavigatorHelper.pushToWallet()
                    }}>
                        <View style={styles.walletDetailView}>
                            <Text style={[styles.accountDetailTxt, {color: 'white'}]}>钱包详情</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.accountDetail} onPress={() => {
                        this.props.userStore.freshBalance(true)
                    }}>
                        <View style={styles.freshView}>
                            <Text style={styles.accountDetailTxt}>刷新余额</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class StateModel {
    @observable
    isSee = true
    @observable
    balance = TCUSER_BALANCE

    /**
     * 显示或隐藏金额
     */
    @action
    setMoneyVisible() {
        this.isSee = !this.isSee
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    containerIOS: {
        height: height - ASSET_Screen.bottomNavHeight,
        width: width,
        backgroundColor: indexBgColor.mainBg
    },
    imgTop: {
        width: width,
        height: Platform.OS == 'ios' ? 145 : 135
    },
    imgSet: {
        width: 50,
        height: 50,
    },
    imgUser: {
        width: 50,
        height: 50,
        marginLeft: 30,
    },
    userTitle: {
        marginLeft: 20,
        backgroundColor: 'transparent',
        width: width * 0.7,
    },
    userTxt: {
        color: '#dddddd'
    },
    userDes: {
        flexDirection: 'row',
        marginTop: 5
    },
    userName: {
        color: userCenterTxtColor.userName,
        fontSize: Size.font20,
        fontWeight: 'bold',
    },
    imgAccount: {
        width: 25,
        height: 15,
        marginLeft: 5,
    },
    imgRight: {
        width: 25,
        height: 25
    },
    imgPay: {
        width: 35,
        height: 30
    },
    imgOut: {
        width: 35,
        height: 30
    },
    account: {
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg
    },
    accountData: {
        width: width * 0.6,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    accountTxt: {
        fontSize: Size.font20,
        color: userCenterTxtColor.balance,
        paddingLeft: 5,
        textAlign: 'right'
    },
    accountDetailTxt: {
        fontSize: Size.small,
        color: userCenterTxtColor.fresh
    },
    walletDetailView: {
        width: 75,
        height: 33,
        borderRadius: 4,
        backgroundColor: '#FF735D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    freshView: {
        width: 75,
        height: 33,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: userCenterBorderColor.freshBorder,
        alignItems: 'center',
        justifyContent: 'center'
    },
    accountDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 10
    },
    userPay: {
        height: height * 0.1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    payTxt: {
        color: userCenterTxtColor.charge,
        fontSize: Size.xlarge,
        marginLeft: 10
    },
    payItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }, img: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
    mySettingLeftTxtStyle: {
        fontSize: Size.default,
        color: userCenterTxtColor.menuItemTitle
    },
    pointStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginLeft: 6,
        backgroundColor: userCenterTxtColor.msgPiontBg,
        alignItems: 'center',
        justifyContent: 'center'
    }, pointTxt: {
        color: userCenterTxtColor.msgPiontTxt,
        fontSize: Size.font10
    }, itemView: {
        flexDirection: 'row',
        alignItems: 'center',
    }, itemContainer: {
        width: width * 0.5 - 0.5,
        height: 60,
        justifyContent: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 0.5,
    }, listItemView: {
        flexDirection: 'row',
    }, contentTxtStyle: {
        fontSize: Size.font10,
        color: listViewTxtColor.content
    }, listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width
    }, itemTxtView: {
        marginLeft: 10,
    }, emptyCircle: {
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 14,
        height: 14,
        borderColor: '#FF5A3F',
        borderStyle: 'solid',
        borderRadius: 7,
        borderWidth: 1
    }
})
