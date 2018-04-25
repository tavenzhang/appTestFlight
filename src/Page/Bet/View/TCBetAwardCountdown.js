/**
 * Created by Sam on 2016/11/19.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    AppState,
    Image,
} from 'react-native';
import _ from 'lodash'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import HappyPokerHelper from '../../../Common/JXHelper/HappyPokerHelper'
import JXHelper from '../../../Common/JXHelper/JXHelper'

let timeoutTime = 0
let happyPoker = new HappyPokerHelper()
import {xypk} from '../../resouce/images'
import {Size, width, indexBgColor, betHome, lotteryNumbStyle,lotteryTxtColor} from '../../resouce/theme'
import { observer } from 'mobx-react/native';
import {getAnimalsWithOpenCodes,getAnimalWithOpenCode} from '../AllPlayingMethodView/MarkSix/data/MarkSixNum2AnimalHelper'
import { Mark_SixBallColor } from '../../../Data/JXGameInfo';

@observer

export default class TCBetAwardCountdown extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            surplus: null,
            data:null
        };
    }

    static defaultProps = {
        duration: 1000,
        timeOutCallBack: null,
        isHappyPoker: false,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let lastOpenCode = ''
        if (this.props.resultsData&&this.props.resultsData.lastOpen&&this.props.resultsData.lastOpen.lastOpenCode){
            lastOpenCode = this.props.resultsData.lastOpen.lastOpenCode
        }

        if (this.props.resultsData.lastOpenCode && this.props.resultsData.lastOpenCode.indexOf(" 等待开奖") < 0 && (this.props.resultsData.rightData.gameUniqueId.indexOf('28')>=0)) {
            let numArray = lastOpenCode.split(" ")
            let num = 0
            let str = ''
            numArray.map((item)=> {
                num += parseInt(item)
                str += (item + '+')
            })
            str = _.trimEnd(str, "+")
            str += (' = ' + num)
            lastOpenCode = str
        }

        return (
            <View style={[styles.container, this.props.isHappyPoker && styles.happyPokerBg]}>
                <View style={{justifyContent:'center',backgroundColor:'transparent',marginLeft:10}}>
                    <Text style={{fontSize: Size.font16, color: betHome.issueTxt,backgroundColor:'transparent'}}> {this.getLastIssueNumber()} </Text>
                    {this.getLastOpenCodeView(lastOpenCode)}
                </View>
                <View style={{marginRight:10,justifyContent:'center',alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize: 16, color: betHome.issueTxt}}>距{this.getIssueNumber()}期截止 </Text>
                    <Text allowFontScaling={false} style={{fontSize: Size.font23, fontWeight: 'bold', color: betHome.timeTxt,marginTop:5, width:110,marginLeft:10}}>{this.getSurplusTime()}</Text>
                </View>
            </View>
        );
    };

    getLastOpenCodeView = (lastOpenCode) => {
        if(this.props.resultsData&&this.props.resultsData.rightData&&this.props.resultsData.rightData.nextremainingTime>0 && this.props.resultsData.rightData.remainingTime <= 0){
            lastOpenCode = ' 等待开奖'
        }

        if (this.props.isHappyPoker) {
            if (!lastOpenCode || lastOpenCode.indexOf("等待开奖") > 0) {
                return (
                    <View style={styles.openCodeContainer}>
                        {this.getWaitLottery()}
                    </View>
                );
            }
            lastOpenCode = lastOpenCode.replace(/ /g, ',');
            return (
                <View style={styles.openCodeContainer}>
                    {happyPoker.getOpenCodeView(lastOpenCode, false)}
                </View>
            );
        } else {
            if(this.props.resultsData&&this.props.resultsData.lastOpen&&(JXHelper.gameUniqueIDIsMarkSix(this.props.resultsData.rightData.gameUniqueId))){
                if (lastOpenCode && lastOpenCode.indexOf("等待开奖") < 0) {
                    let itemArr = []
                    let cpNumbers = this.props.resultsData.lastOpen.lastOpenCode.split(" ")
                    for (let i = 0; i < cpNumbers.length; i++) {
                            itemArr.push(
                                <View key={i} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <View key={i} style={this.getMyBallStyle(cpNumbers[i])}>
                                        <Text style={{adjustsFontSizeToFit:true,fontSize:Size.font15,color:lotteryTxtColor.cpNum,backgroundColor:'transparent'}}>
                                            {cpNumbers[i]}
                                        </Text>
                                    </View>
                                    <Text style={{adjustsFontSizeToFit:true,fontSize:Size.font13,color: betHome.issueTxt}}>
                                        {getAnimalWithOpenCode(this.props.resultsData.lastOpen.stopOrderTimeEpoch,cpNumbers[i])}
                                    </Text>
                                </View>
                            );
                    }
                    return (<View style={{flexDirection:'row'}} >{itemArr}</View>);

                    // let animals = getAnimalsWithOpenCodes(this.props.resultsData.rightData.stopOrderTimeEpoch,this.props.resultsData.lastOpen.lastOpenCode)
                    // return (
                    //     <View>
                    //         <Text style={{adjustsFontSizeToFit:true,fontSize:Size.font14,color: betHome.openNum,width:width/2-12 ,marginTop:2,backgroundColor:'transparent'}}>{lastOpenCode}
                    //         </Text>
                    //         <Text style={{adjustsFontSizeToFit:true,fontSize: Size.font14,color: betHome.openNum,width:width/2-12 ,marginTop:2,backgroundColor:'transparent'}}>{animals}
                    //         </Text>
                    //     </View>
                    // )
                }
            }
            return (
                <Text allowFontScaling={false}
                    style={{fontSize: this.props.is10Num?Size.font16:Size.font18,color: betHome.openNum,width:width/2-12 ,marginTop:this.props.is10Num?1:2,backgroundColor:'transparent'}}>{lastOpenCode}</Text>
            );
        }
    }

    getWaitLottery = () => {
        let itemArray = [];
        for (let i = 0; i < 3; i++) {
            itemArray.push(
                <Image
                    key={i+1000}
                    source={xypk.waitLottery}
                    style={styles.imgPokerStyle}
                    resizeMode={'contain'}
                />
            );
        }
        return itemArray;
    }

    getIssueNumber(){
        if (this.props.resultsData == null||this.props.resultsData.rightData == null){
            return ''
        }
        if (this.props.resultsData.rightData.remainingTime>0) {
            let planNo = this.props.resultsData.rightData.planNo
            planNo = ((planNo < 100) ? ('0' + planNo) : planNo)
            return planNo
        }else if(this.props.resultsData.rightData.nextremainingTime>0){
            let planNo = this.props.resultsData.rightData.nextPlanNo
            planNo = ((planNo < 100) ? ('0' + planNo) : planNo)
            return planNo
        }
    }

    getLastIssueNumber(){
        if (this.props.resultsData == null||this.props.resultsData.rightData == null){
            return ''
        }

        if (this.props.resultsData.lastOpen&&this.props.resultsData.rightData.remainingTime>0) {
            let planNo = this.props.resultsData.lastOpen.planNo
            planNo = ((planNo<100) ? ('0' + planNo) : planNo)+'期'
            return planNo
        }else if(this.props.resultsData.current&&this.props.resultsData.rightData.nextremainingTime>0){
            let planNo = this.props.resultsData.current.planNo
            planNo = ((planNo < 100) ? ('0' + planNo) : planNo)+'期'
            return planNo
        }
    }

    getSurplusTime = () => {
        let time = 0
        if (this.props.resultsData == null||this.props.resultsData.rightData == null){
            return JXHelper.getTimeHHMMSSWithSecond(time)
        }

        if (this.props.resultsData&&this.props.resultsData.rightData&&this.props.resultsData.rightData.remainingTime>0) {
            time = this.props.resultsData.rightData.remainingTime
        }else if(this.props.resultsData&&this.props.resultsData.rightData&&this.props.resultsData.rightData.nextremainingTime>0){
            time = this.props.resultsData.rightData.nextremainingTime
        }
        return JXHelper.getTimeHHMMSSWithSecond(time)
    }

    getMyBallStyle(number) {
        let styArr = [];
        //判断是实心球还是空心球
        let ballWidthBorder = lotteryNumbStyle.ballStyle.borderWidth ? true : false;
        styArr.push(lotteryNumbStyle.ballStyle);
        if(ballWidthBorder){
            styArr.push({borderColor: Mark_SixBallColor[number],borderWidth:1,width:22,height:22,borderRadius:11,marginRight:2,marginLeft:2,marginBottom:2});
        }else {
            styArr.push({backgroundColor: Mark_SixBallColor[number],width:22,height:22,borderRadius:11,marginRight:2,marginLeft:2,marginBottom:2});
        }
        return styArr;
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: betHome.betTopItemBg,
        borderBottomWidth: TCLineW,
        borderBottomColor: indexBgColor.mainBg,
        height: 66,
    },
    happyPokerBg: {
        backgroundColor: betHome.betTopItemBg,
    },
    openCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: width / 2 - 12,
    },
    imgPokerStyle: {
        height: 40,
        width: 30,
        marginHorizontal: 0.1,
    },
    textOpenCodeBlack: {
        marginLeft: 8,
        marginTop: 3,
        fontSize: Size.font18,
        fontWeight: 'bold',
        color: 'black',
    },
    textOpenCodeRed: {
        marginLeft: 8,
        marginTop: 3,
        fontSize: Size.font18,
        fontWeight: 'bold',
        color: 'red',
    },
});