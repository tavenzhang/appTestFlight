import React, {Component} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, ScrollView, Clipboard,} from 'react-native'
// import  QRCode from '../../../../Common/View/qrcode/QRCode'
import QRCode from 'react-native-qrcode-svg';
import Toast from '../../../../Common/JXHelper/JXToast'
import {
    Size,
    width,
    height,
    ermaStyle,
    customButtonStyle, baseColor
} from '../../../resouce/theme'
import PropTypes from "prop-types";

export default class TCUserPayView extends Component {

    static propTypes = {
        userPrompt:PropTypes.any,
        money: PropTypes.any,
        leftBtnTitle: PropTypes.any,
        rightBtnTitle:PropTypes.any
    }


    // 构造函数
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={this.props.transfer ? styles.topItemStyle1 : styles.topItemStyle}>
                        <View style={styles.payTitleItemStyle}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.payTitleTxtStyle}>充值金额：
                                    <Text
                                        style={styles.moneyTxtStyle}>{this.props.money} 元</Text></Text>
                                <TouchableOpacity style={{width: 100, height: 28}} onPress={() => {
                                    this.onCopy(this.props.money)
                                }}>
                                    <View style={{paddingLeft: width >= 360 ? 20 : 2}}>
                                        <Text style={customButtonStyle.btnBlueBorder}>复制</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.payNoticeItemStyle, {marginBottom: 20}]}><Text
                            style={styles.moneyTxtStyle}>{this.props.prompt ? this.props.userPrompt : '请一定按照以上显示金额付款'}</Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                        {this.getQRCode()}
                        </View>
                    </View>
                    <View style={[{justifyContent: 'center', alignItems: "center", flexDirection:"row", marginTop:20}]}>
                        <TouchableOpacity onPress={this.props.gotoPay}
                                          style={styles.btmBtnSpStyle} ><Text
                            style={styles.btmBtnTxtStyle}>{this.props.leftBtnTitle}</Text></TouchableOpacity>
                        {this.props.rightBtnTitle ? (<TouchableOpacity style={styles.btmBtnSpStyle} onPress={() => this.props.hadPay()}>
                            <Text style={styles.btmBtnTxtStyle}>{this.props.rightBtnTitle}</Text>
                        </TouchableOpacity>) : null}
                    </View>
                    <View style={{marginBottom: 20}}>
                        {this.getInfoText()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    onCopy(text) {
        Clipboard.setString('' + text);
        Toast.showShortCenter("充值金额已复制！")
    }

    getInfoText() {
        if (this.props.payType === '京东') {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.点“立即充值”将自动为您截屏并保存到相册(若图片未保存至相册，请手动截屏)。{'\n'}
                2.请打开京东APP，点击首页右上角的“扫啊扫”。{'\n'}
                3.在扫一扫中点击右下角，选取相册中截屏的图片。{'\n'}
                4.确认充值。如充值未及时到账，请联系客服。{'\n'}</Text>)
        } else if (this.props.payType === '其他支付') {
            return null
        } else {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.点“立即充值”将自动为您截屏并保存到相册,同时打开{this.props.payType}。
                (若图片未保存至相册，请手动截屏){'\n'}
                2.请在{this.props.payType}中打开“扫一扫”。{'\n'}
                3.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                4.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        }
    }

    getQRCode() {
        let codeType = this.props.codeType;
        if (codeType === 'URL') {
            return (<QRCode
                value={this.props.codeValue}
                size={Platform.OS == 'ios' ? 100 : 100}
            />)
        } else if (codeType === 'IMG') {
            return (<Image style={styles.imgewmStyle} source={{uri: this.props.codeValue}} resizeMode={'contain'}/>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: ermaStyle.mainBg,
        backgroundColor: "white",
        alignItems: 'center',
    },
    topItemStyle: {
        marginTop: 20,
        backgroundColor: ermaStyle.ermaBg,

    }, topItemStyle1: {
        marginTop: 20,
        backgroundColor: ermaStyle.ermaBg,

    }, payTitleItemStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: ermaStyle.btmBorder,
        height: height * 0.08,
        paddingLeft: 5
    }, payNoticeItemStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: ermaStyle.btmBorder,
        paddingLeft: 5
    }, payTitleTxtStyle: {
        color: ermaStyle.title,
        fontSize: Size.default
    }, ewmImgItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        height: height * 0.35,
        marginTop: 1,
    },
    imgewmStyle: {
        height: 100,
        width: 100,
    },
    btmBtnItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.9,
        marginTop: 20,
        alignItems: 'center',
        height: height * 0.08,
        marginLeft: width * 0.05
    }, btmBtnTxtStyle: {
        backgroundColor: baseColor.blue,
        color: ermaStyle.btnTxt,
        padding: 8,
        borderRadius: Platform.OS == 'ios' ? 0 : 5,
        textAlign: 'center',
        fontSize: Size.default
    }, tipTxtStyle: {
        color: ermaStyle.tipTxtColor,
        padding: 10,
        fontSize: Size.small,
    }, moneyTxtStyle: {
        color: ermaStyle.moneyContent,
        fontSize: Size.font14
    }, btmBtnSpStyle: {
        width:100,
        marginHorizontal:5

    }
})