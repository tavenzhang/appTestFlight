/**
 * Created by Sam on 2016/11/11.
 */

import React, { Component } from 'react';
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
    Alert
} from 'react-native';
import _ from 'lodash';
import { Size } from '../../Page/resouce/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import KindItemView from './View/TCHomeKindItemView';
import HotItemView from './View/TCHomeHotItemView';
import SportItemView from './View/TCHomeSportsItem';

import HomeItemBarStyle1 from './View/TCHomeItemBarStyle1_4';
import Storage from '../../Common/Storage/TCStorage';
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import NoticeBar from '../../Common/View/notice/TCNoticeBar';
import { config, appId, appVersion, AppName } from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls';
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper';

let TCInitHelper = new TCInitHelperC();
import Dialog from '../../Common/View/TipDialog';
import TopWinnerView from './View/TCTopWinnerScrollView';
import Toast from '../../Common/JXHelper/JXToast';
import Moment from 'moment';
import { observer, inject } from 'mobx-react/native';
import { computed } from 'mobx';

import { width, indexBgColor, indexTxtColor, height, refreshColor } from '../resouce/theme';
import { JX_PLAT_INFO, bottomNavHeight } from '../asset';
import NetWorkTool from '../../Common/Network/TCToolNetWork';

import RedPacketMenu from '../red_packet/components/RedPacketMenu';

let RedPacketData = new RedPacket();
import RedPacket from '../red_packet/RedPacketData';
import Swiper from '../../Common/View/swiper/Swiper';
import FastImage from 'react-native-fast-image';
import JXPopupNotice from './popupAnnouncements/JXPopupAnnouncements';
import { getPopupAnnouncements } from './popupAnnouncements/JXPopupNoticeHelper';
import JXHelper from '../../Common/JXHelper/JXHelper';
import TCImage from '../../Common/View/image/TCImage';
import HomeStore from '../../Data/store/HomeStore';

@inject('jdAppStore', 'initAppStore', 'mainStore', 'userStore')
@observer
export default class TCHome extends Component {
    homeStore = new HomeStore();

    constructor(state) {
        super(state);

        this.state = {
            isLogin: true
        };
        this.homeStore.getHomeCacheData();
    }

    static defaultProps = {};

    componentDidMount() {
        this.loadDataFormNet();
        this.checkAppUpdate();
        this.listener = RCTDeviceEventEmitter.addListener('userStateChange', state => {
            TCInitHelper._requestGameSetting();
            RedPacketData.requestRedPacketCurrent();
        });

        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        AppState.addEventListener('change', this.handleAppStateChange);

        setTimeout(() => {
            RedPacketData.requestRedPacketCurrent();
        }, 1500);
    }

    handleAppStateChange = nextAppState => {
        if (nextAppState === 'active') {
            this.homeStore.loadHomeContents();
            this.timer3 && clearTimeout(this.timer3);
            this.timer3 = setTimeout(() => {
                RCTDeviceEventEmitter.emit('jx_app_active');
                RedPacketData.requestRedPacketCurrent();
            }, 1500);
        }
    };

