

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';


import {Size} from "../../resouce/theme";
import TCNavigationBar from "../../../Common/View/TCNavigationBar";
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Other, ASSET_Screen, ASSET_Theme} from "../../asset";
import TCButtonView from "../../../Common/View/button/TCButtonView";

export default class TCVipAwardView extends Component {
    constructor(state) {
        super(state)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={ASSET_Theme.themeViewStyle.containView}>
            <TCNavigationBar
                    title={'晋级奖励'}
                    needBackButton={true}
                    backButtonCall={JX_NavHelp.popToBack}/>
            <ScrollView>
                <TCImage style={{width:ASSET_Screen.JX_PLAT_INFO.SCREEN_W,height:130, marginBottom:5}} source={ASSET_Other.Other.mg_holder}/>
                <View style={styles.itemContain}>
                        <Text style={{fontSize:Size.font16}}>当前等级:</Text>
                    <Text style={{marginLeft:15}}>Vip5</Text>
                </View>
                <View style={styles.itemContain}>
                    <Text style={{fontSize:Size.font16}}>晋级奖励:</Text>
                    <Text style={{marginLeft:15}}>Vip5</Text>
                </View>
                <View style={styles.itemContain}>
                    <Text style={{fontSize:Size.font16}}>我的有效投注量:</Text>
                    <Text style={{marginLeft:15}}>Vip5</Text>
                </View>
                <TCButtonView btnStyle={{marginHorizontal:20, marginTop:15, borderRadius:10,height:40}} text={"在投注领取vip6"}/>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   itemContain:{
       flexDirection:"row",
       paddingVertical:5,
       paddingHorizontal:10
   }
});