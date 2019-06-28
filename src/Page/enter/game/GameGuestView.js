import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView,
    TouchableOpacity
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import PropTypes from "prop-types";
import GameGuestTab from "./guest/GameGuestTab";

@observer
export default class GameGuestView extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any
    }

    static defaultProps = {
        isSelected: false,

    }

    constructor(state) {
        super(state)
        this.state = {
            isQASelected: false
        }
    }

    componentWillMount(): void {
        if(TW_Store.gameUIStroe.gustWebUrl.length==0){
           // TW_Store.bblStore.getAppData();
            TW_Store.gameUIStroe.getGustUrl();
        }
    }

    showQA=()=> {
        if(!this.state.isQASelected){
            this.setState({isQASelected:true})
        }
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
    }

    showCustomerService=()=>{
        if(this.state.isQASelected){
            this.setState({isQASelected:false})
        }
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
    }

    render() {
        let {pointerEvents}=this.props;

        return (<View style={styles.container} pointerEvents={pointerEvents}>

            <TCImage source={ASSET_Images.gameUI.moneyInBg} style={{width: SCREEN_W, height: SCREEN_H}}
                     resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.payTopLeftBg} style={{
                position: "absolute",
                width: SCREEN_W * 0.30,
                height: SCREEN_H * 0.15,
                left: SCREEN_W * 0.0,
                top: 0.01
            }} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.guestIcon} style={{
                position: "absolute",
                width: SCREEN_W * 0.05,
                height: SCREEN_H * 0.1,
                left: SCREEN_W * 0.04,
                top: 8
            }} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.guestTxt} style={{
                position: "absolute",
                width: SCREEN_W * 0.1,
                height: SCREEN_H * 0.06,
                left: SCREEN_W * 0.11,
                top: SCREEN_H * 0.05 -1
            }} resizeMode={'contain'}/>
            <TCImage source={ASSET_Images.gameUI.guestBottomBg} style={{position: "absolute", right: 0, bottom: 0}}
                     resizeMode={'contain'}/>
            <TCImage source={ASSET_Images.gameUI.payBackBg}
                     style={{position: "absolute", right: 0, top: 0, width: SCREEN_W * 0.20, height: SCREEN_H * 0.12}}
                     resizeMode={'stretch'}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.payBack}
                         soundName={TW_Store.bblStore.SOUND_ENUM.returnLobbyClick}
                         onClick={() => TW_Store.gameUIStroe.isShowGuest = false}
                         btnStyle={{
                             position: "absolute",
                             right: -15,
                             top: 7,
                             width: SCREEN_W * 0.20,
                             height: SCREEN_H * 0.12
                         }}/>
            <TCImage source={ASSET_Images.gameUI.payTypeBg}
                     style={{position: "absolute", top: SCREEN_H * 0.14, left: 0}}/>
            <TouchableOpacity onPress={this.showCustomerService}
                              style={{position: "absolute", top: SCREEN_H * 0.18 + 15, left: SCREEN_ISFULL ? 30 : 10}}>
                <View style={{justifyContent: "center", height: 30}}>
                    <TCImage source={this.state.isQASelected ? ASSET_Images.gameUI.btnPayNormal : ASSET_Images.gameUI.btnPayHight}/>
                    <View style={{position: "absolute", alignItems: "center", justifyContent: "center"}}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <TCImage source={this.state.isQASelected?ASSET_Images.gameUI.guestOS:ASSET_Images.gameUI.guestOSSelected}
                                     soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showQA}
                              style={{position: "absolute", top: SCREEN_H * 0.18 + 70, left: SCREEN_ISFULL ? 30 : 10}}>
                <View style={{justifyContent: "center", height: 30}}>
                    <TCImage source={this.state.isQASelected ? ASSET_Images.gameUI.btnPayHight : ASSET_Images.gameUI.btnPayNormal}/>
                    <View style={{position: "absolute", alignItems: "center", justifyContent: "center"}}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <TCImage source={this.state.isQASelected?ASSET_Images.gameUI.guestQASelected:ASSET_Images.gameUI.guestQA}
                                     soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{position: "absolute", top:60,left:180}}>
                <GameGuestTab isQASelected={this.state.isQASelected}/>
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        /*flex: 1,*/
        justifyContent: "center",
        alignItems: "center",
        /*backgroundColor: "transparent",
        position: "absolute",*/
    }
});
