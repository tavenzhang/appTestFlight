/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
} from 'react-native';

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import NoDataView from '../../../Common/View/TCNoDataView'
import BaseComponent from '../../Base/TCBaseComponent'
import TopNavigationBar from '../../../Common/View/TCNavigationBarSelectorStyle'
import MessageListItem from './TCUserMessageItemView'
import Toast from '@remobile/react-native-toast'
import NetUitls from '../../../Common/Network/TCRequestUitls'
import {Size, height, width, indexBgColor, listViewTxtColor} from '../../resouce/theme'
import {config} from '../../../Common/Network/TCRequestConfig';
import  PopView from '../../../Common/View/TCSelectModal'
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView'
const msgType = {
    normal: 'NORMAL',
    money: 'MONEY_RELATED',
    promote: 'PROMOTE'
}
import  RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

@observer
export default class TCUserMessagePage extends Component {

    type = ''
    stateModel = new StateModel()

    constructor(state) {
        super(state)
    }

    static defaultProps = {
        title: '',
        type: '',
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={this.stateModel.title}
                    needBackButton={true}
                    centerButtonCall={() => {
                        this.showPopView()
                    }}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        this.props.navigator.pop()
                    }}/>
                <PopView
                    ref='TCSelectPopupView'
                    SelectorTitleArr={this.initialMessageType()}
                    selectedFunc={(index) => {
                        this.selectMsgType(index)
                    }}
                    selectedIndex={-1}/>
                <RefreshListView
                    ref="refreshListView"
                    isRenderFooter={true}
                    isAllowRefresh={true}
                    renderRow={(rowData, sectionID, rowID) => {
                        return this.renderRow(rowData, sectionID, rowID)
                    }}
                    loadDataFromNet={(pageNum, pageSize, callback) => {
                        this.loadDataFromNet(pageNum, pageSize, callback)
                    }}
                    isNodataView={() => {
                        return <NoDataView
                            ref='NoDataView'
                            titleTip={'暂无站内消息'}
                            contentTip="不要让大奖溜走，2元中千万大奖~"/>
                    } }/>
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <MessageListItem
                data={rowData}/>)
    }

    initialMessageType() {
        return ['全部消息', '普通消息', '优惠消息', '出入款消息'];
    }

    /**
     * 切换类型
     * @param index
     */
    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar
        navBar.setTitle(this.initialMessageType()[index])
        this.stateModel.selectedIndex = index
        switch (index) {
            case 0:
                this.type = ''
                break;
            case 1:
                this.type = msgType.normal
                break;
            case 2:
                this.type = msgType.promote
                break;
            case 3:
                this.type = msgType.money
                break;
        }
        var refreshListView = this.refs.refreshListView
        refreshListView._updateData()
    }

    /**
     * 显示弹窗
     */
    showPopView() {
        var popView = this.refs.TCSelectPopupView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
        if (this.stateModel.selectedIndex === -1)
            popView._setModalSelectedIndex(0, 0);
    }

    /**
     * 加载数据
     */

    loadDataFromNet(pageNum, pageSize, callBack) {
        let type = {
            type: this.type,
            start: pageSize * pageNum,
            pageSize: pageSize,
        }
        NetUitls.getUrlAndParamsAndCallback(config.api.getMessageList, type,
            (data) => {
                if (data.rs) {
                    if (TC_NEW_MSG_COUNT != 0) {
                        TC_NEW_MSG_COUNT = 0
                    }
                }
                callBack(data, data.content && data.content.datas)
            }
        )
    }
}

class StateModel {

    @observable
    title = '全部消息'
    @observable
    selectedIndex = -1
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }
});

