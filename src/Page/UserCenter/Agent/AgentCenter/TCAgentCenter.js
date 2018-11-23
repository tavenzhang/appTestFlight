/**
 * Created by allen-jx on 2017/5/31.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Platform,
    ImageBackground
} from 'react-native'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import JXHelper from '../../../../Common/JXHelper/JXHelper'
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'
import UserIcon from '../../../../Common/View/TCUserIcon'
import {personal} from '../../../asset/images'
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../../resouce/theme'
import Helper from "../../../../Common/JXHelper/TCNavigatorHelper";
import userStore from '../../../../Data/store/UserStore'


/**
 * 代理中心
 */
export default class TCAgentCenter extends Component {

    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={'代理中心'}
                    needBackButton={true}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        Helper.popToBack()
                    }}
                />

                <ImageBackground source={personal.userCenterBg} style={styles.imgTop}>
                    <View style={styles.agentDetail}>
                        <UserIcon style={styles.imgUser}
                                  text={JXHelper.getUserIconShowName(userStore.userName)}
                                  bgColor={userStore.userLogoColor}/>
                        <View style={styles.agentDetailTxt}>
                            <View style={{flexDirection: 'row'}}>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: Size.font17,
                                        color: listViewTxtColor.bankTitle
                                    }}>用户名 </Text>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: Size.font17,
                                        color: listViewTxtColor.bankTitle
                                    }}>{userStore.userName}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text
                                    style={{marginTop: 10, fontSize: Size.font17, color: listViewTxtColor.bankTitle}}>余
                                    额 </Text>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        fontSize: Size.font17,
                                        color: listViewTxtColor.bankTitle
                                    }}>{userStore.balance}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: Size.font17,
                                        color: listViewTxtColor.bankTitle
                                    }}>彩票返点 </Text>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: Size.font17,
                                        color: listViewTxtColor.bankTitle
                                    }}>{userStore.prizeGroup}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View>
                    <TouchableOpacity onPress={() => {
                        this.goToAgentInroduce()
                    }}>
                        <View style={styles.itemStyle}>
                            <View style={styles.itemLeftStyle}>
                                <Text style={styles.itemTxtLeftStyle}>代理说明</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/*  <TouchableOpacity onPress={()=> {
                     this.goToCommissionList()
                     }}>
                     <View style={styles.itemStyle}>
                     <View style={styles.itemLeftStyle}>
                     <Text style={styles.itemTxtLeftStyle}>代理报表</Text>
                     </View>
                     <View style={{paddingRight: 10}}>
                     <Image source={personal.imgNext} style={styles.imgNext}/>
                     </View>
                     </View>
                     </TouchableOpacity>*/}

                    <TouchableOpacity onPress={() => {
                        NavigatorHelper.pushToAgentAddAccount(false)
                    }}>
                        <View style={styles.itemStyle}>
                            <View style={styles.itemLeftStyle}>
                                <Text style={styles.itemTxtLeftStyle}>下级开户</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.goToTeam()
                    }}>
                        <View style={styles.itemStyle}>
                            <View style={styles.itemLeftStyle}>
                                <Text style={styles.itemTxtLeftStyle}>用户管理</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.goToCommissionList()
                    }}>
                        <View style={styles.itemStyle}>
                            <View style={styles.itemLeftStyle}>
                                <Text style={styles.itemTxtLeftStyle}>代理佣金</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.goToUserSheets()
                    }}>
                        <View style={styles.itemStyle}>
                            <View style={styles.itemLeftStyle}>
                                <Text style={styles.itemTxtLeftStyle}>团队报表</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    goToCommissionList() {
        NavigatorHelper.pushToAgentCommission()
    }

    goToAgentInroduce() {
        NavigatorHelper.pushToAgentInroduce()
    }

    goToTeam() {
        NavigatorHelper.pushToUserTeamManager()
    }

    goToUserSheets() {
        NavigatorHelper.pushToUserSheet(false)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }, imgUser: {
        width: 70,
        height: 70,
        marginLeft: 10,
        borderRadius: 35,
    },
    agentDetail: {
        flexDirection: 'row',
        height: height * 0.2,
        alignItems: 'center'
    },
    agentDetailTxt: {
        marginLeft: 10,
    }, itemStyle: {
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderBottomColor: '#F7F6F4',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: indexBgColor.itemBg
    }, itemLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    }, itemTxtLeftStyle: {
        marginLeft: 20,
        fontSize: Size.large,
        color: listViewTxtColor.title
    }, imgNext: {
        width: 10,
        height: 15,
    }, imgTop: {
        backgroundColor: 'transparent',
        width: width,
        height: height * 0.20
    },
})
