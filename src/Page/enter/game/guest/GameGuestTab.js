import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    WebView
} from "react-native";

import {ASSET_Images} from "../../../asset";
import TCImage from "../../../../Common/View/image/TCImage";
import {observer} from "mobx-react/native";

import PropTypes from "prop-types";
import LoadingView from "../../LoadingView";

@observer
export default class GameGuestTab extends Component {

    static propTypes = {
        itemData:PropTypes.any,
        type: PropTypes.any
    }

    isQASelected=false;
    static defaultProps = {
        type: "",
        itemData: {}
    }

    constructor(prop) {
        super(prop)
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({test:""})
        },1000)
    }

    componentWillReceiveProps(newProps) {
        this.isQASelected = newProps.isQASelected;
    }

    render() {
        return (<View style={styles.container}>
            {
                (this.isQASelected) ?
                    (<View style={{
                            position: "absolute",
                            width: SCREEN_W * 0.67,
                            height: SCREEN_H * 0.78,
                        }}>
                            <TCImage source={ASSET_Images.gameUI.guestQABg} resizeMode={'stretch'}
                                     style={{
                                         position: "absolute",
                                         width: SCREEN_W * 0.67,
                                         height: SCREEN_H * 0.80
                                     }}/>
                            <ScrollView
                                contentContainerStyle={{alignItems: 'center', marginTop:10, marginBottom: 10}}>
                                <TCImage
                                    source={ASSET_Images.gameUI.guestQuestionAns}
                                    style={{width:SCREEN_W*0.6}}
                                    resizeMode='contain'/>
                            </ScrollView>
                        </View>
                    ) : (
                        <View style={{
                            position: "absolute",
                            width: SCREEN_W * 0.67,
                            height: SCREEN_H * 0.78,
                        }}>
                            <TCImage source={ASSET_Images.gameUI.guestOSBg} resizeMode={'stretch'}
                                     style={{
                                         position: "absolute",
                                         width: SCREEN_W * 0.67,
                                         height: SCREEN_H * 0.80
                                     }}/>
                            {this.getWebView()}
                        </View>
                    )
            }
        </View>)
    }

    getWebView = () => {
        TW_Log("getWebView---TW_Store.gameUIStroe.gustWebUrl==" + TW_Store.gameUIStroe.gustWebUrl)
        let source = {
            uri: TW_Store.gameUIStroe.gustWebUrl,
        }
        return (
            <WebView source={source}
                     style={styles.webView}
                     allowFileAccess={true}
                     startInLoadingState={true}
                     renderLoading={this.onRenderLoadingView}
                     useWebKit={true}
                     onError={this.onError}/>)
    }

    onRenderLoadingView = () => {
        return (<View style={{}}>
            <LoadingView myStyle={{width:485,height:300}}/>
        </View>)
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }
}

const styles = StyleSheet.create({
    container: {
        width:SCREEN_W - 200,
        height:SCREEN_H - 88
    },
    webView: {
        margin:18,
        marginBottom:8,
        height: SCREEN_H * 0.6,
        width:SCREEN_W * 0.63,
        backgroundColor: "transparent",
    }
});
