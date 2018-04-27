/**
 * Created by joyce-jx on 2017/6/17.
 */

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, ListView} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import Toast from '@remobile/react-native-toast';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Moment from 'moment';
import DatePicker from '../../../Common/View/datepicker';

import {config} from '../../../Common/Network/TCRequestConfig';
import NetUtils from '../../../Common/Network/TCRequestUitls';
import ModalDropdown from '../../../Common/View/ModalDropdown';
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NoDataView from '../../../Common/View/TCNoDataView';
import BackBaseComponent from '../../Base/TCBaseBackComponent';
import RowList from './View/TCUserFeedbackListRow';
import Feedback from './TCUserFeedback';
import FeedbackView from './TCUserFeedbackView';
import {
    Size, width, height, indexBgColor, userCenterTxtColor, loginAndRegeisterBorderColor
} from '../../resouce/theme';
import {common} from '../../resouce/images';

@observer
export default class TCUserFeedbackList extends BackBaseComponent {
    status = 'RESOLVED';
    stateModel = new StateModel()

    componentDidMount() {
        super.componentDidMount();
        this.listener = RCTDeviceEventEmitter.addListener('feedbackListRefresh', () => this.updateData());
    }

    /**
     * 从服务器获取数据
     * @param pageNum
     * @param pageSize
     * @param callBack
     */
    getDataFromServer(pageNum, pageSize, callBack) {
        let type = {
            pageSize: pageSize,
            start: pageNum * pageSize,
            createTimeFrom: this.stateModel.startDate + ' 00:00:00',
            createTimeTo: this.stateModel.endDate + ' 23:59:59',
            status: this.status,
        };
        NetUtils.getUrlAndParamsAndCallback(config.api.getUserFeedbackList, type,
            (data) => {
                this._partModalLoadingSpinnerOverLay.hide();
                if (data.rs) {
                    if (TC_FEEDBACK_COUNT != 0) {
                        TC_FEEDBACK_COUNT = 0;
                    }
                    callBack(data, data.content && data.content.datas);
                }
            }
        );
    }

    goFeedbackView(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'feedbackView',
                component: FeedbackView,
                passProps: {
                    ...this.props,
                    rowData: rowData,
                }
            });
        }
    }

    /**
     * 切换查询类型
     * @param type
     */
    getSearchStatus(type) {
        switch (type) {
            case '0':
                this.status = 'RESOLVED';
                break;
            case '1':
                this.status = 'NORMAL';
                break;
            default:
                this.status = null;
                break;
        }
        this._partModalLoadingSpinnerOverLay.show();
        this.updateData();
    }

    /**
     * 跳转到意见详情界面
     * @param rowData
     */
    goFeedback() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'feedback',
                component: Feedback,
                passProps: {...this.props}
            })
        }
    }

    goBack() {
        this.props.navigator.pop();
    }

    /**
     * 更新数据
     */
    updateData() {
        var listView = this.refs.refreshListView;
        listView && listView._updateData();
    }

    onPressType() {
        this.refs.modalDropDown.show();
    }

    onSelect(idx, value) {
        this.stateModel.setTypeName(value);
        this.getSearchStatus(idx);
    }

    onEndDateChange(date) {
        this.endDate = date;
        this.stateModel.setEndDate(date)
        this._partModalLoadingSpinnerOverLay.show();
        this.updateData();
    }

    onStartDateChange(date) {
        this.stateModel.setStartData(date)
        this._partModalLoadingSpinnerOverLay.show();
        this.updateData();
    }

    renderDatePicker(isStartDate) {
        return (
            <DatePicker
                style={styles.date}
                date={isStartDate ? this.stateModel.startDate : this.stateModel.endDate}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="确认"
                cancelBtnText="取消"
                showIcon={false}
                is24Hour
                customStyles={{
                    dateIcon: null,
                    dateInput: styles.dateInput,
                    dateText: styles.dateText,
                }}
                onDateChange={
                    isStartDate ? (date) => this.onStartDateChange(date) : (date) => this.onEndDateChange(date)
                }
            />
        );
    }

    /**
     * 渲染下拉列表item
     * @param rowData
     * @param rowID
     * @returns {XML}
     */
    renderModalDropDownRow(rowData) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemContainer}><Text style={styles.dropDownItem}>{rowData}</Text></View>
            </TouchableOpacity>
        );
    }

    /**
     * 渲染列表头部
     * @returns {XML}
     * @private
     */
    renderHeader() {
        return (
            <View style={styles.headingContainer}>
                <Text style={[styles.heading, styles.title]}>标题</Text>
                <Text style={styles.heading}>状态</Text>
                <Text style={[styles.heading, styles.replayTime]}>回复时间</Text>
            </View>
        )
    }

    renderNoDataView() {
        return(<NoDataView ref='NoDataView' titleTip={''} contentTip='意见反馈数据为空'/>);
    }

    /**
     * 渲染列表item
     * @param rowData
     * @returns {XML}
     */
    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => this.goFeedbackView(rowData)}>
                <RowList rowData={rowData}/>
            </TouchableOpacity>
        );
    }

    /**
     * 获取列表
     * @returns {XML}
     */
    renderContent() {
        return (
            <RefreshListView
                ref="refreshListView"
                isRenderFooter
                isAllowRefresh
                renderRow={(rowData) => this.renderRow(rowData)}
                loadDataFromNet={(pageNum, pageSize, callback) => this.getDataFromServer(pageNum, pageSize, callback)}
                isNodataView={() => this.renderNoDataView()}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'意见反馈'}
                    rightTitle={'我要反馈'}
                    rightButtonCall={() => this.goFeedback()}
                    needBackButton
                    backButtonCall={() => this.goBack()}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.txtFeedbackTime}>反馈时间</Text>
                        {this.renderDatePicker(true)}
                        <View style={styles.toContainer}><Text style={styles.toText}>至</Text></View>
                        {this.renderDatePicker(false)}
                        <TouchableOpacity onPress={() => this.onPressType()}>
                            <View style={styles.dropContainer}>
                                <Text style={styles.type}>{this.stateModel.typeName}</Text>
                                <ModalDropdown
                                    ref="modalDropDown"
                                    textStyle={styles.dropDownTxt}
                                    options={['已回复', '未回复', '全部']}
                                    style={styles.drop}
                                    dropdownStyle={styles.dropDown}
                                    renderRow={(rowData) => this.renderModalDropDownRow(rowData)}
                                    onSelect={(idx, value) => this.onSelect(idx, value)}>
                                    <Image source={common.iconNext} style={styles.imgNext} resizeMode='center'/>
                                </ModalDropdown>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.renderHeader()}
                    {this.renderContent()}
                    <LoadingSpinnerOverlay
                        ref={component => this._partModalLoadingSpinnerOverLay = component}
                        modal
                        marginTop={64}
                    />
                </View>
            </View>
        );
    }
}

