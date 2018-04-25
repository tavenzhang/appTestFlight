/**
 * Created by Sam on 2016/12/22.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Platform,
} from 'react-native';
import {Size, betHome} from '../../resouce/theme'
import {betIcon} from '../../resouce/images'
export default class MyComponent extends React.Component {

    static defaultProps = {};

    constructor(state) {
        super(state);
        this.state = {
            cc: this.props.cc
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cc: nextProps.cc
        })
    }

    render() {
        return (
            <TouchableHighlight onPress={()=> {
                if (this.props.shakeEvent == null) return
                this.props.shakeEvent()
            }}
                                style={{width: Platform.OS =='ios'?120:130, borderWidth: 0.5, borderColor: betHome.shoppingCarBorder, marginRight: 5, borderRadius: 3}}
                                activeOpacity={0.5}
                                underlayColor='transparent'>
                <View
                    style={{flexDirection: 'row', marginTop: 3, marginRight: 5, marginBottom: 3, alignItems: 'center'}}
                    removeClippedSubviews={false}>
                    <Image source={betIcon.back}
                           style={{width: 18, height: 18, marginLeft: 5}}/>
                    <Text style={{color: betHome.shoppingCarTxt ,marginLeft: 5, fontSize: Size.font14}}>返回购物车</Text>
                    <View
                        style={{borderRadius: 16, width: 16, height: 16,backgroundColor:betHome.shoppingTipBallBg,position: 'absolute',overflow:'visible',right:Platform.OS =='ios'?-8:0,top:Platform.OS =='ios'?-8:0,justifyContent:'center',alignItems:'center'}}>
                        <Text
                            style={{color:betHome.shoppingTipBallTxt,fontSize:Size.font10}}>{this.state.cc > 99 ? 99 : this.state.cc}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}
