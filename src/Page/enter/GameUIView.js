import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../asset";
import TCButtonView, {TCButtonImg} from "../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../Common/View/TCTextInput";
import TCText from "../../Common/View/widget/TCText";
import GameUserInfoView from "./game/GameUserInfoView";
import {G_LayoutAnimaton} from "../../Common/Global/G_LayoutAnimaton";
import GameGuestView from "./game/GameGuestView";
import GameMoneyOutView from "./game/GameMoneyOutView";
import GameMoneyInView from "./game/GameMoneyInView";
import BaseGameAlert from "./game/pay/BaseGameAlert";


@observer
export default class GameUIView extends Component {
    constructor(prop) {
        super(prop);
    }

    componentWillUpdate(nextProps, nextState, nextContext: any): void {
        G_LayoutAnimaton.configureNext(G_LayoutAnimaton.springNoDelete)
    }

    render() {
        let gameAlertView = TW_Store.gameUIStroe.gameAlertData;

        let SubComponet = gameAlertView.component;
        return (<View style={styles.container}>
            {TW_Store.gameUIStroe.isShowUserInfo ? <GameUserInfoView/> : null}
            {TW_Store.gameUIStroe.isShowWithDraw ? <GameMoneyOutView/> : null}
            {TW_Store.gameUIStroe.isShowAddPayView ? <GameMoneyInView/> : null}
            {TW_Store.gameUIStroe.isShowGuest ? <GameGuestView/> : null}
            {
                gameAlertView.component ? <BaseGameAlert title={gameAlertView.title} onClose={() => {
                    TW_Store.gameUIStroe.hideAlertUI();
                    if (gameAlertView.onBack) {
                        gameAlertView.onBack();
                    }
                }
                }>
                    <SubComponet {...gameAlertView.param}/>
                </BaseGameAlert> : null
            }

        </View>)

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: JX_PLAT_INFO.SCREEN_H,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 150
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    }

});
