import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import {Size, width, height, indexBgColor, baseColor} from '../../resouce/theme'
/**
 * 提示对话框
 */
@observer
export default class Dialog extends Component {

    @observable
    modalVisible = false

    constructor(props) {
        super(props)
    }


    render() {

        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.modalVisible}>
                <View style={styles.modalStyle}>
                    <View style={styles.modalMain}>
                        <View
                            style={{alignItems: 'center', justifyContent: 'center', height: height * 0.08}}>
                            <Text style={styles.modalTitle}>{this.props.dialogTitle}</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{fontSize: Size.default}}>
                                {this.props.dialogContent}<Text style={{color: 'red'}}>
                                {this.props.tipTxt ? this.props.tipTxt : null}
                            </Text>
                            </Text>
                        </View>
                        <View style={styles.queryBtnStyle}>
                            <TouchableOpacity onPress={() => this.props.leftBtnClick()}>
                                <View style={styles.txtBtnStyle}>
                                    <Text style={styles.queryLeftTxtStyle}>{this.props.leftTxt}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.rightBtnClick()}>
                                <View style={styles.txtBtnStyle}>
                                    <Text style={styles.queryLeftTxtStyle}>{this.props.btnTxt}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    _setModalVisible(visible) {
        this.modalVisible = visible
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Size.large,
        textAlign: 'center',
    }, modalContent: {
        height: height * 0.15,
        width: width * 0.6,

    },
    queryBtnStyle: {
        height: height * 0.07,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        flexDirection: 'row',

    },
    modalMain: {
        backgroundColor: 'white',
        height: height * 0.3,
        width: width * 0.8,
        borderRadius: 5,
        alignItems: 'center'
    }, queryLeftTxtStyle: {
        color: baseColor.blue,
        textAlign: 'center',
        fontSize: Size.large
    }, txtBtnStyle: {
        width: width * 0.4,
        justifyContent: 'center',
        height: height * 0.07,
    }
})