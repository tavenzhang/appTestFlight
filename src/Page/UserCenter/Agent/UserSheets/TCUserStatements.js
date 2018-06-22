import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import ModalDropdown from '../../../../Common/View/ModalDropdown';
import UserIcon from '../../../../Common/View/TCUserIcon';
import NetUitls from '../../../../Common/Network/TCRequestUitls';
import {config} from '../../../../Common/Network/TCRequestConfig';
import JXHelper from '../../../../Common/JXHelper/JXHelper';
import Toast from '../../../../Common/JXHelper/JXToast';
import DatePicker from '../../../../Common/View/datepicker';
import Helper from "../../../../Common/JXHelper/TCNavigatorHelper";

import {
    agentCenter,
    height,
    indexBgColor,
    indexTxtColor,
    listViewTxtColor,
    Size,
    width
} from '../../../resouce/theme';
import Moment from 'moment';

/**
 * 第三方个人报表
 * Created by jxmac on 2017/7/17.
 */
export default class TCUserStatements extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.platforms = params.platform
        this.state = {
            dataPersonal: {
                totalBet: 0, // 总投注
                actualBet: 0, // 实际投注
                rebateAmount: 0, // 返水金额
                totalPayout: 0, // 总指出?
                playerWinLoss: 0, // 玩家输赢
                totalTopUp: 0, // 总充值
                totalWithdraw: 0, // 总提款
                totalNotSettled: 0, // 未结算
                betCount: 0, // 下注次数
                totalDsfWin: 0, // 平台获利
            },
            dataSource1: ['投注总额', '实际投注总额', '返水金额', '输赢总额', '充值总额', '提款总额'],
            beginTime: '',
            endTime: '',
            rightButtonTitle: '今天',
            animating: false
        };
    }

    componentWillMount() {
        this.getSearchTime(0);
    }

    componentDidMount() {
    }

    loadDataFormNet(start, end) {
        this.setState({animating: true});
        NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.getUserOtherStatements,
            {startTime: start, endTime: end}, this.platforms, (data) => {
                this.setState({animating: false});
                if (data && data.rs && data.content) {
                    if (this.platforms === 'IMONE' && data.content.IMONE) {
                        this.setState({dataPersonal: data.content.IMONE});
                    } else if (this.platforms === 'SS' && data.content.SS) {
                        this.setState({dataPersonal: data.content.SS});
                    } else if (this.platforms === 'MG' && data.content.MG) {
                        this.setState({dataPersonal: data.content.MG});
                    }
                } else {
                    Toast.showShortCenter('网络异常');
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref="TopNavigationBar"
                    needBackButton={true}
                    backButtonCall={() => {Helper.popToBack()}}
                    rightTitle={this.state.rightButtonTitle}
                    rightButtonCall={() => {this.refs['ModalDropdown'].show()}}
                    renderCenter={() => this.renderSegmentedControlTab()} />
                <ModalDropdown
                    ref="ModalDropdown"
                    textStyle={styles.dropDownTxtStyle}
                    options={this.getData()}
                    style={styles.dropStyle}
                    dropdownStyle={styles.dropDownStyle}
                    renderRow={(rowData, rowID) => this.renderModalDropDownRow(rowData, rowID)}
                    onSelect={(idx, value) => this.onSelect(idx, value)}
                    showButton={false} />
                <View style={styles.timeView}>
                    <DatePicker
                        style={{width: width * 0.28}}
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
                            this.setState({beginTime: date});
                            this.loadDataFormNet(date, this.state.endTime);
                        }}
                        minDate={Moment().subtract(90, 'days').format('YYYY-MM-DD')}
                        maxDate={new Date()} />
                    <Text style={{fontWeight: 'bold'}}>至</Text>
                    <DatePicker
                        style={{width: width * 0.28}}
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
                            this.setState({endTime: date});
                            this.loadDataFormNet(this.state.beginTime, date);
                        }}
                        minDate={Moment().subtract(30, 'days').format('YYYY-MM-DD')}
                        maxDate={new Date()} />
                </View>
                <ScrollView>{this.getContentView()}</ScrollView>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="large"
                />
            </View>
        );
    }

    renderSegmentedControlTab() {
        return (
            <Text
                style={{
                    marginTop: Platform.OS === 'ios' ? 20 : 0,
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
            case '5':
                startTime = Moment()
                    .subtract(90, 'days')
                    .format('YYYY-MM-DD');
                break;
        }
        this.setState({
            beginTime: startTime,
            endTime: endTime
        });
        this.loadDataFormNet(startTime, endTime);
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

    getData() {
        return ['今天', '昨天', '一周', '半月', '一月', '三月'];
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
        return (
            <TouchableOpacity key={key} style={styles.rowButton}>
                <Text style={styles.rowText}>{rowData}</Text>
                <Text
                    style={[styles.rowText,
                        {marginRight: 10, color: listViewTxtColor.redTip},
                        assignValue < 0 && {color: listViewTxtColor.greenTip}]}>
                    {assignValue}元
                </Text>
            </TouchableOpacity>
        )
    }

    assignValue = key => {
        if (key === '投注总额') {
            return this.state.dataPersonal.totalBet.toFixed(2);
        } else if (key === '实际投注总额') {
            return this.state.dataPersonal.actualBet;
        } else if (key === '返水金额') {
            return this.state.dataPersonal.rebateAmount;
        } else if (key === '输赢总额') {
            return this.state.dataPersonal.playerWinLoss;
        } else if (key === '充值总额') {
            return this.state.dataPersonal.totalTopUp;
        } else if (key === '提款总额') {
            return this.state.dataPersonal.totalWithdraw;
        } else if (key === '未结算总额') {
            return this.state.dataPersonal.totalNotSettled;
        } else {
            return null;
        }
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
        flex: 1
    },
    tabsContainerStyle: {
        //custom styles
        top: Platform.OS === 'ios' ? 10 : 0,
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
    dropDownItemStyle: {
        alignItems: 'center',
        margin: 15
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg
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
