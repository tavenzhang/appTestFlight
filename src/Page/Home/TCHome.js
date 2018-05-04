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
    SectionList
} from 'react-native';
import {Size} from '../../Page/resouce/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import KindItemView from './View/TCHomeKindItemView';
import HotItemView from './View/TCHomeHotItemView';
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
import {observer} from 'mobx-react/native';


import {width, indexBgColor, indexTxtColor} from '../resouce/theme';
import NetWorkTool from '../../Common/Network/TCToolNetWork';

let isFirstLoad = false;
let listModel = null;
let isLoadFinish = false;
import TCUserCollectHelper from '../../Common/JXHelper/TCUserCollectHelper';
import RedPacketMenu from '../red_packet/components/RedPacketMenu';

let TCUserCollectHelpers = new TCUserCollectHelper();
let RedPacketData = new RedPacket();
import RedPacket from '../red_packet/RedPacketData';
import Swiper from '../../Common/View/swiper/Swiper'
import FastImage from 'react-native-fast-image';

@observer
export default class TCHome extends Component {
    constructor(state) {
        super(state);

        this.state = {
            isRefreshing: false,
            loaded: 0,
            isLogin: true,
            show: false,
            appUrl: '',
            bannerData: [],
            noticeData: [],
            updateTip: '请您更新最新版本!',
            content: null
        };
        this.getHomeCacheData();
    }


    static defaultProps = {};

    componentDidMount() {
        this.loadDataFormNet();
        TCInitHelper.getUserAffCode();
        TCInitHelper.autoLoginApp();

        this.listener = RCTDeviceEventEmitter.addListener('userStateChange', state => {
            this.checkUserWhetherLogin();
            TCInitHelper._requestGameSetting();
            RedPacketData.requestRedPacketCurrent();
        });

        this.androidUpdateTip();
        if (TCUSER_DATA.islogin) {
            TCInitHelper.getMsgStatus()
        }
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
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
        AppState.removeEventListener('change', this.handleAppStateChange);
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
                {this.state.content ? <SectionList
                    refreshing={false}
                    onRefresh={() => {
                        this.loadDataFormNet()
                    }}
                    contentContainerStyle={styles.listViewStyle}
                    renderSectionHeader={({section}) => this.renderSectionHeader(section)}
                    keyExtractor={(item, index) => index + item}
                    ListHeaderComponent={() => this.renderHomeHeaer()}
                    ListFooterComponent={() => this.renderFooter()}
                    sections={
                        [{
                            data: this.state.content.gameInfosHot,
                            title: "热门彩票",
                            renderItem: ({item, index}) => this.renderHotItemView(item, index)
                        },
                            {
                                data: this.state.content.gameInfosRecommend,
                                title: "更多彩种推荐",
                                renderItem: ({item}) => this.renderKindItemView(item)
                            },]
                    }
                /> : null}
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

    //渲染顶部
    renderHomeHeaer() {
        return (<View>
            {this.state.content.bannerData.length > 0 ? this.renderBanner() : null}
            {this.renderNotice()}
            {this.renderMenu()}
        </View>)
    }

    //渲染banner
    renderBanner() {
        return (<Swiper
            width={width}
            height={width * 0.383}
            autoplay={true}
            dataSource={this.state.content.bannerData}
            renderRow={(item, index) => {
                return (<FastImage
                    source={{uri: item.bannerImageUrl}}
                    style={styles.page}
                    resizeMode={"cover"}/>)
            }}
            onPress={(item) => {
                NavigatorHelper.pushToWebView(item.userClickUrl);
            }}
        />)
    }

    //渲染公告
    renderNotice() {
        return <NoticeBar announcement={this.state.content.noticeData}/>
    }

    renderMenu() {
        return <HomeItemBarStyle1 rowData={this.state.content.menuIcons}
                                  pushToEvent={title => this.pushWithMoneyBarTitle(title)}/>;
    }

    //渲染底部
    renderFooter() {
        return (<TopWinnerView rowData={this.state.topWinnersModel}/>)
    }

    getRedPacketButton() {
        if (RedPacketData.hbdisplay) {
            return <RedPacketMenu/>;
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

    //渲染sectionHeader
    renderSectionHeader(section) {
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
                            color: section.title == '热门彩票' ? indexTxtColor.hotKind : indexTxtColor.recommendKind
                        }}
                    >
                        {section.title}
                    </Text>
                </View>
            </View>
        );
    }

    //渲染热门彩种
    renderHotItemView(item, index) {
        return (<HotItemView
            rowData={item}
            rowID={index}
            pushToEvent={item => this._pushToBetHomePage(item)}
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
                    // this.refs['ListView'].scrollTo({x: 0, y: 0, animated: true});
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
                    if (data.content.length > 20) {
                        data.content = data.content.slice(0, 20);
                    }
                    this.setState({
                        topWinnersModel: data.content
                    })
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
        TCHomeContents = data;
        let content = {};
        if (data.content.promotionBanners && data.content.promotionBanners.length > 0) {
            content.bannerData = data.content.promotionBanners;
        }
        if (data.content.announcements && data.content.announcements.length > 0) {
            content.noticeData = data.content.announcements;
        }

        if (data.content.menuIcons && data.content.menuIcons.length > 0) {
            content.menuIcons = data.content.menuIcons;
        }

        if (data.content.gameInfosHot && data.content.gameInfosHot.length > 0) {
            content.gameInfosHot = data.content.gameInfosHot;
        }

        if (data.content.gameInfosRecommend && data.content.gameInfosRecommend.length > 0) {
            if (data.content.gameInfosRecommend.length > 7) {
                content.gameInfosRecommend = data.content.gameInfosRecommend.slice(0, 7);
            }
            if (content.gameInfosRecommend % 2 != 0) {
                content.gameInfosRecommend.push({
                    gameIconUrl: 'https://www.jiushouji.net/mobile/gameIcon/more@3x.1.0.png',
                    gameNameInChinese: '更多玩法',
                    gameDescription: '更多好玩游戏等你体验',
                    gameUniqueId: 'more'
                });
            }
        }
        this.setState({
            isRefreshing: false,
            content: content
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
            if (TCUSER_DATA.islogin) {
                NavigatorHelper.pushToOrderRecord();
            } else {
                NavigatorHelper.pushToUserLogin();
            }
        } else if (title == 'PROMOTION' || title == '优惠活动') {
            NavigatorHelper.pushtoPromotion();
        } else if (title == 'CUS_SERVICE' || title == '在线客服') {
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
    }
});
