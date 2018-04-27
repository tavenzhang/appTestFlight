/**
 * Created by allen-jx on 2017/6/10.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import {Size, indexBgColor, listViewTxtColor} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import {personal} from '../../resouce/images'

/**
 * 交易明細界面
 */
export default class TCUserAccountCenter extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'充提记录'}
                    needBackButton={true}
                    backButtonCall={() => {
                        NavigatorHelper.popToBack();
                    }}/>

                <View style={styles.mySettingStyle}>
                    {/* <TouchableOpacity onPress={() => {
                     this.gotoUserAccount(0)
                     }}>
                     <View style={styles.myOrderTitle}>
                     <View style={styles.mySetttingLeftStyle}>
                     <Image source={personal.account} style={styles.img}/>
                     <Text style={styles.mySettingLeftTxtStyle}>账户明细</Text>
                     </View>
                     <View style={{paddingRight: 10}}>
                     <Image source={personal.imgNext} style={styles.imgNext}/>
                     </View>
                     </View>
                     </TouchableOpacity>*/}
                    <TouchableOpacity onPress={() => {
                        this.gotoUserPayAndWithdraw(1)
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={personal.payRecord} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>充值记录</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.gotoUserPayAndWithdraw(2)
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={personal.withDraw} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>提款记录</Text>
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

    gotoUserAccount(page) {
        NavigatorHelper.pushToUserAccount(page)
    }

    gotoUserPayAndWithdraw(type) {
        NavigatorHelper.pushToUserPayAndWithDraw(type)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
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
        color: listViewTxtColor.title
    }, imgNext: {
        width: 10,
        height: 15,
    }, mySetttingLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    }, mySettingLeftTxtStyle: {
        marginLeft: 10,
        fontSize: Size.default,
        color: listViewTxtColor.title
    }, mySettingStyle: {
        marginTop: 10,
        backgroundColor: indexBgColor.itemBg
    }, img: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
})