/**
 * Created by jxmac on 2017/7/17.
 */

import React, {Component} from 'react';
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
    Size,
    width,
    height,
    indexBgColor,
    listViewTxtColor,
    agentCenter,
    indexTxtColor
} from '../../../resouce/theme';
import Moment from 'moment';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {observer} from 'mobx-react'
import userStore from '../../../../Data/store/UserStore'
import UserSheetsStore from '../../../../Data/store/UserSheetsStore'

@withMappedNavigationProps()
@observer
export default class TCAgentSheets extends Component {


    constructor(props) {
        super(props);
        this.userSheetsStore = new UserSheetsStore(this.props.isUserSheet, this.props.username);
    }

    componentWillMount() {
        this.userSheetsStore.getSearchTime(0)
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref="TopNavigationBar"
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack()
                    }}
                    rightTitle={this.userSheetsStore.rightButtonTitle}
                    rightButtonCall={() => {
                        this.refs['ModalDropdown'].show();
                    }}
                    renderCenter={() => this.getTitle()}
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
                    {this.getDateView(true)}
                    <Text style={{fontWeight: 'bold'}}>至</Text>
                    {this.getDateView(false)}
                </View>
                <View style={styles.agentDetail}>
                    <UserIcon
                        style={styles.imgUser}
                        text={JXHelper.getUserIconShowName(
                            this.props.username ? this.props.username : userStore.userName
                        )}
                        bgColor={userStore.userLogoColor}
                    />
                    <View style={styles.agentDetailTxt}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginTop: 10, fontSize: Size.font17, color: agentCenter.title}}>用户名 </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: Size.font17,
                                    color: agentCenter.title
                                }}
                            >
                                {this.props.username ? this.props.username : userStore.userName}
                            </Text>
                        </View>
                        {!this.props.username && (
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{marginTop: 10, fontSize: Size.font17, color: agentCenter.title}}>
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
                                    {userStore.balance}
                                </Text>
                            </View>
                        )}
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{marginTop: 10, fontSize: Size.font17, color: agentCenter.title}}>
                                彩票返点{' '}
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: Size.font17,
                                    color: agentCenter.title
                                }}
                            >
                                {this.props.username ? this.props.prizeGroup : userStore.prizeGroup}
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView>{this.getContentView()}</ScrollView>
                <ActivityIndicator
                    animating={this.userSheetsStore.loading}
                    style={[styles.centering, {height: 80}]}
                    size="large"
                />
            </View>
        );
    }

    getTitle() {
        return (
            <Text
                style={{
                    fontSize: Size.font20,
                    color: indexTxtColor.topTitle,
                    fontWeight: 'bold',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                }}
            >
                {this.userSheetsStore.getTitle()}
            </Text>
        );
    }

    getDateView(isStart) {
        return (
            <DatePicker
                style={{width: width * 0.28}}
                date={isStart ? this.userSheetsStore.beginTime : this.userSheetsStore.endTime}
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
                    if (isStart) {
                        this.userSheetsStore.beginTime = date;
                    } else {
                        this.userSheetsStore.endTime = date;
                    }
                    this.userSheetsStore.loadDataFormNet();
                }}
                minDate={Moment()
                    .subtract(90, 'days')
                    .format('YYYY-MM-DD')}
                maxDate={new Date()}
            />
        )
    }

    onSelect(idx, value) {
        this.userSheetsStore.rightButtonTitle = value;
        this.userSheetsStore.getSearchTime(idx);
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
        for (let i = 0; i < this.userSheetsStore.getContentTitle().length; i++) {
            arr.push(this.rowLayout(this.userSheetsStore.getContentTitle()[i], i));
        }
        return arr;
    }

    rowLayout = (rowData, key) => {
        let assignValue = this.userSheetsStore.assignValue(rowData);
        if (rowData === '盈利总额') {
            return (
                <TouchableOpacity key={key} onPress={() => this.pressRow(rowData)} style={styles.rowButton}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.rowText}>{rowData}</Text>
                        <View style={styles.redNoticeView}>
                            <Text style={{fontSize: 11, color: 'red'}}>?</Text>
                        </View>
                    </View>
                    <Text
                        style={[
                            styles.rowText,
                            {marginRight: 10, color: listViewTxtColor.redTip},
                            assignValue < 0 && {color: listViewTxtColor.greenTip}
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
                            {marginRight: 10, color: listViewTxtColor.redTip},
                            assignValue < 0 && {color: listViewTxtColor.greenTip}
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
            Alert.alert('温馨提示', '盈利总额=投注赢利+优惠+佣金', [{text: '确定'}]);
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

    container: {
        backgroundColor: indexBgColor.mainBg,
        flex: 1
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
        height: height * 0.5,
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
