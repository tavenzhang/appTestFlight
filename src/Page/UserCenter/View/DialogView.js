'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';
import {Size, width, height} from '../../resouce/theme'
export  default  class DialogView extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
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
                    <View style={styles.modalMain}>
                        <View style={styles.modalContent}>
                            <Text style={styles.dialogContextStyle}>
                                {this.props.promptToUser}
                            </Text>
                        </View>
                        <View style={styles.btmStyle}>
                            <TouchableOpacity onPress={() => this.props.skip()}>
                                <View style={styles.btmLeftView}>
                                    <Text style={styles.queryTxtStyle}>跳过</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.gotoWriteMsg()} style={styles.btmRightView}>
                                <View >
                                    <Text style={[styles.queryTxtStyle, {color: 'white'}]}>去填写资料</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalStyle: {
        borderRadius: 8,
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Size.large,
        textAlign: 'center'
    }, modalContent: {
        height: height * 0.22 + 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }, queryTxtStyle: {
        color: 'black',
        height: 50,
        textAlign: 'center',
        paddingTop: 15,
        fontSize: Size.default
    },
    modalMain: {
        backgroundColor: 'white',
        height: height * 0.3,
        width: width * 0.8,
        borderRadius: 8
    }, dialogContextStyle: {
        fontSize: Size.large,
        textAlign: 'center'
    }, btmStyle: {
        flexDirection: 'row',

    }, btmLeftView: {
        width: width * 0.4,
        borderRadius: 8
    }, btmRightView: {
        width: width * 0.4,
        backgroundColor: 'red',
        borderBottomRightRadius: 8
    }
})