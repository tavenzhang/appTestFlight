import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'
import {observer} from 'mobx-react'
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
        let {leftBtnClick,rightBtnClick}=this.props

        return (
            <Modal
                onRequestClose={() => {
                }}
                animationType='fade'
                transparent={true}
                supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}
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
                        <View style={styles.btnRowStyle}>

                                <TouchableOpacity onPress={leftBtnClick} style={styles.txtViewStyle}>
                                    <View >
                                    <Text style={styles.queryLeftTxtStyle}>{this.props.leftTxt}</Text>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={rightBtnClick} style={[styles.txtViewStyle, {backgroundColor: "blue"}]}>
                                    <View >
                                    <Text style={styles.queryRightTxtStyle}>{this.props.btnTxt}</Text>
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
        height: height * 0.2,
        paddingHorizontal:10,
        // width: width * 0.6,

    },
    modalMain: {
        backgroundColor: 'white',

        width: width * 0.5,
        borderRadius: 5,
        alignItems: 'center',
        paddingTop:15
    },
    btnRowStyle: {
        height: height * 0.1,
        borderTopWidth: 1,
        borderTopColor: 'red',
        flexDirection: 'row',
        width: width * 0.5,

        // justifyContent:"center",
        // alignItems:"center"

    }, txtViewStyle: {
        flex: 1,
        //width:width * 0.5/2,
        justifyContent: 'center',
        alignItems:"center"
        // backgroundColor:"yellow"

    },
    queryLeftTxtStyle: {
        color: baseColor.blue,
        textAlign: 'center',
        fontSize: Size.large
    },
    queryRightTxtStyle: {
        color: baseColor.blue,
        textAlign: 'center',
        fontSize: Size.large
    }
})