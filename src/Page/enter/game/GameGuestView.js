import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import PropTypes from "prop-types";

@observer
export default class GameGuestView extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
    }

    constructor(state) {
        super(state)
    }

    componentWillMount(): void {
        if(TW_Store.gameUIStroe.gustWebUrl.length==0){
            TW_Store.gameUIStroe.getGustUrl();
        }
    }


    render() {
        let {pointerEvents}=this.props;

        return (<View style={styles.container} pointerEvents={pointerEvents}>
            <TCImage source={ASSET_Images.gameUI.guestBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         onClick={() => TW_Store.gameUIStroe.isShowGuest = false}
                         btnStyle={{position: "absolute", right: 0, top: 0}}/>
            <View style={{position: "absolute",}}>
                {this.getWebView()}
            </View>

        </View>)

    }


    getWebView = () => {
        TW_Log("getWebView---TW_Store.gameUIStroe.gustWebUrl=="+TW_Store.gameUIStroe.gustWebUrl)
        let source = {
            uri: TW_Store.gameUIStroe.gustWebUrl,
        }
        return (
            <WKWebView source={source}
                       style={styles.webView}
                       allowFileAccess={true}
        />)
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
        marginTop:18,
        height:250,
        width:485,
        backgroundColor: "transparent",
    }

});