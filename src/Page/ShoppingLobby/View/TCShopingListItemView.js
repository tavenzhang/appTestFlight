/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import {width, indexBgColor, shoppingTxtColor,Size,lotterBgColor, lotteryTxtColor} from '../../resouce/theme'

import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'
import HappyPokerHelper from '../../../Common/JXHelper/HappyPokerHelper'
import PropTypes from 'prop-types'
import _ from 'lodash'

let timeoutTime = 0
let lastMoment = 0
let happyPoker = new HappyPokerHelper()
import { observer } from 'mobx-react/native';
import NumbersView from "../../../Common/View/TCLotteryNumbersView";
@observer
export default class TCShopingListItemView extends Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer
        };
        lastMoment = this.props.moment
        this.buttonCall = this.buttonCall.bind(this);
        this.timeCount = 0;
    }

    static propTypes = {
        icon: PropTypes.any,
        title: PropTypes.any,
        mTimer: PropTypes.any,
        describe: PropTypes.any,
        duration: PropTypes.any,
        pushToEvent:PropTypes.any,
        gameInfo:PropTypes.any,
        rowData:PropTypes.any,
    };


    static defaultProps = {
        icon: 'icon_cp_3',
        title: '',
        mTimer: 1000,
        describe: '',
        duration: 1000,
        pushToEvent: null
    };

    componentDidMount() {
        // this.startTimer();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    componentWillReceiveProps() {
        // this.startTimer()
    }

    // startTimer = () => {
    //     this.timer && clearInterval(this.timer);
    //     this.timeCount = 0;
    //     // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
    //     this.timer = setInterval(() => {
    //         let sTime = this.props.mTimer;
    //         this.timeCount = this.timeCount + 1;
    //         this.setState({timeStr: sTime - this.timeCount})
    //     }, this.props.duration)
    // }

    render() {
        //JXLog("TCShop---------TCShopingListItemView-----");
        return (
            <TouchableOpacity style={styles.container} onPress={this.buttonCall}>
                {
                    this.getImage()
                }
                <View style={{justifyContent: 'space-around', flex: 1, marginTop: 5, marginBottom: 10, height: 100} }>
                    <View style={{flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between'}}>
                        <Text style={{color: shoppingTxtColor.cpTitle, fontSize: Size.font17, marginTop: 5}} ellipsizeMode='tail'
                              numberOfLines={1}> {this.props.title} </Text>
                        <TextIssueView rowData={this.props.rowData} mobData={this.props.mobData}/>
                    </View>

                    {this.getOpenCode()}

                    {<TextTimeView mobData={this.props.mobData}/>}
                </View>
            </TouchableOpacity>
        );
    }

    getImage() {
        if (this.props.gameInfo && this.props.gameInfo.status && this.props.gameInfo.status == 'FORBIDDEN') {
            return <Image source={{uri: this.props.icon}} style={styles.leftImgStyle}/>
        } else {
            return <Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)}
                          style={styles.leftImgStyle}/>
        }
    }

    getOpenCode() {
        return this.getResultView()
        let str = ''
        if (this.props.rowData.lastOpenCode && (this.props.rowData.gameUniqueId.indexOf('28') >= 0)) {
            let numArray = this.props.rowData.lastOpenCode.split(",")
            let num = 0

            numArray.map((item)=> {
                num += parseInt(item)
                str += (item + '+')
            })
            str = _.trimEnd(str, "+")
            str += (' = ' + num)
        } else if (this.props.rowData.lastOpenCode) {
            str = this.props.rowData.lastOpenCode.replace(/\,/g, " ")
        } else {
            str = ' 正在开奖'
        }
        if (this.props.rowData.lastOpenCode && this.props.rowData.gameUniqueId == 'HF_LFKLPK') {
            return (<View
                style={styles.openCodeContainer}>{happyPoker.getOpenCodeView(this.props.rowData.lastOpenCode, false)}</View>)
        } else if (!this.props.rowData.lastOpenCode && this.props.rowData.gameUniqueId == 'HF_LFKLPK') {
            str = ' 正在开奖'
        }

        return (
            <Text style={{
                marginLeft: 15,
                color: this.props.rowData.lastOpenCode ? shoppingTxtColor.cpNum : shoppingTxtColor.cpLotteryTip,
                fontSize: this.props.rowData.lastOpenCode ? Size.font17 : Size.font15
            }}>
                {str}
            </Text>
        )
    }

    getResultView() {
        if (this.props.rowData.lastOpenCode && this.props.rowData.lastOpenCode != null) {
            if (this.props.rowData.lastOpenCode != null) {
                return (
                    <NumbersView
                        data={this.props.rowData}
                        cpNumbers={this.props.rowData.lastOpenCode.split(',')}
                        style={{ marginRight: 10, width: width }}
                        showStyle={this.props.rowData.gameUniqueId}
                    />
                );
            }
        } else {
            return (
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentTextStyle}>等待开奖</Text>
                </View>
            );
        }
    }

    buttonCall = () => {
        if (this.props.title) {
            if (JX_Store.jdAppstore.buttonSoundStatus) {
                SoundHelper.playSoundBundle();
            }

            NavigatorHelper.pushToBetHome(this.props.rowData)
        }
    }
}


@observer
class TextIssueView extends React.Component {

    render(){
        return (<Text style={{
            color:shoppingTxtColor.cpLastIssueNumber,
            marginTop: 5,
            marginRight: 10
        }}>第{this.props.mobData ?
            (this.props.mobData.remainingTime>0?
                this.props.rowData.lastIssueNumber:this.props.mobData.uniqueIssueNumber):
            ''}期
        </Text>)
    }
}

@observer
class TextTimeView extends React.Component {


    render(){
      //  JXLog("TCShop------------TextTimeView- shopList--render");
        return ( <View style={{flexDirection: 'row', marginLeft: 15}}>
            <Text style={{
                color: shoppingTxtColor.cpTipTxt,
                fontSize: width >= 375 ? Size.font14 : Size.font12
            }}>距第{this.props.mobData ?
                (this.props.mobData.remainingTime>0?
                    this.props.mobData.uniqueIssueNumber:(this.props.mobData.nextUniqueIssueNumber)) :
                ''}期截止还有
            </Text>
            <Text style={{color: shoppingTxtColor.cpTime, fontSize: Size.font14, width: 80, textAlign: "center"}}
                  ellipsizeMode='tail'
                  numberOfLines={1}>
                {this.props.mobData ?
                    (JXHelper.getTimeHHMMSSWithSecond(
                        this.props.mobData.remainingTime>0?
                            this.props.mobData.remainingTime:this.props.mobData.nextremainingTime)):
                    ''}
            </Text>
        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 110,
        width: width,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        borderBottomColor: indexBgColor.mainBg,
        borderBottomWidth: 1,
    },

    leftImgStyle: {
        width: 60,
        height: 60,
        marginLeft: 10
    }, openCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: width / 2 - 12,
        marginTop: 2,

    },
    contentViewStyle: {
        marginBottom: 15,
        marginLeft: 20,
        backgroundColor: lotterBgColor.waitLotteryBg,
        borderRadius: 20,
        width: 160,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentTextStyle: {
        fontSize: Size.font16,
        color: lotteryTxtColor.waitTxt,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    }

});
