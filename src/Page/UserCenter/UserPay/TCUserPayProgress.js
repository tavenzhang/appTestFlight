import React, {Component,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform,ScrollView} from 'react-native'
import {Size, indexBgColor, width, height, listViewTxtColor, buttonStyle, payTxtColor} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import {userPay} from '../../asset/images'
import Toast from "../../../Common/JXHelper/JXToast";


/**
 * 充值进度界面
 */

export default class TCUserPayProgress extends Component {

    // 构造函数
    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
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
            </ScrollView>
        )
    }

    gotoPayRecord() {
        Toast.showShortCenter('充值5-10分钟到帐，请耐心等待');
        TW_Store.gameUIStroe.showChongZhiDetail()
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:240,
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
