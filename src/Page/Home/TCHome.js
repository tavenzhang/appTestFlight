/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    RefreshControl,
    TouchableOpacity,
    Linking,
    Platform,
    NativeModules,
    BackHandler,
    AppState,
    Dimensions,
    SectionList,
    Alert,
    ImageBackground
} from 'react-native';
import _ from 'lodash';
import {Size} from '../../Page/resouce/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import KindItemView from './View/TCHomeKindItemView';
import HotItemView from './View/TCHomeHotItemView';
import SportItemView from './View/TCHomeSportsItem';
import TCCardGameItem from './View/TCCardGameItem';

import HomeItemBarStyle1 from './View/TCHomeItemBarStyle1_4';
import Storage from '../../Common/Storage/TCStorage';
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import NoticeBar from '../../Common/View/notice/TCNoticeBar';
import {config, appId, appVersion, AppName} from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls';
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper';

let TCInitHelper = new TCInitHelperC();
import Dialog from '../../Common/View/TipDialog';
import TopWinnerView from './View/TCTopWinnerScrollView';
import Toast from '../../Common/JXHelper/JXToast';
import Moment from 'moment';
import {observer, inject} from 'mobx-react/native';
import {computed} from 'mobx'

import {width, indexBgColor, indexTxtColor, height, refreshColor} from '../resouce/theme';
import {JX_PLAT_INFO, bottomNavHeight,Other} from '../asset'
import NetWorkTool from '../../Common/Network/TCToolNetWork';

import RedPacketMenu from '../red_packet/components/RedPacketMenu';

let RedPacketData = new RedPacket();
import RedPacket from '../red_packet/RedPacketData';
import Swiper from '../../Common/View/swiper/Swiper'
import FastImage from 'react-native-fast-image';
import JXPopupNotice from './popupAnnouncements/JXPopupAnnouncements';
import {getPopupAnnouncements} from './popupAnnouncements/JXPopupNoticeHelper';
import JXHelper from "../../Common/JXHelper/JXHelper";
import TCImage from "../../Common/View/image/TCImage";
import HomeStore from '../../Data/store/HomeStore';
import {personal} from "../resouce/images";
import JDToast from "../../Common/JXHelper/JXToast";

@inject("jdAppStore", "initAppStore", "mainStore", "userStore")
@observer
export default class TCHome extends Component {


    homeStore = new HomeStore();

    constructor(state) {
        super(state);

        this.state = {
            isLogin: true,
        };
        this.homeStore.getHomeCacheData();
    }


    static defaultProps = {};

    //布局动画，暂不使用
    // componentWillUpdate() {
    //     JX_LayoutAnimaton.configureNext(JX_LayoutAnimaton.easeNoDelete)
    // }