class StateModel {
    @observable
    startDate = Moment().add(-90, 'd').format('YYYY-MM-DD');
    @observable
    endDate = Moment().format('YYYY-MM-DD');
    @observable
    typeName = '已回复';

    @action
    setStartData(date) {
        this.startDate = date
    }

    @action
    setEndDate(date) {
        this.endDate = date
    }

    @action
    setTypeName(name) {
        this.typeName = name
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: indexBgColor.mainBg,
    },
    headingContainer: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        marginBottom: 1,
    },
    heading: {
        color: userCenterTxtColor.feedBackTitle,
        textAlign: 'center',
        fontSize: Size.font15,
        paddingTop: 5,
        paddingBottom: 5,
        width: width * 0.25,
        fontWeight:'bold',
    },
    title: {
        width: width * 0.4,
        textAlign: 'left',
    },
    replayTime: {
        textAlign: 'right',
    },
    dropDownTxt: {
        color: userCenterTxtColor.feedBackTitle,
    },
    drop: {
        marginLeft: 5,
    },
    dropDown: {
        width: width * 0.3,
        height: height * 0.214,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        left: width * 0.7,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
    },
    imgNext: {
        width: 15,
        height: 15,
        transform: [{rotate: '90deg'}],
    },
    dropDownItemContainer: {
        alignItems: 'center',
        margin: 10,
    },
    dropDownItem: {
        fontSize: Size.font18,
        color: userCenterTxtColor.feedBackTitle,
    },
    dropContainer: {
        borderWidth: 0.5,
        height: 25,
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.21,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 50,
        borderBottomWidth: 5,
        borderBottomColor: indexBgColor.itemBg,
    },
    txtFeedbackTime: {
        width: width * 0.2,
        color: userCenterTxtColor.feedBackTitle,
        textAlign: 'right',
        fontSize: Size.font15,
    },
    toContainer: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },
    toText: {
        textAlign: 'center',
        color: userCenterTxtColor.feedBackTitle,
    },
    date: {
        width: width * 0.27,
    },
    dateInput: {
        borderWidth: 0,
        alignItems: 'center',
    },
    dateText: {
        padding: 2,
        color: userCenterTxtColor.feedBackTitle,
        alignItems: 'center',
        fontWeight:'bold',
        fontSize: Size.font14,
    },
    type: {
        marginLeft: 5,
        color: userCenterTxtColor.feedBackTitle,
    },
    list:{
        backgroundColor: indexBgColor.mainBg
    },
})
