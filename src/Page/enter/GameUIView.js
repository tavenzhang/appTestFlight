import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal
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
import GameShareView from "./game/GameShareView";
import BaseUserAccAlert from "./game/pay/BaseUserAccountAlert";


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
        let isHaveAletView = gameAlertView.component ? "none" : "auto";
        let isShowUi=TW_Store.gameUIStroe.isShowUserInfo||TW_Store.gameUIStroe.isShowWithDraw||TW_Store.gameUIStroe.isShowAddPayView
            ||TW_Store.gameUIStroe.isShowAddPayView|| TW_Store.gameUIStroe.isShowGuest ||gameAlertView.component||TW_Store.gameUIStroe.isShowShare


        return (isShowUi ?  <SubGameView/>:null)

        // if(isShowUi)
        // {
        //     return (<View style={styles.container}>
        //         {TW_Store.gameUIStroe.isShowUserInfo ? <GameUserInfoView pointerEvents={isHaveAletView}/> : null}
        //         {TW_Store.gameUIStroe.isShowWithDraw ? <GameMoneyOutView pointerEvents={isHaveAletView}/> : null}
        //         {TW_Store.gameUIStroe.isShowAddPayView ? <GameMoneyInView pointerEvents={isHaveAletView}/> : null}
        //         {TW_Store.gameUIStroe.isShowGuest ? <GameGuestView   pointerEvents={isHaveAletView}/> : null}
        //         {TW_Store.gameUIStroe.isShowShare ? <GameShareView   pointerEvents={isHaveAletView}/> : null}
        //         {
        //             gameAlertView.component ? <BaseGameAlert title={gameAlertView.title} onClose={() => {
        //                 TW_Store.gameUIStroe.hideAlertUI();
        //                 if (gameAlertView.onBack) {
        //                     gameAlertView.onBack();
        //                 }
        //             }
        //             }>
        //                 <SubComponet {...gameAlertView.param}/>
        //             </BaseGameAlert> : null
        //         }
        //
        //     </View>)
        // }else
        // {
        //     return null;
        // }
    }
}

@observer
class SubGameView extends Component {
    constructor(props) {
        super(props)
        this.state={
            isShow:false
        }
    }


    componentWillUpdate(nextProps, nextState, nextContext: any): void {
        G_LayoutAnimaton.configureNext(G_LayoutAnimaton.springNoDelete)
    }

    componentDidMount(): void {
         setTimeout(()=>{
             this.setState({isShow:true})},100);
    }

    render() {
        let gameAlertView = TW_Store.gameUIStroe.gameAlertData;
        let SubComponet = gameAlertView.component;
        let isHaveAletView = gameAlertView.component ? "none" : "auto";

        if(this.state.isShow){
            return (
                <View style={styles.container}>
                    {TW_Store.gameUIStroe.isShowUserInfo ? <GameUserInfoView pointerEvents={isHaveAletView}/> : null}
                    {TW_Store.gameUIStroe.isShowWithDraw ? <GameMoneyOutView pointerEvents={isHaveAletView}/> : null}
                    {TW_Store.gameUIStroe.isShowAddPayView ? <GameMoneyInView pointerEvents={isHaveAletView}/> : null}
                    {TW_Store.gameUIStroe.isShowGuest ? <GameGuestView pointerEvents={isHaveAletView}/> : null}
                    {TW_Store.gameUIStroe.isShowShare ? <GameShareView pointerEvents={isHaveAletView}/> : null}
                    {
                        !gameAlertView.isUserAccount&&gameAlertView.component ? <BaseGameAlert title={gameAlertView.title} onClose={() => {
                            TW_Store.gameUIStroe.hideAlertUI();
                            if (gameAlertView.onBack) {
                                gameAlertView.onBack();
                            }
                        }
                        }>
                            {SubComponet ?  <SubComponet {...gameAlertView.param}/>:null}
                        </BaseGameAlert> : null
                    }
                    {
                        gameAlertView.isUserAccount&&gameAlertView.component ? <BaseUserAccAlert {...gameAlertView.param} title={gameAlertView.title} onClose={() => {
                            TW_Store.gameUIStroe.hideAlertUI();
                            if (gameAlertView.onBack) {
                                gameAlertView.onBack();
                            }
                        }
                        }>
                            {SubComponet ?  <SubComponet {...gameAlertView.param}/>:null}
                        </BaseUserAccAlert> : null
                    }
                </View>)
        }
       else{
           return null;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        height: JX_PLAT_INFO.SCREEN_H,
        width:JX_PLAT_INFO.SCREEN_W,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
       // backgroundColor: G_IS_IOS ? "rgba(10,10,10,0.6)":"transparent",
      //  backgroundColor: "rgba(10,10,10,0.3)"
    },
});
