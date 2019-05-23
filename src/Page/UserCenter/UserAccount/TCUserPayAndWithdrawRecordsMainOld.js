'use strict'
/**
 * 充值和提款记录主界面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView, TouchableOpacity, Text
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import ScrollableTabView from '../../../Common/View/ScrollableTab'
import DefaultTabBar from '../../../Common/View/ScrollableTab/DefaultTabBar'
import UserAccount from './TCUserPayAndWithdrawRecords'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {Size, shoppingTxtColor, indexBgColor, listViewTxtColor} from '../../asset/game/themeComponet'
import {ASSET_Images, ASSET_Theme} from "../../asset";
import TCImage from "../../../Common/View/image/TCImage";
import TCText from "../../../Common/View/widget/TCText";

export default class TCUserPayAndWithdrawRecordsMainOld extends Component {

    constructor(props) {
        super(props)
        this.state={
            selectType:0
        }
    }

    static defaultProps = {
        initPage: 0,
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let {onBack}=this.props
        return (
            <View style={{height:SCREEN_H*0.60,marginTop:10,overflow:"hidden"}}>
                {/*<TCImage source={ASSET_Images.gameUI.czmxListBg1} style={{position: "absolute",width:SCREEN_W*0.74,height:SCREEN_H*0.62}} resizeMode={"stretch"}/>*/}
                {/*<TCImage source={ASSET_Images.gameUI.czmxListBg2} style={{position: "absolute",width:SCREEN_W*0.74,height:SCREEN_H*0.62}} resizeMode={"stretch"}/>*/}
                {/*<TCImage source={ASSET_Images.gameUI.czmxListBg3} style={{position: "absolute",width:SCREEN_W*0.74,height:SCREEN_H*0.62}} resizeMode={"stretch"}/>*/}

                {/*<TouchableOpacity onPress={()=>{*/}
                {/*console.log("====++++11111")*/}
                {/*if(this.state.selectType !==0){*/}
                {/*this.setState({*/}
                {/*selectType:0*/}
                {/*})*/}
                {/*}*/}
                {/*}}>*/}
                {/*<Text style={{color: this.state.selectType === 0? "#e9f5fd":"B6B5AE",fontSize:20, left: 35, top: 5}}>全部</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={()=>{*/}
                {/*console.log("====++++11111")*/}
                {/*if(this.state.selectType !==1){*/}
                {/*this.setState({*/}
                {/*selectType:1*/}
                {/*})*/}
                {/*}*/}
                {/*}}>*/}
                {/*<Text style={{color: this.state.selectType === 1? "#e9f5fd":"B6B5AE",fontSize:20, position: "absolute", left: 130, top: 5}}>已完成</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity onPress={()=>{*/}
                {/*console.log("====++++11111")*/}
                {/*if(this.state.selectType !==2){*/}
                {/*this.setState({*/}
                {/*selectType:2*/}
                {/*})*/}
                {/*}*/}
                {/*}}>*/}
                {/*<Text style={{color: this.state.selectType === 2? "#e9f5fd":"B6B5AE",fontSize:20, position: "absolute", left: 245, top: 5}}>失败</Text>*/}
                {/*</TouchableOpacity>*/}

                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar style={{height: 45}} textStyle={{marginTop: 30}}/>}
                    tabBarUnderlineStyle={{backgroundColor: shoppingTxtColor.tabLine, height: 2}}
                    tabBarBackgroundColor={indexBgColor.itemBg}
                    locked={true}
                    initialPage={0}
                    tabBarActiveTextColor={shoppingTxtColor.tabTitlePressed}
                    tabBarInactiveTextColor={shoppingTxtColor.tabTitleNormal}
                    tabBarTextStyle={{fontSize: Size.font15, fontWeight: 'normal', marginTop: 10,}}>
                    <UserAccount onBack={onBack} tabLabel='全部' navigator={this.props.navigator} type={1}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                 accountType={this.props.accountType}/>
                    <UserAccount onBack={onBack}  tabLabel='已完成' navigator={this.props.navigator} type={2}
                                 accountType={this.props.accountType}/>
                    <UserAccount  onBack={onBack} tabLabel='失败' navigator={this.props.navigator} type={3}
                                  accountType={this.props.accountType}/>
                </ScrollableTabView>
            </View>
        );

    };

}

