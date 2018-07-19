/**
 * Created by jxmac on 2017/7/17.
 */
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {agentCenter, height, indexBgColor, Size, width} from '../../resouce/theme';
import TopNavigationBar from '../../../Common/View/TCNavigationBarSelectorStyle';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import ModalDropdown from '../../../Common/View/ModalDropdown';
import Toast from '../../../Common/JXHelper/JXToast';
import DatePicker from '../../../Common/View/datepicker';
import {inject, observer} from 'mobx-react/native'
import Moment from 'moment';
import UserBetsStore from '../../../Data/store/UserBetsStore'
import NoDataView from '../../../Common/View/TCNoDataView'
import IMOrderItem from './View/TCUserIMBetItemRow'
import SSOrderItem from './View/TCUserSSBetItemRow'
import MGOrderItem from './View/TCUserMGBetItemRow'
import KYOrderItem from './View/TCUserKYBetItemRow'
import PopView from '../../../Common/View/TCSelectModal'
import {withMappedNavigationProps} from "react-navigation-props-mapper";

/**
 * 用户投注记录
 */
@withMappedNavigationProps()
@observer
export default class TCUserOtherBetRecords extends Component {

    constructor(props) {
        super(props)
        this.platform = this.props.platform;
        this.userBetsStore = new UserBetsStore();
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: indexBgColor.mainBg}}>
                <TopNavigationBar
                    ref="TopNavigationBar"
                    needBackButton={true}
                    title={"投注记录"}
                    backButtonCall={() => {NavigatorHelper.popToBack()}}
                    rightTitle={this.userBetsStore.fasterDateTitle}
                    rightButtonCall={() => {this.refs['ModalDropdown'].show()}}
                    centerButtonCall={() => {this.showPopView()}} />
                <PopView
                    ref="TCSelectPopupView"
                    SelectorTitleArr={this.userBetsStore.getBetsType(this.platform)}
                    selectedFunc={index => {this.selectMsgType(index)}}
                    selectedIndex={-1} />
                <ModalDropdown
                    ref="ModalDropdown"
                    textStyle={styles.dropDownTxtStyle}
                    options={this.userBetsStore.getDateArray()}
                    style={styles.dropStyle}
                    dropdownStyle={styles.dropDownStyle}
                    renderRow={(rowData, rowID) => this.renderModalDropDownRow(rowData, rowID)}
                    onSelect={(idx, value) => this.onSelect(idx, value)}
                    showButton={false} />
                <View style={styles.timeView}>
                    <DatePicker
                        style={{width: width * 0.28}}
                        date={this.userBetsStore.beginTime}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="确认"
                        cancelBtnText="取消"
                        showIcon={false}
                        is24Hour={true}
                        customStyles={{
                            dateIcon: null,
                            dateInput: {height: 30, borderWidth: 0, alignItems: 'center'},
                            dateText: {height: 29, padding: 5, fontSize: Size.default, color: agentCenter.dateTxt}
                        }}
                        onDateChange={date => {this.userBetsStore.beginTime = date; this.loadData()}}
                        minDate={Moment().subtract(90, 'days').format('YYYY-MM-DD')}
                        maxDate={new Date()} />
                    <Text style={{fontWeight: 'bold'}}>至</Text>
                    <DatePicker
                        style={{width: width * 0.28}}
                        date={this.userBetsStore.endTime}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="确认"
                        cancelBtnText="取消"
                        showIcon={false}
                        is24Hour={true}
                        customStyles={{
                            dateIcon: null,
                            dateInput: {height: 30, borderWidth: 0, alignItems: 'center'},
                            dateText: {height: 29, padding: 5, fontSize: Size.default, color: agentCenter.dateTxt}
                        }}
                        onDateChange={date => {this.userBetsStore.endTime = date; this.loadData()}}
                        minDate={Moment().subtract(90, 'days').format('YYYY-MM-DD')}
                        maxDate={new Date()} />
                </View>
                {this.renderHeader()}
                <FlatList
                    style={{flex: 1}}
                    data={this.userBetsStore.betData}
                    keyExtractor={(item, index) => "list" + index}
                    ItemSeparatorComponent={() => this.renderDivider()}
                    ListEmptyComponent={this.renderEmptyView()}
                    renderItem={({item}) => this.getRenderRow(item)} />
                <ActivityIndicator
                    animating={this.userBetsStore.loading}
                    style={[styles.centering, {height: 80}]}
                    size="large" />
            </View>
        );
    }

    renderDivider() {
        return (
            <View style={{height: 1, backgroundColor: indexBgColor.mainBg, width: width}}/>
        )
    }

    renderHeader() {
        if (this.platform === 'IMONE' || this.platform === 'SS') {
            return (
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>类别</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>投注</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>返点</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>输赢</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>状态</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.25}]}>时间</Text>
                </View>
            )
        } else if (this.platform === 'MG') {
            return (
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, {width: width * 0.3}]}>游戏</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.2}]}>投注</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.2}]}>输赢</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.3}]}>时间</Text>
                </View>
            )
        } else if (this.platform === 'KY') {
            return (
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, {width: width * 0.3}]}>游戏</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.2}]}>房间</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.2}]}>盈亏</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.3}]}>时间</Text>
                </View>
            )
        }
    }

    renderEmptyView() {
        return this.userBetsStore.status
            ? (<NoDataView
                ref='NoDataView'
                titleTip={'暂无下注记录'}
                contentTip="大奖不等待，速去下注吧~"
                btnTxt="立即下注"
                gotoDoing={() => {NavigatorHelper.popToTop()}}/>)
            : (<NoDataView
                ref='NoDataView'
                unNetwork={true}
                titleTip={'加载失败'}
                contentTip="服务器出错啦，请稍后再试~"
                btnTxt="重新加载"
                gotoDoing={() => {this.loadData()}}/>)
    }

    onSelect(idx, value) {
        this.userBetsStore.fasterDateTitle = value;
        this.userBetsStore.setDateArrayKey(idx);
        this.loadData();
    }

    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView;
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar;
        navBar.setTitle(this.userBetsStore.getBetsType(this.platform)[index]);
        this.userBetsStore.selectBetTypeIndex = index;
        this.loadData();
    }


    showPopView() {
        var popView = this.refs.TCSelectPopupView;

        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
        var popView = this.refs.TCSelectPopupView;
        popView._setModalSelectedIndex(this.userBetsStore.selectBetTypeIndex, 0);
    }

    loadData() {
        this.platform = this.props.platform;
        this.userBetsStore.loadUserBets(this.platform, (res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
    }

    renderModalDropDownRow(rowData, rowID) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: Size.font18, color: agentCenter.title}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    getRenderRow(item) {
        if (this.platform === 'IMONE') {
            return (
                <TouchableOpacity onPress={() => {JX_NavHelp.pushView(JX_Compones.UserIMBetDetail,{orderData: item})}}>
                    <IMOrderItem orderData={item}/>
                </TouchableOpacity>
            )
        } else if (this.platform === 'SS') {
            return (
                <TouchableOpacity onPress={() => {JX_NavHelp.pushView(JX_Compones.UserSSBetDetail,{orderData: item})}}>
                    <SSOrderItem orderData={item}/>
                </TouchableOpacity>
            )
        } else if (this.platform === 'MG') {
            return (
                <TouchableOpacity onPress={() => {JX_NavHelp.pushView(JX_Compones.UserMGBetDetail,{orderData: item})}}>
                    <MGOrderItem orderData={item}/>
                </TouchableOpacity>
            )
        } else if (this.platform === 'KY') {
            return (
                <TouchableOpacity onPress={() => {JX_NavHelp.pushView(JX_Compones.UserKYBetDetail,{orderData: item})}}>
                    <KYOrderItem orderData={item}/>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    centering: {
        position: 'absolute',
        top: 300,
        marginHorizontal: width / 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    dropDownItemStyle: {
        alignItems: 'center',
        margin: 15
    },
    imgNext: {
        width: 20,
        height: 20,
        marginRight: 30
    },
    dropDownTxtStyle: {
        color: agentCenter.title
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40
    },
    dropStyle: {
        marginLeft: width * 0.7,
        marginRight: 5
    },
    dropDownStyle: {
        width: width * 0.22,
        height: height * 0.35,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 0,
        marginRight: 5,
        backgroundColor: indexBgColor.mainBg
    },
    headerTitle: {
        color: 'white',
        fontSize: Size.default,
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#434a64',
        alignItems: 'center',
        height: 40,
        flexDirection: 'row'
    }
})
