import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView, Clipboard
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import PropTypes from "prop-types";
import Toast from "../../../Common/JXHelper/JXToast";
import TCButtonView from "../../../Common/View/button/TCButtonView";
import QRCode from 'react-native-qrcode-svg';
import ShareBox from "./pay/ShareBox";
import TCUserOpenPayApp from "../../UserCenter/UserPay/TCUserOpenPayApp";

@observer
export default class GameShareView extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any,
        pointerEvents:PropTypes.any,
    }

    static defaultProps = {
        isSelect: false,
        surl:""
    }

    constructor(state) {
        super(state)
        this.state={
            isIos:G_IS_IOS,
            surl:G_IS_IOS ? TW_Store.bblStore.shareURL.ios:TW_Store.bblStore.shareURL.android,
            isShowShareUI:false
        }
    }

    componentWillMount(): void {
        if(TW_Store.gameUIStroe.gustWebUrl.length==0){
            TW_Store.bblStore.getAppData();
        }
    }

    render() {
        let {pointerEvents}=this.props;
        return (<View style={styles.container} pointerEvents={pointerEvents}>
            <TCImage source={ASSET_Images.gameShare.fengxiangBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         soundName={TW_Store.bblStore.SOUND_ENUM.close}
                         onClick={() => TW_Store.gameUIStroe.isShowShare = false}
                         btnStyle={{position: "absolute", right: 80, top: 60}}/>
            <TCImage source={ASSET_Images.gameShare.imgMM} style={{position: "absolute",left:0}}/>
            {this.state.isIos ?  <TCImage  source={ASSET_Images.gameShare.btnApple}
                                           style={{position: "absolute", left:232,top:115}}/>: <TCImage source={ASSET_Images.gameShare.btnAndroid}
                                                                                                             style={{position: "absolute",left:278,top:115}}/> }

            <View style={{position: "absolute",left:350,top:150}}>
                <Text style={{color:"yellow", width:190, height: 20,fontWeight: "bold",textAlign:"center"}}>{this.state.surl}</Text>
                <View style={{flexDirection:"row", alignItems:"center", marginTop: 15,justifyContent:"space-around"}}>
                    <TCButtonImg  imgSource={ASSET_Images.gameShare.btn_Copy} onClick={this.onCopyLink} />
                    <TCButtonImg  soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}  imgSource={ASSET_Images.gameShare.btn_wxShare} onClick={this.onWxShare}/>
                </View>
            </View>
            <TCButtonView  soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick} onClick={this.onClickIos } text={""} btnStyle={{position: "absolute", width: 45, height: 26,backgroundColor: "transparent",left:232,top:115}}/>
            <TCButtonView   soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick} onClick={this.onClickAndroid} text={""} btnStyle={{position: "absolute", width: 45, height: 26,backgroundColor: "transparent",left:278,top:115}}/>
            <View style={{position: "absolute",left:252,top:149}}>
                {this.state.isIos ?  <QRCode size={50} value={this.state.surl}/>:
                    <QRCode  size={50} value={this.state.surl}/>}
            </View>
                {
                    this.state.isShowShareUI ? <View style={{position: "absolute",flex:1,justifyContent:"center", alignItems:"center"}}>
                        <ShareBox onClose={this.onCloseShare} url={this.state.surl}/>
                    </View>:null
                }
            </View>
        )
    }

    onCloseShare=()=>{
        this.setState({isShowShareUI:false})
    }

    onClickAndroid=()=>{
        this.setState({isIos:false,surl:TW_Store.bblStore.shareURL.android})
    }
    onClickIos=()=>{
        this.setState({isIos:true,surl:TW_Store.bblStore.shareURL.ios})
    }

    onCopyLink=()=>{
        TW_Log("onWxShare-onCopyLink--pre--"+this.state.surl+"--isIOS--"+this.state.isIos,this.state)
        Clipboard.setString(this.state.surl);
        TW_Log("onWxShare-onCopyLink--"+this.state.surl,this.state)
        Toast.showShortCenter("已复制链接!")
    }

    onWxShare=()=>{
        this.setState({isShowShareUI:!this.state.isShowShareUI})
        // TW_Log("onWxShare---"+this.state.surl,this.state)
        // Clipboard.setString(this.state.surl);
        // TCUserOpenPayApp.openWX()
    }

    // getWebView = () => {
    //     TW_Log("getWebView---TW_Store.gameUIStroe.gustWebUrl=="+TW_Store.gameUIStroe.gustWebUrl)
    //     let source = {
    //         uri: TW_Store.gameUIStroe.gustWebUrl,
    //     }
    //     return (
    //         <WKWebView source={source}
    //                    style={styles.webView}
    //                    allowFileAccess={true}
    //         />)
    // }
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
        marginTop:18,
        height:250,
        width:485,
        backgroundColor: "transparent",
    }
});