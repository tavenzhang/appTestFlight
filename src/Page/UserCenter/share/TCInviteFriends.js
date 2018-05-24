import Helper from "../../../Common/JXHelper/TCNavigatorHelper";

'use-strict';
import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity, Clipboard, Linking} from 'react-native';
import {Size, width} from "../../resouce/theme";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import JXHelper from '../../../Common/JXHelper/JXHelper';
import TCUserOpenPayApp from '../UserPay/TCUserOpenPayApp';
import {observer} from "mobx-react/native";
import {inviteFriends} from '../../resouce/images';
import QRCode from 'react-native-qrcode';
import Toast from "../../../Common/JXHelper/JXToast";

let userOpenPayApp = new TCUserOpenPayApp()

@observer
export default class TCInviteFriends extends React.Component {

    copy(url) {
        Clipboard.setString(url);
        Toast.showShortCenter("下载地址已复制！")
    }

    openUrl(url) {
        Clipboard.setString(url);
        Linking.canOpenURL('weixin://').then(supported => {
            if (supported) {
                Toast.showShortCenter("下载地址已复制，进入微信分享给您的好友吧")
                userOpenPayApp.openWeChat()
            } else {
                Linking.openURL(url);
            }
        }).catch(err => console.log('InviteFriends#onOpenOuter()', err))
    }

    render() {
        const wapShareUrl = JXHelper.getShareUrl4Wap()
        const iosShareUrl = JXHelper.getShareUrl4Ios()
        const androidShareUrl = JXHelper.getShareUrl4Android()
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'分享好友'}
                    needBackButton
                    backButtonCall={() => Helper.popToBack()}/>
                <ScrollView style={{flex: 1}}>
                    <Image source={inviteFriends.inviteLogo} style={styles.inviteLogo} resizeMode={'contain'}/>

                    <Image source={inviteFriends.inviteStep1} style={styles.stepImage} resizeMode={'contain'}/>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepText}>分享好友，访问官方地址下载APP</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.stepText}>下载地址</Text>
                            <Text style={styles.stepTextHighlight}>{`【${wapShareUrl}】`}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 10}}>
                            <TouchableOpacity activeOpacity={0.6} onPress={()=>this.copy(wapShareUrl)}>
                                <Image source={inviteFriends.inviteLink} style={styles.copyLinkImage} resizeMode={'contain'}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={()=>this.openUrl(wapShareUrl)}>
                                <Image source={inviteFriends.inviteOpenWeChat} style={styles.openWeChatImage} resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.stepTitleText}>使用说明</Text>
                        <Text style={styles.stepText}>1. 点击【复制下载地址】</Text>
                        <Text style={styles.stepText}>{'\t\t'}通过短信或即时通信软件方式粘贴内容发送给好友</Text>
                        <Text style={styles.stepText}>2. 点击【复制下载地址并打开微信推送好友】</Text>
                        <Text style={styles.stepText}>{'\t\t'} 打开微信选择好友粘贴内容发送给好友</Text>
                        <Text style={styles.stepTitleText}>注意事项</Text>
                        <Text style={styles.stepText}>1. 您的好友在微信打开链接地址出现【已停止访问该页面】</Text>
                        <Text style={styles.stepText}>{'\t\t'}请您好友复制链接在手机自带浏览器粘贴打开即可</Text>
                    </View>

                    <Image source={inviteFriends.inviteStep2} style={styles.stepImage} resizeMode={'contain'}/>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepText}>苹果手机如果访问网址无法打开请选择二维码进行下载。</Text>
                        <View style={{marginTop: 10, alignItems:'center'}}>
                            <ImageBackground style={styles.qrcodeContainer} source={inviteFriends.bgQRCode} resizeMode={'contain'}>
                                <QRCode value={iosShareUrl} size={120} bgColor='black' fgColor='white'/>
                            </ImageBackground>
                        </View>
                        <Text style={styles.stepTitleText}>使用说明</Text>
                        <Text style={styles.stepText}>1. 请用手机自己截屏二维码保存到相册</Text>
                        <Text style={styles.stepText}>2. 打开即时通信软件或短信通过相册保存二维码分享给好友</Text>
                        <Text style={styles.stepText}>3. 打开二维码扫一扫即可通过App Store下载我们App</Text>
                    </View>

                    <Image source={inviteFriends.inviteStep3} style={styles.stepImage} resizeMode={'contain'}/>
                    <View style={[styles.stepContent, {marginBottom: 30}]}>
                        <Text style={styles.stepText}>安卓手机如果访问网址无法打开请选择二维码进行下载。</Text>
                        <View style={{marginTop: 10, alignItems:'center'}}>
                            <ImageBackground style={styles.qrcodeContainer} source={inviteFriends.bgQRCode} resizeMode={'contain'}>
                                <QRCode value={androidShareUrl} size={120} bgColor='black' fgColor='white'/>
                            </ImageBackground>
                        </View>
                        <Text style={styles.stepTitleText}>使用说明</Text>
                        <Text style={styles.stepText}>1. 请用手机自己截屏二维码保存到相册</Text>
                        <Text style={styles.stepText}>2. 打开即时通信软件或信息通过相册保存二维码分享给好友</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inviteLogo: {
        width: width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    stepImage: {
        width: 104,
        height: 26,
        marginTop: 30,
        marginLeft: 15,
        marginBottom: 5
    },
    copyLinkImage: {
        width: 120,
        height: 40,
    },
    openWeChatImage: {
        width: 177,
        height: 40,
        marginLeft: 12
    },
    stepContent: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F5444A',
        padding: 10
    },
    stepText: {
        fontSize: Size.font13,
        color: '#151515',
        marginTop: 5
    },
    stepTextHighlight: {
        fontSize: Size.font13,
        color: '#F5444A',
        marginTop: 5
    },
    stepTitleText: {
        fontSize: Size.font16,
        color: '#333333',
        marginTop: 15
    },
    qrcodeContainer: {
        width: 140,
        height: 140,
        alignItems:'center',
        justifyContent: 'center'
    }
})
