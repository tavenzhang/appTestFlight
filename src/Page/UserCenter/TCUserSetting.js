'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Platform,
    Linking,
    NativeModules,
    Switch,
} from 'react-native'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import {
    Size,
    indexBgColor,
    userCenterTxtColor,
    loginAndRegeisterBgColor,
    loginAndRegeisterTxtColor,
    width, height
} from '../resouce/theme'

import {observer, inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Toast from '../../Common/JXHelper/JXToast'

import NetUtils from '../../Common/Network/TCRequestUitls'
import {config, versionHotFix} from '../../Common/Network/TCRequestConfig';
import JXHelpers from '../../Common/JXHelper/JXHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import {personal} from '../asset/images'

@inject("initAppStore", "jdAppStore", "userStore", "mainStore")
@observer
export default class TCUserSetting extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'设置'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack()
                    }}/>
                {this.getUpdate()}
                <TouchableOpacity onPress={() => this.gotoAbout()}>
                    <View style={styles.setItem}>
                        <Image source={personal.toolAbout} style={styles.img}/>
                        <Text style={styles.itemTxt}>关于我们</Text>
                        <Image source={personal.imgNext} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.setItem}>
                    <Image source={personal.toolMusic} style={styles.img}/>
                    <Text style={[styles.itemTxt]}>按钮声音开关</Text>
                    <Switch
                        value={this.buttonSoundStatus}
                        style={{marginLeft: 10}}
                        onValueChange={(value) => {
                            this.props.jdAppStore.switchButtonSoundStatus(value);
                        }}/>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={() => {
                            this.exitLogin()
                        }}>
                        <Text style={{fontSize: Size.default, color: loginAndRegeisterTxtColor.loginTxt}}>
                            退出登录
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        position: 'absolute',
                        top: height - 50,
                        width: width,
                        textAlign: 'center',
                        color: userCenterTxtColor.version,
                        fontSize: Size.font14
                    }}>version {this.appVersion} {' '}
                    build {versionHotFix}</Text>
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>

        );

    };


    @computed get appVersion() {
        return this.props.initAppStore.appVersion;
    }

    @computed get buttonSoundStatus() {
        return this.props.jdAppStore.buttonSoundStatus;
    }

    getUpdate() {
        if (IS_IOS) {
            return
        } else {
            return (<TouchableOpacity onPress={() => {
                this.update()
            }}>
                <View style={styles.setItem}>
                    <Image source={personal.toolUpdate} style={styles.img}/>
                    <Text style={styles.itemTxt}>检测更新</Text>
                    <Text
                        style={{
                            marginLeft: 10,
                            color: userCenterTxtColor.version,
                            fontSize: Size.default
                        }}>当前版本:{this.appVersion}</Text>
                    <Image source={personal.imgNext} style={styles.imgNext}/>
                </View>
            </TouchableOpacity>)
        }
    }

    update() {
        this._modalLoadingSpinnerOverLay.show()
        this.props.jdAppStore.checkAppVersionUpdate((response) => {
            if (response.rs) {
                if (response.content && response.content.version > this.appVersion) {
                    this.openDownUrl(response.content.downPath)
                } else {
                    Toast.showShortCenter('已经是最新版本了!')
                }
            }
            this._modalLoadingSpinnerOverLay.hide()
        })
    }

    openDownUrl(url) {
        try {
            NativeModules.JXHelper.updateApp(url)
        } catch (e) {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    JXLog('无法打开该URL:' + url);
                }
            })
        }
    }

    gotoAbout() {
        let res = JXHelpers.getGeneralContents('ABOUTUS')
        if (res) {
            NavigatorHelper.pushToWebView(res, '关于我们')
        } else {
            NavigatorHelper.pushToWebView('http://www.mlsy555.com/web/phone/about_us/index.html', '关于我们')
        }
    }

    goBack() {
        RCTDeviceEventEmitter.emit('balanceChange')
        NavigatorHelper.popToBack();
    }

    /**
     * 退出登录
     */
    exitLogin() {
        this._modalLoadingSpinnerOverLay.show()
        this.props.userStore.exitAppToLoginPage(res => {
            this._modalLoadingSpinnerOverLay.hide();
            if (res.rs) {
                NavigatorHelper.popToTop();
                this.props.mainStore.changeTab("home");
            } else {
                Toast.showShortCenter(res.message ? res.message : "服务器异常，退出失败！")
            }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
        height: height
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 20
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: width * 0.9
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 23,
        left: width * 0.9 - 110,
    },
    itemRightTxt: {
        width: 84,
        fontSize: Size.small,
        marginRight: 10,
        color: '#ddd',
    },
    pointStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: userCenterTxtColor.msgPiontBg,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointTxt: {
        color: userCenterTxtColor.msgPiontTxt,
        fontSize: Size.font10
    },
    imgNextFeedback: {
        width: 10,
        height: 15,
    },
    setItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginTop: 1,
    },
    itemTxt: {
        marginLeft: 10,
        fontSize: Size.font16,
        color: userCenterTxtColor.settingTitle
    },
    bottomBarButtonStyle: {
        backgroundColor: loginAndRegeisterBgColor.loginBtn,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 40
    },
});
