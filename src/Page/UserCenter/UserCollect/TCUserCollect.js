/**
 * Created by allen-jx on 2017/5/3.
 */
import React, {Component,} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Platform,
    Image,
    Alert
} from 'react-native'

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";

import TCUserCollectItem from './view/TCUserCollectItemView'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import TopNavigationBar from '../../../Common/View/TCNavigationBar'
import JXHelperC from '../../../Common/JXHelper/TCUserCollectHelper'
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView'
import Toast from '../../../Common/JXHelper/JXToast';

let JXHelper = new JXHelperC()
import JXHelpers from '../../../Common/JXHelper/JXHelper'
import {common} from '../../resouce/images'
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../resouce/theme'

/**
 * 收藏
 */
@observer
export default class TCUserCollect extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'个人收藏'}
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack();
                    }}
                    rightTitle={'清空收藏'}
                    rightButtonCall={() => {
                        if (TCUSER_COLLECT && TCUSER_COLLECT.length > 0) {
                            Alert.alert(
                                '您是否要清空所有收藏？', null, [{
                                    text: '确定',
                                    onPress: () => {
                                        this.removeCollect(null)
                                        this.loadData()
                                    }
                                }, {
                                    text: '取消',
                                    onPress: () => JXLog('clear')
                                },])
                        }
                    }}/>
                <RefreshListView
                    ref="refreshListView"
                    renderRow={(rowData, sectionID, rowID) => {
                        return this.renderRow(rowData, sectionID, rowID)
                    }}
                    loadDataFromNet={(pageNum, pageSize, callback) => {
                        this.loadData(pageNum, pageSize, callback)
                    }}
                    isNodataView={() => {
                        return this.getNoDataView()
                    }}/>

            </View>
        )
    }

    renderRow(rowData, sectionID, rowID) {
        let gameInfo = JXHelpers.getGameInfoWithUniqueId(rowData)
        if (gameInfo) {
            return (
                <TCUserCollectItem
                    rowData={gameInfo}
                    rowID={rowID}
                    pushToEvent={(gameInfo) => this._pushToBetHomePage(gameInfo)}
                    removeCollect={(gameId) => {
                        this.removeCollect(gameId)
                    }}
                />
            )
        }
    }

    _pushToBetHomePage(rowData) {
        NavigatorHelper.pushToBetHome(rowData)
    }

    /**
     * 加载数据
     * @param pageNum
     * @param pageSize
     * @param callback
     */
    loadData(pageNum, pageSize, callback) {
        JXHelper.getUserCollectsFromServer((res) => {
            callback && callback(res, TCUSER_COLLECT)
        })
    }

    /**
     * 删除收藏
     * @param gameId
     */
    removeCollect(gameId) {
        JXHelper.cancelUserCollectsFromServer(gameId, (res) => {
            if (res.rs) {
                var refreshListView = this.refs.refreshListView
                refreshListView._updateData()
                if (!gameId) {
                    JXHelper.removeAllCollect()
                }
            } else {
                Toast.showShortCenter("服务器异常，请稍后再试！")
            }
        })
    }

    getNoDataView() {
        return (
            <View style={styles.emptyTip}>
                <Image
                    source={common.noData} style={styles.payErrorImg} resizeMode={Image.resizeMode.contain}/>
                <Text style={{fontSize: Size.default, color: listViewTxtColor.content}}>您还没有添加收藏哦!</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }, payErrorImg: {
        height: width * 0.4,
        width: height * 0.4,
        marginBottom: 10
    }, emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS == 'ios' ? height - 64 : height - 44,
    }
})
