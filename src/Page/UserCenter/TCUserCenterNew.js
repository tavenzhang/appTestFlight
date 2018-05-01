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

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Moment from 'moment'
import JXHelper from '../../Common/JXHelper/JXHelper'
import InitHelper from '../../Common/JXHelper/TCInitHelper'
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
    baseColor,
    listViewTxtColor
} from '../resouce/theme'
import SignInModal from './SignIn/TCSignInModal'
import userCenterData from './TCUserCenterData'

let helper = new InitHelper()

const USERCENTER_ITEMS =
    [[{
        key: "tzjl",
        name: '投注记录',
        description: "查看所参与的游戏记录",
        icon: personal.tzRecord
    }, {
        key: "ctjl",
        name: '充提记录',
        description: "查看充值提款记录",
        icon: personal.ctRecord
    }, {
        key: "zbjl",
        name: '账变记录',
        description: "查看账户资金变动记录",
        icon: personal.account
    }, {
        key: "grbb",
        name: '个人报表',
        description: "查看自己的数据汇总",
        icon: personal.userSheet
    }],
        [{
            key: "grxx",
            name: '个人信息',
            description: "查看或编辑个人资料",
            icon: personal.personalInfo
        }, {
            key: "aqzx",
            name: '安全中心',
            description: "密码与银行卡管理",
            icon: personal.secure
        }, {
            key: "wdxx",
            name: '我的消息',
            description: "查看系统消息",
            icon: personal.message
        }, {
            key: "wdsc",
            name: '我的收藏',
            description: "收藏关注的彩种",
            icon: personal.collect
        }],
        [{
            key: "yhgl",
            name: '用户管理',
            description: "对下级成员管理",
            icon: personal.userManager
        }, {
            key: "dlyj",
            name: '代理佣金',
            description: "查看下级贡献的佣金",
            icon: personal.agentCommission
        }, {
            key: "tdbb",
            name: '团队报表',
            description: "查看团队的数据汇总",
            icon: personal.teamSheet
        }, {
            key: "more",
            name: '更多>>',
            description: "代理中心的所有内容",
            icon: personal.more
        }],
        [{
            key: "yjfk",
            name: '意见反馈',
            description: "意见提出与查看反馈",
            icon: personal.toolFeedBack
        },
            {
                key: "setting",
                name: '设置',
                description: "版本更新等设置",
                icon: personal.imgSet
            }
        ]
    ]

@observer
export default class TCUserCenterNew extends Component {

    lastRequestTime = 0
    stateModel = new StateModel()
    uCenterData = new userCenterData()

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
        this.freshBalance()
        this.uCenterData.getSignInData()

