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
import {Size, width, indexBgColor, popuWinStyle} from '../../Page/resouce/theme'
import {NavBarModalTop} from "../../Page/asset/screen";

export default class TCSelectModal extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            selectedIndex: this.props.selectedIndex,
            areaIndex: 0,
        };
    }

    static defaultProps = {
        topTitle: '', //顶部标题 good luck
        showTopTitle: true, //是否显示顶部标题
        subtitle: null,//子标题
        SelectorTitleArr: [],// 可选项的数组 string
        selectedFunc: null, //选中方法 selectedFunc(this.props.myIndex, this.props.areaIndex)
        selectedIndex: 0,//选中的下角标
        selectedAreaIndex: 0,//选中的区号
        secondAreaTitle: null, //第二区域子标题
        secondAreaTitleArr: null // 第二区域 可选项的数组 string
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
                    this._setModalVisible(false)
                } }
            >
                <TouchableHighlight onPress={() => {
                    this._setModalVisible(false)
                }} style={styles.modalBackgroundStyle} underlayColor='transparent'>
                    <View style={styles.contentStyle} onPress={this.emptyF()}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center', backgroundColor: indexBgColor.itemBg}}>
                            {this.getTitle()}
                        </View>
                        <View
                            style={{backgroundColor:indexBgColor.itemBg, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10}}
                            onPress={this.emptyF()}>
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
                style={{fontSize: Size.font20, color: popuWinStyle.contentTxt, marginTop: 10, marginBottom: 10}}>{this.props.topTitle}</Text>
    }

    selectedCallBack(index, areaIndex) {
        if (this.props.selectedFunc == null) return
        this.props.selectedIndex = index
        this.props.selectedFunc(index, areaIndex)
        this._setModalVisible(false)
    }

    getAllItems() {
        let itemArr = [];
        if (this.props.subtitle) {
            itemArr.push(
                <Text key={6533} style={{width: width, height: 18, textAlign: 'center'} }> {this.props.subtitle} </Text>
            )
        }

        let selectTitleArr = this.props.SelectorTitleArr;
        for (let i = 0; i < selectTitleArr.length; i++) {
            let selected = false
            if (this.state.areaIndex == 0 && this.state.selectedIndex == i) {
                selected = true
            }
            itemArr.push(
                <TCSelectView
                    selectedFunc={(e, areaIndex)=>this.selectedCallBack(e, areaIndex)}
                    title={selectTitleArr[i]}
                    key={i}
                    myIndex={i}
                    isSelected={selected}
                    areaIndex='0'
                />
            )
        }
        return itemArr;
    }

    getSecondAreaViews() {
        if (!this.props.secondAreaTitleArr)return

        let itemArr = [];

        itemArr.push(
            <Text key={6532}
                  style={{width: width, height: 18, textAlign: 'center', marginTop: 5} }> {this.props.secondAreaTitle} </Text>
        )

        let selectTitleArr = this.props.secondAreaTitleArr;
        for (let i = 0; i < selectTitleArr.length; i++) {
            let selected = false
            if (this.state.areaIndex == 2 && this.state.selectedIndex == i) {
                selected = true
            }
            itemArr.push(
                <TCSelectView
                    selectedFunc={(e, areaIndex)=>this.selectedCallBack(e, areaIndex)}
                    title={selectTitleArr[i]}
                    key={i}
                    myIndex={i}
                    isSelected={selected}
                    areaIndex="2"
                />
            )
        }
        return itemArr;
    }

    //外部可以调用
    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    //外部可以调用
    _setModalSelectedIndex(selectedIndex, areaIndex) {
        this.setState({selectedIndex: selectedIndex, areaIndex: areaIndex});
    }
}


class TCSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selected: this.props.isSelected
        };
    }

    static defaultProps = {
        title: '',
        isSelected: false,
        myIndex: -1,
        selectedFunc: null,
        areaIndex: 0
    };

    render() {
        return (
            <TouchableOpacity style={this.getItemStyle()} onPress={this.onPressCallback}>
                <Text
                    style={[this.getTitleStyle(), {fontSize: width >= 375 ? Size.font14 : Size.font13, color: popuWinStyle.contentTxt}]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    };

    onPressCallback = () => {
        this.setState({
            selected: !this.state.selected
        });
        if (this.props.selectedFunc == null) return;
        this.props.selectedFunc(this.props.myIndex, this.props.areaIndex);
    }

    getItemStyle = () => {
        let styleArr = [];
        styleArr.push(
            styles.selectViewStyle
        );
        if (this.state.selected) {
            styleArr.push(
                {borderColor: popuWinStyle.contentBorder, borderWidth: 1}
            )
        }
        ;
        return styleArr;
    }

    getTitleStyle = () => {
        if (this.state.selected) {
            return {color: popuWinStyle.contentBorder};
        }
        return {color: '#333333'}
    }
}

const styles = StyleSheet.create({

    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0,
    },
    contentStyle: {
        marginTop: NavBarModalTop,
        justifyContent: 'center',
        backgroundColor: indexBgColor.itemBg,
    },
    selectViewStyle: {
        backgroundColor: popuWinStyle.contentBtn,
        height: 30,
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