    componentDidMount() {
        this.loadDataFormNet();
        this.checkAppUpdate();
        this.listener = RCTDeviceEventEmitter.addListener('userStateChange', state => {
            TCInitHelper._requestGameSetting();
        });

        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this.homeStore.loadHomeContents();
            this.timer3 && clearTimeout(this.timer3);
            this.timer3 = setTimeout(() => {
                RCTDeviceEventEmitter.emit('jx_app_active');
                RedPacketData.requestRedPacketCurrent()
            }, 1500);
        }
    }

    componentWillUnmount() {
        this.timer3 && clearTimeout(this.timer3);
        this.listener && this.listener.remove();
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render() {
        return (
            <ImageBackground style={JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container}
                  keyboardShouldPersistTaps={true} source={Other.cardGame.homebg} >
                <TopNavigationBar
                    title={this.appName}
                    needBackButton={this.isLogin}
                    leftTitle={this.isLogin ? null : '注册'}
                    rightTitle={this.isLogin ? '余额\n￥'+this.props.userStore.balance : '登录'}
                    leftImage={this.isLogin ? 'index_personal' : null}
                    centerViewShowStyleImage={true}
                    backButtonCall={
                        this.isLogin
                            ? () => {
                                this.props.mainStore.changeTab("mine");
                            }
                            : () => NavigatorHelper.pushToUserRegister()
                    }
                    rightButtonCall={() =>
                        this.isLogin
                            ? this.props.userStore.freshBalance(true)
                            : NavigatorHelper.pushToUserLogin(true)}
                />
                {this.homeStore.content ? <SectionList
                    contentContainerStyle={styles.listViewStyle}
                    renderSectionHeader={this.renderSectionHeader}
                    keyExtractor={(item, index) => index + item}
                    ListHeaderComponent={this.renderHomeHeaer}
                    // ListFooterComponent={this.renderFooter}
                    sections={this.getSectionsData()}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.loadDataFormNet()}
                            tintColor="#ff0000"
                            title="下拉刷新"
                            titleColor="#999999"
                            colors={refreshColor.progress}
                            progressBackgroundColor={refreshColor.progressBackground}
                        />
                    }
                /> : null}
                <JXPopupNotice ref="PopupNotice"/>
                <Dialog
                    show={this.showUpdateDialog}
                    setModalVisible={() => this.gotoUpdate()}
                    dialogTitle={'版本更新'}
                    dialogContent={"请您更新最新版本!"}
                    btnTxt={'确定'}
                />
            </ImageBackground>
        );
    }

    @computed get isLogin() {
        return this.props.userStore.isLogin;
    }

    @computed get isGuest() {
        return this.props.userStore.isGuest;
    }

    @computed get appName() {
        return this.props.initAppStore.appName;
    }

    @computed get appVersion() {
        return this.props.initAppStore.appVersion
    }

    @computed get showUpdateDialog() {
        return this.props.jdAppStore.showUpdateDialog;
    }

    set showUpdateDialog(show) {
        this.props.jdAppStore.showUpdateDialog = show;
    }

    @computed get appDownloadUrl() {
        return this.props.jdAppStore.appDownloadUrl;
    }

    set appDownloadUrl(url) {
        this.props.jdAppStore.appDownloadUrl = url;
    }

    checkAppUpdate() {
        !IS_IOS && this.props.jdAppStore.checkAppVersionUpdate((res) => {
            if (res.rs) {
                if (res.content && res.content.version > this.appVersion) {
                    this.appDownloadUrl = res.content.downPath;
                    this.showUpdateDialog = true;
                }
            }
        })
    }

    getSectionsData() {
        let data = []
        if (this.homeStore.content.FG && this.homeStore.content.FG.length > 0) {
            data.push({
                data: this.homeStore.content.FG.slice(),
                title: "FG 电子",
                renderItem: ({item, index}) => this.renderHotItemView(item, index,'FG')
            })
        }
        if (this.homeStore.content.KY && this.homeStore.content.KY.length > 0) {
            data.push({
                data: this.homeStore.content.KY.slice(),
                title: "开元棋牌",
                renderItem: ({item, index}) => this.renderHotItemView(item, index,'KY')
            })
        }
        return data
    }

    //渲染顶部
    renderHomeHeaer = () => {
        return (<View>
            {this.homeStore.content.bannerData.length > 0 ? this.renderBanner() : null}
            {this.renderNotice()}
            {this.renderMenu()}
        </View>)
    }

    //渲染banner
    renderBanner = () => {
        return (
            <View style={{width:width-20, marginLeft:10, marginTop:8, borderRadius:8,overflow: 'hidden'}}>
            <Swiper
            width={width-20}
            height={width * 0.383}
            autoplay={true}
            dataSource={this.homeStore.content.bannerData}
            renderRow={(item, index) => {
                return (<TCImage
                    source={{uri: item.bannerImageUrl}}
                    style={styles.page}
                    resizeMode={"cover"}/>)
            }}
            onPress={(item) => {
                NavigatorHelper.pushToWebView(item.userClickUrl);
            }}
        />
            </View>)
    }

    //渲染公告
    renderNotice() {
        return <NoticeBar announcement={this.homeStore.content.noticeData}/>
    }

    renderMenu() {
        return <HomeItemBarStyle1 rowData={this.homeStore.content.menuIcons}
                                  pushToEvent={title => this.pushWithMoneyBarTitle(title)}/>;
    }

    //渲染底部
    renderFooter = () => {
        return (<TopWinnerView rowData={this.homeStore.topWinnersModel}/>)
    }

    getRedPacketButton() {
        if (RedPacketData.hbdisplay) {
            return <RedPacketMenu/>;
        }
    }


    gotoUpdate() {
        try {
            this.props.jdAppStore.showUpdateDialog = false;
            NativeModules.JXHelper.updateApp(this.appDownloadUrl);
        } catch (e) {
            Linking.canOpenURL(this.appDownloadUrl).then(supported => {
                if (supported) {
                    Linking.openURL(this.appDownloadUrl);
                } else {
                    JXLog('无法打开该URL:' + url);
                }
            });
        }
    }


    //渲染sectionHeader
    renderSectionHeader = ({section}) => {
        let img = section.title ==='FG 电子'?Other.cardGame.homeFG:Other.cardGame.homeKY
        return (
            <View style={{height: 46, width: width,justifyContent:'center', alignItems:'center'}}>
                    <Image
                        style={{ marginTop: 20, width:130, height:30, backgroundColor:'#231e58', borderRadius:5}}
                        source={img}
                    />
            </View>
        );
    }

    //渲染热门彩种
    renderHotItemView(item, index,type) {
        return (<TCCardGameItem
            rowData={item}
            rowID={index}
            type={type}
            pushToEvent={item => this._pushToBetHomePage(item,type)}
        />)
    }

