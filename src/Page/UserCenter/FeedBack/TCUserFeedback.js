/**
 * Created by allen-jx on 2017/5/11.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Platform} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';
import Toast from '../../../Common/JXHelper/JXToast';
import dismissKeyboard from 'dismissKeyboard';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NetUtils from '../../../Common/Network/TCRequestUitls';
import {config} from '../../../Common/Network/TCRequestConfig';
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";
import {
    Size, width, height, indexBgColor, userCenterTxtColor, loginAndRegeisterBgColor, loginAndRegeisterTxtColor,
    loginAndRegeisterBorderColor
} from '../../resouce/theme';

export default class TCUserFeedback extends Component {
    title = '';
    content = '';

    constructor(state) {
        super(state);
        this.state = {contentNumber: 0};
    }

    requestServer() {
        let data = {title: this.title, content: this.content};
        NetUtils.PostUrlAndParamsAndCallback(config.api.userFeedback, data, (res) => {
            this._partModalLoadingSpinnerOverLay.hide();
            if (res.rs) {
                this.timer = setTimeout(() => {
                    RCTDeviceEventEmitter.emit('feedbackListRefresh');
                    this.goBack();
                }, 500)
            } else {
                if (res.message) {
                    Toast.showShortCenter(res.message);
                } else {
                    Toast.showShortCenter('服务器错误，登录失败!');
                }
            }
        }, null, false);
    }

    goBack() {
        Helper.popToBack()
    }

    submitFeedback() {
        if (this.title.length === 0) {
            Toast.showShortCenter("请输入标题!");
            return;
        }
        if (this.content.length === 0) {
            Toast.showShortCenter("请输入内容!");
            return;
        }
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show();
        this.requestServer();
    }

    onChangeTitle(text) {
        this.title = text;
    }

    onChangeContent(text) {
        this.content = text;
        this.setState({contentNumber: this.content.length});
    }

    renderContent() {
        return (
            <View style={styles.contentContainer}>
                <Text style={styles.content}>内容</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.contentInput}
                        placeholder={'请输入100字以内的反馈内容'}
                        multiline
                        returnKeyType='done'
                        blurOnSubmit
                        underlineColorAndroid='transparent'
                        maxLength={100}
                        onChangeText={(text) => this.onChangeContent(text)}
                    />
                    <Text style={styles.lastContentTip}>{this.state.contentNumber}/100</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'意见反馈'}
                    needBackButton
                    backButtonCall={() => this.goBack()}
                />
                <ScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                    keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
                >
                    <View style={styles.totalContent}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>标题</Text>
                            <TextInput
                                style={styles.titleInput}
                                placeholder={'请输入25字以内的反馈标题'}
                                underlineColorAndroid='transparent'
                                maxLength={25}
                                onChangeText={(text) => this.onChangeTitle(text)}
                            />
                        </View>
                        {this.renderContent()}
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.submitFeedback()}
                            >
                                <Text style={styles.buttonText}>提 交</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancel]}
                                onPress={() => this.goBack()}>
                                <Text style={styles.buttonText}>取 消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal
                    marginTop={64}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    totalContent: {
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        marginTop: 20,
    },
    title: {
        fontSize: Size.default,
        color: userCenterTxtColor.feedBackTitle,
    },
    titleInput: {
        height: 50,
        flex: 1,
        paddingLeft: 5,
        fontSize: Size.font17,
        width: width * 0.8,
        color: loginAndRegeisterTxtColor.inputTxt,
        borderWidth: 1,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        backgroundColor: loginAndRegeisterBgColor.inputBg,
        borderRadius: 5,
        marginLeft: 10,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.8,
        marginTop: 10,
        height: height * 0.4,
        flexDirection: 'row',
    },
    content: {
        fontSize: Size.default,
        color: userCenterTxtColor.feedBackTitle,
    },
    inputContainer: {
        justifyContent: 'space-around',
        height: height * 0.4,
        width: width * 0.8,
        marginLeft: 10,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        backgroundColor: loginAndRegeisterBgColor.inputBg,
    },
    contentInput: {
        height: height * 0.37,
        fontSize: Size.font17,
        textAlignVertical: 'top',
        color: loginAndRegeisterTxtColor.inputTxt,
    },
    lastContentTip: {
        marginTop: -height * 0.01,
        marginRight: 5,
        height: height * 0.04,
        fontSize: Size.font17,
        textAlign: 'right',
        color: loginAndRegeisterBorderColor.inputBorder,
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 50,
    },
    button: {
        backgroundColor: loginAndRegeisterBgColor.loginBtn,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.2,
        marginHorizontal: 20,
    },
    cancel: {
        marginLeft: 30,
    },
    buttonText: {
        color: loginAndRegeisterTxtColor.loginTxt,
        fontWeight: 'bold',
        fontSize: Size.large,
    },
})
