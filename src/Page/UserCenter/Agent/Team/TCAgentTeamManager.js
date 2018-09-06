/**
 * 投注号码
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React from 'react';
import {
    Alert,
    Image,
    ListView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    agentCenter,
    buttonStyle,
    height,
    indexBgColor,
    listViewTxtColor,
    Size,
    width
} from '../../../resouce/theme';
import {agent, common} from '../../../resouce/images';
import RowList from './View/TCAgentTeamListRow';
import _ from 'lodash';
import NetUtils from '../../../../Common/Network/TCRequestUitls';
import {config} from '../../../../Common/Network/TCRequestConfig';
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper';
import Helper from '../../../../Common/JXHelper/TCNavigatorHelper';
import Toast from '../../../../Common/JXHelper/JXToast';
import ScrollNavigatorBar from './View/ScrollNavigatorBar';
import BaseComponent from '../../../Base/TCBaseComponent';
import LoadingSpinnerOverlay from '../../../../Common/View/LoadingSpinnerOverlay'
import dismissKeyboard from 'dismissKeyboard';
import NoDataView from '../../../../Common/View/TCNoDataView';
import ModalDropdown from '../../../../Common/View/ModalDropdown';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import userStore from '../../../../Data/store/UserStore'
import {inject, observer} from "mobx-react/native";

@inject("userStore")
@observer
export default class TCAgentTeamList extends BaseComponent {
    constructor(state) {
        super(state);
        this.initStateAndValue();
    }

    initStateAndValue() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = [];
        this.currentPage = 1;
        this.pageSize = 20;
        this.originAccountKind = 0;
        this.selectData = null;
        this.canScroll = false;
        this.scrollY = 0;
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            loaded: false, //控制Request请求是否加载完毕
            foot: 0, // 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isRefreshing: false,
            username: '',
            tabs: [{userId: 0, username: userStore.userName}],
            withDrawShow: false,
            renderPlaceholderOnly: true,
            isNoData: false,
            isTimeOut: false,
            typeName: '今天',
            typeId: 0,
            lotteryTip: '投注金额',
            lotteryType: -1,
            payTip: '充值金额',
            payType: -1,
            selectIndex: -1,
            groupShow: false,
            accountKind: 0,
            user: {},
            minPriceGroup: 1800,
            lastIndex: -1,
            isHiddenArrow: false
        };
    }

    static defaultProps = {
        rightButtonTitle: '+'
    };

    componentDidMount() {
        super.componentDidMount();
        this.getDataFromServer();
        this.listener = RCTDeviceEventEmitter.addListener('agentManagerAddUserRefresh', () => {
            this.initStateAndValue();
            this.getDataFromServer();
        });
    }

    componentDidUpdate() {
        let listView = this.refs.listView;
        if (listView && listView.scrollTo && this.canScroll) {
            listView.scrollTo({x: 0, y: this.scrollY, animated: false});
        }
        this.pageSize = 20;
    }

    render() {
        let sp = super.render();
        if (sp) return sp;
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref="TopNavigationBar"
                    title={'用户管理'}
                    needBackButton={true}
                    backButtonCall={() => {
                        dismissKeyboard();
                        Helper.popToBack()
                        // this.props.wantPopToN > 0
                        //     ? Helper.popN(this.props.wantPopToN)
                        //     : Helper.popToBack()
                    }}
                    rightTitle={'+添加用户'}
                    rightButtonCall={() => {
                        this.addUser();
                    }}
                />
                <View style={styles.searchStyle}>
                    <View style={styles.searchBar}>
                        <TextInput
                            placeholder="请输入用户名"
                            style={styles.loginInput}
                            maxLength={15}
                            defaultValue={this.state.username}
                            placeholderTextColor={agentCenter.content}
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.onchangeUserName(text)}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                this.search();
                            }}
                        >
                            <Image source={common.search} style={styles.searchImgStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={styles.dropDownView}>

                 <TouchableOpacity onPress={()=> {
                 this.refs['LotteryModalDropdown'].show() }}>
                 <View
                 style={styles.dropMainStyle}>
                 <ModalDropdown
                 ref="LotteryModalDropdown"
                 textStyle={styles.dropDownTxtStyle}
                 options={this.getLotteryMoneyData()}
                 style={styles.dropStyle}
                 dropdownStyle={styles.lotteryDropDownStyle}
                 defaultValue={'投注金额'}
                 renderRow={(rowData, rowID)=>this.renderModalDropDownRow(rowData, rowID)}
                 onSelect={(idx, value)=>this.onSelect(idx, value)}
                 />
                 <Image source={require('image!icon_next')} style={styles.imgNext}/>
                 </View>
                 </TouchableOpacity>


                 <TouchableOpacity onPress={()=> {
                 this.refs['DateModalDropdown'].show() }}>
                 <View
                 style={styles.dropMainStyle}>

                 <ModalDropdown
                 ref="DateModalDropdown"
                 textStyle={styles.dropDownTxtStyle}
                 options={this.getDate()}
                 style={styles.dropStyle}
                 defaultValue={'今天'}
                 dropdownStyle={styles.dropDownStyle}
                 renderRow={(rowData, rowID)=>this.renderModalDropDownRow(rowData, rowID)}
                 onSelect={(idx, value)=>this.onSelect(idx, value)}
                 />
                 <Image source={require('image!icon_next')} style={styles.imgNext}/>
                 </View>
                 </TouchableOpacity>


                 <TouchableOpacity onPress={()=> {
                 this.refs['ModalDropdown'].show() }}>
                 <View
                 style={[styles.dropMainStyle,{borderRightWidth:0}]}>
                 <ModalDropdown
                 ref="ModalDropdown"
                 textStyle={styles.dropDownTxtStyle}
                 options={this.getPayData()}
                 style={styles.dropStyle}
                 defaultValue={'充值额度'}
                 dropdownStyle={styles.dropDownStyle}
                 renderRow={(rowData, rowID)=>this.renderModalDropDownRow(rowData, rowID)}
                 onSelect={(idx, value)=>this.onSelect(idx, value)}
                 />
                 <Image source={require('image!icon_next')} style={styles.imgNext}/>
                 </View>
                 </TouchableOpacity>
                 </View>*/}

                <View style={styles.userLayerView}>
                    <Text style={styles.titleTxt}>当前用户层级</Text>
                    <ScrollNavigatorBar
                        data={this.state.tabs}
                        ref="ScrollNavigatorBar"
                        selectTab={i => {
                            this.selectPos(i);
                        }}
                    />
                </View>
                {this.renderHeader()}
                {this.getContentView()}
                <LoadingSpinnerOverlay
                    ref={component => (this._partModalLoadingSpinnerOverLay = component)}
                    modal={true}
                    marginTop={64}
                />
                {/* {this.getWithDrawView()}*/}
                {this.updateUserPriceGroup()}
            </View>
        );
    }

    getContentView() {
        if (!this.state.isTimeOut) {
            return this.state.isNoData ? (
                <NoDataView ref="NoDataView" titleTip={''} contentTip="下级用户为空"/>
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}
                    onScroll={e => this.scrollHeader(e)}
                >
                    <ListView
                        ref="listView"
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, secId, rowId, rowMap) => this.getRenderRow(rowData, secId, rowId, rowMap)}
                        enableEmptySections={true}
                        removeClippedSubviews={true}
                        initialListSize={10}
                        pageSize={20}
                        scrollRenderAheadDistance={20}
                        renderFooter={() => this.renderFooter()}
                        onEndReachedThreshold={20}
                        onEndReached={() => this.loadMore()}
                        onScroll={e => this.scrollListHeader(e)}
                    />
                </ScrollView>
            );
        } else {
            return (
                <NoDataView
                    ref="TimeOutView"
                    titleTip={'网络出问题啦~'}
                    contentTip="网络或服务器出问题了，请检查网络链接~"
                />
            );
        }
    }

    updateUser(rowData) {
        if (this.state.tabs.length == 1) {
            this.setModalVisible();
            this.setState({
                user: rowData,
                accountKind: rowData.memberType == 'AGENT' ? 0 : 1,
                minPriceGroup: rowData.prizeGroup,
                prizeGroup: rowData.prizeGroup,
                isChange: false
            });
        } else {
            Toast.show('您不能跨代理操作!');
        }
    }

    withdrawToUser(rowData) {
        Toast.showShortCenter('该功能暂时还未开放!');
    }

    getLotteryMoneyData() {
        return ['投注额度>=50', '投注额度<50', '投注额度>=200', '投注额度>=500'];
    }

    getPayData() {
        return ['投注额度>=50', '投注额度<50', '投注额度>=200', '投注额度>=500'];
    }

    getDate() {
        return ['今天', '本周', '本月'];
    }

    getAccountKindsButton(title, image, fuc) {
        return (
            <TouchableOpacity
                onPress={fuc}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 40,
                    flexDirection: 'row',
                    height: 40
                }}
            >
                <Image source={image} style={{width: 15, height: 15, marginRight: 5}}/>
                <Text style={{fontSize: Size.font15, color: agentCenter.content}}>{title}</Text>
            </TouchableOpacity>
        );
    }

    search() {
        dismissKeyboard();
        let username = this.state.username;
        username = username.replace(/^\s+|\s+$/g, '');
        if (username && username.length > 0) {
            this.scrollToTop();
            this._partModalLoadingSpinnerOverLay.show();
            setTimeout(() => {
                this.clearData();
                this.getDataFromServer(null);
            }, 1000);
        }
    }

    getRenderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.onPressRow(rowData, rowID);
                }}
            >
                <View>
                    <RowList
                        rowData={rowData}
                        selectData={this.selectData}
                        updateUser={() => {
                            this.updateUser(rowData);
                        }}
                        juniorUser={() => {
                            this.addTab(rowData);
                        }}
                        withDraw={() => {
                            this.withdrawToUser(rowData);
                        }}
                        userDetail={() => {
                            this.gotoUserSheets(rowData);
                        }}
                        tabs={this.state.tabs}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    onPressRow(rowData, rowID) {
        let newData = _.cloneDeep(this.data);
        for (let i = 0; i < this.data.length; i++) {
            if (i == rowID) {
                if (this.selectData && this.selectData.reset && this.data[rowID].userId == this.selectData.userId) {
                    this.data[rowID].isSelected = false;
                } else {
                    this.data[rowID].isSelected = !this.data[rowID].isSelected;
                }
            } else {
                this.data[i].isSelected = false;
            }
        }

        this.selectData = this.data[rowID];
        this.selectData.reset = false;
        this.canScroll = false;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData)
        });
    }

    addUser() {
        dismissKeyboard();
        NavigatorHelper.pushToAgentAddAccount(true)
    }

    gotoUserDetail(rowData) {
        Toast.showShortCenter('该功能暂时还未开放!');
    }

    gotoUserSheets(rowData) {
        dismissKeyboard();
        NavigatorHelper.pushToUserSheet(false, rowData.username, rowData.prizeGroup);
    }

    selectPos(pos) {
        dismissKeyboard();
        let len = this.state.tabs.length;
        let tabData = this.state.tabs;
        this.scrollToTop();
        if (pos + 1 == len) {
            return;
        } else {
            this._partModalLoadingSpinnerOverLay.show();
            let scroll = this.refs.ScrollNavigatorBar;
            scroll._clearData();
            tabData.splice(pos + 1, len - (pos + 1));
            this.setState({
                tabs: tabData
            });
            let tabs = this.state.tabs;
            this.setState({
                username: ''
            });
            setTimeout(() => {
                this.clearData();
                this.getDataFromServer(pos == 0 ? null : tabs[pos].userId);
            }, 1000);
        }
    }

    addTab(rowData) {
        let tabData = this.state.tabs;
        dismissKeyboard();
        if (rowData.teamMemberCount === 1) {
            Toast.showShortCenter('该用户没有下级用户!');
            return;
        }

        this.scrollToTop();
        let user = {userId: rowData.userId, username: rowData.username};
        if (this.isExit(rowData.username)) {
            return;
        } else {
            tabData.push(user);
        }
        this._partModalLoadingSpinnerOverLay.show();
        setTimeout(() => {
            this.clearData();

            this.setState({
                tabs: tabData
            });
            this.getDataFromServer(rowData.userId);
        }, 600);
    }

    isExit(username) {
        let tabData = this.state.tabs;
        for (var i = 0; i < tabData.length; i++) {
            if (tabData[i].username === username) {
                return true;
            }
        }
        return false;
    }

    scrollToTop() {
        if (this.canScroll) {
            return;
        }

        var listView = this.refs.listView;
        if (listView) {
            listView.scrollTo({y: 1, animated: true});
        }
    }

    clearData() {
        if (this.canScroll) {
            this.pageSize = this.currentPage * this.pageSize;
        }

        this.currentPage = 1;
        this.data = [];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.data),
            foot: 0
        });
    }

    onchangeUserName(text) {
        this.state.username = text;
        // 修复用户删除关键词搜索后数据未加载的情况
        if (!text && (!this.state.dataSource || this.state.dataSource.getRowCount() === 0)) {
            this._partModalLoadingSpinnerOverLay.show();
            setTimeout(() => {
                this.clearData();
                this.getDataFromServer(null);
            }, 1000);
        }
    }

    renderHeader() {
        return (
            <View style={{height: 45}}>
                <ScrollView
                    ref="headerScrollView"
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    scrollEnabled={this.data.length > 0 ? false : true}
                    onScroll={e => {
                        this.changeArrowState(e)
                    }}
                >
                    <View style={styles.titleViewStyle}>
                        <Text style={[{width: width * 0.3}, styles.titleTxtStyle]}>用户名</Text>
                        <Text style={[{width: width * 0.12}, styles.titleTxtStyle]}>类型</Text>
                        <Text style={[{width: width * 0.12}, styles.titleTxtStyle]}>返点</Text>
                        <Text style={[{width: width * 0.22}, styles.titleTxtStyle]}>团队人数</Text>
                        <Text
                            style={[
                                {width: width * 0.22},
                                styles.titleTxtStyle,
                                this.state.isHiddenArrow && {width: width * 0.24}
                            ]}
                        >
                            团队余额
                        </Text>
                        {!this.state.isHiddenArrow && (
                            <Image source={agent.swipe_right} style={{width: width * 0.02, height: 10}}/>
                        )}
                        <Text style={[{width: width * 0.22}, styles.titleTxtStyle]}>个人余额</Text>
                        <Text style={[{width: width * 0.22}, styles.titleTxtStyle]}>个人投注</Text>

                        <Text style={[{width: width * 0.2}, styles.titleTxtStyle]}>个人充值</Text>
                        <Text style={[{width: width * 0.2}, styles.titleTxtStyle]}>个人提款</Text>
                        {/*  <Text style={styles.titleTxtStyle}>最后登录</Text>*/}
                        {/* <Text style={styles.titleTxtStyle}>操作</Text>*/}
                    </View>
                </ScrollView>
            </View>
        );
    }

    scrollListHeader(e) {
        if (this.canScroll) {
            return;
        }

        this.scrollY = e.nativeEvent.contentOffset.y;
    }

    scrollHeader(e) {
        let offsetX = this.changeArrowState(e)
        let headerScroll = this.refs.headerScrollView;
        headerScroll.scrollTo({x: offsetX, y: 0, animated: true});
    }

    changeArrowState(e) {
        let offsetX = e.nativeEvent.contentOffset.x;
        if (!this.state.isHiddenArrow && offsetX > 20) {
            this.setState({isHiddenArrow: true});
        } else if (this.state.isHiddenArrow && offsetX <= 20) {
            this.setState({isHiddenArrow: false});
        }
        return offsetX
    }

    getDataFromServer(userId = null) {
        let type = {
            pageSize: this.pageSize,
            start: (this.currentPage - 1) * this.pageSize,
            username: this.state.username.toLocaleLowerCase()
        };

        if (userId) {
            type.agentId = userId;
            type.username = '';
        } else if (this.state.tabs.length > 1) {
            let tabsData = this.state.tabs;
            type.agentId = tabsData[tabsData.length - 1].userId;
            type.username = '';
        }

        NetUtils.getUrlAndParamsAndCallback(config.api.getUserTeam, type, data => {
            this._partModalLoadingSpinnerOverLay && this._partModalLoadingSpinnerOverLay.hide();
            if (data.rs) {
                if (data.content != null && data.content.datas.length < this.pageSize) {
                    if (this.currentPage === 1) {
                        this.setState({
                            foot: 0
                        });
                    } else {
                        this.setState({
                            foot: 1,
                            moreText: '没有更多数据了'
                        });
                    }
                } else {
                    this.setState({
                        foot: 0
                    });
                }
                if (data.content.datas && data.content.datas != null) {
                    this.data = _.concat(this.data, data.content.datas);
                    if (data.content.datas[0] && data.content.datas[0].parentUsers) {
                        this.setState({
                            tabs: this.reversArray(data.content.datas[0].parentUsers)
                        });
                    }

                    if (this.data.length === 0) {
                        this.setState({
                            isNoData: true
                        });
                        if (this.state.username) {
                            Toast.showShortCenter('您查询的用户不存在!');
                        }
                    } else {
                        this.setState({
                            isNoData: false
                        });
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data),
                    isRefreshing: false,
                    isTimeOut: false
                });
            } else {
                if (this.data.length === 0) {
                    this.setState({isTimeOut: true});
                }

                this.setState({
                    isRefreshing: false
                });
                Toast.showShortCenter('请求数据失败!');
            }

            setTimeout(() => {
                this.setState({
                    renderPlaceholderOnly: false
                });
            }, 1000);
        });
    }

    reversArray(res) {
        let len = res.length;
        let data = [];
        for (var i = len - 1; i >= 0; i--) {
            let user = {};
            user.userId = res[i].id;
            user.username = res[i].username;
            data.push(user);
        }
        return data;
    }

    renderFooter() {
        if (this.state.foot === 1) {
            //加载完毕
            return (
                <View
                    style={{
                        height: 40,
                        width: width,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: indexBgColor.itemBg
                    }}
                >
                    <Text style={{color: agentCenter.title, fontSize: Size.font12, marginTop: 10}}>
                        {this.state.moreText}
                    </Text>
                </View>
            );
        } else if (this.state.foot === 2) {
            //加载中
            return (
                <View
                    style={{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: width,
                        backgroundColor: indexBgColor.itemBg
                    }}
                >
                    <Text style={{color: agentCenter.title, fontSize: Size.font12, marginTop: 10}}>加载中...</Text>
                </View>
            );
        } else if (this.state.foot === 0) {
            return <View/>;
        }
    }

    loadMore() {
        if (this.state.foot != 0) {
            return;
        }
        if (this.data.length < this.pageSize) {
            return;
        }

        this.setState({
            foot: 2
        });
        this.timer = setTimeout(() => {
            this.currentPage = this.currentPage + 1;
            this.getDataFromServer();
        }, 500);
    }

    setModalVisible() {
        let groupShow = this.state.groupShow;
        this.setState({
            groupShow: !groupShow
        });
    }

    getWithDrawView() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.withDrawShow}
                onRequestClose={() => {
                    this.setModalVisible();
                }}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalMain}>
                        <View style={styles.modalTitle}>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => {
                                    this.setModalVisible();
                                }}
                            >
                                {/*<Image source={require('image!shut')} style={styles.closeIcon}/>*/}
                            </TouchableOpacity>
                            <Text style={{fontSize: Size.default}}>下级转账</Text>
                        </View>
                        <View style={styles.withdrawMoney}>
                            <Text>用 户 名：</Text>
                            <Text>{'allen001'}</Text>
                        </View>
                        <View style={styles.withdrawMoney}>
                            <Text>当前余额：</Text>
                            <Text>{userStore.balance}</Text>
                        </View>
                        <View style={styles.withdrawMoney}>
                            <Text>转账金额：</Text>
                            <View style={styles.inputModalItemStyle}>
                                <TextInput
                                    placeholderTextColor="#cccccc"
                                    underlineColorAndroid="transparent"
                                    keyboardType={'numeric'}
                                    placeholder={'请输入转账金额'}
                                    maxLength={6}
                                    onChangeText={text => {
                                    }}
                                    style={styles.inputModalStyle}
                                />
                            </View>
                        </View>
                        <View style={styles.withdrawMoney}>
                            <Text>交易密码：</Text>
                            <View style={styles.inputModalItemStyle}>
                                <TextInput
                                    secureTextEntry={true}
                                    placeholderTextColor="#cccccc"
                                    underlineColorAndroid="transparent"
                                    keyboardType={'numeric'}
                                    placeholder={'请输入交易密码'}
                                    maxLength={4}
                                    onChangeText={text => {
                                    }}
                                    style={styles.inputModalStyle}
                                />
                            </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle}
                                onPress={() => {
                                    this.setModalVisible();
                                }}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.large}}>
                                    确认转账
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    updateUserPriceGroup() {
        const groupPrize = this.getPrizeGroupArray()
        const groupPrizeModalDisabled = !(groupPrize && groupPrize.length > 0)
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.groupShow}
                onRequestClose={() => {
                    this.setModalVisible();
                }}
            >
                <View style={styles.modalStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible();
                        }}
                    >
                        <View style={{height: width * 0.4, width: width}}/>
                    </TouchableOpacity>
                    <View style={styles.modalMain}>
                        <View style={styles.groupViewStyle}>
                            <Text
                                style={{
                                    color: agentCenter.title,
                                    fontWeight: 'bold',
                                    width: 100,
                                    fontSize: Size.font15
                                }}
                            >
                                用 户 名：
                            </Text>
                            <Text
                                style={{
                                    fontSize: Size.font17,
                                    color: agentCenter.content
                                }}
                            >
                                {this.state.user.username}
                            </Text>
                        </View>
                        <View style={styles.groupViewStyle}>
                            <Text
                                style={{
                                    color: agentCenter.title,
                                    fontWeight: 'bold',
                                    width: 100,
                                    fontSize: Size.font15
                                }}
                            >
                                用户类型：
                            </Text>
                            {this.getUserType()}
                        </View>

                        <TouchableOpacity
                            disabled={groupPrizeModalDisabled}
                            onPress={() => {
                                this.refs['GroupModalDropdown'].show();
                            }}
                        >
                            <View
                                style={[
                                    styles.groupViewStyle,
                                    {
                                        flexDirection: 'row',
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }
                                ]}
                            >
                                <Text
                                    style={{
                                        color: agentCenter.title,
                                        fontWeight: 'bold',
                                        width: 100,
                                        fontSize: Size.font15
                                    }}
                                >
                                    返 点：
                                </Text>
                                <Text
                                    style={{
                                        fontSize: Size.font17,
                                        color: agentCenter.content
                                    }}
                                >
                                    {this.state.prizeGroup ? this.state.prizeGroup : ''}
                                </Text>
                                <ModalDropdown
                                    ref="GroupModalDropdown"
                                    disabled={groupPrizeModalDisabled}
                                    textStyle={styles.dropDownTxtStyle}
                                    options={groupPrize}
                                    style={styles.groupDropStyle}
                                    dropdownStyle={styles.groupDropDownStyle}
                                    renderRow={(rowData, rowID) => this.renderDropDownRow(rowData, rowID)}
                                    onSelect={(idx, value) => this.onSelect(idx, value)}
                                >
                                    <Image source={agent.arrow} style={styles.groupImgStyle}/>
                                </ModalDropdown>
                            </View>
                        </TouchableOpacity>

                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle}
                                onPress={() => {
                                    this.submitUpdateUserGroup();
                                }}
                            >
                                <Text
                                    style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.large}}
                                >
                                    确认修改
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    onSelect(idx, value) {
        this.setState({
            prizeGroup: value.prize
        });
    }

    renderDropDownRow(rowData, rowId) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: Size.font18, color: agentCenter.title}}>{rowData.str}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    getUserType() {
        if (this.state.accountKind == 0 && !this.state.isChange) {
            this.originAccountKind = 0;
        } else {
            this.originAccountKind = 1;
        }
        return this.originAccountKind == 0 ? (
            <Text style={{fontSize: Size.font15, color: agentCenter.content}}>{'代理'}</Text>
        ) : (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 40,
                    flexDirection: 'row',
                    height: 80
                }}
            >
                {this.getAccountKindsButton('代理', this.state.accountKind == 0 ? agent.typeOn : agent.type, () => {
                    this.setState({accountKind: 0, isChange: true});
                })}

                {this.getAccountKindsButton('玩家', this.state.accountKind == 1 ? agent.typeOn : agent.type, () => {
                    this.setState({accountKind: 1, isChange: true});
                })}
                <View style={styles.typeTipsContainer}>
                    <Text style={styles.txtTypeTips}>*升级为代理后</Text>
                    <Text style={styles.txtTypeTips}>不可以更改为玩家</Text>
                </View>
            </View>
        );
    }

    getPrizeGroupArray() {
        let arr = [];
        if (this.props.userStore.prizeGroup > this.props.userStore.minMemberPrizeGroup) {
            let minPrize = this.state.prizeGroup < this.props.userStore.minMemberPrizeGroup ? this.props.userStore.minMemberPrizeGroup : this.state.prizeGroup
            for (let a = this.props.userStore.prizeGroup; a >= minPrize; a -= 2) {
                let str = '' + a + ' - ' + (a / 2000 * 100).toFixed(2) + '% (赔率)';
                arr.push({prize: a, str: str});
            }
        }
        return arr;
    }

    getAccountKindsButton(title, image, fuc) {
        return (
            <TouchableOpacity onPress={fuc} style={{flexDirection: 'row'}}>
                <Image source={image} style={{width: 15, height: 15, marginRight: 5, marginLeft: 5}}/>
                <Text style={{fontSize: Size.font15}}>{title}</Text>
            </TouchableOpacity>
        );
    }

    submitUpdateUserGroup() {
        if (!this.state.prizeGroup) {
            Toast.showShortCenter('请选择返点!');
            return;
        }
        let param = {
            memberType: this.state.accountKind == 0 ? 'AGENT' : 'PLAYER',
            username: this.state.user.username,
            prizeGroup: this.state.prizeGroup
        };

        if (this.state.accountKind == 0 && this.originAccountKind != 1) {
            Alert.alert('代理修改返点后，只能升高不能降低，确定修改吗？\n', null, [
                {
                    text: '确定',
                    onPress: () => {
                        NetUtils.PutUrlAndParamsAndCallback(config.api.updateUserGroup, param, res => {
                            if (res.rs) {
                                this.setModalVisible();
                                Toast.showShortCenter('修改成功!');
                                setTimeout(() => {
                                    this.clearData();
                                    this.selectData.reset = true;
                                    this.canScroll = true;
                                    this.getDataFromServer(null);
                                }, 1000);
                            } else {
                                if (res.message) {
                                    Toast.showShortCenter(res.message);
                                } else {
                                    Toast.showShortCenter('服务器异常，修改失败!');
                                }
                            }
                        });
                    }
                },
                {
                    text: '取消',
                    onPress: () => {
                        //this.setModalVisible()
                    }
                }
            ]);
        } else {
            NetUtils.PutUrlAndParamsAndCallback(config.api.updateUserGroup, param, res => {
                if (res.rs) {
                    this.setModalVisible();
                    Toast.showShortCenter('修改成功!');
                    setTimeout(() => {
                        this.clearData();
                        this.selectData.reset = true;
                        this.canScroll = true;
                        this.getDataFromServer(null);
                    }, 1000);
                } else {
                    if (res.message) {
                        Toast.showShortCenter(res.message);
                    } else {
                        Toast.showShortCenter('服务器异常，修改失败!');
                    }
                }
            });
        }
    }

    renderModalDropDownRow(rowData, rowID) {
        rowData.isShow = false;
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: Size.font16}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    titleViewStyle: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
        marginBottom: 1
    },
    titleTxtStyle: {
        color: listViewTxtColor.title,
        textAlign: 'center',
        fontSize: Size.font15,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: '800'
    },
    searchStyle: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 4,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        width: width
    },
    imgstyle: {
        padding: 5,
        backgroundColor: agentCenter.searchBtnBg,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        width: 60
    },
    searchBar: {
        backgroundColor: indexBgColor.mainBg,
        borderRadius: 8,
        flexDirection: 'row',
        width: width * 0.95
    },
    loginInput: {
        height: 40,
        flex: 1,
        paddingLeft: 5,
        fontSize: Size.font15,
        width: width * 0.55,
        color: agentCenter.content
    },
    userLayerView: {
        backgroundColor: agentCenter.itemBg
    },
    titleTxt: {
        fontSize: Size.font16,
        fontWeight: '800',
        marginLeft: 13,
        paddingTop: 5,
        marginTop: 10,
        color: agentCenter.title
    },
    userName: {
        textAlign: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: agentCenter.userLayerBtnBg
    },
    modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-end'
    },
    modalMain: {
        backgroundColor: indexBgColor.itemBg,
        height: height * 0.6
    },
    withdrawMoney: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginLeft: 10,
        borderBottomWidth: 0.5
    },
    inputModalItemStyle: {
        flexDirection: 'row',
        height: 40,
        width: width * 0.6,
        alignItems: 'center',
        borderRadius: 5
    },
    inputModalStyle: {
        width: width * 0.55,
        paddingLeft: 10
    },
    queryModalStyle: {
        color: 'blue',
        fontSize: Size.large
    },
    closeIcon: {
        width: 25,
        height: 25,
        margin: 4
    },
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20
    },
    backTextWhite: {},
    dropMainStyle: {
        borderRightWidth: 0.5,
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.3,
        justifyContent: 'center'
    },
    dropDownTxtStyle: {
        color: listViewTxtColor.title
    },
    dropStyle: {},
    dropDownStyle: {
        width: width * 0.3,
        height: height * 0.35,
        borderWidth: 1,
        marginTop: 10,
        left: width * 0.58
    },
    lotteryDropDownStyle: {
        width: width * 0.38,
        height: height * 0.37,
        borderWidth: 1,
        marginTop: 10,
        position: 'absolute',
        left: 0
    },
    imgNext: {
        width: 10,
        height: 10,
        transform: [{rotate: '90deg'}],
        marginLeft: 10
    },
    dropDownItemStyle: {
        alignItems: 'center',
        margin: 15
    },
    dropDownView: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 4,
        margin: 10,
        paddingLeft: 10,
        marginTop: 0,
        backgroundColor: 'white',
        width: width * 0.95,
        borderWidth: 0.5
    },
    groupDropStyle: {
        marginLeft: 10,
        marginRight: 10
    },
    groupDropDownStyle: {
        width: width * 0.9,
        height: height * 0.36,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 15,
        left: width * 0.1 / 2,
        backgroundColor: indexBgColor.mainBg
    },
    groupImgStyle: {
        width: 20,
        height: 20,
        marginRight: 30
    },
    groupViewStyle: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginLeft: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg
    },
    typeTipsContainer: {
        alignItems: 'center',
        marginLeft: 8
    },
    txtTypeTips: {
        color: listViewTxtColor.redTip,
        fontSize: Size.font10
    },
    searchImgStyle: {
        width: 20,
        height: 20,
        margin: 10
    }
});
