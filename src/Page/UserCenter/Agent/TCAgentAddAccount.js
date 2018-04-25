/**
 * Created by Sam on 31/05/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import React from 'react';
import {
    StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Image, Platform
} from 'react-native';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import Toast from '@remobile/react-native-toast';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

/**组件内部显示需要引入的类 */
import ModalDropdown from '../../../Common/View/ModalDropdown';
import SegmentedControlTab from '../../../Common/View/SegmentedControlTab';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {agent} from '../../resouce/images';
import {
    Size, indexBgColor, height, width, agentCenter, buttonStyle, baseColor, statusBarHeight
} from '../../resouce/theme';

/** 外部关系组件 如 页面跳转用 */
import SecretUtils from '../../../Common/JXHelper/SecretUtils';
import NetUitls from '../../../Common/Network/TCRequestUitls';
import {config} from '../../../Common/Network/TCRequestConfig';
import TCAgentAffCodeList from './TCAgentAffCodeList';
import AgentTeamList from './Team/TCAgentTeamManager';

export default class TCAgentAddAccount extends React.Component {
    secretUtils = new SecretUtils();

    constructor(state) {
        super(state);
        this.state = this.getState(0);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='topNavigationBar'
                    needBackButton
                    backButtonCall={() => this.goBack()}
                    renderCenter={() => this.renderSegmentedControlTab()}
                />
                {this.renderContent()}
                <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        );
    }

    getState(selectedIndex){
        return({
            selectedIndex,
            memberType: 'AGENT',//PLAYER
            accountKind: 0,
            username: null,
            password: '123456',
            prizeGroup: null,
            affCode: null,
        });
    }

    submit(shouldAddCode) {
        if (this.state.prizeGroup == null) {
            Toast.showShortCenter('彩票返点不能为空');
            return;
        }

        let judgmentValue = shouldAddCode ? this.state.affCode : this.state.username;
        let re = shouldAddCode ? /^[0-9A-Za-z]{1,20}$/ : /^[0-9A-Za-z]{4,12}$/;
        if(shouldAddCode && (!judgmentValue || judgmentValue.length > 20 || !judgmentValue.match(re))) {
            Toast.showShortCenter("邀请码格式错误,只能是20位以内的数字与字母的组合");
            return;
        }else if(!judgmentValue || judgmentValue.length < 4 || judgmentValue.length > 12 || !judgmentValue.match(re)) {
            Toast.showShortCenter("用户名格式错误");
            return;
        }
        if(!shouldAddCode&&!judgmentValue.match(/[a-zA-Z]/i)) {
            Toast.showShortCenter("用户名必须至少包含一位字母");
            return;
        }

        this._modalLoadingSpinnerOverLay.show();
        let url = shouldAddCode ? config.api.teamAffiliates : config.api.createEncryptUser;
        let args = shouldAddCode ?
            {
                "affCode": judgmentValue,
                'memberType': this.state.memberType,
                'prizeGroup': this.state.prizeGroup,
            } :
            {
                "username": judgmentValue,
                'password': this.secretUtils.rsaEncodePWD('123456'),
                'memberType': this.state.memberType,
                'prizeGroup': this.state.prizeGroup,
            };
        NetUitls.PostUrlAndParamsAndCallback(url, args, (data) => {
            this._modalLoadingSpinnerOverLay.hide();
            if (data && data.rs) {
                this.timer = setTimeout(() => {
                    if(shouldAddCode){
                        Toast.showShortCenter(judgmentValue + '\n邀请码创建成功');
                        this.setState(this.getState(1));
                    }else {
                        this.goToTeam();
                        Toast.showShortCenter(judgmentValue + '\n注册成功');
                        this.setState(this.getState(0));
                    }
                }, 500);
            } else {
                let toastString = '网络异常';
                if (data.message) {
                    toastString = data.message;
                }

                this.timer = setTimeout(() => {
                    Toast.showShortCenter(toastString);
                }, 500);
            }
        });
    }

    goBack() {
        this.props.navigator.pop();
    }

    goToTeam() {
        let {navigator} = this.props;
        if (navigator) {
            if (this.props.isFromTeamManager) {
                navigator.pop();
                RCTDeviceEventEmitter.emit('agentManagerAddUserRefresh');
            } else {
                navigator.push({
                    name: 'userAgentTeam',
                    component: AgentTeamList,
                    passProps: {
                        wantPopToN: 2,
                        ...this.props,
                    }
                });
            }
        }
    }

    getPrizeGroupArray() {
        let arr = [];
        if (TCUSER_DATA.prizeGroup) {
            let p = 98;
            for (let a = TCUSER_DATA.prizeGroup; a >= 1800; a -= 2) {
                let str = '' + a + ' - ' + ((a / 2000) * 100).toFixed(2) + '% (赔率)';
                arr.push({prize: a, str: str});
                p -= 0.1;
            }
        }

        return arr;
    }

    getRandomAffCode() {
        let str = randomWord(true, 4, 4);
        this.setState({affCode: str});
    }

    handleIndexChange(index) {
        this.setState({selectedIndex: index});
    }

    onPressShowDropDown() {
        this.refs['modalDropDown'].show();
    }

    onChangeText(value, isAccurate) {
        if(isAccurate){
            this.setState({username: value});
        }else {
            this.setState({affCode: value})
        }
    }

    onSelect(value) {
        this.setState({prizeGroup: value.prize});
    }

    renderNotice() {
        if (this.state.accountKind == 0) {
            return (<Text style={styles.passwordTip}>*初始化密码为：123456</Text>);
        }
    }

    renderTip() {
        if (this.state.prizeGroup == TCUSER_DATA.prizeGroup) {
            return (<Text style={styles.tip}>您的赔率和下级相同，您将没有佣金。</Text>);
        }
    }

    renderSwitchContent(isAccurate) {
        return (
            <View style={styles.centerContent}>
                <View style={[styles.switchContentContainer, !isAccurate && styles.invitationCode]}>
                    <Text style={[styles.nameAndCodeText, isAccurate && styles.userNameText]}>
                        {isAccurate ? '用户名': '邀请码:'}
                    </Text>
                    <TextInput underlineColorAndroid={'transparent'}
                               onChangeText={(value) => this.onChangeText(value, isAccurate)}
                               style={styles.nameAndCodeTextInput}
                               value={isAccurate ? this.state.username : this.state.affCode}
                               placeholderTextColor={agentCenter.content}
                               placeholder={isAccurate ? '请输入用户名' : '字母或数字组合'}
                    />
                    {!isAccurate &&
                        <TouchableOpacity onPress={() => this.getRandomAffCode()} style={styles.randomAffCode}>
                            <Text style={styles.randomAffCodeText}>随机选码</Text>
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity onPress={() => this.onPressShowDropDown()}>
                    <View style={styles.rebateContainer}>
                        <Text style={[styles.rebateText, isAccurate && styles.accurateRebateText]}>彩票返点:</Text>
                        <Text style={styles.prizeGroup}>{this.state.prizeGroup ? this.state.prizeGroup : ''}</Text>
                        <ModalDropdown
                            ref="modalDropDown"
                            textStyle={styles.dropDownTxtStyle}
                            options={this.getPrizeGroupArray()}
                            style={styles.dropStyle}
                            dropdownStyle={styles.dropDownStyle}
                            renderRow={(rowData) => this.renderDropDownRow(rowData)}
                            onSelect={(idx, value) => this.onSelect(value)}
                        >
                            <Image source={agent.arrow} style={styles.imgNext}/>
                        </ModalDropdown>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderAccountTypeButton(title) {
        let isAgent = this.state.memberType == 'AGENT' ? true : false;
        let switchImage = isAgent ? agent.typeOn : agent.type;
        let avatar = isAgent ? agent.headAgentOn : agent.headAgent;
        let fuc = () => {
            this.setState({memberType: 'AGENT'});
        };
        if(title ==  '玩家帐号'){
            switchImage = isAgent ? agent.type : agent.typeOn;
            avatar =  isAgent ? agent.headPlayer : agent.headPlayerOn;
            fuc = () => {
                this.setState({memberType: 'PLAYER'});
            };
        }

        return (
            <TouchableOpacity onPress={fuc} style={styles.accountTypeButton}>
                <Image source={avatar} style={styles.accountTypeImage}/>
                <View style={styles.accountTypeSwitch}>
                    <Image source={switchImage} style={styles.switchImage}/>
                    <Text style={styles.switchText}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderAccountKindsButton(title) {
        let image = this.state.accountKind == 0 ? agent.typeOn : agent.type;
        let fuc = () => {
            this.setState({accountKind: 0});
        };
        if (title == '生成邀请码') {
            image = this.state.accountKind == 1 ? agent.typeOn : agent.type;
            fuc = () => {
                this.setState({accountKind: 1});
            };
        }

        return (
            <TouchableOpacity onPress={fuc} style={styles.accountKindsButton}>
                <Image source={image} style={styles.switchImage}/>
                <Text style={styles.switchText}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderBottomButton() {
        let title = this.state.accountKind == 0 ? '立即开户' : '生成邀请码';
        return (
            <TouchableOpacity style={styles.bottomButton} onPress={() => this.submit(this.state.accountKind == 1)}>
                <Text style={styles.bottomButtonText}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderContent() {
        if (this.state.selectedIndex == 0) {
            return (
                <ScrollView>
                    <View style={styles.content}>
                        {this.renderAccountTypeButton('代理帐号')}
                        {this.renderAccountTypeButton('玩家帐号')}
                    </View>
                    <View style={styles.accountType}>
                        <Text style={styles.accountTypeText}>开户类型:</Text>
                        {this.renderAccountKindsButton('精准开户')}
                        {this.renderAccountKindsButton('生成邀请码')}
                    </View>
                    {this.renderSwitchContent(this.state.accountKind == 0)}
                    {this.renderTip()}
                    {this.renderNotice()}
                    {this.renderBottomButton()}
                </ScrollView>
            )
        } else if (this.state.selectedIndex == 1) {
            return (<TCAgentAffCodeList/>);
        }
    }

    renderDropDownRow(rowData) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemContainer}>
                    <Text style={styles.dropDownItemText}>{rowData.str}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderSegmentedControlTab() {
        return (
            <SegmentedControlTab
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                selectedIndex={this.state.selectedIndex}
                values={['下级开户', '查看邀请码']}
                onTabPress={(index) => this.handleIndexChange(index)}
            />
        );
    }
}

function randomWord(randomFlag, min, max) {
    var str = "";
    var range = min;
    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }

    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }

    let a = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    return a + str;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.mainBg,
        height: height,
    },
    tabsContainerStyle: {
        top: Platform.OS == 'ios' ? 10 : 0,
        height: 35,
        width: width - 150,
    },
    tabStyle: {
        backgroundColor: agentCenter.addAccountTopNormalBg,
        borderColor: agentCenter.addAccountTopBorder,
    },
    tabTextStyle: {
        fontSize: Size.font16,
        fontWeight: 'bold',
        color: agentCenter.addAccountTopTxtNormal
    },
    activeTabStyle: {
        backgroundColor: agentCenter.addAccountTopSelectedBg,
    },
    activeTabTextStyle: {
        fontSize: Size.font16,
        color: agentCenter.addAccountTopTxtSelected,
    },
    content: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 140,
    },
    accountType: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        justifyContent: 'space-around',
    },
    accountTypeText: {
        marginLeft: 20,
        marginRight: 30,
        fontSize: Size.font16,
        color: agentCenter.title,
    },
    accountTypeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    accountTypeImage: {
        width: 60,
        height: 60,
    },
    accountTypeSwitch: {
        flexDirection: 'row',
        marginTop: 20,
    },
    switchImage: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    switchText: {
        fontSize: Size.font15,
        color: agentCenter.content,
    },
    bottomButton: {
        backgroundColor: buttonStyle.btnBg,
        width: Dimensions.get('window').width - 60,
        marginLeft: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
    },
    bottomButtonText: {
        color: buttonStyle.btnTxtColor,
        fontWeight: 'bold',
        fontSize: Size.font18,
    },
    accountKindsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40,
        flexDirection: 'row',
        height: 80,
    },
    centerContent: {
        backgroundColor: indexBgColor.itemBg,
    },
    switchContentContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: indexBgColor.mainBg,
        height: 50,
        alignItems: 'center',
    },
    invitationCode: {
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        width: width,
    },
    nameAndCodeText: {
        textAlign: 'center',
        width: 80,
        color: agentCenter.title,
        fontWeight: 'bold',
        fontSize: Size.font15,
    },
    userNameText: {
        marginLeft: 20,
        width: 100,
        textAlign: 'auto',
    },
    nameAndCodeTextInput: {
        width: 150,
        height: 50,
        fontSize: Size.font14,
        color: agentCenter.content,
    },
    rebateContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rebateText: {
        textAlign: 'center',
        color: agentCenter.title,
        fontWeight: 'bold',
        fontSize: Size.font15,
        width: 80,
        marginLeft: 10,
    },
    accurateRebateText:{
        width: 100,
        marginLeft: null,
    },
    prizeGroup: {
        textAlign: 'center',
        color: agentCenter.content,
    },
    randomAffCode: {
        borderWidth: 1,
        borderColor: agentCenter.btnBorder,
        borderRadius: 5,
        height: 30,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    randomAffCodeText: {
        color: agentCenter.btnTxt,
        margin: 5,
    },
    tip: {
        textAlign: 'center',
        marginTop: 10,
        width: Dimensions.get('window').width,
        color: baseColor.strong,
    },
    passwordTip: {
        marginTop: 10,
        marginLeft: 20,
        width: Dimensions.get('window').width,
        color: agentCenter.content,
    },
    dropDownStyle: {
        width: width * 0.9,
        // 44：TopNavigationBar高度， 140：AccountTypeButton view高度， 80：开户类型view高度
        // 50：邀请码或者用户名view高度， 50：彩票返点view高度
        height: height - statusBarHeight - 44 - 140 - 80 - 50 - 50,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 15,
        left: width * 0.1 / 2,
        backgroundColor: indexBgColor.itemBg,
    },
    dropDownItemContainer: {
        alignItems: 'center',
        margin: 15,
    },
    dropDownItemText: {
        fontSize: Size.font18,
        color: agentCenter.title,
    },
    imgNext: {
        width: 20,
        height: 20,
        marginRight: 30,
    },
    dropStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    dropDownTxtStyle: {
        color: agentCenter.title,
    },
});
