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
import Home from '../Home/TCHome';
import LotteryLobby from '../LotteryLobby/TCLotteryLobby';
import TCUserCenterHome from '../UserCenter/TCUserCenterNew';
import WelfareCenter from '../UserCenter/welfare/TCWelfareCenter';
import ShopingLobby from '../ShoppingLobby/TCShopingLobby';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import JXHelper from '../../Common/JXHelper/TCNavigatorHelper';
import {width, height, indexBgColor, indexTxtColor, indexBtmStyle, Size,bottomNavHeight,JX_PLAT_INFO} from '../resouce/theme';
import SoundHelper from '../../Common/JXHelper/SoundHelper';
import {home} from '../resouce/images';
import Toast from "../../Common/JXHelper/JXToast";
import Moment from "moment/moment";


export default class TC168 extends Component {
    constructor(state) {
        super(state);
        this.state = {
            selectedTab: 'home',
            cpArray: [],
            newMsg: 0
        };
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('setSelectedTabNavigator', (tabName, page) => {
            this.setSelectedTab(tabName, page);
        });
        this.listener = RCTDeviceEventEmitter.addListener('newMsgCall', () => {
            this.setState({
                newMsg: TC_NEW_MSG_COUNT + TC_FEEDBACK_COUNT
            });
        });
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
                    {this.renderTabBarItem(
                        <Home navigator={this.props.navigator} cpArray={this.state.cpArray}/>,
                        '首页',
                        home.indexHomeNormal,
                        home.indexHomePressed,
                        'home'
                    )}
                    {/*--开奖大厅--*/}
                    {this.renderTabBarItem(
                        <ShopingLobby navigator={this.props.navigator} cpArray={this.state.cpArray}/>,
                        '购彩',
                        home.indexShoppingNormal,
                        home.indexShoppingPressed,
                        'shoping'
                    )}
                    {/*/!*--开奖大厅--*!/*/}
                    {this.renderTabBarItem(
                        <LotteryLobby navigator={this.props.navigator}/>,
                        '开奖',
                        home.indexLotteryNormal,
                        home.indexLotteryPressed,
                        'lobby'
                    )}
                    {/*/!*--福利--*!/*/}
                    {this.renderTabBarItem(
                        <WelfareCenter navigator={this.props.navigator} backHome={true}/>,
                        '福利',
                        home.indexPromotionNormal,
                        home.indexPromotionPressed,
                        'promotion'
                    )}
                    {/*/!*--用户中心--*!/*/}
                    {this.renderTabBarItem(
                        <TCUserCenterHome navigator={this.props.navigator}/>,
                        '我的',
                        home.indexMineNormal,
                        home.indexMinePressed,
                        'mine'
                    )}
                </TabNavigator>
            </View>
        );
    }

    renderTabBarItem(model, title, iconName, selectedIconName, selectedTab) {
        let xStyle = JX_PLAT_INFO.IS_IphoneX ? {marginBottom: 30} : {marginTop: JX_PLAT_INFO.IS_IOS ? 0 : 1}

        return (
            <TabNavigator.Item
                title={title}
                renderIcon={() => this.getTab(title, false, iconName, null)}
                renderSelectedIcon={() => this.getTab(title, true, null, selectedIconName)} //选中
                onPress={() => {
                    if (TC_BUTTON_SOUND_STATUS) {
                        SoundHelper.playSoundBundle();
                    }
                    this.setSelectedTab(selectedTab, this.state.initPage);
                }}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={[xStyle,{color: indexTxtColor.bottomMenuTitlePressed, fontSize: Size.font14}]}
                titleStyle={[xStyle,{ color: indexTxtColor.bottomMenuTitleNormal, fontSize: Size.font14 }]}
            >
                {model}
            </TabNavigator.Item>
        );
    }

    setSelectedTab(tabName, page) {
        if (tabName === 'mine') {
            if (!JXHelper.checkUserWhetherLogin()) {
                JXHelper.pushToUserLogin(true);
                return;
            }
            if (TCUSER_DATA.username) {
                RCTDeviceEventEmitter.emit('balanceChange', true);
            }
        }

        if (page > 0) {
            this.setState({
                initPage: page
            });
        }
        if (tabName === 'home') {
            RCTDeviceEventEmitter.emit('needChangeAnimated', 'start');
        } else {
            RCTDeviceEventEmitter.emit('needChangeAnimated', 'stop');
        }
        TC_AppState.selectedTabName = tabName;
        this.setState({selectedTab: tabName});
    }

    getTab(title, isSelected, iconName, selectedIconName) {
        if (title === '我的') {
            return (
                <View style={styles.tabStyle}>
                    <Image
                        source={!isSelected ? iconName : selectedIconName}
                        style={!isSelected ? indexBtmStyle.iconStyle : indexBtmStyle.iconStyleSelected}
                        resizeMode={'contain'}
                    />
                    {this.state.newMsg !== 0 ? <View style={styles.pointStyle}/> : null}
                </View>
            );
        } else {
            return (
                <View>
                    <Image
                        source={!isSelected ? iconName : selectedIconName}
                        style={!isSelected ? indexBtmStyle.iconStyle : indexBtmStyle.iconStyleSelected}
                        resizeMode={'contain'}
                    />
                </View>
            );
        }
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
