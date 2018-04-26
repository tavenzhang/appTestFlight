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
    BackAndroid,
    AppState,
    Dimensions
} from 'react-native';
import {Size} from '../../Page/resouce/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import KindItemView from './View/TCHomeKindItemView';
import HotItemView from './View/TCHomeHotItemView';
import HomeItemBarStyle1 from './View/TCHomeItemBarStyle1_4';
import Storage from '../../Common/Storage/TCStorage';
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
// import NoticeBar from '../../Common/View/TCNoticeBar';
import {config, appId, appVersion, AppName} from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls';
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper';
let TCInitHelper = new TCInitHelperC();
import Dialog from '../../Common/View/TipDialog';
import TopWinnerView from './View/TCTopWinnerScrollView';
import Toast from '@remobile/react-native-toast';
import Moment from 'moment';
import {observer} from 'mobx-react/native';


import PageIndicator from '../../Common/View/PageIndicator';
var LotteryKindItemsDATA = require('../../Data/HomeKindItem.json');
import {width, indexBgColor, indexTxtColor} from '../resouce/theme';
import NetWorkTool from '../../Common/Network/TCToolNetWork';
let isFirstLoad = false;
let listModel = null;
let topWinnersModel = null;
let isLoadFinish = false;
import TCUserCollectHelper from '../../Common/JXHelper/TCUserCollectHelper';
import RedPacketMenu from '../red_packet/components/RedPacketMenu';
let TCUserCollectHelpers = new TCUserCollectHelper();
let RedPacketData = new RedPacket();
import RedPacket from '../red_packet/RedPacketData';