//渲染推荐彩种
    renderKindItemView(item) {
        return (<KindItemView
            rowData={item}
            mTimer={item.mTiter}
            title={item.gameNameInChinese}
            pushToEvent={item => this._pushToBetHomePage(item)}
        />)
    }

    //渲染体育电子
    renderDSFView=(item, isSport = false)=> {
        return (
            <SportItemView
                rowData={item}
                mTimer={item.mTiter}
                title={item.gameNameInChinese}
                pushToEvent={item => {
                    if (item.status == "ON") {
                        if (this.isLogin) {
                            if (this.isGuest) {
                                Toast.showShortCenter(`你当前是: 试玩账号 暂时无法体验,请尽快注册正式账号参与体验吧！`);
                            } else {
                                if(item.gamePlatform=="CP"){
                                    JX_NavHelp.pushView(JX_Compones.TCWebGameFullView,{
                                        touchLeft:20,
                                        touchTop:JX_PLAT_INFO.SCREEN_H-150 ,
                                        gameData:item,
                                        title: item.gameDescription,
                                    });
                                }else{
                                    if (isSport) {
                                        JX_NavHelp.pushView(JX_Compones.TCWebGameView, {
                                            gameData: item,
                                            title: item.gameDescription
                                        })
                                    } else {
                                        JX_NavHelp.pushView(JX_Compones.DZGameListView, {gameData: item})
                                    }
                                }
                            }
                        } else {
                            JX_NavHelp.pushToUserLogin(true)
                        }
                        //体育电子点击
                        //平台 'MG' <= item.gamePlatform
                        //状态 'ON' <= item.status
                    } else {
                        Toast.showShortCenter(` ${item.gameNameInChinese} 尚未开启! `)
                    }
                }}
            />)
    }

    loadDataFormNet() {
        this.homeStore.loadHomeContents((res) => {
            if (res) {
                // this.showPopupAnnouncements();
            } else {
                NetWorkTool.checkNetworkState(isConnection => {
                    if (isConnection && !this.homeStore.isFirstLoad) {
                        Toast.showLongCenter('服务器维护中...');
                    }
                });
            }
            if (!this.homeStore.isFirstLoad) {
                this.homeStore.isFirstLoad = true;
            } else {
            }
        });
    }

    _pushToBetHomePage=(dataItem,type)=> {
        if (!this.isLogin) {
            NavigatorHelper.pushToUserLogin();
            return;
        }
        let gameData = {gamePlatform:type}
        let bodyParam = {
            gameId: dataItem.gameId,
        }
        let url = config.api.gamesDZ_start + "/" + dataItem.gameId;
        if (gameData.gamePlatform === "MG" || gameData.gamePlatform === "FG" || (Platform.OS === 'android' && gameData.gamePlatform === "KY")) {
            NetUitls.getUrlAndParamsAndPlatformAndCallback(url, bodyParam, gameData.gamePlatform, (ret) => {
                // JXLog("DZGameListView-------getUrlAndParamsAndPlatformAndCallback--platForm==" + ret.content, ret)
                if (ret.rs) {
                    if (IS_IOS) {
                        Linking.openURL(ret.content.gameUrl);
                    } else {
                        if (NativeModules.JXHelper.openGameWebViewFromJs) {
                            NativeModules.JXHelper.openGameWebViewFromJs(ret.content.gameUrl, dataItem.name, gameData.gamePlatform);
                        } else {
                            Linking.openURL(ret.content.gameUrl);
                        }
                    }
                } else {
                    JDToast.showLongCenter(ret.message)
                }
            },null,null,{})
        } else {
            this.onPushGameFullView(dataItem, gameData);
        }
    }

    onPushGameFullView = (dataItem, gameData) => {
        JX_NavHelp.pushView(JX_Compones.TCWebGameFullView, {
            gameId: dataItem.gameId,
            gameData,
            isDZ: true,
            title: dataItem.name,
            platName: gameData.gameNameInChinese ? gameData.gameNameInChinese.substr(0, 2) : null,
            isRotate: true
        })
    }

    pushWithMoneyBarTitle(rowData) {
        let title = rowData.type;
        if (title == 'TOPUP' || title == '存/取款') {
            this.props.mainStore.changeTab("mine");
        } else if (title == 'ORDER' || title == '投注记录') {
            if (this.isLogin) {
                NavigatorHelper.pushToOrderRecord()
            } else {
                NavigatorHelper.pushToUserLogin();
            }
        } else if (title == 'PROMOTION' || title == '优惠活动') {
            NavigatorHelper.pushtoPromotion();
        } else if (title == 'CUS_SERVICE' || title == '在线客服') {
            if (IS_IOS) {
                NavigatorHelper.pushToWebView(rowData.contentUrl, rowData.nameInChinese);
            } else {
                try {
                    NativeModules.JXHelper.openWebViewFromJs(rowData.contentUrl);
                } catch (e) {
                    NavigatorHelper.pushToWebView(rowData.contentUrl, rowData.nameInChinese);
                }
            }
        }
    }


    handleMethod(isConnected) {
    }

    showPopupAnnouncements() {
        getPopupAnnouncements((d) => {
            if (d && d.length > 0) {
                this.refs['PopupNotice'].open(d);
            }
        });
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'transparent',
    },
    containerIOS: {
        height: height - bottomNavHeight,
        width: width,
        backgroundColor:'transparent',
    },
    listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
        backgroundColor:'transparent',
        justifyContent:'center',
    },
    page: {
        width: width-20,
        flex: 1,
        height: width * 0.383,
        backgroundColor:'transparent'
    }
});
