/**
 * Created by Sam on 2016/11/14.
 */


import React from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {indexBgColor, popuWinStyle, Size, width} from '../../resouce/theme'
import * as _ from "lodash";
import {NavBarModalTop} from "../../asset/screen";

var createReactClass = require('create-react-class');


var TCPlayMethodSelectPopupView = createReactClass({

    getInitialState(){
        return {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            selectedIndex: this.props.selectedIndex,
            areaIndex: 0,
        }
    },

    getDefaultProps(){
        return {
            topTitle: '选择玩法',
            showTopTitle: true,
            selectTitle: null,
            selectTitleArr: [],
            selectedFunc: null,
            selectedIndex: 0,
            areaIndex: 0,
            secondAreaTitle: null,
            secondAreaTitleArr: null
        }
    },

    componentDidMount() {

    },

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    },

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
                        <View
                            style={{backgroundColor: indexBgColor.mainBg, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10}}
                            onPress={this.emptyF()}>
                            {this.getAllItems()}
                            {this.getSecondAreaViews()}
                        </View>
                    </View>
                </TouchableHighlight>
            </Modal>
        );
    },

    emptyF(){

    },

    getTitle(){
        if (this.props.showTopTitle)
            return <Text
                style={{fontSize: Size.font20, color:popuWinStyle.contentTxt, marginTop: 10, marginBottom: 10}}>{this.props.topTitle}</Text>
    },

    selectedCallBack(index, areaIndex) {
        if (this.props.selectedFunc == null) return
        this.props.selectedIndex = index
        this.props.selectedFunc(index, areaIndex)

        this.timer = setTimeout(() => {
            this._setModalVisible(false)
        }, 100)
    },

    getAllItems() {
        let itemArr = [];

        if (this.props.selectTitle) {
            itemArr.push(
                <Text key={6533}
                      style={{width: width, height: 18, textAlign: 'center',color:popuWinStyle.contentTxt} }> {this.props.selectTitle} </Text>
            )
        }

        let selectTitleArr = this.props.selectTitleArr;
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
    },

    getSecondAreaViews(){
        if (_.isEmpty(this.props.secondAreaTitleArr))return;
        let itemArr = [];

        itemArr.push(
            <Text key={6532}
                  style={{width: width, height: 18, textAlign: 'center', marginTop: 5 ,color:popuWinStyle.contentTxt} }> {this.props.secondAreaTitle} </Text>
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

    },

    _setModalVisible (visible){
        this.setState({modalVisible: visible});
    },

    _setModalSelectedIndex (selectedIndex, areaIndex){
        this.setState({selectedIndex: selectedIndex, areaIndex: areaIndex});
    },

});

module.exports = TCPlayMethodSelectPopupView;


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
                    style={[this.getTitleStyle(), {fontSize: width >= 375 ? Size.font16 : Size.font13,fontWeight:'bold',color: popuWinStyle.contentTxt}]}>{this.props.title}</Text>
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
        return styleArr;
    }

    getTitleStyle = () => {
        if (this.state.selected) {
            return {color: popuWinStyle.contentSelectBtnTxt};
        }
        return {color: popuWinStyle.contentTxt}
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
        backgroundColor: indexBgColor.mainBg,
    },
    selectViewStyle: {
        backgroundColor: indexBgColor.itemBg,
        height: 38,
        width: width / 3 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        borderColor: popuWinStyle.unSelectBorder,
        borderWidth: 1,
        padding: 2
    },
});
