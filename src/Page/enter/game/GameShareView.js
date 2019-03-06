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
        shareUrl:""
    }

    constructor(state) {
        super(state)
        this.state={
            isIos:G_IS_IOS,
            shareUrl:G_IS_IOS ? TW_Store.bblStore.shareURL.ios:TW_Store.bblStore.shareURL.android,
            isShowShareUI:false
        }
    }

    componentWillMount(): void {
        // if(TW_Store.gameUIStroe.gustWebUrl.length==0){
        //     TW_Store.gameUIStroe.getGustUrl();
        // }
    }


    render() {
        let {pointerEvents}=this.props;
        return (<View style={styles.container} pointerEvents={pointerEvents}>
            <TCImage source={ASSET_Images.gameShare.fengxiangBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         onClick={() => TW_Store.gameUIStroe.isShowShare = false}
                         btnStyle={{position: "absolute", right: 80, top: 60}}/>
            <TCImage source={ASSET_Images.gameShare.imgMM} style={{position: "absolute",left:0}}/>
            {this.state.isIos ?  <TCImage  source={ASSET_Images.gameShare.btnApple}
                                                style={{position: "absolute", left:232,top:115}}/>: <TCImage source={ASSET_Images.gameShare.btnAndroid}  style={{position: "absolute",left:278,top:115}}/> }


            <View style={{position: "absolute",left:350,top:150}}>
                <Text style={{color:"yellow", width:190, height: 20,fontWeight: "bold",lineNumber:1,textAlign:"center"}}>{this.state.shareUrl}</Text>
                <View style={{flexDirection:"row", alignItems:"center", marginTop: 15,justifyContent:"space-around"}}>
                    <TCButtonImg imgSource={ASSET_Images.gameShare.btn_Copy} onClick={this.onCopyLink} />
                    <TCButtonImg imgSource={ASSET_Images.gameShare.btn_wxShare} onClick={this.onWxShare}/>
                </View>
            </View>
            <TCButtonView onClick={this.onClickIos } text={""} btnStyle={{position: "absolute", width: 45, height: 26,backgroundColor: "transparent",left:232,top:115}}/>
            <TCButtonView onClick={this.onClickAndroid} text={""} btnStyle={{position: "absolute", width: 45, height: 26,backgroundColor: "transparent",left:278,top:115}}/>
            <View style={{position: "absolute",left:252,top:149}}>
                {this.state.isIos ?  <QRCode    size={50} value={TW_Store.bblStore.shareURL.ios}/>:
                    <QRCode  size={50} value={TW_Store.bblStore.shareURL.android}/>}
            </View>
                {
                    this.state.isShowShareUI ?  <View style={{position: "absolute",flex:1,backgroundColor: "red",justifyContent:"center", alignItems:"center"}}>
                        <ShareBox onClose={this.onCloseShare}/>
                    </View>:null
                }

        </View>
        )

    }

    onCloseShare=()=>{
        this.setState({isShowShareUI:false})
    }


    onClickAndroid=()=>{
        this.setState({isIos:false,shareUrl:TW_Store.bblStore.shareURL.android})
    }
    onClickIos=()=>{
        this.setState({isIos:true,shareUrl:TW_Store.bblStore.shareURL.ios})
    }

    onCopyLink=()=>{
        Clipboard.setString(this.state.shareURL);
        Toast.showShortCenter("已复制链接!")
    }

    onWxShare=()=>{
        this.setState({isShowShareUI:!this.state.isShowShareUI})
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