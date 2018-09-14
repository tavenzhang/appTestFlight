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
import JXHelper from '../../Common/JXHelper/TCNavigatorHelper';
import {width, height, indexBgColor, indexTxtColor, indexBtmStyle, Size, baseColor} from '../resouce/theme';
import {JX_PLAT_INFO, bottomNavHeight,} from '../asset'
import {home} from '../resouce/images';
import Toast from "../../Common/JXHelper/JXToast";
import Moment from "moment/moment";
import userStore from "../../Data/store/UserStore";
import NavigationService from "../Route/NavigationService";

@inject("mainStore", "userStore", "jdAppStore")
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
                <TabNavigator tabBarStyle={{backgroundColor: indexBgColor.tabBg, height: bottomNavHeight,
                    paddingBottom:JX_PLAT_INFO.IS_IphoneX ? 30:0}}>
                    {/*--首页--*/}
                    {this.renderTabBarItem("首页",
                        home.indexHomeNormal,
                        home.indexHomePressed,
                        "home",
                        <Home navigator={this.props.navigation} cpArray={this.state.cpArray}/>)}
                    {/*--购彩大厅--*/}
                    {
                        this.renderTabBarItem("充值",
                            home.indexPay,
                            home.indexPayPressed,
                            'shoping',
                            <ShopingLobby navigator={this.props.navigation} cpArray={this.state.cpArray}/>)
                    }
                    {/*/!*--开奖大厅--*!/*/}
                    {
                        this.renderTabBarItem("转账",
                            home.indexTransferNormal,
                            home.indexTransferPressed,
                            'lobby',
                            <LotteryLobby navigator={this.props.navigation}/>
                        )
                    }
                    {/*/!*--福利--*!/*/}

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


    renderTabBarItem(title, iconName, selectedIconName, selectedTab, content) {
        return (<TabNavigator.Item
            title={title}
            renderIcon={() => <TabView
                title={title}
                isSelected={false}
                iconName={iconName}
                selectedIconName={null}
            />
            }
            renderSelectedIcon={() => <TabView
                title={title}
                isSelected={true}
                iconName={null}
                selectedIconName={selectedIconName}
            />}
            selected={this.props.mainStore.selectedTab === selectedTab}
            selectedTitleStyle={{color: baseColor.tabSelectedTxt, fontSize: Size.font12}}
            titleStyle={{color: baseColor.tabUnSelectTxt, fontSize: Size.font12}}
            onPress={() => {
                this.setSelectedTab(selectedTab);
            }}
        >
            {content}
        </TabNavigator.Item>)
    }

    setSelectedTab(tabName) {
        this.props.jdAppStore.playSound();
        if (tabName === 'mine') {
            if (!this.props.userStore.isLogin) {
                NavigationService.login(true);
                return;
            }
            this.props.userStore.freshBalance(true);
        }
        this.props.mainStore.changeTab(tabName)
    }

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

@inject("userStore")
@observer
class TabView extends Component {

    @computed get newMsgCount() {
        return this.props.userStore.newMsgCount + this.props.userStore.newFeedBackCount;
    }

    render() {
        return (
            <View style={styles.tabStyle}>
                <Image
                    source={!this.props.isSelected ? this.props.iconName : this.props.selectedIconName}
                    style={!this.props.isSelected ? indexBtmStyle.iconStyle : indexBtmStyle.iconStyleSelected}
                    resizeMode={'contain'}
                />
                {this.props.title === "我的" && this.newMsgCount !== 0 ? <View style={styles.pointStyle}/> : null}
            </View>
        )
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