        this.listener = RCTDeviceEventEmitter.addListener('balanceChange', (isMoneyChange) => {
            this.freshBalance(isMoneyChange)
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('userStateChange', (state) => {
            if (state === 'login') {
                this.uCenterData.getSignInData()
            }
        })

        this.listener3 = RCTDeviceEventEmitter.addListener('jx_app_active', () => {
            if (TCUSER_DATA.islogin) {
                this.uCenterData.getSignInData()
            }
        })

        this.listener4 = RCTDeviceEventEmitter.addListener('unreadMessage', () => {
            console.log('UserCenter#unreadMessage() TC_NEW_MSG_COUNT='+TC_NEW_MSG_COUNT+'; TC_FEEDBACK_COUNT='+TC_FEEDBACK_COUNT)
            if (this.state.unreadMessageCnt !== TC_NEW_MSG_COUNT) {
                console.log('unread message count update. before count:'+this.state.unreadMessageCnt+', current count:'+TC_NEW_MSG_COUNT)
                this.setState({unreadMessageCnt:TC_NEW_MSG_COUNT})
            }
            if (this.state.unreadFeedbackCnt !== TC_FEEDBACK_COUNT) {
                console.log('unread feedback count update. before count:'+this.state.unreadFeedbackCnt+', current count:'+TC_FEEDBACK_COUNT)
                this.setState({unreadFeedbackCnt:TC_FEEDBACK_COUNT})
            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        this.listener2 && this.listener2.remove()
        this.listener3 && this.listener3.remove()
        this.listener4 && this.listener4.remove()
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <View>
                        <ImageBackground source={personal.userCenterBg} style={styles.imgTop}>
                            <View style={{flexDirection: 'row'}}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: Platform.OS == 'ios' ? 40 : 20,
                                        alignItems: 'center'
                                    }}>
                                    <TouchableOpacity onPress={() => this.gotoUserDetail()}>
                                        <UserIcon text={JXHelper.getUserIconShowName(TCUSER_DATA.username)}/>
                                    </TouchableOpacity>
                                    <View style={styles.userTitle}>
                                        <Text style={styles.userName}>{TCUSER_DATA.username}</Text>
                                        {this.getSignButton()}
                                    </View>
                                    {this.showSignInModal()}
                                </View>
                                <View style={{position: 'absolute', top: Platform.OS == 'ios' ? 25 : 5, right: 5}}>
                                    <TouchableOpacity onPress={() => {
                                        if (TC_BUTTON_SOUND_STATUS) {
                                            SoundHelper.playSoundBundle();
                                        }
                                        this.gotoOnlineService()
                                    }}>
                                        <Image source={personal.onlineServicer}
                                               style={[styles.img, {marginTop: 10, marginRight: 5}]}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.getSignInLabel()}
                        </ImageBackground>
                    </View>
                    <View style={{backgroundColor: indexBgColor.itemBg}}>
                        <MoneyLabel stateModel={this.stateModel} freshBalance={(isChangeMoney) => {
                            this.freshBalance(isChangeMoney)
                        }}/>
                        <View style={styles.userPay}>
                            <TouchableOpacity onPress={() => {
                                this.gotoPay()
                            }}>
                                <View style={styles.payItem}>
                                    <Image
                                        source={personal.iconPay}
                                        style={styles.imgPay}/>
                                    <Text style={styles.payTxt}>充值</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.gotoWithdraw()
                            }}>
                                <View style={styles.payItem}>
                                    <Image source={personal.iconDraw} style={styles.imgOut}/>
                                    <Text style={[styles.payTxt, {color: userCenterTxtColor.withdraw}]}>提款</Text>
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

    // 签到按钮
    getSignButton() {
        if (this.uCenterData.signInData.isSigned) {
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
                this.uCenterData.userSignIn((rs) => {
                    this.refs['SignInModal']._setModalVisible(rs)
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
        }}>您已连续签到{this.uCenterData.signInData.keepSignInDays}天 小投注大梦想</Text>)
    }

    // 签到modal
    showSignInModal() {
        return <SignInModal ref={'SignInModal'} data={this.uCenterData}/>
    }

    // 刷新余额
    freshBalance(isMoneyChange) {
        if (this.lastRequestTime === 0) {
            this.lastRequestTime = Moment().format('X')
        } else {
            let temp = Moment().format('X') - this.lastRequestTime
            if (temp < 1) {
                return
            } else {
                this.lastRequestTime = Moment().format('X')
            }
        }
        if (isMoneyChange) {
            this.getBalance()
        } else {
            this.getUserinfoAndBalance()
        }
    }

