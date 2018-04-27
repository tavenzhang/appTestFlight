import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    ImageBackground
} from 'react-native'

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import {Size, indexBgColor, listViewTxtColor, width, height} from '../../../resouce/theme'
import JXHelper from '../../../../Common/JXHelper/JXHelper'

@observer
export default class TCUserBankRowView extends Component {

    @observable
    isSee = false

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={JXHelper.getBankBackground(this.props.bankCode)}
                       resizeMode={'stretch'}
                       style={styles.bankBgStyle}>
                    <View style={styles.bankInfo}>
                        <View style={styles.bankIcon}>
                            <Image source={JXHelper.getBankIcon(this.props.bankCode)}
                                   resizeMode={'contain'}
                                   style={styles.bankImgIcon}/>
                        </View>
                        <View style={{width: width * 0.9}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.bankTitleTxt}>{this.props.bankName} </Text>
                                <TouchableOpacity style={{width: width * 0.4}} onPress={() => {
                                    this.setCardNoVisible()
                                }}>
                                    <Text style={styles.CardNo}>{this.isSee ? '隐藏卡号' : '显示卡号'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.bankTypeTxt}>储蓄卡</Text>
                            </View>
                            <View>
                                <Text
                                    style={styles.bankNumStyle}>
                                    {this.isSee ?
                                        this.props.bankNum :
                                        '**** **** **** ' + this.props.bankNum.substr(this.props.bankNum.length - 4, 4)
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    setCardNoVisible() {
        this.isSee = !this.isSee
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.itemBg,
    },
    bankBgStyle: {
        width: width - 10,
        margin: 5,
        borderRadius: 5
    },
    bankInfo: {
        flexDirection: 'row',
    },
    bankImgIcon: {
        width: 60,
        height: 60,
        margin: 10,
    },
    bankIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bankTitleTxt: {
        color: listViewTxtColor.bankTitle,
        fontSize: Size.default,
        marginTop: 15,
        width: width * 0.5,
        backgroundColor: 'transparent'
    },
    bankNumStyle: {
        color: listViewTxtColor.bankTitle,
        fontSize: Size.small,
        backgroundColor: 'transparent',
        marginTop: 2
    },
    bankTypeTxt: {
        color: listViewTxtColor.bankTitle,
        backgroundColor: 'transparent',
        fontSize: Size.default,
        marginTop: 2
    },
    CardNo: {
        fontSize: Size.font12,
        marginTop: 15,
        backgroundColor: 'transparent',
        color: listViewTxtColor.bankTitle,
    }
})
