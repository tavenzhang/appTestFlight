import React, {Component,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Platform
} from 'react-native'
import {userPay} from '../../asset/images'
import {Size, width, height, listViewTxtColor, indexBgColor} from '../../resouce/theme'

/**
 * 扫一扫帮助页面
 */
export default class TCUserHelp01 extends Component {

    // 构造函数
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {
                }}>
                <View style={styles.modalStyle}>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.modalLeftStyle}>
                    </View>
                    <View style={styles.modalMidStyle}>
                    </View>
                    <View style={styles.modalLeftStyle}>
                    </View>
                </View>
                <View style={styles.modalBtmStyle}>
                    <Image source={userPay.userAlipayHelp01} style={styles.imgViewStyle} resizeMode={'contain'}/>
                    <View style={styles.btmBtnViewStyle}>
                        <TouchableOpacity onPress={() => this.props.next()}>
                            <Text style={styles.btmBtnTxtStyle}>下一步</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalStyle: {
        height: Platform.OS == 'ios' ? height * 0.25 : height * 0.20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }, modalLeftStyle: {
        width: 40,
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: height * 0.35,
        flex: 1
    }, modalBtmStyle: {
        height: height * 0.5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center'
    }, modalMidStyle: {
        width: width * 0.6,
    }, imgViewStyle: {
        width: 160,
        height: 100
    },
    btmBtnTxtStyle: {
        backgroundColor: 'white',
        marginTop: 15,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        color: listViewTxtColor.greenTip
    }, btmBtnViewStyle: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'flex-end',
        paddingTop: Platform.OS == 'ios' ? 30 : 70,
        paddingRight: 30
    }
})