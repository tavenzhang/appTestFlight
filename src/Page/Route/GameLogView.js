import React, {Component} from 'react'
import {
    ScrollView,
    Text,
    View
} from 'react-native'
import {observer} from 'mobx-react';

import {JX_PLAT_INFO} from "../asset";


@observer
export default class GameLogView extends Component {


    render() {
        let showText= TW_Store.hotFixStore.percent<100 ? TW_Store.hotFixStore.percent:"...";
        if(TW_Store.hotFixStore.isInstalledFinish){
            showText+=".."
        }
        if (TW_Store.bblStore.isDebugApp) {
            return (<ScrollView style={{position: "absolute", height: JX_PLAT_INFO.SCREEN_H}}><Text
                style={{
                    color: "yellow",
                    fontWeight: "bold"
                }}
                pointerEvents={"none"}>{`\nversionMangernew==${JSON.stringify(TW_Store.dataStore.homeVersionM)}` +
            `\n appStore=${JSON.stringify(TW_Store.appStore)} \n--state=${JSON.stringify(this.state)}---log=${TW_Store.dataStore.log}`}</Text></ScrollView>)
        } else {
            let isShow= TW_Store.hotFixStore.percent>0;
            return (<View style={{position: "absolute",   zIndex:100010, bottom:10,left:15}} pointerEvents={"none"}>
                {isShow ? <Text style={{color:"white",fontSize:10}}>{showText}</Text>:null}
            </View>)
        }

    }
}