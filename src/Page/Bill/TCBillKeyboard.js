/**
 * Created by Sam on 2016/12/10.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import TCBillMultipleBar from './TCBillMultipleBar'
import {Size} from '../../Page/resouce/theme'
export default class TCBillKeyboard extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            marginTop: new Animated.Value(Dimensions.get('window').height)
        };
    }

    static defaultProps = {
        showMarginTop:Dimensions.get('window').height - 45*4 -35 - (Platform.OS == 'ios'?0:20),
        hiddenMarginTop:Dimensions.get('window').height,
        multipleEventCall:null,

    };

    componentDidMount() {

    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    {/*this._setModalVisible(false)*/}
                } }
            >
                <TouchableOpacity onPress={() => {
                    this._setModalVisible(false)
                }} style={styles.modalBackgroundStyle}
                                  activeOpacity = {1}
                                  underlayColor = 'red'
                >
                        <Animated.View style={[styles.contentStyle, {
                                marginTop: this.state.marginTop,
                            }
                        ]}>
                            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            </View>
                            <View style={{backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
                                <TCBillMultipleBar ref='multipleBar'/>
                                {this.getKeyBoardList()}
                            </View>
                        </Animated.View>
                </TouchableOpacity>
            </Modal>
        )
    }

    getKeyBoardList() {
        let boardList = []
        let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '确定', 0, '删除']
        for (let i = 0; i < numberArr.length; i++) {
            boardList.push(
                <TouchableHighlight key={i} style={styles.inputKeyStyle} onPress={(e)=>this.numberCall(numberArr[i])} textIndex={i}>
                    <Text style={{fontSize: Size.font16, fontWeight: 'bold'}}>{numberArr[i]}</Text>
                </TouchableHighlight>
            )
        }
        return boardList
    }

    _setModalVisible(visible) {

        if (visible){
            this.setState({modalVisible: visible});
            this.animatedWithValue(this.props.showMarginTop)
        }else {
            this.animatedWithValue(this.props.hiddenMarginTop,visible)
        }
    }

    animatedWithValue(value,visible) {
        Animated.timing(this.state.marginTop, {
            toValue:value,
            duration: 300,
            easing: Easing.linear
        }).start(()=>this.showModalVisible(visible));
    }

    showModalVisible(visible){
        if (!visible){
            this.setState({modalVisible: visible})
        }
    }

    numberCall(e) {
        if (e == '确定'){
            this._setModalVisible(false)
            if (this.props.multipleEventCall == null) return
            this.props.multipleEventCall(this.refs.multipleBar._getTextInputValue())
        }
        this.refs.multipleBar._setTextInputValue(e)
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0,
    },
    contentStyle: {
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    inputKeyStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 45,
        width: Dimensions.get('window').width / 3,
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
    }
});