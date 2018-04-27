/**
 * Created by Sam on 05/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import {observer} from 'mobx-react/native';
import Toast from '../../Common/JXHelper/JXToast';
import Moment from 'moment';
import momentTimeZone from 'moment-timezone';
import * as _ from 'lodash';

/**组件内部显示需要引入的类 */
import TopNavigationBar from './components/TCNavigationBar';
import {width, height, indexBgColor, indexTxtColor, Size, statusBarHeight} from '../resouce/theme';
import RedPacketModal from './components/RedPacketModal';
/** 外部关系组件 如 页面跳转用 */
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import JXHelper from '../../Common/JXHelper/JXHelper';

import RedPacket from './RedPacketData';
let RedPacketData = new RedPacket();

@observer
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {};

    componentDidMount() {
        RedPacketData.requestRedPacketInfo();
    }

    componentWillUnmount() {
        RedPacketData.clearTimer();
    }

    render() {
        return (
            <Image style={styles.bgViewStyle} source={require('./asset/hb_bg.png')}>
                <TopNavigationBar title={'抢红包'}/>
                <Image
                    source={require('./asset/hb_title.png')}
                    style={{width: width, height: height * 0.2, marginTop: 10, marginBottom: 20}}
                    resizeMode="contain"
                />
                {/*<Text style={styles.timeLabelStyle}>距离下次发红包还剩7分80秒</Text>*/}
                {this.getRedPacketShowStyle()}
                {this.getBottomLable()}
                {this.getBottomButton()}
                <RedPacketModal
                    ref={'getRedPacketModal'}
                    data={this.uCenterData}
                    continueDraw={type => this.drawRedPacket(type)}
                />
            </Image>
        );
    }

    // 红包展示条件
    getRedPacketShowStyle() {
        if (!_.isEmpty(RedPacketData.FLHongbao) && !_.isEmpty(RedPacketData.TJHongbao)) {
            return this.get2RedPacketButton();
        } else if (!_.isEmpty(RedPacketData.TJHongbao)) {
            let img = require('./asset/hb_yqhb.png');
            let remainderTimes = RedPacketData.TJHongbao.remainderTimes;
            let hongbaoStartTime = RedPacketData.TJHongbaoInfo.hongbaoStartTime;
            return this.getRedPacketButton('TJ', img, remainderTimes, hongbaoStartTime);
        } else if (!_.isEmpty(RedPacketData.FLHongbao)) {
            let img = require('./asset/hb_flhb.png');
            let remainderTimes = RedPacketData.FLHongbao.remainderTimes;
            let hongbaoStartTime = RedPacketData.FLHongbaoInfo.hongbaoStartTime;
            return this.getRedPacketButton('FU', img, remainderTimes, hongbaoStartTime);
        } else {
            let img = require('./asset/hb_yqhb.png');
            let hongbaoStartTime = RedPacketData.TJHongbaoInfo.hongbaoStartTime;
            return this.getRedPacketButton('TJ', img, 0, hongbaoStartTime, true);
            return (
                <View>
                    <Text style={{backgroundColor: 'transparent', marginTop: 100, color: '#EC2438'}}>
                        抱歉活动暂未开始,或未满足条件{'\n\n'}查看右上角红包规则赢取更多福利{' '}
                    </Text>
                </View>
            );
        }
    }

    getRedPacketButton(type, img, remainderTimes, hongbaoStartTime, noWay) {
        let text = noWay ? '' : ('可抢次数: ' + remainderTimes + '\n')
        return (
            <TouchableOpacity
                onPress={() => {
                    noWay ? this.noMeetDrawRedPacket(type) : this.drawRedPacket(type);
                }}
            >
                <Image source={img} style={styles.redPacketStyle} resizeMode="contain">
                    <Text style={styles.redPacketTextStyle}>
                        {text}
                        {type === 'TJ' ? RedPacketData.TJHongbaoCountDown : RedPacketData.FLHongbaoCountDown}
                    </Text>
                </Image>
            </TouchableOpacity>
        );
    }

    get2RedPacketButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.drawRedPacket('FU');
                    }}
                >
                    <Image source={require('./asset/hb_flhb.png')} style={styles.redPacket2Style} resizeMode="contain">
                        <Text style={styles.redPacketTextStyle}>
                            可抢次数: {RedPacketData.FLHongbao.remainderTimes} {'\n'}
                            {RedPacketData.FLHongbaoCountDown}
                        </Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.drawRedPacket('TJ');
                    }}
                >
                    <Image source={require('./asset/hb_yqhb.png')} style={styles.redPacket2Style} resizeMode="contain">
                        <Text style={styles.redPacketTextStyle}>
                            可抢次数: {RedPacketData.TJHongbao.remainderTimes} {'\n'}
                            {RedPacketData.TJHongbaoCountDown}
                        </Text>
                    </Image>
                </TouchableOpacity>
            </View>
        );
    }

    getBottomLable() {
        if (width > 350) {
            return (
                <Image source={require('./asset/hb_bg_bottom.png')} resizeMode="contain"
                       style={{width: width, height: width * 0.283}}/>
            );
        }
    }

    getBottomButton() {
        return (
            <View style={{position: 'absolute', bottom: 10}}>
                <View style={{flexDirection: 'row'}}>
                    {this.getButtonView('人品榜单', () => {
                        NavigatorHelper.pushToRedPacketWinList();
                    })}
                    {this.getButtonView('我的红包', () => {
                        NavigatorHelper.pushToRedPacketMine();
                    })}
                    {this.getButtonView('在线客服', () => this.goOnlineService())}
                </View>
            </View>
        );
    }

    getButtonView(title, event) {
        return (
            <TouchableOpacity onPress={event}>
                <Image style={styles.bottomButtonImageStyle} source={require('./asset/rpbd_button.png')}>
                    <Text style={styles.bottomButtonTextStyle}>{title}</Text>
                </Image>
            </TouchableOpacity>
        );
    }

    goOnlineService() {
        let res = JXHelper.getMenuIconsUrl('CUS_SERVICE');
        if (res) {
            NavigatorHelper.pushToWebView(res, '在线客服');
        }
    }

    checkTime(type) {
        let st = '';
        if (type === 'TJ') {
            st = RedPacketData.TJHongbaoInfo.eventStartDate + ' ' + RedPacketData.TJHongbaoInfo.hongbaoStartTime;
        } else {
            st = RedPacketData.FLHongbaoInfo.eventStartDate + ' ' + RedPacketData.FLHongbaoInfo.hongbaoStartTime;
        }
        let b = momentTimeZone.tz(st, 'Asia/Shanghai') / 1000;
        let now = Moment().format('X');
        if (now > b) {
            return true;
        } else {
            return false;
        }
    }

    //未满足条件
    noMeetDrawRedPacket(type) {
        this.refs['getRedPacketModal']._setModalVisible(true, null, type, true);
    }

    // 抢红包
    drawRedPacket(type) {
        if (!this.checkTime(type)) {
            Toast.showShortCenter('抢红包活动时间还未到\n请耐心等待一会儿~~');
            return;
        }

        let remainderTimes =
            type === 'TJ' ? RedPacketData.TJHongbao.remainderTimes : RedPacketData.FLHongbao.remainderTimes;

        if (remainderTimes > 0) {
            RedPacketData.requestGetRedPacketInfo(type, data => {
                if (data.rs) {
                    this.refs['getRedPacketModal']._setModalVisible(true, data, type);
                } else {
                    if (data.message) {
                        Toast.showShortCenter(data.message);
                    } else {
                        Toast.showShortCenter('抢红包的人似乎太多，请稍后再试');
                    }
                }
            });
        } else {
            Toast.showShortCenter('本次抢红包机会已用完 \n下次再来赢取更多福利哦');
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    timeLabelStyle: {
        color: '#EC2438',
        width: width,
        backgroundColor: 'transparent',
        marginTop: 20,
        textAlign: 'center'
    },
    bottomButtonImageStyle: {
        width: width / 3 - 30,
        height: 40,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    bottomButtonTextStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: Size.font16,
        backgroundColor: 'transparent'
    },
    bgViewStyle: {
        width: width,
        height: Platform.OS == 'ios' ? height : height - statusBarHeight,
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    redPacketStyle: {
        width: width / 2,
        height: height * 0.38,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    redPacketTextStyle: {
        marginTop: 30,
        color: 'white',
        fontSize: Size.font14,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    redPacket2Style: {
        width: width / 2.3,
        height: 250,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