    // 获取用户信息和余额
    getUserinfoAndBalance() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.users, null, (response) => {
            if (response.rs) {
                storage.save({
                    key: 'balance',
                    data: response.content.userBalance.balance
                })
                TCUSER_BALANCE = response.content.userBalance.balance
                TCUSER_DATA.realname = response.content.realName
                this.stateModel.balance = TCUSER_BALANCE
            }
        })
    }

    // 资金改变后获取余额
    getBalance() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                storage.save({
                    key: 'balance',
                    data: response.content.balance
                })
                TCUSER_BALANCE = response.content.balance
                this.stateModel.balance = TCUSER_BALANCE
            }
        })
    }

    // 判断是否为代理
    isAgent() {
        if (!TCUSER_DATA.oauthRole) {
            return false
        }
        if (TCUSER_DATA.oauthRole == 'AGENT' || TCUSER_DATA.oauthRole == 'GENERAL_AGENT') {
            return true
        } else {
            return false
        }
    }

    renderRow(rowData, sectionID, rowID) {
        if (sectionID === '2' && !this.isAgent()) {
            return null;
        }

        if (rowData.key === "wdxx" || rowData.key === "yjfk") {
            return (<TouchableOpacity style={styles.itemContainer} onPress={() => {
                this.gotoPage(rowData.key)
            }}>
                <View style={styles.itemView}>
                    <Image source={rowData.icon} style={styles.img}/>
                    <View style={styles.itemTxtView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.mySettingLeftTxtStyle}>{rowData.name}</Text>
                            {this.getStatusTip(rowData.key === "wdxx" ? this.state.unreadMessageCnt : this.state.unreadFeedbackCnt)}
                        </View>
                        <Text style={styles.contentTxtStyle}>{rowData.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
        }
        return (<TouchableOpacity style={styles.itemContainer} onPress={() => {
            this.gotoPage(rowData.key)
        }}>

            <View style={styles.itemView}>
                <View style={{width: 1, height: 40, backgroundColor: indexBgColor.mainBg}}></View>
                <Image source={rowData.icon} style={styles.img}/>
                <View style={styles.itemTxtView}>
                    <Text style={styles.mySettingLeftTxtStyle}>{rowData.name}</Text>
                    <Text style={styles.contentTxtStyle}>{rowData.description}</Text>
                </View>

            </View>
        </TouchableOpacity>)
    }

    _renderHeader(sectionData, sectionId) {
        if (sectionId === '2' && !this.isAgent()) {
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
                NavigatorHelper.pushToOrderRecord(0);
                break;
            case 'ctjl':
                NavigatorHelper.pushToUserAccountCenter()
                break;
            case 'zbjl':
                NavigatorHelper.pushToUserAccount(0)
                break;
            case 'grbb':
                NavigatorHelper.pushToUserSheet(true)
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
            case 'setting':
                NavigatorHelper.gotoSetting();
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

@observer
class MoneyLabel extends Component {

    render() {
        return (<View style={styles.account}><View style={styles.accountData}>
            <Text
                style={{fontSize: Size.default, color: userCenterTxtColor.balanceTitle}}>余额:</Text>
            <Text
                style={styles.accountTxt}>{this.props.stateModel.isSee ? this.props.stateModel.balance : '******'}</Text>
            <TouchableOpacity onPress={() => {
                this.props.stateModel.setMoneyVisible()
            }}>
                <Image
                    source={this.props.stateModel.isSee ? personal.imgEye : personal.imgEye2}
                    style={styles.imgAccount}
                    resizeMode={'contain'}/>
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={styles.accountDetail} onPress={() => {
                this.props.freshBalance(true)
            }}>
                <View style={styles.freshView}>
                    <Text
                        style={styles.accountDetailTxt}>刷新余额</Text>
                </View>
            </TouchableOpacity>
        </View>)
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
        backgroundColor: indexBgColor.mainBg,
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
        height: height * 0.09,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg
    },
    accountData: {
        width: width * 0.5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    accountTxt: {
        fontSize: Size.font20,
        color: userCenterTxtColor.balance,
        paddingLeft: 5,
        textAlign: 'right'
    },
    accountDetailTxt: {
        fontSize: Size.small,
        color: userCenterTxtColor.fresh,
        padding: 5,
    },
    freshView: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: userCenterBorderColor.freshBorder,
        padding: 2
    },
    accountDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 20
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
        width: width * 0.5,
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
    }
})
