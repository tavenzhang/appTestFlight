/**
 * Created by Allen on 2017/1/17.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

var WEBVIEW_REF = 'webview'
import {Size, indexBgColor} from '../../resouce/theme'
import PropTypes from "prop-types";
import {ASSET_Theme} from "../../asset";


export default class TCUserHTMLPay extends Component {

    static propTypes = {
        html: PropTypes.any,
        uri:PropTypes.any,
    }

    static defaultProps = {
        html: null,
        uri:null
    }

    constructor(state) {
        super(state)

    }



    render() {
        let {html,uri}=this.props
        let source = {}
        if(html){
            source= {html}
        }else{
            source= {uri}
        }
     TW_Log("TCUserHTMLPay---source--",source)
        TW_Log("TCUserHTMLPay---props--",this.props)
        return (
            <View style={ASSET_Theme.gameUIStyle.subViewContainStye}>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={source}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onError={this.onError}
                    renderError={this.renderError}
                    scalesPageToFit={true}
                />
            </View>

        );
    }

    onError = (es) => {

    }

    renderError = () => {
        return <View/>
    }


    backButtonCall() {
        if (this.state.backButtonEnabled) {
            this.refs['topNavigation']._showCloseButton(true)
            this.refs[WEBVIEW_REF].goBack()
        } else {
            NavigatorHelper.popToBack();
        }
    }

    closeButtonCall() {
        NavigatorHelper.popToBack();
    }
}


const styles = StyleSheet.create({
    container: {

    }, webStyle: {
       flex:1,
        backgroundColor: indexBgColor.mainBg,
    }
});