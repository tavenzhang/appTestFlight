/**
 * Created by Joyce on 2017/08/28.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';


import XYFT_DPS from '../data/TCXYFT_DPS'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import TCBetGoBackShoppingCart from '../../../View/TCBetGoBackShoppingCart'
import TCXYFTSpecialKindSelectView from './TCXYFTSpecialKindSelectView'
import TCXYFTNumberSelectView from './TCXYFTNumberSelectView'
import RNShakeEvent from 'react-native-shake-event';
import {MathControllerFactory} from 'lottery-core'

let SingletonDPS = null;
import {betHome} from '../../../../resouce/theme'
import TCFlatList from "../../../../../Common/View/RefreshListView/TCFLatList";
import {TC_LayoutAnimaton} from "../../../../../Common/View/layoutAnimation/LayoutAnimaton";
export default class TCXYFT_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonDPS=MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);

    }

    static defaultProps={
        //一开始默认的玩法
        defaultPlayType:"定位胆",
    };

    componentDidMount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }


    componentWillUpdate() {
        TC_LayoutAnimaton.configureNext(TC_LayoutAnimaton.easeNoDelete);
    }

    componentWillUnmount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.removeEventListener('shake')
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                </View>
                <TCFlatList initialNumToRender={1} dataS={this.renderNumberView()} renderRow={this.renderRow} />
                {/*{this.renderNumberView()}*/}
            </View>
        );
    };

    renderRow=(data,index)=>{
        let {titleName,odds,areaIndex,numberEvent,numberArray, prizeSettings,isNoNeedQDXDSQ} = data
        if(isNoNeedQDXDSQ){
            return (<TCXYFTSpecialKindSelectView
                titleName={titleName}
                odds={odds}
                areaIndex={areaIndex ? areaIndex:0}
                numberEvent ={numberEvent}
                numberArray={numberArray}
                prizeSettings={prizeSettings}
                isNoNeedQDXDSQ={true}
            />)
        }else{
            return (<TCXYFTNumberSelectView numberEvent={numberEvent}
                                            titleName={titleName}
                                            areaIndex={areaIndex}
                                            ref={"ref" + areaIndex}
                                            numberArray={numberArray}/>
            )
        }

    }


    renderNumberView() {
        let itemArray = []
        let duplexMaxCount = 10
        let type = this.state.type
        let playGameSetting;
        let offset = 0;
        switch (type) {
            case '前一': {
                duplexMaxCount = 1
            }
                break
            case '前二': {
                duplexMaxCount = 2
            }
                break
            case '前三': {
                duplexMaxCount = 3
            }
                break
            case '后一': {
                duplexMaxCount = 1
                offset = 9
            }
                break
            case '后二': {
                duplexMaxCount = 2
                offset = 8
            }
                break
            case '后三': {
                duplexMaxCount = 3
                offset = 7
            }
                break
            case '定位胆': {
                duplexMaxCount = 10
            }
                break
            case '第一名':
            case '第二名':
            case '第三名':
            case '第四名':
            case '第五名':
            case '第六名':
            case '第七名':
            case '第八名':
            case '第九名':
            case '第十名':
            {
                playGameSetting  = this.getSingleGamePrizeSettings(type)
                if (!playGameSetting)return
                itemArray.push({titleName:this.state.type,odds:' ',areaIndex:0,numberEvent:this.props.numberEvent,numberArray:SingletonDPS.getPlayTypeArray(),
                    prizeSettings:playGameSetting['prizeSettings'],isNoNeedQDXDSQ:true
                })
                // itemArray.push(<TCXYFTSpecialKindSelectView
                //                             titleName={this.state.type}
                //                             key={1} odds={' '}
                //                             areaIndex={0}
                //                             numberEvent ={this.props.numberEvent}
                //                             numberArray={SingletonDPS.getPlayTypeArray()}
                //                             prizeSettings={playGameSetting['prizeSettings']}
                //                             isNoNeedQDXDSQ={true}
                // />)
                return itemArray
            }
            case '冠亚和值':{
                playGameSetting  = this.getSingleGamePrizeSettings(type)
                if (!playGameSetting)return

                itemArray.push({titleName:'和值',odds:' ',numberEvent:this.props.numberEvent,numberArray:SingletonDPS.getPlayTypeArray(),
                    prizeSettings:playGameSetting['prizeSettings'],isNoNeedQDXDSQ:true
                })

                // itemArray.push(<TCXYFTSpecialKindSelectView
                //     titleName={'和值'}
                //     key={1} odds={' '}
                //     numberEvent ={this.props.numberEvent}
                //
                //     numberArray={SingletonDPS.getPlayTypeArray()}
                //     prizeSettings={playGameSetting['prizeSettings']}
                //     isNoNeedQDXDSQ={true}
                // />)
                return itemArray
            }
            case '冠亚和':{
                playGameSetting  = this.getSingleGamePrizeSettings(type)
                if (!playGameSetting)return

                itemArray.push({titleName:'和值',odds:' ',numberEvent:this.props.numberEvent,numberArray:SingletonDPS.getPlayTypeArray(),
                    prizeSettings:playGameSetting['prizeSettings'],isNoNeedQDXDSQ:true
                })

                // itemArray.push(<TCXYFTSpecialKindSelectView
                //     titleName={'和值'}
                //     key={1} odds={' '}
                //     numberEvent ={this.props.numberEvent}
                //
                //     numberArray={SingletonDPS.getPlayTypeArray()}
                //     prizeSettings={playGameSetting['prizeSettings']}
                //     isNoNeedQDXDSQ={true}
                // />)
                return itemArray
            }
        }

        this.getDuplexItemArray(itemArray, duplexMaxCount,offset)
        return itemArray;
    }
    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getPlayTypeIdWithPlayType(playMath)
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]['singleGamePrizeSettings'][pys]
            return playGameSetting
        }
        return null
    }
    getDuplexItemArray(itemArray, duplexMaxCount,offset) {
        for (let i = 0; i < duplexMaxCount; i++) {

            itemArray.push({titleName:SingletonDPS.gameConfig.typeTitles[i+offset],odds:' ',
                numberEvent:this.props.numberEvent,
                numberArray:SingletonDPS.getPlayTypeArray(),
                areaIndex:i
            })

            // itemArray.push(<TCXYFTNumberSelectView numberEvent={this.props.numberEvent} titleName={SingletonDPS.gameConfig.typeTitles[i+offset]} key={i} areaIndex={i} ref={"ref" + i}
            //       numberArray={SingletonDPS.getPlayTypeArray()}/>)
        }
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({
            type: mathName
        })
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