/**
 * Created by Sam on 2016/11/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    Image,
    PanResponder,
    Dimensions,
    AppState,
    BackHandler
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {observer, inject} from 'mobx-react'
import {computed} from 'mobx'

import Home from '../Home/TCHome';
import LotteryLobby from '../LotteryLobby/TCLotteryLobby';
import TCUserCenterHome from '../UserCenter/TCUserCenterNew';
import WelfareCenter from '../UserCenter/welfare/TCWelfareCenter';
import ShopingLobby from '../ShoppingLobby/TCShopingLobby';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import JXHelper from '../../Common/JXHelper/TCNavigatorHelper';
import {width, height, indexBgColor, indexTxtColor, indexBtmStyle, Size, baseColor} from '../resouce/theme';
import {JX_PLAT_INFO, bottomNavHeight} from '../asset'
import SoundHelper from '../../Common/JXHelper/SoundHelper';
import {home} from '../resouce/images';
import Toast from "../../Common/JXHelper/JXToast";
import Moment from "moment/moment";

@inject("mainStore", "userStore")
@observer
export default class TC168 extends Component {

    constructor(state) {
        super(state);
        this.state = {
            cpArray: [],
            newMsg: 0
        };
    }

    componentDidMount() {
        // this.listener = RCTDeviceEventEmitter.addListener('setSelectedTabNavigator', (tabName, page) => {
        //     this.setSelectedTab(tabName, page);
        // });
        // this.listener = RCTDeviceEventEmitter.addListener('newMsgCall', () => {
        //     this.setState({
        //         newMsg: TC_NEW_MSG_COUNT + TC_FEEDBACK_COUNT
        //     });
        // });
        //自动登录
        this.props.userStore.initData((res) => {
            if (res.status) {
                this.props.userStore.getMessageStatus();
            }
        })
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.timer && clearTimeout(this.timer);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    static Navigation_routers;
    static navigationOptions = {
        header: ({navigation}) => {
            let {state: {routes}} = navigation;
            Navigation_routers = routes;
            return null;
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator tabBarStyle={{backgroundColor: indexBgColor.tabBg, height: bottomNavHeight}}>
                    {/*--首页--*/}
                    {this.renderTabBarItem("首页",
                        home.indexHomeNormal,
                        home.indexHomePressed,
                        "home",
                        <Home navigator={this.props.navigator} cpArray={this.state.cpArray}/>)}
                    {/*--购彩大厅--*/}
                    {
                        this.renderTabBarItem("购彩",
                            home.indexShoppingNormal,
                            home.indexShoppingPressed,
                            'shoping',
                            <ShopingLobby navigator={this.props.navigator} cpArray={this.state.cpArray}/>)
                    }
                    {/*/!*--开奖大厅--*!/*/}
                    {
                        this.renderTabBarItem("开奖",
                            home.indexLotteryNormal,
                            home.indexLotteryPressed,
                            'lobby',
                            <LotteryLobby navigator={this.props.navigator}/>
                        )
                    }
                    {/*/!*--福利--*!/*/}
                    {
                        this.renderTabBarItem("福利",
                            home.indexPromotionNormal,
                            home.indexPromotionPressed,
                            'promotion',
                            <WelfareCenter navigator={this.props.navigator} backHome={true}/>
                        )
                    }

                    {/*/!*--用户中心--*!/*/}
                    {
                        this.renderTabBarItem("我的",
                            home.indexMineNormal,
                            home.indexMinePressed,
                            'mine',
                            <TCUserCenterHome navigator={this.props.navigator}/>
                        )
                    }
                </TabNavigator>
            </View>
        );
    }

    @computed get newMsgCount() {
        return this.props.userStore.newMsgCount + this.props.userStore.newFeedBackCount;
    }

    renderTabBarItem(title, iconName, selectedIconName, selectedTab, content) {
        return (<TabNavigator.Item
            title={title}
            renderIcon={() => this.getTabIcon(iconName)}
            renderSelectedIcon={() => this.getTabIcon(selectedIconName)}
            selected={this.props.mainStore.selectedTab === selectedTab}
            selectedTitleStyle={{color: baseColor.tabSelectedTxt, fontSize: Size.font12}}
            titleStyle={{color: baseColor.tabUnSelectTxt, fontSize: Size.font12}}
            renderBadge={() => this.renderBadge(title)}
            onPress={() => {
                this.props.mainStore.changeTab(selectedTab)
            }}
        >
            {content}
        </TabNavigator.Item>)
    }


    getTabIcon(iconName) {
        return (<Image
            source={iconName}
            style={indexBtmStyle.iconStyle}
            resizeMode={'contain'}
        />)
    }

    renderBadge(title) {
        if (title === "我的" && this.newMsgCount !== 0) {
            return <View style={styles.pointStyle}/>
        } else {
            return null;
        }
    }

    // setSelectedTab(tabName, page) {
    //     if (tabName === 'mine') {
    //         if (!JXHelper.checkUserWhetherLogin()) {
    //             JXHelper.pushToUserLogin(true);
    //             return;
    //         }
    //         if (TCUSER_DATA.username) {
    //             RCTDeviceEventEmitter.emit('balanceChange', true);
    //         }
    //     }
    //
    //     if (page > 0) {
    //         this.setState({
    //             initPage: page
    //         });
    //     }
    //     if (tabName === 'home') {
    //         RCTDeviceEventEmitter.emit('needChangeAnimated', 'start');
    //     } else {
    //         RCTDeviceEventEmitter.emit('needChangeAnimated', 'stop');
    //     }
    //     TC_AppState.selectedTabName = tabName;
    //     this.setState({selectedTab: tabName});
    // }

    onBackAndroid = () => {
        let pathLength = Navigation_routers.length;
        if (pathLength === 1) {
            if (this.lastBackPressed && this.lastBackPressed >= Moment().subtract(2, 'seconds')) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Moment();
            Toast.showShortCenter('再按一次退出应用');
            return true;
        } else {
            JXHelper.goBack(Navigation_routers, this.props.navigation);
            return true;
        }
    }
}

const styles = StyleSheet.create({
    pointStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'red',
        position: 'absolute',
        top: Platform.OS === 'ios' ? width * 0.06 : 30,
        left: 25
    },
    tabStyle: {
        flexDirection: 'row'
    }
});
