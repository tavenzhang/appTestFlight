import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {Size, indexBgColor, width, height, listViewTxtColor, buttonStyle, payTxtColor} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import UserAccount from '../UserAccount/TCUserPayAndWithdrawRecordsMain'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import {userPay} from '../../resouce/images'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

/**
 * 充值进度界面
 */
@withMappedNavigationProps()
export default class TCUserPayProgress extends BackBaseComponent {

    // 构造函数
    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'充值进度'}
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack();
                    }}/>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                    <View style={styles.mainViewStyle}>
                        <View style={styles.leftViewStyle}>
                            <Image source={userPay.paidui01} style={styles.firstImgStyle}/>
                            <View style={styles.itemViewLineStyle}/>
                            <Image source={userPay.paidui02} style={styles.firstImgStyle}/>
                            <View style={styles.itemViewGrayLineStyle}/>
                            <Image source={userPay.paidui03} style={styles.firstImgStyle}/>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.itemTitleTxtStyle}>恭喜您，您的充值订单已经提交成功！</Text>
                                <Text style={{fontSize: Size.default, color: listViewTxtColor.content}}>充值金额<Text
                                    style={{color: payTxtColor.payDes}}>{this.props.topupAmount}</Text>元</Text>
                            </View>
                            <View style={styles.itemViewStyle}>
                                <Text style={styles.itemTitleTxtStyle}>正在排队，等待客服进行确认。</Text>
                            </View>
                            <View style={styles.itemViewStyle}>
                                <Text style={styles.itemTitleTxtStyle}>充值成功</Text>
                                <Text
                                    style={{
                                        fontSize: Size.default,
                                        color: listViewTxtColor.content
                                    }}>充值成功后，您的余额将在1分钟{'\n'}内更新，请稍后查看，若届时未{'\n'}更新，请联系在线客服</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={() => {
                            this.gotoPayRecord()
                        }}>
                        <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.default}}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    gotoPayRecord() {
        Helper.pushToUserPayAndWithDraw(1, true)
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }, bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 40
    }, mainViewStyle: {
        flexDirection: 'row',
        marginTop: 50
    }, itemTitleTxtStyle: {
        fontSize: Platform.OS === 'ios' ? Size.small : Size.default,
        fontWeight: 'bold',
        color: listViewTxtColor.title
    }, itemContentTxtStyle: {
        color: listViewTxtColor.content
    }, itemViewStyle: {
        marginTop: Platform.OS === 'ios' ? 55 : 40
    }, leftViewStyle: {
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center'
    }, firstImgStyle: {
        width: 35,
        height: 35
    }, itemViewLineStyle: {
        width: 1,
        height: 50,
        borderColor: listViewTxtColor.greenTip,
        borderWidth: 0.5
    }, itemViewGrayLineStyle: {
        width: 1,
        height: 50,
        borderColor: listViewTxtColor.content,
        borderWidth: 0.5
    }
})