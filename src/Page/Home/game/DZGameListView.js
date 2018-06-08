import React, {Component,} from 'react'

import {
    View,
    StyleSheet,
} from 'react-native'

import {observer} from 'mobx-react/native'
import GamePage from "./GamePage";
import {indexBgColor,shoppingTxtColor, baseColor, Size} from "../../resouce/theme";
import TCNavigationBar from "../../../Common/View/TCNavigationBar";

import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view";
import {config} from "../../../Common/Network/TCRequestConfig";

/**
 *电子游戏
 */
@observer
export default class DZGameListView extends Component {

    render() {

        return (
            <View style={JX_ThemeViewStyle.containView}>
                <TCNavigationBar
                    title={'游戏列表'}
                    needBackButton={true}
                    backButtonCall={JX_NavHelp.popToBack}
                />
                <ScrollableTabView
                    initialPage={0}
                    style={{backgroundColor:  indexBgColor.itemBg, flex: 1}}
                    removeClippedSubviews={false}
                    tabBarUnderlineStyle={{backgroundColor: shoppingTxtColor.tabLine, height: 2}}
                    locked={false}
                    tabBarActiveTextColor={shoppingTxtColor.tabTitlePressed}
                    tabBarInactiveTextColor={shoppingTxtColor.tabTitleNormal}
                    tabBarTextStyle={{fontSize: Size.font15, fontWeight: 'normal'}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <GamePage tabLabel={"全部游戏"} onClickItem={this.onClickItem} datas={JX_Store.gameDZStore.allGame}/>
                    {
                        JX_Store.gameDZStore.gameData.map(item => {
                                return <GamePage tabLabel={item.name} onClickItem={this.onClickItem} datas={item.games.slice()}/>
                            }
                        )}
                </ScrollableTabView>
            </View>
        )
    }

    componentWillMount() {
       // let {platFrom}= this.props.navigation.state.params
        JX_Store.gameDZStore.loadGames("MG")
    }

    onClickItem=(dataItem)=>{
        let {gameData}=this.props.navigation.state.params
        // let bodyParam={
        //         //     gameId:dataItem.gameId,
        //         //     access_token:TCUSER_DATA.oauthToken.access_token,
        //         // }
       // let url =config.api.gamesDZ_start+"/"+dataItem.gameId;
     //   let param = bodyParam;
        JX_NavHelp.pushView(JX_Compones.TCWebGameView,{gameId:dataItem.gameId,gameData,isDZ:true,title:dataItem.name})
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: baseColor.mainBg
    },
})