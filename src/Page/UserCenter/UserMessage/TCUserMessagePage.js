/**
 * Created by Sam on 2016/11/16.
 */
import React, {Component} from 'react';
import {BackHandler, Platform, StyleSheet, View} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import NoDataView from '../../../Common/View/TCNoDataView'
import TopNavigationBar from '../../../Common/View/TCNavigationBarSelectorStyle'
import MessageListItem from './TCUserMessageItemView'
import NetUitls from '../../../Common/Network/TCRequestUitls'
import {indexBgColor} from '../../resouce/theme'
import {config} from '../../../Common/Network/TCRequestConfig';
import PopView from '../../../Common/View/TCSelectModal'
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";
import messageStore from "../../../Data/store/UserMessageStore";
import NavigationService from "../../Route/NavigationService";

const msgType = {
    normal: 'NORMAL',
    money: 'MONEY_RELATED',
    promote: 'PROMOTE'
}

@inject("userStore")
@observer
export default class TCUserMessagePage extends Component {

    type = ''

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

    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={messageStore.title}
                    needBackButton={true}
                    centerButtonCall={() => {
                        this.showPopView()
                    }}
                    backButtonCall={() => NavigationService.goBack()}/>
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
                    }}/>
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
        messageStore.selectedIndex = index
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
        if (messageStore.selectedIndex === -1)
            popView._setModalSelectedIndex(0, 0);
    }

    /**
     * 加载数据
     */

    loadDataFromNet(pageNum, pageSize, callBack) {
        messageStore.initMessage(this.type, pageNum, pageSize, data => {
            callBack(data, data.content && data.content.datas);
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }
});
