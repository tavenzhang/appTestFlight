import React, {Component, PropTypes} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, ScrollView, Clipboard,} from 'react-native'
import {
    Size,
    indexBgColor,
    width,
    height,
    listViewTxtColor,
    ermaStyle,
    copyBtnStyle,
    buttonStyle
} from '../../../resouce/theme'
import  QRCode from '../../../../Common/View/qrcode/QRCode'
import Toast from '../../../../Common/JXHelper/JXToast'


export default class TCUserPayViewNew extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }


    render() {

        return (
            <View style={styles.container}>

                <View style={this.props.transfer?styles.topItemStyle1:styles.topItemStyle}>
                    <View style={styles.payTitleItemStyle}><Text
                        style={styles.payTitleTxtStyle}>充值金额：<Text
                        style={styles.moneyTxtStyle}>{this.props.money} 元</Text></Text></View>
                    {this.getOrderView()}
                    <View style={styles.ewmImgItemStyle}>
                        {this.getQRCode()}
                    </View>


                </View>

            </View>
        )
    }

    getOrderView() {
        return this.props.transfer ? (    <View style={{flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                         marginLeft: 5,
                                         paddingTop:5,
                                         borderBottomWidth: 0.5,
                                             borderBottomColor: ermaStyle.btmBorder
                                         ,paddingBottom:5}}>
            <Text
                style={{ color:ermaStyle.orderTitle, fontSize: Size.default, paddingTop: 5,}}>{'订 单 号   ：'}</Text>
            <Text
                style={{color: ermaStyle.orderContent, fontSize: Size.default,paddingTop: 5,width:width*0.4}}>{this.props.orderNo}</Text>

            <TouchableOpacity onPress={()=> {
                                this.onCopy(this.props.orderNo)
                            }}>
                <View style={{ paddingLeft: width>=360?20:2}}>
                    <Text style={{  color: copyBtnStyle.txtColor, textAlign: 'center', paddingTop: 4,  paddingBottom: 4,paddingLeft: 8,
                                            paddingRight: 8,
                                            borderWidth: 1,
                                            borderColor: copyBtnStyle.borderColor,
                                            borderRadius: 5,
                                            backgroundColor:copyBtnStyle.btnBg,
                                            fontSize:Size.default}}>复制</Text>
                </View>
            </TouchableOpacity>

        </View>) : null
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortTop('已复制!')
    }


    getQRCode() {
        let codeType = this.props.codeType;
        if (codeType === 'URL') {
            return ( <QRCode
                value={this.props.codeValue}
                size={Platform.OS == 'ios' ? 180 : width * 0.5}
                bgColor='black'
                fgColor='white'/>)
        } else if (codeType === 'IMG') {
            return (<Image style={styles.imgewmStyle} source={{uri: this.props.codeValue}} resizeMode={'contain'}/>)
        }
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
        alignItems: 'center',
    },
    topItemStyle: {
        marginTop: 20,
        backgroundColor: ermaStyle.ermaBg,
        height: height * 0.45,
        width: width * 0.9
    }, topItemStyle1: {
        marginTop: 20,
        backgroundColor: ermaStyle.ermaBg,
        height: height * 0.55,
        width: width * 0.9
    }, payTitleItemStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: ermaStyle.btmBorder,
        height: height * 0.08,
        paddingLeft: 5
    }, payTitleTxtStyle: {
        color: ermaStyle.title,
        fontSize: Size.default
    }, ewmImgItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.35,
        marginTop: 10,
    },
    imgewmStyle: {
        height: height * 0.3,
        width: width * 0.6
    }, moneyTxtStyle: {
        color: ermaStyle.moneyContent,
        fontSize: Size.large,
    }
})