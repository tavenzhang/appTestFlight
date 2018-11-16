/**
 * Created by Joyce on 2017/03/25.
 */

import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import {observable} from 'mobx'
import {
    Animated,
    Easing,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {common} from '../../Page/asset/images'
import {height, Size, width} from '../../Page/resouce/theme'
import {StatusBarHeight, ScreenRatio} from "../../Page/asset/screen";

/**
 * 自定义输入数字键盘
 */
@observer
export default class TCKeyboardView extends Component {

    @observable
    modalVisible = false
    @observable
    marginTop = new Animated.Value(height)

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        showMarginTop: height - height / 2.6 - (IS_IOS ? 0 : StatusBarHeight + (ScreenRatio < 1.8 ? 0 : 35)),
        hiddenMarginTop: height,
        setInputValue: null,
        backdropPressToClose: true,
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
                    <Animated.View style={[styles.contentStyle, {marginTop: this.marginTop,}]}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: width + 2}}>
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

    _setModalVisible(visible, number) {
        if (visible) {
            this.modalVisible = visible
            this.animatedWithValue(this.props.showMarginTop)
        } else {
            if (this.props.pressYesNoNeedCloseEvent && number === '确认') {
                this.modalVisible = visible
            } else {
                this.props.closeEvent && this.props.closeEvent()
            }
            this.animatedWithValue(this.props.hiddenMarginTop, visible)
        }
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
        if (e === '确认') {
            this._setModalVisible(false, e);
            if (this.props.setInputValue === null) return
        }
        this.props.setInputValue(e);
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
        height: height / 2.6 / 4,
        width: width / 3,
        padding: 0.5,
    },
    inputKeyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});
