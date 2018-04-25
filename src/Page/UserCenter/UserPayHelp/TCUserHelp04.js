import React, {Component, PropTypes,} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Platform
} from 'react-native'
import {userPay} from '../../resouce/images'
import {Size, width, height, listViewTxtColor} from '../../resouce/theme'

/**
 * 扫一扫帮助页面
 */
export default class TCUserHelp04 extends Component {

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
                    <Image source={!this.props.isWeChat ? userPay.userAlipayHelp04 : userPay.userWechatPayHelper04}
                           style={styles.imgViewStyle} resizeMode={'contain'}/>
                    <View style={styles.btmBtnViewStyle}>
                        <TouchableOpacity onPress={() => this.props.next()}>
                            <Text style={styles.btmBtnTxtStyle}>完成</Text>
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
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.7)',
        alignItems: 'center'
    }, imgViewStyle: {
        width: width * 0.7,
        height: height * 0.6,
        marginTop: Platform.OS == 'ios' ? height * 0.1 + 30 : height * 0.1 + 10
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
        marginTop: 40,
        paddingRight: 30
    }
})