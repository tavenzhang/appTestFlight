/**
 * Created by Sam on 16/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    Dimensions
} from 'react-native';

import TopNavigationBar from '../../Common/View/TCNavigationBar';
import TCRequestUtils from '../../Common/Network/TCRequestUitls'
import {config} from '../../Common/Network/TCRequestConfig'
import Toast from '../../Common/JXHelper/JXToast'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import {width, indexBgColor} from '../resouce/theme'
var WEBVIEW_REF = 'webview';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCWebView extends Component {
    constructor(state) {
        super(state)
        this.clickCount = 1
        this.state = {
            url: this.props.url,
            title: this.props.title
        }
    }

    static defaultProps = {
        url: '',
        title: ''
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title={this.state.title}
                                  ref="topNavigation"
                                  backButtonCall={() => {
                                      this.backButtonCall()
                                  }}
                                  closeButtonCall={() => {
                                      this.closeButtonCall()
                                  }}
                                  midCall={() => {
                                      this.midCall()
                                  }}
                />
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={{uri: this.props.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                />
            </View>
        );
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };

    onNavigationStateChange = (navState) => {
        JXLog(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false
        });
    };

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

    midCall() {
        if (this.state.title === '关于我们') {
            this.sendRequest();
        } else {
            return null;
        }
    }

    sendRequest() {
        if (this.clickCount != 10) {
            this.clickCount++
            return
        }
        if (this.clickCount === 10) {
            TCRequestUtils.PostUrlAndParamsAndCallback(config.api.applyWhite, null, (res) => {
                    if (res.rs) {
                        Toast.showShortCenter('申请已经提交,请等待管理员审核!')
                    }
                }
            )
        }

        this.clickCount = 1
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    webView: {
        marginTop: 0,
        width: width,
    }

});
