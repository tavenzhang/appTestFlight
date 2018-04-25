/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import MarkSix_DPS from '../data/TCMarkSix_DPS'
import _ from 'lodash';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import  * as PlayConfig from '../../../../../Data/JXPlayMathConfig'
import {MathControllerFactory} from 'lottery-core'


let SingletonDPS = null;

import TCMarkSixNumberSelectView from './TCMarkSixNumberSelectView'
import TCMarkSixSpecialKindSelectView from './TCMarkSixSpecialKindSelectView'
import TCMarkSixColorSelectView from './TCMarkSixColorSelectView'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';
import {betHome} from '../../../../resouce/theme'
export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonDPS=MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);

    }

    static defaultProps={
        //一开始默认的玩法
        defaultPlayType:"特码B-选码",
    };

    componentDidMount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }

        this.listenerClear = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_clear', () => {
            if(this.state.type.indexOf('合肖')>=0) {
                this.setState({renderRate: true});
            }
        });
        this.listenerSelected = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_numberSelected', () => {
            this.setState({renderRate:true});
        });
    }

    componentWillUnmount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.removeEventListener('shake')
        }
        this.listenerClear && this.listenerClear.remove();
        this.listenerSelected && this.listenerSelected.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                {this.renderNumberView()}
            </View>
        );
    };

    renderNumberView() {
        let itemArray = [];
        let type = this.state.type;
        let playGameSetting = this.getSingleGamePrizeSettings(type);
        if(!SingletonDPS.getPlayTypeName() || SingletonDPS==='') {
            SingletonDPS.resetPlayType(type);
        }
        switch (type) {
            case '特码B-选码':
            case '特码A-选码': {
                let pys = SingletonDPS.getPlayTypeIdWithPlayType(type)
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '}
                                                          gameID={pys}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          tmAOdd ={(playGameSetting['prizeSettings'][0].prizeAmount*0.9).toFixed(2)}
                                                          prizeSettings={ playGameSetting['prizeSettings']} numberEvent={this.props.numberEvent} isNeedQDXDSQ={true}/>)
            }
                break
            case '两面-两面': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '色波-色波': {
                playGameSetting = _.cloneDeep(playGameSetting['prizeSettings']).slice(0, 3)
                itemArray.push(<TCMarkSixColorSelectView key={1}
                                                         oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                         numberArray={SingletonDPS.getPlayTypeArray()}
                                                         prizeSettings={playGameSetting}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '色波-半波': {
                playGameSetting = _.cloneDeep(playGameSetting['prizeSettings']).slice(3, 15)
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '色波-半半波': {
                playGameSetting = _.cloneDeep(playGameSetting['prizeSettings']).slice(15)
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '特肖-生肖': {
                // --
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}/>)
            }
                break;
            case '头尾数-头尾数': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '正码-选码': {
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '正码-其它': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} odds={'1.98'}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case '正码特-正一特':
            case '正码特-正二特':
            case '正码特-正三特':
            case '正码特-正四特':
            case '正码特-正五特':
            case '正码特-正六特': {
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break

            case '正码1-6-正码一':
            case '正码1-6-正码二':
            case '正码1-6-正码三':
            case '正码1-6-正码四':
            case '正码1-6-正码五':
            case '正码1-6-正码六':{
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} odds={' '}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break


            case '五行-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case'正肖-生肖': {
                // --
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}numberEvent={this.props.numberEvent}/>)

            }
                break
            case'7色波-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case'总肖-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}numberEvent={this.props.numberEvent}/>)
            }
                break
            case'平特一肖尾数-一肖': {
                let animal = SingletonDPS.getPlayTypeArray();
                let ptyx = SingletonDPS.getPlayTypeOddArray();
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={ptyx}
                                                               numberArray={animal}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}numberEvent={this.props.numberEvent}/>)
            }
                break
            case'平特一肖尾数-尾数': {
                // --
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}numberEvent={this.props.numberEvent}/>)
            }
                break

            case '自选不中-五不中':
            case '自选不中-六不中':
            case '自选不中-七不中':
            case '自选不中-八不中':
            case '自选不中-九不中':
            case '自选不中-十不中':
            case '自选不中-十一不中':
            case '自选不中-十二不中':{
                let rate = this.getRateWith(playGameSetting,-1)
                itemArray.push(this.getOdddsView(rate))
                itemArray.push(<TCMarkSixNumberSelectView key={2} odds={' '}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          prizeSettings={[]}
                                                          topShowOdds={true}
                                                          numberEvent={this.props.numberEvent}
                />)
            }break

            case'连肖连尾-二连肖':
            case'连肖连尾-三连肖':
            case'连肖连尾-四连肖':
            case'连肖连尾-五连肖':
            {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}
                                                               numberEvent={this.props.numberEvent}/>)
            } break


            case'连肖连尾-二连尾':
            case'连肖连尾-三连尾':
            case'连肖连尾-四连尾':
            case'连肖连尾-五连尾':
            {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                               oddsArray={SingletonDPS.getPlayTypeOddArray()}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}
                                                               numberEvent={this.props.numberEvent}/>)
            } break

            case '连码-三中二':
            case '连码-三全中':
            case '连码-二全中':
            case '连码-二中特':
            case '连码-特串':
            case '连码-四全中': {
                let rateArr = playGameSetting['prizeSettings']
                let rate = ' '
                for (let i =0;i<rateArr.length;i ++){
                    let obj = rateArr[i]
                    rate += obj['prizeNameForDisplay'] +' '+obj['prizeAmount']+'  '
                }
                itemArray.push(this.getOdddsView(rate))
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          prizeSettings={[]}
                                                          topShowOdds={true}
                                                          numberEvent={this.props.numberEvent}
                />)
            }
                break
        }
        //合肖-
        this.getHeXiaoView(type, playGameSetting, itemArray);
        return itemArray;
    }

    /**
     * 获取合肖-二 三 四...合肖对应的视图
     * @param type            玩法
     * @param playGameSetting 玩法配置
     * @param itemArray       视图收集器
     */
    getHeXiaoView(type, playGameSetting, itemArray) {
        if (type.indexOf('合肖') >= 0) {
            let rate = this.getRateWith(playGameSetting, -1);
            itemArray.push(this.getOdddsView(rate));
            itemArray.push(<TCMarkSixSpecialKindSelectView key={1}
                                                           odds={' '}
                                                           topShowOdds={true} numberEvent={this.props.numberEvent}
                                                           numberArray={SingletonDPS.getPlayTypeArray()}/>)

        }
    }

    getRateWith(playGameSetting,startN){
        let unAdd = SingletonDPS.getUnAddedNumberArrsCount();
        let rate =  '--'

        //正常取值
        if (startN<0){
            rate = playGameSetting['prizeSettings'][0]['prizeAmount'];
            return rate
        }

        if (unAdd>(startN-1) && playGameSetting){
            rate = playGameSetting['prizeSettings'][(unAdd-startN)]['prizeAmount']
        }
        return rate
    }

    getOdddsView(rate){
        return (
            <View key={99} style={{height:10,flex:1,justifyContent:'center',alignItems:'center',marginTop:10,flexDirection:'row'}}>
                <Text style={{color:'#666666'}}>赔率:</Text>
                <Text style={{color:'red'}} renderRate={this.state.renderRate}> {rate}</Text>
            </View>)
    }

    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getPlayTypeIdWithPlayType(playMath)
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]['singleGamePrizeSettings'][pys]
            return playGameSetting
        }
        return null
    }

    setPlayMathWith(mathName) {
        this.setState({
            type: mathName
        })
    }

    resetBetNumber(count){
        this.setState({count:count})
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: betHome.betMidBg
    }
});