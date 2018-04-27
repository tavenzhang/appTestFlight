/**
 * Created by jxmac on 2017/7/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    ListView,
    Image,
    ActivityIndicator,
    ScrollView,
    Alert
} from 'react-native';
import SegmentedControlTab from '../../../../Common/View/SegmentedControlTab';
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import { personal, common } from '../../../resouce/images';
import ModalDropdown from '../../../../Common/View/ModalDropdown';
import UserIcon from '../../../../Common/View/TCUserIcon';
import NetUitls from '../../../../Common/Network/TCRequestUitls';
import { config } from '../../../../Common/Network/TCRequestConfig';
import JXHelper from '../../../../Common/JXHelper/JXHelper';
import Toast from '@remobile/react-native-toast';
import DatePicker from '../../../../Common/View/datepicker';

import {
    Size,
    width,
    height,
    indexBgColor,
    listViewTxtColor,
    agentCenter,
    indexTxtColor
} from '../../../resouce/theme';
import Moment from 'moment';

export default class TCAgentSheets extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataPersonal: {
                count: 0,
                sumCommission: 0,
                sumRebate: 0,
                sumFee: 0,
                sumTransferIn: 0,
                sumTransferOut: 0,
                sumGrantTotal: 0,
                sumPnl: 0,
                sumTopup: 0,
                sumCharge: 0,
                sumWin: 0,
                sumWithdrawal: 0,
                sumBonus: 0,
            },
            dataGroup: {
                count: 0,
                sumCommission: 0,
                sumRebate: 0,
                sumFee: 0,
                sumTransferIn: 0,
                sumTransferOut: 0,
                sumGrantTotal: 0,
                sumPnl: 0,
                sumTopup: 0,
                sumCharge: 0,
                sumWin: 0,
                sumWithdrawal: 0,
                sumBonus: 0,
            },
            dataSource1:
                TCUSER_DATA.oauthRole === 'USER'
                    ? ['盈利总额', '有效投注总额', '派彩总额', '充值总额', '提款总额']
                    : this.getListTitles(),
            dataSource2: ['盈利总额', '有效投注总额', '派彩总额', '佣金总额', '充值总额', '提款总额'],
            selectedIndex: this.props.isUserSheet ? 0 : 1,
            beginTime: '',
            endTime: '',
            rightButtonTitle: '今天',
            animating: false
        };
    }

    componentWillMount() {
        this.getSearchTime(0);
    }

    componentDidMount() {}

    loadDataFormNet(index, start, end) {
        this.setState({ animating: true });
        NetUitls.PostUrlAndParamsAndCallback(
            index == 0 ? config.api.getUserSheets : config.api.getGroupSheets,
            {
                endDateInclusive: end,
                startDateInclusive: start,
                agentUsername: this.props.username ? this.props.username : null,
                username: TCUSER_DATA.username
            },
            data => {
                this.setState({ animating: false });
                if (this.state.selectedIndex == 0) {
                    if (data && data.rs && data.content.userStatementSummaryDto) {
                        this.setState({ dataPersonal: data.content.userStatementSummaryDto });
                    } else {
                        Toast.showShortCenter('网络异常');
                    }
                } else {
                    if (data && data.rs && data.content) {
                        this.setState({ dataGroup: data.content });
                    } else {
                        Toast.showShortCenter('网络异常');
                    }
                }
            }
        );
    }

    render() {
        let s = this.state.selectedIndex == 0 ? this.state.dataSource1 : this.state.dataSource2;
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref="TopNavigationBar"
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop();
                    }}
                    rightTitle={this.state.rightButtonTitle}
                    rightButtonCall={() => {
                        this.refs['ModalDropdown'].show();
                    }}
                    renderCenter={() => this.renderSegmentedControlTab()}
                />
                <ModalDropdown
                    ref="ModalDropdown"
                    textStyle={styles.dropDownTxtStyle}
                    options={this.getData()}
                    style={styles.dropStyle}
                    dropdownStyle={styles.dropDownStyle}
                    renderRow={(rowData, rowID) => this.renderModalDropDownRow(rowData, rowID)}
                    onSelect={(idx, value) => this.onSelect(idx, value)}
                    showButton={false}
                />
                <View style={styles.timeView}>
                    <DatePicker
                        style={{ width: width * 0.28 }}
                        date={this.state.beginTime}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="确认"
                        cancelBtnText="取消"
                        showIcon={false}
                        is24Hour={true}
                        customStyles={{
                            dateIcon: null,
                            dateInput: {
                                height: 30,
                                borderWidth: 0,
                                alignItems: 'center'
                            },
                            dateText: {
                                height: 29,
                                padding: 5,
                                fontSize: Size.default,
                                color: agentCenter.dateTxt
                            }
                        }}
                        onDateChange={date => {
                            this.setState({ beginTime: date });
                            this.loadDataFormNet(this.state.selectedIndex, date, this.state.endTime);
                        }}
                        minDate={Moment()
                            .subtract(30, 'days')
                            .format('YYYY-MM-DD')}
                        maxDate={new Date()}
                    />
                    <Text style={{ fontWeight: 'bold' }}>至</Text>
                    <DatePicker
                        style={{ width: width * 0.28 }}
                        date={this.state.endTime}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="确认"
                        cancelBtnText="取消"
                        showIcon={false}
                        is24Hour={true}
                        customStyles={{
                            dateIcon: null,
                            dateInput: {
                                height: 30,
                                borderWidth: 0,
                                alignItems: 'center'
                            },
                            dateText: {
                                height: 29,
                                padding: 5,
                                fontSize: Size.default,
                                color: agentCenter.dateTxt
                            }
                        }}
                        onDateChange={date => {
                            this.setState({ endTime: date });
                            this.loadDataFormNet(this.state.selectedIndex, this.state.beginTime, date);
                        }}
                        minDate={Moment()
                            .subtract(30, 'days')
                            .format('YYYY-MM-DD')}
                        maxDate={new Date()}
                    />
                </View>
                <View style={styles.agentDetail}>
                    <UserIcon
                        style={styles.imgUser}
                        text={JXHelper.getUserIconShowName(
                            this.props.username ? this.props.username : TCUSER_DATA.username
                        )}
                    />
                    <View style={styles.agentDetailTxt}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 10, fontSize: Size.font17, color: agentCenter.title }}>用户名 </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: Size.font17,
                                    color: agentCenter.title
                                }}
                            >
                                {this.props.username ? this.props.username : TCUSER_DATA.username}
                            </Text>
                        </View>
                        {!this.props.username && (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 10, fontSize: Size.font17, color: agentCenter.title }}>
                                    余额{' '}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        fontSize: Size.font17,
                                        color: agentCenter.balance
                                    }}
                                >
                                    {TCUSER_BALANCE}
                                </Text>
                            </View>
                        )}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 10, fontSize: Size.font17, color: agentCenter.title }}>
                                彩票返点{' '}
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: Size.font17,
                                    color: agentCenter.title
                                }}
                            >
                                {this.props.username ? this.props.prizeGroup : TCUSER_DATA.prizeGroup}
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView>{this.getContentView()}</ScrollView>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, { height: 80 }]}
                    size="large"
                />
            </View>
        );
    }

    renderSegmentedControlTab() {
        if (this.props.isUserSheet) {
            return (
                <Text
                    style={{
                        marginTop: Platform.OS == 'ios' ? 20 : 0,
                        fontSize: Size.font20,
                        color: indexTxtColor.topTitle,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        backgroundColor: 'transparent'
                    }}
                >
                    个人报表
                </Text>
            );
        } else
            return (
                <Text
                    style={{
                        marginTop: Platform.OS == 'ios' ? 20 : 0,
                        fontSize: Size.font20,
                        color: indexTxtColor.topTitle,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        backgroundColor: 'transparent'
                    }}
                >
                    团队报表
                </Text>
            );
    }

    getListTitles(){
        if (this.props.isUserSheet){
         return ['盈利总额', '有效投注总额', '派彩总额', '佣金总额', '充值总额', '提款总额'];
        }
        return ['盈利总额', '有效投注总额', '派彩总额', '佣金总额', '充值总额', '提款总额', '返点总额', '优惠总额']
    }

    onSelect(idx, value) {
        this.setState({
            rightButtonTitle: value
        });
        this.getSearchTime(idx);
    }

    getSearchTime(type) {
        let endTime = Moment().format('YYYY-MM-DD');
        let startTime = Moment().format('YYYY-MM-DD');
        switch (type) {
            case '0':
                startTime = Moment().format('YYYY-MM-DD');
                endTime = Moment().format('YYYY-MM-DD');
                break;
            case '1':
                startTime = Moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD');
                endTime = Moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '2':
                startTime = Moment()
                    .subtract(7, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '3':
                startTime = Moment()
                    .subtract(15, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '4':
                startTime = Moment()
                    .subtract(30, 'days')
                    .format('YYYY-MM-DD');
                break;
        }
        this.setState({
            beginTime: startTime,
            endTime: endTime
        });
        this.loadDataFormNet(this.state.selectedIndex, startTime, endTime);
    }

    renderModalDropDownRow(rowData, rowID) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{ fontSize: Size.font18, color: agentCenter.title }}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    getData() {
        return ['今天', '昨天', '一周', '半月', '一月'];
    }

    getContentView() {
        let arr = [];
        for (let i = 0; i < this.state.dataSource1.length; i++) {
            arr.push(this.rowLayout(this.state.dataSource1[i], i));
        }
        return arr;
    }

    rowLayout = (rowData, key) => {
        let assignValue = this.assignValue(rowData);
        if (rowData === '盈利总额' || rowData === '有效投注总额') {
            return (
                <TouchableOpacity key={key} onPress={() => this.pressRow(rowData)} style={styles.rowButton}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.rowText}>{rowData}</Text>
                        <View style={styles.redNoticeView}>
                            <Text style={{ fontSize: 11, color: 'red' }}>?</Text>
                        </View>
                    </View>
                    <Text
                        style={[
                            styles.rowText,
                            { marginRight: 10, color: listViewTxtColor.redTip },
                            assignValue < 0 && { color: listViewTxtColor.greenTip }
                        ]}
                    >
                        {assignValue}元
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity key={key} onPress={() => this.pressRow(rowData)} style={styles.rowButton}>
                    <Text style={styles.rowText}>{rowData}</Text>
                    <Text
                        style={[
                            styles.rowText,
                            { marginRight: 10, color: listViewTxtColor.redTip },
                            assignValue < 0 && { color: listViewTxtColor.greenTip }
                        ]}
                    >
                        {assignValue}元
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    pressRow(rowData) {
        if (rowData === '盈利总额') {
            Alert.alert('温馨提示', '盈利总额=投注赢利+优惠+佣金', [{ text: '确定' }]);
        } else if (rowData === '有效投注总额') {
            Alert.alert('温馨提示', '有效投注总额=总投注-撤单', [{ text: '确定' }]);
        }
    }

    assignValue = key => {
        if (this.state.selectedIndex == 0) {
            if (key === '盈利总额') {
                return (this.state.dataPersonal.sumPnl+this.state.dataPersonal.sumCommission+this.state.dataPersonal.sumBonus).toFixed(2);
            } else if (key === '有效投注总额') {
                return this.state.dataPersonal.sumCharge;
            } else if (key === '派彩总额') {
                return this.state.dataPersonal.sumWin;
            } else if (key === '佣金总额') {
                return this.state.dataPersonal.sumCommission;
            } else if (key === '充值总额') {
                return this.state.dataPersonal.sumTopup;
            } else if (key === '提款总额') {
                return this.state.dataPersonal.sumWithdrawal;
            } else {
                return null;
            }
        } else {
            if (key === '盈利总额') {
                return (this.state.dataGroup.sumPnl+this.state.dataGroup.sumCommission+this.state.dataGroup.sumBonus).toFixed(2);
            } else if (key === '有效投注总额') {
                return this.state.dataGroup.sumCharge;
            } else if (key === '派彩总额') {
                return this.state.dataGroup.sumWin;
            } else if (key === '佣金总额') {
                return this.state.dataGroup.sumCommission;
            } else if (key === '充值总额') {
                return this.state.dataGroup.sumTopup;
            } else if (key === '提款总额') {
                return this.state.dataGroup.sumWithdrawal;
            } else if (key === '返点总额') {
                return this.state.dataGroup.sumRebate;
            } else if (key === '优惠总额') {
                return this.state.dataGroup.sumBonus;
            }
            return '';
        }
    };

    handleIndexChange = index => {
        this.setState({
            selectedIndex: index
        });
        this.loadDataFormNet(index, this.state.beginTime, this.state.endTime);
    };
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

    container: {
        backgroundColor: indexBgColor.mainBg,
        flex:1
    },
    tabsContainerStyle: {
        //custom styles
        top: Platform.OS == 'ios' ? 10 : 0,
        height: 35,
        width: width - 180
    },
    tabStyle: {
        //custom styles
        backgroundColor: agentCenter.addAccountTopNormalBg,
        borderColor: agentCenter.addAccountTopBorder
    },
    tabTextStyle: {
        //custom styles
        fontSize: width < 375 ? Size.font14 : Size.font16,
        fontWeight: 'bold',
        color: agentCenter.addAccountTopTxtNormal
    },
    activeTabStyle: {
        //custom styles
        backgroundColor: agentCenter.addAccountTopSelectedBg
    },
    activeTabTextStyle: {
        //custom styles
        fontSize: width < 375 ? Size.font14 : Size.font16,
        fontWeight: 'bold',
        color: agentCenter.addAccountTopTxtSelected
    },
    dropDownStyle: {
        width: width * 0.9,
        height: height * 0.4,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 15,
        left: width * 0.1 / 2,
        backgroundColor: indexBgColor.itemBg
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
    dropStyle: {
        marginLeft: 10,
        marginRight: 10
    },
    dropDownTxtStyle: {
        color: agentCenter.title
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50
    },
    timeButton: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    timeBeginText: {
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 10
    },
    timeEndText: {
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
        marginRight: 10
    },
    rowButton: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg
    },

    rowText: {
        textAlign: 'left',
        fontSize: 14,
        marginLeft: 10
        // alignSelf:'center',
    },

    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100
    },

    headerImage: {
        width: 60,
        height: 60,
        marginLeft: 20,
        borderRadius: 30
    },

    subHeaderView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 30
    },

    viewInHeader: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: 60,
        // marginTop:20,
        // backgroundColor:'red',
        marginLeft: 10
    },

    itemStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: indexBgColor.itemBg
    },
    itemLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemTxtLeftStyle: {
        marginLeft: 20,
        fontSize: Size.large,
        color: listViewTxtColor.title
    },
    itemTxtRightStyle: {
        marginRight: 60,
        marginLeft: 20,
        fontSize: Size.large,
        color: listViewTxtColor.title,
        textAlign: 'right'
    },
    imgNext: {
        width: 10,
        height: 15,
        marginRight: 10
    },

    dropDownTxtStyle: {
        color: agentCenter.title
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
    imgUser: {
        width: 70,
        height: 70,
        marginLeft: 10,
        borderRadius: 35
    },
    agentDetail: {
        flexDirection: 'row',
        height: height * 0.2,
        alignItems: 'center'
    },
    agentDetailTxt: {
        marginLeft: 10
    },
    redNoticeView: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
