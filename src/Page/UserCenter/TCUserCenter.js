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
} from 'react-native';

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Moment from 'moment'
import JXHelper from '../../Common/JXHelper/JXHelper'
import  InitHelper from '../../Common/JXHelper/TCInitHelper'
import SoundHelper from '../../Common/JXHelper/SoundHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RequestUtils  from '../../Common/Network/TCRequestUitls'
import {config} from '../../Common/Network/TCRequestConfig'
import UserIcon from '../../Common/View/TCUserIcon'
import {personal} from '../resouce/images'
import {indexBgColor, userCenterTxtColor, userCenterBorderColor, Size, width, height, baseColor} from '../resouce/theme'
import SignInModal from './SignIn/TCSignInModal'
import userCenterData from './TCUserCenterData'

let helper = new InitHelper()

@observer
export  default  class TCUserCenter extends Component {

    lastRequestTime = 0
    stateModel = new StateModel()
    uCenterData = new userCenterData()

    constructor(props) {
        super(props)
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
            if(TCUSER_DATA.islogin){
                this.uCenterData.getSignInData()
            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        this.listener2 && this.listener2.remove()
        this.listener3 && this.listener3.remove()
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <View>
                        <Image source={personal.userCenterBg} style={styles.imgTop}>
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
                                        NavigatorHelper.gotoSetting()
                                    }}>
                                        <Image source={personal.userBarTool} style={styles.imgSet}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.getSignInLabel()}
                        </Image>
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
                    <View style={styles.myOrder}>
                        <TouchableOpacity onPress={() => {
                            this.gotoUserOrderRecord(0)
                        }}>
                            <View style={styles.myOrderTitle}>
                                <Text style={styles.myOrderLeftTitle}>我的彩票</Text>
                                <View style={styles.myOrderRightTitle}>
                                    <Text style={styles.myOrderRightTxt}>查看全部订单</Text>
                                    <Image
                                        source={personal.imgNext}
                                        style={styles.imgNext}
                                        resizeMode={'contain'}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.myOrderBtmView}>
                            <TouchableOpacity onPress={() => {
                                this.gotoUserOrderRecord(2)
                            }}>
                                <View style={styles.orderIconItemStyle}>
                                    <Image source={personal.daiKaiJjiangIcon} style={styles.orderIconStyle}/>
                                    <Text
                                        style={[styles.myOrderBtmTxt, {color: userCenterTxtColor.unKJOrder}]}>待开奖订单</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.gotoUserOrderRecord(1)
                            }}>
                                <View style={styles.orderIconItemStyle}>
                                    <Image source={personal.jiangliIcon} style={styles.orderIconStyle}/>
                                    <Text
                                        style={[styles.myOrderBtmTxt, {color: userCenterTxtColor.zjOrder}]}>中奖订单</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.gotoUserOrderRecord(4)
                            }}>
                                <View style={styles.orderIconItemStyle}>
                                    <Image source={personal.yiKaiJiangIcon} style={styles.orderIconStyle}/>
                                    <Text
                                        style={[styles.myOrderBtmTxt, {color: userCenterTxtColor.kjOrder}]}>追号订单</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mySettingStyle}>
                        <TouchableOpacity onPress={() => {
                            this.gotoUserDetail()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={personal.personalInfo} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>个人信息</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={personal.imgNext} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.gotoUserSecurityCenter()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={personal.secure} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>安全中心</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={personal.imgNext} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.isAgent()}
                        <TouchableOpacity onPress={() => {
                            this.gotoUserAccountCenter()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={personal.account} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>交易明细</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={personal.imgNext} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {this.getUserSheetView()}
                        <TouchableOpacity onPress={() => {
                            this.gotoMessagelist()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={personal.message} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>我的消息</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    {this.getStatusTip('您有新的消息', TC_NEW_MSG_COUNT)}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.gotoUserCollect()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={personal.collect} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>我的收藏</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={personal.imgNext} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            NavigatorHelper.gotoSetting()
                        }}>
                            <View style={styles.mySettingItemStyle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={personal.imgSet} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>设置</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    {this.getStatusTip('您有新的反馈', TC_FEEDBACK_COUNT)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        if (this.lastRequestTime == 0) {
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

    // 获取红点提示
    getStatusTip(msgTip, count) {
        if (count == 0) {
            return (<View style={styles.itemRight}>
                <Image source={personal.imgNext} style={styles.imgNext}/>
            </View>)
        } else {
            return (<View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>{msgTip}</Text>
                <View style={styles.pointStyle}><Text style={styles.pointTxt}>{count}</Text></View>
                <Image source={personal.imgNext} style={styles.imgNext}/>
            </View>)
        }
    }

    // 根据用户角色返回不同组件
    isAgent() {
        if (!TCUSER_DATA.oauthRole) {
            return null
        }
        if (TCUSER_DATA.oauthRole == 'AGENT' || TCUSER_DATA.oauthRole == 'GENERAL_AGENT') {
            return (
                <TouchableOpacity onPress={() => {
                    this.gotoAgentCenter()
                }}>
                    <View style={styles.myOrderTitle}>
                        <View style={styles.mySetttingLeftStyle}>
                            <Image source={personal.agent} style={styles.img}/>
                            <Text style={styles.mySettingLeftTxtStyle}>代理中心</Text>
                        </View>
                        <View style={{paddingRight: 10}}>
                            <Image source={personal.imgNext} style={styles.imgNext}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (  <TouchableOpacity onPress={() => {
                this.gotoAgentInroduce()
            }}>
                <View style={styles.myOrderTitle}>
                    <View style={styles.mySetttingLeftStyle}>
                        <Image source={personal.agent} style={styles.img}/>
                        <Text style={styles.mySettingLeftTxtStyle}>成为代理</Text>
                    </View>
                    <View style={{paddingRight: 10}}>
                        <Image source={personal.imgNext} style={styles.imgNext}/>
                    </View>
                </View>
            </TouchableOpacity>)
        }
    }


    //获取个人报表Item
    getUserSheetView() {
        if (!helper.isGuestUser()) {
            return (
                <TouchableOpacity onPress={() => {
                    this.gotoUserSheet()
                }}>
                    <View style={styles.myOrderTitle}>
                        <View style={styles.mySetttingLeftStyle}>
                            <Image source={personal.agent} style={styles.img}/>
                            <Text style={styles.mySettingLeftTxtStyle}>个人报表</Text>
                        </View>
                        <View style={{paddingRight: 10}}>
                            <Image source={personal.imgNext} style={styles.imgNext}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    //跳转到用户投注记录界面
    gotoUserOrderRecord(page) {
        NavigatorHelper.pushToOrderRecord(page);
    }

    // 跳转到消息列表界面
    gotoMessagelist() {
        NavigatorHelper.pushToMessagelist()
    }

    // 跳转到收藏界面
    gotoUserCollect() {
        NavigatorHelper.pushToUserCollect()
    }

    // 跳转到代理中心
    gotoAgentCenter() {
        NavigatorHelper.pushToAgentCenter()
    }

    // 跳转到个人报表
    gotoUserSheet() {
        NavigatorHelper.pushToUserSheet(true)
    }

    // 跳转到代理介绍
    gotoAgentInroduce() {
        NavigatorHelper.pushToAgentInroduce()
    }

    // 跳转到充值界面
    gotoPay() {
        NavigatorHelper.pushToPay()
    }

    // 跳转到用户详情界面
    gotoUserDetail() {
        NavigatorHelper.pushToUserDetail();
    }

    // 跳转到安全中心
    gotoUserSecurityCenter() {
        NavigatorHelper.pushToUserSecurityCenter()
    }

    // 跳转到取款界面
    gotoWithdraw() {
        NavigatorHelper.pushToWithdraw()
    }

    // 跳转到交易明细
    gotoUserAccountCenter() {
        NavigatorHelper.pushToUserAccountCenter()
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
        width:width*0.7,
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
    }, imgNext: {
        width: 10,
        height: 15,
        // position: 'absolute',
        // top: 23,
        // left: width * 0.9
    }, myOrder: {
        backgroundColor: indexBgColor.itemBg,
        marginTop: 10
    }, myOrderTitle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    }, myOrderLeftTitle: {
        paddingLeft: 15,
        fontSize: Size.default,
        color: userCenterTxtColor.orderItemLeftTitle
    },
    myOrderRightTitle: {
        flexDirection: 'row',
        paddingRight: 15,
        alignItems: 'center',
    }, myOrderBtmView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }, myOrderRightTxt: {
        color: userCenterTxtColor.orderItemRightTitle
    }, myOrderBtmTxt: {
        fontSize: Size.default,
        paddingBottom: 10,
        color: userCenterTxtColor.orderItemLeftTitle
    }, img: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
    mySettingStyle: {
        marginTop: 10,
        backgroundColor: indexBgColor.itemBg
    },
    mySettingItemStyle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg,
    }, mySetttingLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    }, mySettingLeftTxtStyle: {
        marginLeft: 10,
        fontSize: Size.default,
        color: userCenterTxtColor.menuItemTitle
    }, orderIconStyle: {
        width: 50,
        height: 50,
    }, orderIconItemStyle: {
        alignItems: 'center',
    }, itemRight: {
        flexDirection: 'row', alignItems: 'center'
    }, itemRightTxt: {
        fontSize: Size.small,
        marginRight: 10,
        color: '#ddd'
    },
    pointStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: userCenterTxtColor.msgPiontBg,
        alignItems: 'center',
        justifyContent: 'center'
    }, pointTxt: {
        color: userCenterTxtColor.msgPiontTxt,
        fontSize: Size.font10
    }
})