import React, {Component} from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import {observer} from 'mobx-react';
import TWWebGameView from "../WebView/TWWebGameView";
import TCButtonView from "../../Common/View/button/TCButtonView";


@observer
export default class SubGameView extends Component {


    constructor(state) {
        super(state)
        this.state = {}
    }

    componentWillMount(): void {

    }


    render() {
        let isShow = !TW_Store.bblStore.isShowCircle&&TW_Store.bblStore.subGameParams.url!="";
        //pointerEvents={TW_Store.bblStore.subGameParams.url!="" ? "auto":"none"}
        if(this.refs.myView){
            this.refs.myView.setNativeProps({style: {zIndex:isShow ?999:-999}});
        }
        TW_Log("SubGameView--TW_Store.bblStore.isShowCircle---"+TW_Store.bblStore.isShowCircle,TW_Store.bblStore.subGameParams)
        return (<View pointerEvents={isShow ? "auto":"none"}  style={{
            position: "absolute", width:SCREEN_W,
            height: SCREEN_H,
            backgroundColor: "rgba(10,10,10,0.3)",zIndex:-999}}  ref={"myView"}>
           <TWWebGameView  {...TW_Store.bblStore.subGameParams}/>
        </View>)
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    },
    webView: {
        marginTop: 18,
        height: 250,
        width: 485,
        backgroundColor: "transparent",
    }

});