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
    TouchableHighlight
} from 'react-native';
import {width, betHome} from '../resouce/theme'
let timeoutTime = 0
import Moment from 'moment'
import {config} from '../../Common/Network/TCRequestConfig'
import NetUitls from '../../Common/Network/TCRequestUitls'
import {Size} from '../../Page/resouce/theme'
import JXHelper from '../../Common/JXHelper/JXHelper'

import { observer } from 'mobx-react/native';

@observer
export default class TCBetAwardCountdown extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            surplus: this.props.awardCountdownTime
        };
    }

    static defaultProps = {
        lotteryNo: '',
        awardCountdown: 0,
        duration: 1000,
        lastIssue: '01 11 08 08 05 05 02 05 05 02'
    }

    componentDidMount() {
        this.freshBalance()
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer2 && clearInterval(this.timer2);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{}}>
                    <Text
                        style={{fontSize: Size.font17, color: betHome.issueTxt,marginLeft: 10}}>距{this.getIssueNumber()}截止 </Text>
                    <Text
                        style={{fontSize: Size.font18, fontWeight: 'bold', color:betHome.timeTxt, width: 120, marginLeft: 10}}>{this.getSurplusTime()}</Text>
                </View>
                {this.getBalanceView()}
            </View>
        )
    }

    getBalanceView(){
       return (<TouchableHighlight onPress={()=> {
            this.freshBalance()
        }} style={{marginRight:5}} activeOpacity={0.3}
                            underlayColor='transparent'>
            <View style={{ alignItems: 'center'}}>
                <Text style={{color: betHome.issueTxt, marginLeft: 5, fontSize: Size.font17}}>您的余额</Text>
                <Text
                    style={{color:betHome.balanceTxt, marginLeft: 5, fontSize: Size.font15}}>{this.state.balance == null ? TCUSER_BALANCE : this.state.balance}元</Text>
                {/*<Image source={require('image!icon_shake')} style={{width: 16, height: 16, marginLeft: 5}}/>*/}
            </View>
        </TouchableHighlight>)
    }

    getIssueNumber(){
        if (this.props.data == null||this.props.data.rightData == null){
            return ''
        }
        if (this.props.data.rightData.remainingTime>0) {
            let planNo = this.props.data.rightData.planNo
            planNo = ((planNo < 100) ? ('0' + planNo) : planNo) + '期'
            return planNo
        }else if(this.props.data.rightData.nextremainingTime>0){
            let planNo = this.props.data.rightData.nextPlanNo
            planNo = ((planNo < 100) ? ('0' + planNo) : planNo) + '期'
            return planNo
        }
    }

    getSurplusTime = () => {
        return JXHelper.getTimeHHMMSSWithSecond(this._getAwardCountdownTime())
    }

    _getAwardCountdownTime() {
        let time = 0
        if (this.props.data == null||this.props.data.rightData == null){
            return time
        }

        if (this.props.data&&this.props.data.rightData&&this.props.data.rightData.remainingTime>0) {
            time = this.props.data.rightData.remainingTime
        }else if(this.props.data&&this.props.data.rightData&&this.props.data.rightData.nextremainingTime>0){
            time = this.props.data.rightData.nextremainingTime
        }
        return time
    }

    freshBalance() {
        if (this.state.isLoading) return
        this.setState({
            isLoading: true
        })
        NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                let balance = parseFloat(response.content.balance)
                this.timer2 = setTimeout(() => {
                    this.setState({
                        balance: balance,
                        isLoading: false
                    })
                    TCUSER_BALANCE = balance
                }, 1000)

            } else {

            }
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: betHome.betTopItemBg,
        borderBottomWidth: 0.5,
        borderBottomColor: betHome.betMidBg,
        alignItems: 'center',
        height: 50,
    }
});