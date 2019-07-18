import React, {Component} from 'react'
import {
    ScrollView,
    Text,
} from 'react-native'
import {observer} from 'mobx-react';

import {JX_PLAT_INFO} from "../asset";


@observer
export default class GameLogView extends Component {


    render() {

        if (TW_Store.bblStore.isDebugApp) {
            return (<ScrollView style={{position: "absolute", height: JX_PLAT_INFO.SCREEN_H}}><Text
                style={{
                    color: "yellow",
                    fontWeight: "bold"
                }}
                pointerEvents={"none"}>{`\nversionMangernew==${JSON.stringify(TW_Store.dataStore.homeVersionM)}` +
            `\n appStore=${JSON.stringify(TW_Store.appStore)} \n--state=${JSON.stringify(this.state)}---log=${TW_Store.dataStore.log}`}</Text></ScrollView>)
        } else {
            return null
        }

    }
}