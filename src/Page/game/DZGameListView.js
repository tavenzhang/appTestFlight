import React, {Component,} from 'react'
import {
    View,
    StyleSheet,
    Linking,
    NativeModules,
    Text
} from 'react-native'

import {inject, observer} from 'mobx-react/native'
import GamePage from "./GamePage";
import {indexBgColor, shoppingTxtColor, baseColor, Size} from "../resouce/theme";
import TCNavigationBar from "../../Common/View/TCNavigationBar";
import {ASSET_Theme} from "../asset/index"
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import {config} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";
import JDToast from "../../Common/JXHelper/JXToast";

/**
 *电子游戏
 */
@inject("userStore")
@observer
export default class DZGameListView extends Component {

    constructor(props) {
        super(props);
        //this.isReuesting = false; //防止快速点击 产生多次请求
        this.state = {
            isEmpty: false,
        }
    }

    render() {
        let emptView = null;
        if (this.state.isEmpty) {
            emptView = (<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>
                    游戏暂未开放！
                </Text>
            </View>)
        }
        let {gameData} = this.props.navigation.state.params
        return (
            <View style={ASSET_Theme.themeViewStyle.containView}>
                <TCNavigationBar
                    title={'游戏列表'}
                    needBackButton={true}
                    backButtonCall={JX_NavHelp.popToBack}
                    rightTitle={"额度转化"}
                    rightButtonCall={this.onTransMoney}
                />
                {JX_Store.gameDZStore.gameData.length <= 0 ? emptView : <ScrollableTabView
                    initialPage={0}
                    style={{backgroundColor: indexBgColor.itemBg, width: SCREEN_W}}
                    removeClippedSubviews={false}
                    tabBarUnderlineStyle={{backgroundColor: shoppingTxtColor.tabLine, height: 2}}
                    locked={false}
                    tabBarActiveTextColor={shoppingTxtColor.tabTitlePressed}
                    tabBarInactiveTextColor={shoppingTxtColor.tabTitleNormal}
                    tabBarTextStyle={{fontSize: Size.font15, fontWeight: 'normal'}}
                    renderTabBar={this.onTabBar}>
                    {
                        JX_Store.gameDZStore.gameData.map(item => {
                            return <GamePage tabLabel={item.name} onClickItem={this.onClickItem}
                                             datas={item.games} gameData={gameData}/>
                        })
                    }
                </ScrollableTabView>}
            </View>
        )
    }

    onTabBar = () => {
        return <ScrollableTabBar/>
    }

    componentWillMount() {
        let {gameData} = this.props.navigation.state.params
        JX_Store.gameDZStore.loadGames(gameData.gamePlatform, (dataList) => {
            if (dataList.length == 0) {
                this.setState({isEmpty: true})
            } else {
                this.setState({isEmpty: false})
            }
        })
    }

    onTransMoney = () => {
        let {gameData} = this.props.navigation.state.params;
        JX_NavHelp.pushView(JX_Compones.UserTransfer, {platName: gameData.gameNameInChinese ? gameData.gameNameInChinese.substr(0, 2) : null});
    }


    onClickItem = (dataItem) => {
        //JX_NavHelp.pushView(JX_Compones.TCWebGameView,{gameId:dataItem.gameId,gameData,isDZ:true,title:dataItem.name})
        let {gameData} = this.props.navigation.state.params
        let bodyParam = {
            gameId: dataItem.gameId,
        }
        let url = config.api.gamesDZ_start + "/" + dataItem.gameId;
        if (gameData.gamePlatform == "MG" || gameData.gamePlatform == "FG") { //由于MG平台的游戏 需要横屏 做特殊处理 "FG" 需要修改原生agent
            NetUitls.getUrlAndParamsAndPlatformAndCallback(url, bodyParam, gameData.gamePlatform, (ret) => {
                JXLog("DZGameListView-------getUrlAndParamsAndPlatformAndCallback--platForm==" + ret.content, ret)
                if (ret.rs) {
                    if (IS_IOS) {
                        Linking.openURL(ret.content.gameUrl);
                    } else {
                        if(gameData.gamePlatform === "MG" || gameData.gamePlatform === "FG")
                        {
                            if (NativeModules.JXHelper.openGameWebViewFromJs) {
                                NativeModules.JXHelper.openGameWebViewFromJs(ret.content.gameUrl, dataItem.name);
                            } else {
                                Linking.openURL(ret.content.gameUrl);
                            }
                        }else{
                            this.onPushGameFullView(dataItem,gameData);
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


}

