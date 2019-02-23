import React, {Component, PropTypes} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, ScrollView, Clipboard,} from 'react-native'
import {
    Size,
    indexBgColor,
    width,
    height,
    ermaStyle,
    customButtonStyle
} from '../../../resouce/theme'
import  QRCode from '../../../../Common/View/qrcode/QRCode'
import Toast from '../../../../Common/JXHelper/JXToast'
import TcTools from '../../../../Common/View/Tools'

let Tools = new TcTools()

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
                    <View style={styles.payTitleItemStyle}>
                        <Text style={styles.payTitleTxtStyle}>充值金额：
                            <Text style={styles.moneyTxtStyle}>{this.props.money} 元</Text>
                        </Text>
                    </View>
                    {this.getNameView()}
                    {this.getOrderView()}
                    <View style={styles.ewmImgItemStyle}>
                        {this.getQRCode()}
                    </View>
                    {!IS_IOS && <TouchableOpacity onPress={()=> this.saveScreenshot()}>
                        <View style={styles.viewScreenshot}>
                            <Text style={customButtonStyle.btnBlueBorder}>截屏</Text>
                        </View>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    saveScreenshot() {
        Tools.saveScreenshot();
        Toast.showShortCenter("已为您截屏并保存至相册");
    }

    getOrderView() {
        return this.props.transfer ? (    <View style={{flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 5,
            paddingTop:2,
            borderBottomWidth: 0.5,
            borderBottomColor: ermaStyle.btmBorder
            ,paddingBottom:5}}>
            <Text
                style={{ color:ermaStyle.orderTitle, fontSize: Size.default,}}>{'订 单 号   ：'}</Text>
            <Text
                style={{color: ermaStyle.orderContent, fontSize: Size.default,width:width*0.4}}>{this.props.orderNo}</Text>

            <TouchableOpacity onPress={()=> {
                this.onCopy(this.props.orderNo)
            }}>
                <View style={{ paddingLeft: width>=360?20:2}}>
                    <Text style={customButtonStyle.btnBlueBorder}>复制</Text>
                </View>
            </TouchableOpacity>

        </View>) : null
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortTop('已复制!')
    }

    getNameView(){
        return this.props.realName?(<View style={{flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 5,
            paddingTop:2,
            borderBottomWidth: 0.5,
            borderBottomColor: ermaStyle.btmBorder
            ,paddingBottom:5}}>
            <Text
                style={{ color:ermaStyle.orderTitle, fontSize: Size.default,}}>{'存 款 人   ：'}</Text>
            <Text
                style={{color: ermaStyle.orderContent, fontSize: Size.default,width:width*0.4}}>{this.props.realName}</Text></View>):null
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
        marginTop: 10,
        backgroundColor: ermaStyle.ermaBg,
        height: height * 0.45,
        width: width * 0.9
    }, topItemStyle1: {
        backgroundColor: ermaStyle.ermaBg,
        height: height * 0.55,
        width: width * 0.9
    }, payTitleItemStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: ermaStyle.btmBorder,
        height: 40,
        paddingLeft: 5
    }, payTitleTxtStyle: {
        color: ermaStyle.title,
        fontSize: Size.default
    }, ewmImgItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.35,
        marginTop: 1,
    },
    imgewmStyle: {
        height: height * 0.3,
        width: width * 0.6
    },
    moneyTxtStyle: {
        color: ermaStyle.moneyContent,
        fontSize: Size.large,
    },
    viewScreenshot: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10
    }
})