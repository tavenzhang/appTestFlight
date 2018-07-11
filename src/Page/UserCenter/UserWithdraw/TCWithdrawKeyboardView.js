/**
 * Created by Joyce on 2017/03/25.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Modal,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Image
} from 'react-native';
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import {common} from '../../../Page/resouce/images'
import {Size} from '../../../Page/resouce/theme'
import {ScreenRatio} from "../../asset";
import {height} from "../../resouce/theme";

@observer
export default class TCKeyboardView extends Component {

    money = 0
    exempt = 0
    pwdStr = ''

    @observable
    password = {
        pwd1: '',
        pwd2: '',
        pwd3: '',
        pwd4: ''
    }
    @observable
    modalVisible = false//模态场景是否可见
    @observable
    marginTop = new Animated.Value(Dimensions.get('window').height)

    constructor(state) {
        super(state);
    }

    static defaultProps = {
        showMarginTop: height - height / 1.6 - (IS_IOS ? 0 : ScreenRatio < 1.8 ? 15 : 55),
        hiddenMarginTop: height,
        setInputValue: null,
    };

    componentDidMount() {

    }

    render() {
        return (
            <Modal
                animationType={'none'}
                transparent={true}
                visible={this.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}>
                <TouchableOpacity
                    style={styles.modalBackgroundStyle}
                    activeOpacity={1}
                    underlayColor='red'
                    onPress={() => {
                        this._setModalVisible(false)
                    }}>
                    <Animated.View style={[styles.contentStyle, {
                        marginTop: this.marginTop,
                    }
                    ]}>
                        <View style={{
                            height: Dimensions.get('window').height / 1.6 - Dimensions.get('window').height / 2.6,
                            backgroundColor: 'white'
                        }}>
                            <View style={{
                                height: (Dimensions.get('window').height / 1.6 - Dimensions.get('window').height / 2.6) * 0.4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>请输入取款密码</Text>
                            </View>
                            <View style={{
                                height: (Dimensions.get('window').height / 1.6 - Dimensions.get('window').height / 2.6) * 0.2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    color: '#666666',
                                    fontSize: 14
                                }}>取款 {parseFloat(this.money).toFixed(2)} 元</Text>
                                <Text style={{color: 'red', fontSize: 12}}> (手续费{this.exempt}元)</Text>
                            </View>
                            <View style={{
                                width: Dimensions.get('window').width * 0.8,
                                marginLeft: Dimensions.get('window').width * 0.1,
                                height: (Dimensions.get('window').height / 1.6 - Dimensions.get('window').height / 2.6) * 0.35,
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: TCLineW,
                                borderColor: '#ccc',
                                backgroundColor: 'transparent'
                            }}>
                                <View style={styles.pwdstyle}>
                                    <Text style={styles.pwdTextStyle}>{this.password.pwd1}</Text>
                                </View>

                                <View style={styles.pwdstyle}>
                                    <Text style={styles.pwdTextStyle}>{this.password.pwd2}</Text>
                                </View>

                                <View style={styles.pwdstyle}>
                                    <Text style={styles.pwdTextStyle}>{this.password.pwd3}</Text>
                                </View>

                                <View style={styles.pwdstyle}>
                                    <Text style={styles.pwdTextStyle}>{this.password.pwd4}</Text>
                                </View>

                            </View>
                        </View>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            {this.getKeyBoardList()}
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        )
    }

    getKeyBoardList() {
        let boardList = []
        let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '删除', 0, '确认']
        for (let i = 0; i < numberArr.length; i++) {
            boardList.push(
                <TouchableOpacity
                    key={i}
                    style={styles.inputKeyStyle}
                    onPress={(e) => this.numberCall(numberArr[i])}
                    textIndex={i}>
                    <View style={styles.inputKeyContainer}>
                        {this.getKeyBoardContent(numberArr[i])}
                    </View>
                </TouchableOpacity>
            )
        }
        return boardList
    }

    getKeyBoardContent(content) {
        if (content == '删除') {
            return <Image source={common.backSpace}/>
        } else {
            return <Text style={{fontSize: Size.font26, color: '#333333'}}>{content}</Text>
        }
    }

    getPwdStr() {
        let size = this.pwdStr.length
        switch (size) {
            case 0:
                this.clearPwd()
                break;
            case 1:
                this.password.pwd1 = '*'
                this.password.pwd2 = ''
                break;
            case 2:
                this.password.pwd1 = '*'
                this.password.pwd2 = '*'
                this.password.pwd3 = ''
                break;
            case 3:
                this.password.pwd1 = '*'
                this.password.pwd2 = '*'
                this.password.pwd3 = '*'
                this.password.pwd4 = ''
                break;
            case 4:
                this.password.pwd1 = '*'
                this.password.pwd2 = '*'
                this.password.pwd3 = '*'
                this.password.pwd4 = '*'
                break;
        }
    }

    clearPwd() {
        this.password.pwd1 = ''
        this.password.pwd2 = ''
        this.password.pwd3 = ''
        this.password.pwd4 = ''
    }

    _setModalVisible(visible) {
        if (visible) {
            this.pwdStr = ''
            this.clearPwd()
            this.modalVisible = visible
            this.animatedWithValue(this.props.showMarginTop)
        } else {
            this.props.closeEvent && this.props.closeEvent()
            this.animatedWithValue(this.props.hiddenMarginTop, visible)
        }
    }

    _setMoney(money, exempt) {
        this.money = money
        this.exempt = exempt
    }

    animatedWithValue(value, visible) {
        Animated.timing(this.marginTop, {
            toValue: value,
            duration: 300,
            easing: Easing.linear
        }).start(() => this.showModalVisible(visible));
    }

    showModalVisible(visible) {
        if (!visible) {
            this.modalVisible = visible
        }
    }

    numberCall(e) {
        if (e == '确认') {
            this._setModalVisible(false)
            this.props.callBack && this.props.callBack(this.pwdStr)
            this.pwdStr = ''
            this.clearPwd()
        } else if (e == '删除') {
            let temp = ''
            if (this.pwdStr.length > 1) {
                temp = this.pwdStr.substr(0, this.pwdStr.length - 1)
            } else {
                temp = ''
            }
            this.pwdStr = temp
            this.getPwdStr()
        } else {
            if (this.pwdStr.length < 4) {
                this.pwdStr += e
                this.getPwdStr()
            }
        }
    }
}

const styles = StyleSheet.create({
    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentStyle: {
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
    },
    inputKeyStyle: {
        backgroundColor: '#EBEBEB',
        height: Dimensions.get('window').height / 2.6 / 4,
        width: Dimensions.get('window').width / 3,
        padding: 0.5,
    },
    inputKeyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    pwdstyle: {
        width: Dimensions.get('window').width * 0.2,
        borderRightWidth: 0.5,
        borderRightColor: '#ccc',
        height: (Dimensions.get('window').height / 1.6 - Dimensions.get('window').height / 2.6) * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    pwdTextStyle: {
        fontSize: 25, fontWeight: 'bold', backgroundColor: 'transparent'
    }
});
