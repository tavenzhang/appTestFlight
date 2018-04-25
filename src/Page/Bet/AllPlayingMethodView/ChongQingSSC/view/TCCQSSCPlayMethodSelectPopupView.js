/**
 * Created by Sam on 2016/11/14.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Platform,
    Dimensions
} from 'react-native';
import {width, Size, indexBgColor, popuWinStyle} from '../../../../resouce/theme'
export default class TCCQSSCPlayMethodSelectPopupView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            selectedIndex: this.props.selectedIndex,
            selectedItemIndex: this.props.selectedItemIndex
        }
        this.selectedIndex = 0
        this.selectedItemIndex = 0
    }

    static defaultProps = {
        topTitle: '选择玩法',
        showTopTitle: true,
        selectTitle: null,
        selectTitleArr: [],
        selectedFunc: null,
        secondAreaTitle: null,
        secondAreaTitleArr: null,
        selectedIndex: 0,
        selectedItemIndex: 0
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                } }
            >
                <TouchableHighlight onPress={() => {
                    this._setModalVisible(false)
                }} style={styles.modalBackgroundStyle} underlayColor='transparent'>
                    <View style={styles.contentStyle} onPress={this.emptyF()}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center', backgroundColor: indexBgColor.mainBg}}>
                            {this.getTitle()}
                        </View>
                        <View style={{
                            backgroundColor: indexBgColor.mainBg,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginBottom: 10,
                        }} onPress={this.emptyF()}>
                            {this.getAllItems()}
                            {this.getSecondAreaViews()}
                        </View>
                    </View>
                </TouchableHighlight>
            </Modal>
        );
    }

    emptyF() {

    }

    getTitle() {
        if (this.props.showTopTitle)
            return <Text
                style={{fontSize: Size.font20, color:popuWinStyle.contentTxt, marginTop: 10, marginBottom: 10}}>{this.props.topTitle}</Text>
    }

    selectedCallBack(parentIndex, itemIndex) {
        if (this.props.selectedFunc == null) return
        if (parentIndex != -1) {
            this.selectedIndex = parentIndex
            this.setState({
                selectedIndex: parentIndex
            })
            this.props.selectedFunc(this.selectedIndex, 0)
        }
        this.selectedItemIndex = itemIndex

        let selectTitleArr = this.props.secondAreaTitleArr[this.selectedIndex];
        if (selectTitleArr.length === 1 || parentIndex === -1) {
            this.props.selectedFunc(this.selectedIndex, itemIndex)
            this.timer = setTimeout(() => {
                this._setModalVisible(false)
            }, 100)
        }
    }

    getAllItems() {
        let itemArr = [];
        let selectTitleArr = this.props.selectTitleArr;
        if (this.props.selectTitle) {
            itemArr.push(
                <Text key={6533}
                      style={{
                          width: width,
                          height: 18,
                          textAlign: 'center',
                          fontSize:Size.default,
                          color:popuWinStyle.contentTxt
                      } }> {selectTitleArr[this.selectedIndex]} </Text>
            )
        }
        for (let i = 0; i < selectTitleArr.length; i++) {
            let selected = false
            if (this.selectedIndex == i) {
                selected = true
            }
            itemArr.push(
                <TCSelectView
                    selectedFunc={(parentIndex)=>this.selectedCallBack(parentIndex, 0)}
                    title={selectTitleArr[i]}
                    key={i}
                    myIndex={i}
                    selectedIndex={this.selectedIndex}
                    areaIndex={1}
                />
            )
        }
        return itemArr;
    }

    getSecondAreaViews() {
        if (!this.props.secondAreaTitleArr)return
        let selectTitleArr = this.props.secondAreaTitleArr[this.state.selectedIndex];
        let itemArr = [];

        itemArr.push(
            <Text key={6532} style={{
                width: width,
                height: 18,
                textAlign: 'center',
                marginTop: 5,
                fontSize:Size.default,
                color:popuWinStyle.contentTxt
            } }> {selectTitleArr[this.selectedItemIndex]} </Text>
        )


        for (let i = 0; i < selectTitleArr.length; i++) {
            let selected = false
            if (this.selectedItemIndex == i) {
                selected = true
            }
            itemArr.push(
                <TCSelectView
                    selectedFunc={(itemIndex)=>this.selectedCallBack(-1, itemIndex)}
                    title={selectTitleArr[i]}
                    key={i}
                    myIndex={i}
                    selectedItemIndex={this.selectedItemIndex}
                    areaIndex={2}
                />
            )
        }
        return itemArr;

    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _setModalSelectedIndex(parentIndex, itemIndex) {
        this.setState({selectedIndex: parentIndex, selectedItemIndex: itemIndex});
    }

}


class TCSelectView extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        title: '',
        myIndex: -1,
        selectedFunc: null,
        selectedItemIndex: -1,
        selectedIndex: -1,
        areaIndex: 1
    };

    render() {
        return (
            <TouchableOpacity style={this.getItemStyle()}
                              onPress={this.onPressCallback}>
                <Text style={[this.getTitleStyle(), {
                    fontSize: width >= 375 ? Size.font15 : Size.font13,
                    fontWeight:'bold',
                    color: popuWinStyle.contentTxt
                }]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    };

    onPressCallback = () => {
        // this.setState({
        //     selected: !this.state.selected
        // });
        if (this.props.selectedFunc == null) return;
        this.props.selectedFunc(this.props.myIndex);
    }

    getItemStyle = () => {
        let styleArr = []
        styleArr.push(
            styles.selectViewStyle
        )
        /* if (this.selected) {
         styleArr.push(
         {borderColor: 'red', borderWidth: 1}
         )
         }*/
        if (this.props.areaIndex === 1 && this.props.selectedIndex === this.props.myIndex ||
            this.props.areaIndex === 2 && this.props.selectedItemIndex === this.props.myIndex) {
            styleArr.push(
                {borderColor: popuWinStyle.contentBorder, borderWidth: 1}
            )
        }
        return styleArr
    }

    getTitleStyle = () => {
        /*   if (this.selected) {
         return {color: 'red'}
         }
         return {color: '#333333'}*/
    }
}

const styles = StyleSheet.create({

    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0,
    },
    contentStyle: {
        marginTop: Platform.OS == 'ios' ? 64 : 44,
        justifyContent: 'center',
        backgroundColor: indexBgColor.mainBg,
    },
    selectViewStyle: {
        backgroundColor: popuWinStyle.contentBtn,
        height: 45,
        width: width / 3 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        borderColor: popuWinStyle.unSelectBorder,
        borderWidth: 1,
        padding: 5
    },
});