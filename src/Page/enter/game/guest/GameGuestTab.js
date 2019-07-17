import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    WebView,
    Dimensions,
    PixelRatio
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
        const widthPercentageToDP = widthPercent => {
            const screenWidth = Dimensions.get('window').width;
            // Convert string input to decimal number
            const elemWidth = parseFloat(widthPercent);
            return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
        };

        const heightPercentageToDP = heightPercent => {
            const screenHeight = Dimensions.get('window').height;
            // Convert string input to decimal number
            const elemHeight = parseFloat(heightPercent);
            return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
        };

        return (<View style={styles.container}>
            {
                (this.isQASelected) ?
                    (<View style={{
                            position: "absolute",
                            left: SCREEN_W > 730 ?(SCREEN_W - 717)/2:0,
                            width: SCREEN_W > 730 ? 517 : (SCREEN_W - 215),
                            height: (SCREEN_H - 100)
                        }}>
                            <TCImage source={ASSET_Images.gameUI.guestQABg} resizeMode={'stretch'}
                                     style={{
                                         position: "absolute",
                                         width: SCREEN_W > 730 ? 517 : (SCREEN_W - 215),
                                         height: (SCREEN_H - 80)
                                     }}/>
                            <ScrollView
                                contentContainerStyle={{alignItems: 'center'}}>
                                <TCImage
                                    source={ASSET_Images.gameUI.guestQuestionAns}
                                    style={{width: widthPercentageToDP('60.5%'),}}
                                    resizeMode='contain'/>
                            </ScrollView>
                        </View>
                    ) : (
                        <View style={{
                            position: "absolute",
                            left: SCREEN_W > 730 ?(SCREEN_W - 717)/2:0,
                            width: SCREEN_W > 730 ? 517 : (SCREEN_W - 200 - 40),
                            height: (SCREEN_H - 80)
                        }}>
                            <TCImage source={ASSET_Images.gameUI.guestOSBg} resizeMode={'stretch'}
                                     style={{
                                         position: "absolute",
                                         width: SCREEN_W > 730 ? 517 : (SCREEN_W - 215),
                                         height: (SCREEN_H - 80)
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
        margin: 13,
        marginTop: 21,
        marginBottom: 8,
        height: 0,
        width: SCREEN_W > 730 ? 490 : (SCREEN_W - 200 - 40),
        backgroundColor: "transparent",
    }
});
