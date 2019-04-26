import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'

import {observer} from 'mobx-react/native';
import rootStore from "../../Data/store/RootStore";
import {JX_PLAT_INFO} from "../asset/screen";
import * as Progress from 'react-native-progress';

@observer // 通用全局弹窗 借助mobox 实现通用弹窗控制 减少重复代码
export default class CommonBoxLayer extends Component {

    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     setInterval(() => {
    //         rootStore.commonBoxStore.spinState.visible ? rootStore.commonBoxStore.hideSpin() : rootStore.commonBoxStore.showSpin({backgroundColor: "rgba(0, 0, 0, 0.3)"})
    //     }, 2000)
    // }.toFixed(2)

    render() {

        let store = TW_Store.commonBoxStore;
        TW_Log("commonBoxStore.SCREEN_W---",store);
        let percent =(store.curPecent/store.totalPecent).toFixed(2);
        if(store.isShow){
            return (<View style={styles.container} pointerEvents={"none"}>
                <View style={{paddingHorizontal:30, paddingVertical:40, borderRadius: 20,backgroundColor:'rgba(0, 0, 0, 0.5)', justifyContent:"center",
                    alignItems:"center"}}>
                    <Text style={{color:"yellow", textAlign: "center",marginBottom:15}}>{store.txtHint+"\n"+parseInt(percent*100)+"%"}</Text>
                    <Progress.Bar
                        progress={percent}
                        width={200}/>
                </View>
            </View>);
        }else{
            return null
        }
        //暂时只 放置一个spinLoader

    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:JX_PLAT_INFO.SCREEN_H,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        position: "absolute",
        backgroundColor:"transparent",
        zIndex: 300
    },

});
