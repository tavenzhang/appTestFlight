/**
 * Created by Sam on 2017/1/2.
 * Copyright © 2016年 JX. All rights reserved.
 *
 *
 *  首页一行四列 itemCell
 *
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {indexTxtColor, indexBgColor,Size,width,height} from '../../resouce/theme'
const colorArray = indexTxtColor.midMenuTitle
import  {homeMenu} from '../../resouce/images'
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        pushToEvent: null
    };

    componentDidMount() {
    }

    render() {

        return (
            <View style={styles.container}>
                {this.getItemsView()}
            </View>
        );
    }

    getItemsView() {
        let itemsArray = []
        for (let i = 0; i < 4; i++) {
            itemsArray.push(<MyComponent2 key={i} rowData={this.props.rowData[i]} url={this.props.rowData[i].iconUrl}
                                          title={this.props.rowData[i].nameInChinese}
                                          color={colorArray[i]} pushToEvent={this.props.pushToEvent}/>)
        }
        return itemsArray
    }
}

export class MyComponent2 extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {

    }

    render() {
        return (
            <View style={{width: width / 4, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                    style={{width: width / 4, alignItems: 'center', justifyContent: 'center'}}
                    onPress={()=> {
                    this.props.pushToEvent(this.props.rowData)
                }}>
                    {this.getImage()}
                    <Text
                        style={{fontSize: Size.font14, marginTop: 2, color: this.props.color}}>{this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    getImage() {
        return (
            <Image source={homeMenu[this.props.rowData.type]} style={{width: 55, height: 55}} resizeMode={'contain'}/>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        height: 90,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: indexBgColor.itemBg,
        borderTopWidth:1,
        borderTopColor:indexBgColor.mainBg
    }
});
