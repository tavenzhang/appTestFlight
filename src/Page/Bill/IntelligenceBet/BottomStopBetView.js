import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image, Alert,
} from 'react-native';
import {betIcon, personal} from "../../resouce/images";
import {Size} from "../../resouce/theme";
import {width} from "../../resouce/theme";


export class BottomStopBetView extends Component {
    constructor() {
        super();
    }

    static defaultProps = {
        pressFunc: null,
        isStop: false,
        explainPressFunc: null,
    }

    render() {
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: '#eeeeee',
            borderTopWidth: Size.pixel,
            width: width,
            height: 30,
            backgroundColor: '#ffffff',
        }}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                              onPress={() => this.props.pressFunc(!this.props.isStop)}>
                <Image style={{width: 25, height: 25}} source={this.props.isStop ? personal.check : personal.unCheck}/>
                <Text style={{fontSize: Size.font13}}>中奖后停止追号</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingRight:10,paddingLeft:15}} onPress={() => {
                this.alertExplain()
            }}>
                <Image style={{width: 18, height: 18}} source={betIcon.explain}/>
            </TouchableOpacity>
        </View>
    }

    alertExplain() {
        Alert.alert('什么是中奖后停止追号',
            '勾选后，当你的追号方案某一期中奖，则后续的追号订单将被撤销，奖金返还到你的账户，如不勾选，系统一直帮您购买所有的追号投注订单。', null,
            [{
                text: '确定', onPress: () => {
                }
            }
            ])
    }
}