@observer
export default class TCHome extends Component {
    constructor(state) {
        super(state);
        let ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: ds,
            ViewPagerDataSource: null,
            isRefreshing: false,
            loaded: 0,
            isLogin: true,
            show: false,
            appUrl: '',
            bannerData: [],
            updateTip: '请您更新最新版本!'
        };
        this.getHomeCacheData();
    }

    static defaultProps = {};

    componentDidMount() {
        this.loadDataFormNet();
        // TCInitHelper.getUserAffCode();

        // TCInitHelper.autoLoginApp();

        this.listener = RCTDeviceEventEmitter.addListener('userStateChange', state => {
            this.checkUserWhetherLogin();
            TCInitHelper._requestGameSetting();
            RedPacketData.requestRedPacketCurrent();
        });

        // this.androidUpdateTip();
        if (TCUSER_DATA.islogin) {
            // TCInitHelper.getMsgStatus()
        }
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        AppState.addEventListener('change', this.handleAppStateChange);

        setTimeout(() => {
            RedPacketData.requestRedPacketCurrent()
        }, 1500);
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this.loadHomeContents();
            this.timer3 && clearTimeout(this.timer3);
            this.timer3 = setTimeout(() => {
                RCTDeviceEventEmitter.emit('jx_app_active');
                RedPacketData.requestRedPacketCurrent()
            }, 1500);
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer2 && clearTimeout(this.timer2);
        this.timer3 && clearTimeout(this.timer3);
        this.listener && this.listener.remove();
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    onBackAndroid() {
        if (TCHome.lastBackPressed && TCHome.lastBackPressed >= Moment().subtract(2, 'seconds')) {
            //最近2秒内按过back键，可以退出应用。
            isFirstLoad = false;
            return false;
        }
        AppState.removeEventListener('change', this.handleAppStateChange);
        TCHome.lastBackPressed = Moment();
        Toast.showShortCenter('再按一次退出应用');
        return true;
    }

    render() {
        return (
            <View style={styles.container} keyboardShouldPersistTaps={true}>
                <TopNavigationBar
                    title={AppName}
                    needBackButton={this.state.isLogin ? true : false}
                    leftTitle={this.state.isLogin ? null : '注册'}
                    rightTitle={this.state.isLogin ? '我的收藏' : '登录'}
                    leftImage={this.state.isLogin ? 'index_personal' : null}
                    centerViewShowStyleImage={true}
                    backButtonCall={
                        this.state.isLogin
                            ? () => {
                            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine');
                            RCTDeviceEventEmitter.emit('balanceChange', true);
                        }
                            : () => NavigatorHelper.pushToUserRegister()
                    }
                    rightButtonCall={() =>
                        this.state.isLogin
                            ? NavigatorHelper.pushToUserCollect()
                            : NavigatorHelper.pushToUserLogin(true)}
                />
                <ListView
                    ref="ListView"
                    contentContainerStyle={styles.listViewStyle}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                    renderSectionHeader={(sectionData, sectionId) => this._renderHeader(sectionData, sectionId)}
                    initialListSize={15}
                    stickyHeaderIndices={[0]}
                    horizontal={false}
                    removeClippedSubviews={false}
                    keyboardShouldPersistTaps={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this._onRefresh()}
                            tintColor="#999999"
                            title="下拉刷新"
                            titleColor="#999999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
                {this.getRedPacketButton()}
                <Dialog
                    show={this.state.show}
                    setModalVisible={() => this.gotoUpdate()}
                    dialogTitle={'版本更新'}
                    dialogContent={this.state.updateTip}
                    btnTxt={'确定'}
                />
            </View>
        );
    }

    getRedPacketButton() {
        if (RedPacketData.hbdisplay) {
            return <RedPacketMenu />;
        }
    }

    androidUpdateTip() {
        if (Platform.OS !== 'ios') {
            try {
                NativeModules.JXHelper.getVersionCode(version => {
                    NetUitls.getUrlAndParamsAndCallback(
                        config.api.updateVersion + appId,
                        null,
                        response => {
                            if (response.rs) {
                                if (response.content !== null && response.content.version > version) {
                                    this.setState({
                                        appUrl: response.content.downPath
                                    });
                                    if (response.content.tips) {
                                        this.setState({
                                            updateTip: response.content.tips
                                        });
                                    }
                                    this.setModalVisible();
                                }
                            }
                        },
                        0,
                        true
                    );
                });
            } catch (e) {
                NetUitls.getUrlAndParamsAndCallback(
                    config.api.updateVersion + appId,
                    null,
                    response => {
                        if (response.rs) {
                            if (response.content !== null && response.content.version > appVersion) {
                                this.setState({
                                    appUrl: response.content.downPath
                                });
                                if (response.content.tips) {
                                    this.setState({
                                        updateTip: response.content.tips
                                    });
                                }
                                this.setModalVisible();
                            }
                        }
                    },
                    0,
                    true
                );
            }
        }
    }

    setModalVisible() {
        this.setState({
            show: !this.state.show
        });
    }

    gotoUpdate() {
        try {
            NativeModules.JXHelper.updateApp(this.state.appUrl);
            this.setModalVisible();
        } catch (e) {
            Linking.canOpenURL(this.state.appUrl).then(supported => {
                if (supported) {
                    Linking.openURL(this.state.appUrl);
                } else {
                    JXLog('无法打开该URL:' + url);
                }
                this.setModalVisible();
            });
        }
    }

    _onRefresh() {
        this.loadDataFormNet();
    }

    _renderPage(data, pageID) {
        return (
            <TouchableOpacity
                onPress={() => {
                    NavigatorHelper.pushToWebView(data.userClickUrl);
                }}
            >
                <Image source={{uri: data.bannerImageUrl}} style={styles.page}/>
            </TouchableOpacity>
        );
    }

    _renderHeader(sectionData, sectionId) {
        if (sectionId == 'gameInfosHot' || sectionId == 'gameInfosRecommend') {
            return (
                <View style={{height: 46, width: width}}>
                    <View style={{width: width, height: 10, backgroundColor: indexBgColor.mainBg}}/>
                    <View style={{backgroundColor: indexBgColor.itemBg, height: 35}}>
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: Size.font14,
                                height: 18,
                                marginTop: 10,
                                color: sectionId == 'gameInfosHot' ? indexTxtColor.hotKind : indexTxtColor.recommendKind
                            }}
                        >
                            {this.getAreaTitle(sectionId)}
                        </Text>
                    </View>
                </View>
            );
        }
        return <View style={{height: 0, width: width}}/>;
    }

    getAreaTitle(sectionId) {
        if (sectionId == 'gameInfosRecommend') {
            return '更多彩种推荐';
        } else if (sectionId == 'gameInfosHot') {
            return '热门彩票';
        }
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        if (sectionID == 'promotionBanners') {
            // return (
            //     <View style={{ width: width, height: width * 0.383 }}>
            //         <ViewPager
            //             dataSource={this.state.ViewPagerDataSource}
            //             renderPage={(d, p) => this._renderPage(d, p)}
            //             isLoop={true}
            //             autoPlay={true}
            //             renderPageIndicator={() => <PageIndicator />}
            //         />
            //     </View>
            // );
        } else if (sectionID == 'gameInfosHot') {
            return (
                <HotItemView
                    rowData={rowData}
                    rowID={rowID}
                    pushToEvent={rowData => this._pushToBetHomePage(rowData)}
                />
            );
        } else if (sectionID == 'gameInfosRecommend') {
            return (
                <KindItemView
                    rowData={rowData}
                    mTimer={rowData.mTiter}
                    title={rowData.gameNameInChinese}
                    pushToEvent={rowData => this._pushToBetHomePage(rowData)}
                />
            );
        } else if (sectionID == 'menuIcons') {
            return <HomeItemBarStyle1 rowData={rowData} pushToEvent={title => this.pushWithMoneyBarTitle(title)}/>;
        } else if (sectionID == 'announcement') {
            // return <NoticeBar announcement={rowData} />;
        } else if (sectionID == 'topWinnersModel') {
            return <TopWinnerView rowData={rowData}/>;
        }

        return <View />;
    }

    loadHomeContents() {
        NetUitls.getUrlAndParamsAndCallback(
            config.api.getHome,
            appId + '/contents',
            data => {
                if (data && data.rs && data.content) {
                    this.parseData(data);
                    this.saveHomeCacheData(data);
                } else {
                    NetWorkTool.checkNetworkState(isConnection => {
                        if (isConnection && !isFirstLoad) {
                            Toast.showLongCenter('服务器维护中...');
                        }
                    });
                }
                if (!isFirstLoad) {
                    isFirstLoad = true;
                    TCInitHelper._requestGameSetting();
                } else {
                    this.refs['ListView'].scrollTo({x: 0, y: 0, animated: true});
                }
            },
            null,
            true
        );
    }

    loadDataFormNet() {
        this.loadHomeContents();
        NetUitls.getUrlAndParamsAndCallback(
            config.api.findTopWinners,
            {clientId: appId},
            data => {
                if (data && data.content && data.content.length > 0) {
                    if (listModel) {
                        if (data.content.length > 20) {
                            data.content = data.content.slice(0, 20);
                        }
                        listModel.topWinnersModel = {topWinnersModel: data.content};
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRowsAndSections(listModel)
                        });
                    }
                    topWinnersModel = data.content;
                }
            },
            null,
            true
        );
    }

    loadCPData() {
        NetUitls.getUrlAndParamsAndCallback(config.api.getCurrentResults, null, data => {
            if (data && data.rs && data.content.length > 0) {
                isLoadFinish = true;
                if (listModel) {
                    listModel.gameInfosRecommend = listModel.gameInfosRecommend.concat();
                    listModel.gameInfosRecommend.map(item => {
                        data.content.map(item2 => {
                            if (item2.gameUniqueId == item.gameUniqueId) {
                                item.mTiter = item2.stopOrderTimeEpoch;
                            }
                        });
                    });
                    listModel.gameInfosRecommend.map(item => {
                    });
                    this.setState({
                        cpArray: data.content,
                        dataSource: this.state.dataSource.cloneWithRowsAndSections(listModel)
                    });
                    this.refs['ListView'].forceUpdate();
                }
            } else {
                if (!isLoadFinish) {
                    this.timer2 = setTimeout(() => {
                        this.loadCPData();
                    }, 5000);
                }
            }
        });
    }

    parseData(data) {
        let model = {};
        TCHomeContents = data;
        if (data.content.promotionBanners && data.content.promotionBanners.length > 0) {
            model.promotionBanners = {promotionBanners: data.content.promotionBanners};
        }
        if (data.content.announcements && data.content.announcements.length > 0) {
            model.announcement = {announcement: data.content.announcements};
        }

        if (data.content.menuIcons && data.content.menuIcons.length > 0) {
            model.menuIcons = {menuIcons: data.content.menuIcons};
        }

        if (data.content.gameInfosHot && data.content.gameInfosHot.length > 0) {
            model.gameInfosHot = data.content.gameInfosHot;
            if (model.gameInfosHot.length % 2 != 0) {
                model.gameInfosHot.push({});
            }
        }

        if (data.content.gameInfosRecommend && data.content.gameInfosRecommend.length > 0) {
            model.gameInfosRecommend = data.content.gameInfosRecommend;
            if (model.gameInfosRecommend.length > 7) {
                model.gameInfosRecommend = model.gameInfosRecommend.slice(0, 7);
            }
            if (model.gameInfosRecommend.length % 2 != 0) {
                model.gameInfosRecommend.push({
                    gameIconUrl: 'https://www.jiushouji.net/mobile/gameIcon/more@3x.1.0.png',
                    gameNameInChinese: '更多玩法',
                    gameDescription: '更多好玩游戏等你体验',
                    gameUniqueId: 'more'
                });
            }
        }

        listModel = model;
        if (topWinnersModel) {
            model.topWinnersModel = {topWinnersModel: topWinnersModel};
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(model),
            ViewPagerDataSource: this.state.ViewPagerDataSource.cloneWithPages(data.content.promotionBanners),
            isRefreshing: false
        });
    }

    _pushToBetHomePage(rowData) {
        if (rowData.gameUniqueId == 'more' || rowData.gameUniqueId == '更多玩法') {
            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'shoping');
            return;
        }
        TCUserCollectHelpers.getUserCollectsFromServer(null);
        //跳转到PCDD
        if (rowData.gameUniqueId == 'PCDD' || rowData.gameNameInChinese == 'PC蛋蛋') {
            NavigatorHelper.gotoPCDD(this.props.cpArray);
            return;
        }
        NavigatorHelper.pushToBetHome(rowData);
    }

    pushWithMoneyBarTitle(rowData) {
        let title = rowData.type;
        if (title == 'TOPUP' || title == '存/取款') {
            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine');
        } else if (title == 'ORDER' || title == '投注记录') {
            NavigatorHelper.pushToOrderRecord();
        } else if (title == 'PROMOTION' || title == '优惠活动') {
            NavigatorHelper.pushtoPromotion();
        } else if (title == 'CUS_SERVICE' || title == '在线客服') {
            // NavigatorHelper.pushToWebView(rowData.contentUrl, rowData.nameInChinese)
            if (Platform.OS === 'ios') {
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

    async checkUserWhetherLogin() {
        await storage
            .load({
                key: 'user'
            })
            .then(res => {
                this.setState({
                    isLogin: NavigatorHelper.checkUserWhetherLogin()
                });
            })
            .catch(err => {
                this.setState({
                    isLogin: NavigatorHelper.checkUserWhetherLogin()
                });
            });
    }

    async getHomeCacheData() {
        await storage
            .load({
                key: 'TCHomeList'
            })
            .then(res => {
                if (!isFirstLoad) {
                    JXLog('首页加载缓存获取结束');
                    this.parseData(res);
                }
            })
            .catch(err => {
            });
    }

    saveHomeCacheData(json) {
        storage.save({
            key: 'TCHomeList',
            data: json
        });
    }

    handleMethod(isConnected) {
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: width * 0.383,
        resizeMode: 'cover'
    }
});
