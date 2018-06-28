'use strict'
/**
 * Created by Joyce on 2017/10/17.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import _ from 'lodash';

import dismissKeyboard from 'dismissKeyboard';
import {Size, width, height} from '../../Page/resouce/theme'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {
    StyleSheet,
    View,
    WebView,
    Text,
    Platform
} from 'react-native';
import Helper from '../../Common/JXHelper/TCNavigatorHelper'
import JXHelpers from '../../Common/JXHelper/JXHelper'

import {indexBgColor} from '../resouce/theme'
import Base64 from "../../Common/JXHelper/Base64";

let base64 = new Base64()
let WEBVIEW_REF = 'webview';
const FREEPLAY = '免费试玩';
const REGISTER = '立即注册';
const AGREEMENT = '用户购彩服务协议';
const TOFREEPLAY = 'to_guest_register';
const TOREGISTER = 'to_register';
const TOAGREEMENT = 'to_agreement';

export default class TCUserRegister extends Component {

    constructor(props) {
        super(props)
        this.isGuestValue = props.isGuest;
        this.registerWebViewSource = JXHelpers.getWebUserRegister();
        this.backButtonEnabled = false;//是否可以回退
        if (this.isGuestValue) {
            this.originTitle = FREEPLAY;
            this.state = {title: FREEPLAY};
            this.registerWebViewSource = `${this.registerWebViewSource}/guest?registerId=${TCUSER_DEVICE_TOKEN}`;
        } else {
            this.originTitle = REGISTER;
            this.state = {title: REGISTER};
            if (!_.isEmpty(TC_DEFAULT_AFFCODE)) {
                this.registerWebViewSource = `${this.registerWebViewSource}?app=${TC_DEFAULT_AFFCODE}&registerId=${TCUSER_DEVICE_TOKEN}`
            } else {
                this.registerWebViewSource = `${this.registerWebViewSource}?registerId=${TCUSER_DEVICE_TOKEN}`
            }
        }
        this.type = '';
    }

    static defaultProps = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={this.state.title}
                    needBackButton={true}
                    backButtonCall={() => this.back()}
                />
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={{uri: this.registerWebViewSource}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    onMessage={(event) => {
                        this.pareDataFromWebView(event.nativeEvent.data)
                    }}
                    scalesPageToFit={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    onLoadEnd={this.onLoadEnd}
                    renderError={this.renderError}
                />
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </ View>
        );
    }

    pareDataFromWebView(data) {
        if (data.indexOf('setImmediate') >= 0) {
            //在低版本会有问题，需要过滤
            return;
        }
        // JXLog("hehehe data"+data);
        let jsonData = JSON.parse(data);
        this.type = jsonData.action;
        switch (this.type) {
            case 'register_success':
                if (1 || jsonData.isGuest) {
                    let user = jsonData.payload;
                    user.password = jsonData.commId;
                    user.islogin = true
                    this.freePlayRegisterSuccess(user);
                } else {
                    this.registerSuccess(jsonData.payload, true);
                }
                break;
            case 'to_login':
                if (this.isGuestValue || this.props.fromLoginToRegister) {
                    Helper.popToBack()
                } else {
                    Helper.pushToUserLogin(true, null, true);
                }
                break;
            case TOAGREEMENT:
                if (Platform.OS === 'ios') {
                    let url = JXHelpers.getGeneralContents('PROTOCOL');
                    Helper.pushToWebView(url, '用户购彩服务协议');
                    return
                }
            case TOFREEPLAY:
            case TOREGISTER:
                this._modalLoadingSpinnerOverLay.show();
                break;
        }

    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    }

    onNavigationStateChange = (navState) => {
        this.backButtonEnabled = navState.canGoBack;
        let url = navState.url;
        //因为ios 那里收不到onMessage的部分回调，所以统一两端采用这个方式
        if (url.indexOf('guest') > 0 && navState.loading && this.state.title !== '免费试玩') {
            this.setState({title: '免费试玩'});
            return;
        }

        if (url.indexOf('guest') < 0 && navState.title === '注册' && this.state.title !== '立即注册') {
            this.setState({title: '立即注册'});
            return;
        }

        if (navState.title === '用户购彩协议' && !navState.loading && this.state.title !== '用户购彩服务协议') {
            this.setState({title: '用户购彩服务协议'});
        }
    }

    onLoadEnd = () => {
        this._modalLoadingSpinnerOverLay.hide();
    }

    renderError = () => {
        return (
            <View style={styles.errorView}>
                <Text>网页加载失败!</Text>
            </View>
        );
    }

    back() {
        dismissKeyboard();
        if (this.backButtonEnabled && !_.isEqual(this.state.title, this.originTitle)) {
            this.refs[WEBVIEW_REF].goBack();
        } else {
            Helper.popToBack();
        }
    }

    // onBackAndroid() {
    //     if (this.refs[WEBVIEW_REF]) {
    //         this.back();
    //     } else {
    //         this.props.navigator.popToTop();
    //     }
    // }

    registerSuccess(userName, fromRegister) {
        dismissKeyboard();
        Helper.pushToUserLogin(false, userName, true, fromRegister);
    }

    freePlayRegisterSuccess(user) {
        RCTDeviceEventEmitter.emit('userBankChange');
        RCTDeviceEventEmitter.emit('userStateChange');
        RCTDeviceEventEmitter.emit('userStateChange', 'login');
        user.password = base64.encode(user.password);
        storage.save({
            key: 'user',
            data: user
        });
        storage.save({
            key: 'balance',
            data: user.balance
        });
        RCTDeviceEventEmitter.emit('balanceChange');
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine');
        Helper.popToTop();
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
    },
    errorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