    componentWillUnmount() {
        this.timer3 && clearTimeout(this.timer3);
        this.listener && this.listener.remove();
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render() {
        return (
            <View
                style={JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container}
                keyboardShouldPersistTaps={true}
            >
                <TopNavigationBar
                    title={this.appName}
                    needBackButton={this.isLogin}
                    leftTitle={this.isLogin ? null : '注册'}
                    rightTitle={this.isLogin ? '余额\n￥' + this.props.userStore.balance : '登录'}
                    leftImage={this.isLogin ? 'index_personal' : null}
                    centerViewShowStyleImage={true}
                    backButtonCall={
                        this.isLogin
                            ? () => {
                                  this.props.mainStore.changeTab('mine');
                              }
                            : () => NavigatorHelper.pushToUserRegister()
                    }
                    rightButtonCall={() =>
                        this.isLogin ? this.props.userStore.freshBalance(true) : NavigatorHelper.pushToUserLogin(true)}
                />
                {this.homeStore.content ? (
                    <SectionList
                        contentContainerStyle={styles.listViewStyle}
                        renderSectionHeader={this.renderSectionHeader}
                        keyExtractor={(item, index) => index + item}
                        ListHeaderComponent={this.renderHomeHeaer}
                        ListFooterComponent={this.renderFooter}
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
                    />
                ) : null}
                {this.getRedPacketButton()}
                <JXPopupNotice ref="PopupNotice" />
                <Dialog
                    show={this.showUpdateDialog}
                    setModalVisible={() => this.gotoUpdate()}
                    dialogTitle={'版本更新'}
                    dialogContent={'请您更新最新版本!'}
                    btnTxt={'确定'}
                />
            </View>
        );
    }

    @computed
    get isLogin() {
        return this.props.userStore.isLogin;
    }

    @computed
    get isGuest() {
        return this.props.userStore.isGuest;
    }

    @computed
    get appName() {
        return this.props.initAppStore.appName;
    }

    @computed
    get appVersion() {
        return this.props.initAppStore.appVersion;
    }

    @computed
    get showUpdateDialog() {
        return this.props.jdAppStore.showUpdateDialog;
    }

    set showUpdateDialog(show) {
        this.props.jdAppStore.showUpdateDialog = show;
    }

    @computed
    get appDownloadUrl() {
        return this.props.jdAppStore.appDownloadUrl;
    }

    set appDownloadUrl(url) {
        this.props.jdAppStore.appDownloadUrl = url;
    }

    checkAppUpdate() {
        !IS_IOS &&
            this.props.jdAppStore.checkAppVersionUpdate(res => {
                if (res.rs) {
                    if (res.content && res.content.version > this.appVersion) {
                        this.appDownloadUrl = res.content.downPath;
                        this.showUpdateDialog = true;
                    }
                }
            });
    }

    getSectionsData() {
        let data = [];
        if (this.homeStore.content.gameInfosHot && this.homeStore.content.gameInfosHot.length > 0) {
            data.push({
                data: this.homeStore.content.gameInfosHot.slice(),
                title: '热门彩票',
                renderItem: ({ item, index }) => this.renderHotItemView(item, index)
            });
        }

        if (this.homeStore.content.gameInfosRecommend && this.homeStore.content.gameInfosRecommend.length > 0) {
            data.push({
                data: this.homeStore.content.gameInfosRecommend.slice(),
                title: '更多彩种推荐',
                renderItem: ({ item, index }) => this.renderKindItemView(item, index)
            });
        }

        if (this.homeStore.content.dsfEgameInfos && this.homeStore.content.dsfEgameInfos.length > 0 ||
            this.homeStore.content.dsfCardInfos && this.homeStore.content.dsfCardInfos.length > 0) {

            let dsfEgameInfos = _.cloneDeep(this.homeStore.content.dsfEgameInfos.slice());

            if (this.homeStore.content.dsfCardInfos && this.homeStore.content.dsfCardInfos.length > 0) {
                let dsfCardInfos = _.cloneDeep(this.homeStore.content.dsfCardInfos.slice());
                dsfEgameInfos = _.concat(dsfEgameInfos, dsfCardInfos);
            }
            if (dsfEgameInfos.length % 2 !== 0) {
                dsfEgameInfos.push({});
            }
            data.push({
                data: dsfEgameInfos,
                title: '电子游戏',
                renderItem: ({ item }) => this.renderDSFView(item, false)
            });
        }

        if (this.homeStore.content.dsfSportInfos && this.homeStore.content.dsfSportInfos.length > 0) {
            let dsfSportInfos = _.cloneDeep(this.homeStore.content.dsfSportInfos.slice());
            if (dsfSportInfos.length % 2 !== 0) {
                dsfSportInfos.push({});
            }
            data.push({
                data: this.homeStore.content.dsfSportInfos.slice(),
                title: '体育竞技',
                renderItem: ({ item }) => this.renderDSFView(item, true)
            });
        }
        return data;
    }

    //渲染顶部
    renderHomeHeaer = () => {
        return (
            <View>
                {this.homeStore.content.bannerData.length > 0 ? this.renderBanner() : null}
                {this.renderNotice()}
                {this.renderMenu()}
            </View>
        );
    };

    //渲染banner
    renderBanner = () => {
        return (
            <Swiper
                width={width}
                height={width * 0.383}
                autoplay={true}
                dataSource={this.homeStore.content.bannerData}
                renderRow={(item, index) => {
                    return <TCImage source={{ uri: item.bannerImageUrl }} style={styles.page} resizeMode={'cover'} />;
                }}
                onPress={item => {
                    NavigatorHelper.pushToWebView(item.userClickUrl);
                }}
            />
        );
    };

    //渲染公告
    renderNotice() {
        return <NoticeBar announcement={this.homeStore.content.noticeData} />;
    }

    renderMenu() {
        return (
            <HomeItemBarStyle1
                rowData={this.homeStore.content.menuIcons}
                pushToEvent={data => this.pushWithMoneyBarTitle(data)}
            />
        );
    }

    //渲染底部
    renderFooter = () => {
        return <TopWinnerView rowData={this.homeStore.topWinnersModel} />;
    };

    getRedPacketButton() {
        if (RedPacketData.hbdisplay) {
            return <RedPacketMenu />;
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
    renderSectionHeader = ({ section }) => {
        return (
            <View style={{ height: 46, width: width }}>
                <View style={{ width: width, height: 10, backgroundColor: indexBgColor.mainBg }} />
                <View style={{ backgroundColor: indexBgColor.itemBg, height: 35 }}>
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: Size.font14,
                            height: 18,
                            marginTop: 10,
                            color: section.title == '热门彩票' ? indexTxtColor.hotKind : indexTxtColor.recommendKind
                        }}
                    >
                        {section.title}
                    </Text>
                </View>
            </View>
        );
    };

    //渲染热门彩种
    renderHotItemView(item, index) {
        return <HotItemView rowData={item} rowID={index} pushToEvent={item => this._pushToBetHomePage(item)} />;
    }

    //渲染推荐彩种
    renderKindItemView(item) {
        return (
            <KindItemView
                rowData={item}
                mTimer={item.mTiter}
                title={item.gameNameInChinese}
                pushToEvent={item => this._pushToBetHomePage(item)}
            />
        );
    }

    //渲染体育电子
    renderDSFView = (item, isSport = false) => {
        return (
            <SportItemView
                rowData={item}
                mTimer={item.mTiter}
                title={item.gameNameInChinese}
                pushToEvent={item => {
                    if (item.status == 'ON') {
                        if (this.isLogin) {
                            if (this.isGuest) {
                                Toast.showShortCenter(`你当前是: 试玩账号 暂时无法体验,请尽快注册正式账号参与体验吧！`);
                            } else {
                                if (item.gamePlatform == 'CP' || item.gamePlatform == 'bobo') {
                                    JX_NavHelp.pushView(JX_Compones.TCWebGameFullView, {
                                        touchLeft: 20,
                                        touchTop: JX_PLAT_INFO.SCREEN_H - 150,
                                        gameData: item,
                                        title: item.gameDescription,
                                        isDZ: item.gamePlatform == 'bobo'
                                    });
                                } else {
                                    if (isSport) {
                                        JX_NavHelp.pushView(JX_Compones.TCWebGameView, {
                                            gameData: item,
                                            title: item.gameDescription
                                        });
                                    } else {
                                        JX_NavHelp.pushView(JX_Compones.DZGameListView, { gameData: item });
                                    }
                                }
                            }
                        } else {
                            JX_NavHelp.pushToUserLogin(true);
                        }
                    } else {
                        Toast.showShortCenter(` ${item.gameNameInChinese} 尚未开启! `);
                    }
                }}
            />
        );
    };

    loadDataFormNet() {
        this.homeStore.loadHomeContents(res => {
            if (res) {
                this.showPopupAnnouncements();
            } else {
                NetWorkTool.checkNetworkState(isConnection => {
                    if (isConnection && !this.homeStore.isFirstLoad) {
                        Toast.showLongCenter('服务器维护中...');
                    }
                });
            }
            if (!this.homeStore.isFirstLoad) {
                this.homeStore.isFirstLoad = true;
                this.homeStore.requestGameSetting();
            } else {
                // this.refs['ListView'].scrollTo({x: 0, y: 0, animated: true});
            }
        });
        this.homeStore.getTopWinners();
    }

    _pushToBetHomePage = rowData => {
        if (rowData.gameUniqueId == 'more' || rowData.gameUniqueId == '更多玩法') {
            this.props.mainStore.changeTab('shoping');
            return;
        }
        //跳转到PCDD
        if (rowData.gameUniqueId == 'PCDD' || rowData.gameNameInChinese == 'PC蛋蛋') {
            NavigatorHelper.gotoPCDD(this.props.cpArray);
            return;
        }
        NavigatorHelper.pushToBetHome(rowData);
    };

    pushWithMoneyBarTitle(rowData) {
        NavigatorHelper.homeGoFastAction(rowData);
    }

    handleMethod(isConnected) {}

    showPopupAnnouncements() {
        getPopupAnnouncements(d => {
            if (d && d.length > 0) {
                this.refs['PopupNotice'].open(d);
            }
        });
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    containerIOS: {
        height: height - bottomNavHeight,
        width: width,
        backgroundColor: indexBgColor.mainBg
    },
    listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width
    },
    page: {
        width: width,
        flex: 1,
        height: width * 0.383
    }
});
