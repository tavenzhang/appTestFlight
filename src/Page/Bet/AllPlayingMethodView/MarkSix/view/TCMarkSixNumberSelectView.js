/**
 * Created by Sam on 2016/11/30.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import {Size, width, indexBgColor, commonNumBallStyles, height, betHome} from '../../../../resouce/theme'
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";

export default class TCMarkSixNumberSelectView extends React.PureComponent {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null,
            curSXList:[]
        };
    }

    static defaultProps = {
        titleName: '选码',
        numberArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        areaIndex: '0',
        odds: '1.98',
        oddsArray: null,
        prizeSettings: null,
        topShowOdds: false,
        gameID:'',
        isShowSX: false
    }

    componentWillMount() {
        this.listener = RCTDeviceEventEmitter.addListener('qdxdsPress', (areaIndex, index,type) => {
            if (type != "生肖") {
                this.setState({isShowSX: false,curSXList:[]})
            }
        });
        this.listener2 = RCTDeviceEventEmitter.addListener('toggleShowShengXiao', (areaIndex, isShow) => {
            if (this.props.areaIndex == areaIndex) {
                if (this.props.isNeedQDXDSQ) {
                    this.setState({isShowSX: !isShow,curSXList:[]},()=>{
                        if(isShow) {
                            RCTDeviceEventEmitter.emit('qdxds_NumberCall_clear', areaIndex);
                        }

                    })

                }
            }
        });
        this.listener3 = RCTDeviceEventEmitter.addListener('qdxdsReset', (areaIndex) => {
            this.setState({isShowSX: false,curSXList:[]})
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
        this.listener3 && this.listener3.remove();
        this.listener4 && this.listener4.remove();
    }

    render() {
        //对齐全大小单双清  因为是wrap
        if (this.props.isNeedQDXDSQ ) {
            this.numberCount = parseInt((width - 31 - 6) / 60);
        }
        let contentView = null;
        if (this.props.isNeedQDXDSQ) {
            contentView = <View style={styles.container1}>
                <TCQDXDSQBarView isSXArray={true} qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                {this.state.isShowSX ? this.getSXView() : null}
                <View style={[styles.rightViewStyle1, {
                    marginLeft: (31 + (width - this.numberCount * 60 + 20 - 31 - 6) / 2),  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>;
        } else {
            contentView = <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName} style={{marginTop: 5}}/>
                    {this.getOddsTitleView()}
                </View>

                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>;
        }
        return contentView;
    }

    getSXView = () => {
        let dataList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        return (<View style={{
            alignSelf: "center", flexWrap: "wrap", marginLeft: 15, backgroundColor: "white",
            justifyContent: "center", flexDirection: "row", alignItems: "center", width: width - 80,
            marginBottom: 10
        }}>
            {
                dataList.map((data, index) => {
                    return <TouchableOpacity onPress={()=>{
                        let srcList=this.state.curSXList;
                        if(srcList.indexOf(data)==-1){
                            srcList.push(data)
                        }else{
                            srcList.splice(srcList.indexOf(data),1);
                        }
                        this.setState({curSXList:srcList})
                        this.props.numberEvent.qdxdsqPressCallBack(this.props.areaIndex, "生肖", false,srcList.join(","));

                    }} key={index}>
                        <View style={{alignItems: "center", marginVertical: 5, width: (width - 80) / 6}}>
                            <Text style={{fontSize: 14, color:this.state.curSXList.indexOf(data)>-1 ? "red":"black"}}>{data}</Text>
                        </View>
                    </TouchableOpacity>
                })
            }
        </View>)
    }


    getOddsTitleView() {
        if (!this.props.topShowOdds) {
            return <TCBetChoiceTitleView titleName='赔率' isGrayBackground={true} style={{marginTop: 10}}/>
        }
    }


    getAllNumbers() {
        let prizeSettingsArr = this.props.prizeSettings
        //  特码A B盘 支持神秘特码 赔率重管端获取 防止后端调整回之前的状态只有 prizeSettingss数组只有一个值 所以加个判断 length > 2
        if ((this.props.gameID === 'SA'||this.props.gameID === 'SB') && prizeSettingsArr && prizeSettingsArr.length > 2){
            return this.getAllNumbersSuperCode()
        }

        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        let prizeAmount = this.props.prizeSettings[0]

        for (let i = 0; i < numberArray.length; i++) {
            if (prizeAmount) {
                itemArr.push(<NumberView number={numberArray[i]}
                                         myOdds={this.props.tmAOdd ? this.props.tmAOdd : prizeAmount.prizeAmount}
                                         key={i}
                                         areaIndex={areaIndex}
                                         numberEvent={this.props.numberEvent} isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
            } else {
                if (this.props.oddsArray) {
                    itemArr.push(<NumberView number={numberArray[i]} myOdds={this.props.oddsArray[i]} key={i}
                                             areaIndex={areaIndex}
                                             numberEvent={this.props.numberEvent}
                                             isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
                } else {
                    itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex}
                                             myOdds={this.props.odds}
                                             numberEvent={this.props.numberEvent}
                                             isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
                }
            }
        }
        return itemArr;
    }

    // 获取六合彩特码A B号码
    getAllNumbersSuperCode(){
        var itemArr = [];
        let areaIndex = this.props.areaIndex
        let prizeAmount = this.props.prizeSettings
        if (prizeAmount) {
            let i = prizeAmount.length == 49 ? 0 : 1;
            for ( ; i < prizeAmount.length; i++) {
                let set = prizeAmount[i]
                let prize = (this.props.gameID === 'SA'?(set.prizeAmount*0.9).toFixed(2):set.prizeAmount)
                itemArr.push(<NumberView number={set.prizeNameForDisplay} myOdds={prize} key={i}
                                         areaIndex={areaIndex} numberEvent={this.props.numberEvent}/>)
            }
            return itemArr
        }
    }

    buttonCall(e) {
        if (this.state.selectedButton != null) {
            this.state.selectedButton.reset()
        }
        this.setState({
            selectedButton: e
        })
    }
}


class NumberView extends React.PureComponent {

    constructor(state) {
        super(state);
        this.state = {
            selected: false
        };
    }

    static defaultProps = {
        number: '',
        areaIndex: '0',
        selectedEvent: null,
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_clear', () => {
            this.reset()
        })


        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number, isQDXDSQ, isCancel) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                if (!isQDXDSQ) {
                    this.props.numberEvent.markSixUserNumberCall(this.props.areaIndex, this.props.number, true);
                    this.setState({
                        selected: true
                    });
                } else {
                    this.setState({
                        selected: !isCancel
                    })
                }

            }
        });

        this.listener3 = RCTDeviceEventEmitter.addListener('qdxds_NumberCall_clear', (areaIndex) => {

            if (areaIndex == this.props.areaIndex) {
                this.reset();
            }
        });

        this.listener4 = RCTDeviceEventEmitter.addListener('randomSelectedNumber_unselected', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                this.setState({
                    selected: false
                });
            }
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
        this.listener3 && this.listener3.remove();
        this.listener4 && this.listener4.remove();

    }

    render() {
        return (
            <View style={styles.numberItemStyle}>
                <TouchableOpacity style={this.getNumberStyle()} onPress={() => this.numberSelected()}>
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                </TouchableOpacity>
                <Text
                    style={{
                        marginLeft: -20,
                        fontSize: Size.font12,
                        color: betHome.cpOdd,
                        marginTop: 3
                    }}>{this.props.myOdds}</Text>
            </View>
        )
    }

    getNumberStyle() {
        if (this.state.selected) {
            return commonNumBallStyles.numberViewSelectedStyle
        } else {
            return commonNumBallStyles.numberViewStyle
        }
    }

    getTitleStyle() {
        if (this.state.selected) {
            return commonNumBallStyles.numberViewTitleSelectedStyle;
        }
        return commonNumBallStyles.numberViewTitleStyle;
    }

    numberSelected() {
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.setState({
            selected: !this.state.selected
        })
        // RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, !this.state.selected);
        this.props.numberEvent.markSixUserNumberCall(this.props.areaIndex, this.props.number, !this.state.selected);

    }

    reset() {
        this.setState({
            selected: false
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
        // borderBottomWidth:1,
        // borderColor:'#DEDEDE',
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        width: width - 60
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 12
    },
    leftTitleStyle: {
        backgroundColor: '#FAEBD7',
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 3,
    },
    numberViewStyle: {
        backgroundColor: 'white',
        borderRadius: 30,
        marginTop: 10,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5
    },
    numberItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 60,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    container1: {
        flex: 1,
    },
    rightViewStyle1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width - 31 - 6,
    },
});