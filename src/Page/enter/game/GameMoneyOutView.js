import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import {observer} from 'mobx-react';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import Toast from "../../../Common/JXHelper/JXToast";
import GameWithdraw from "./withdraw/GameWithdraw";

@observer
export default class GameMoneyOutView extends Component {


    constructor(pro) {
        super(pro)
        this.userWithdrawStore = TW_Store.userWithdrawStore;
        this.state = {
            inputMoney: "",
            isBankSelected: true,
            isShowHistory: false,
            showBankCard:false,
            showAlipayCard:false
        }
    }

    componentWillMount(): void {
        TW_Store.userStore.freshBalance();
        this.userWithdrawStore.initWithdraw((res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
        this.userWithdrawStore.initDefaultBank((res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
    }

    showBank=()=> {
        this.setState({
            isBankSelected: true
        })
        this.userWithdrawStore.bank=this.userWithdrawStore.bankCard
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
    }

    showAlipay=()=> {
        if(this.userWithdrawStore.withdrawSetting.enabledAlipayWithdraw){
            this.setState({
                isBankSelected: false
            })
            this.userWithdrawStore.bank=this.userWithdrawStore.alipay
            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
        }
    }

    render() {
        let {pointerEvents} = this.props;
        let num = this.userWithdrawStore.withdrawModel.aggregateBetRequirements - this.userWithdrawStore.withdrawModel.aggregateBets
        this.state.showBankCard=this.userWithdrawStore.withdrawSetting.hasBankCard
        this.state.showAlipayCard=this.userWithdrawStore.withdrawSetting.hasAlipayCard

        return (<View style={styles.container}>
            <TCImage source={ASSET_Images.gameUI.moneyInBg} style={{width: SCREEN_W, height: SCREEN_H}}
                     resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.payTypeBg}
                     style={{position: "absolute", top: SCREEN_H * 0.14, left: 0}}/>
            <TCImage source={ASSET_Images.gameUI.payTopLeftBg} style={{
                position: "absolute",
                width: SCREEN_W * 0.30,
                height: SCREEN_H * 0.15,
                left: SCREEN_W * 0.0,
                top: 0.01
            }} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.iconMoneyOut} style={{
                position: "absolute",
                width: SCREEN_W * 0.08,
                height: SCREEN_H * 0.11,
                left: SCREEN_W * 0.03,
                top: 5
            }} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.titleMoneyOut} style={{
                position: "absolute",
                width: SCREEN_W * 0.1,
                height: SCREEN_H * 0.06,
                left: SCREEN_W * 0.11,
                top: SCREEN_H * 0.05 - 5
            }} resizeMode={'contain'}/>
            <TCImage source={ASSET_Images.gameUI.moneyBottomBg} style={{position: "absolute", right: 0, bottom: 0}}
                     resizeMode={'contain'}/>
            <TCImage source={ASSET_Images.gameUI.payBackBg}
                     style={{position: "absolute", right: 0, top: 0, width: SCREEN_W * 0.20, height: SCREEN_H * 0.12}}
                     resizeMode={'stretch'}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.payBack}
                         soundName={TW_Store.bblStore.SOUND_ENUM.returnLobbyClick}
                         onClick={() => TW_Store.gameUIStroe.isShowWithDraw = false}
                         btnStyle={{
                             position: "absolute",
                             right: -15,
                             top: 7,
                             width: SCREEN_W * 0.20,
                             height: SCREEN_H * 0.12
                         }}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnOut}
                         soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                         btnStyle={{position: "absolute", right: SCREEN_W * 0.15, top: 10}}
                         onClick={() => TW_Store.gameUIStroe.showTiXianDetail()}
            />

            <TCImage source={ASSET_Images.gameUI.payOutBg} resizeMode={'stretch'} style={{
                position: "absolute",
                top: SCREEN_H * 0.18,
                width: SCREEN_W * 0.68,
                height: SCREEN_H * 0.76,
                left: SCREEN_W * 0.27
            }}/>

            <TCImage source={ASSET_Images.gameUI.payTypeSelectBg} resizeMode={'contain'}
                     style={{position: "absolute",top:this.state.isBankSelected?SCREEN_H*0.18:SCREEN_H*0.18+110,left:0}}/>

            <TouchableOpacity onPress={this.showBank}
                              style={{position: "absolute", top: SCREEN_H * 0.18 + 15, left: SCREEN_ISFULL ? 30 : 10}}>
                <TCImage source={ASSET_Images.gameUI.payOutTypeBank}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.showAlipay}
                              style={{position: "absolute", top: SCREEN_H * 0.18 + 125, left: SCREEN_ISFULL ? 30 : 10}}>
                <TCImage source={this.userWithdrawStore.withdrawSetting.enabledAlipayWithdraw ?
                    ASSET_Images.gameUI.payOutTypeZFB : ASSET_Images.gameUI.payOutTypeZFB_notSupport}/>
            </TouchableOpacity>

            <View style={{position: "absolute", top:60,left:210}}>
                <GameWithdraw itemData={this.userWithdrawStore} isBankSelected={this.state.isBankSelected}/>
            </View>
        </View>)

    }
}

const styles = StyleSheet.create({
    container: {

        justifyContent: "center",
        alignItems: "center",
        position:"absolute"
       // alignSelf: "center",
       // backgroundColor: "transparent",
    },
    inputStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffde00",
        textAlign:"center",
        height:20
    },

});
