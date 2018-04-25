/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';

import SudokuItemView from './TCShopingListItemView'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import {indexBgColor} from '../../resouce/theme'
import Moment from 'moment'


export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        cpArray: [],
        tabLabel: ''
    };

    componentDidMount() {
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} style={{
                height: Dimensions.get('window').height - 64 - 45 - 50,
            }}>
                {this.getRenderListView()}
            </ScrollView>
        );
    }

    getRenderListView() {
        let itemArr = [];
        if(this.props.mobData && this.props.mobData.length > 0){
            for (let i = 0; i < this.props.cpArray.length; i++) {
                let item = this.props.cpArray[i]
                if (this.props.tabLabel == '全部彩种') {

                }else if(this.props.tabLabel == '时时彩'){
                    if (item.gameUniqueId.indexOf('SSC') < 0) continue
                }
                else if (this.props.tabLabel == '高频彩') {

                    if (item.gameUniqueId.indexOf('HF_') < 0) continue

                } else if (this.props.tabLabel == '低频彩') {

                    if (item.gameUniqueId.indexOf('HF_') >= 0) continue
                }else if(this.props.tabLabel == 'PC蛋蛋'){
                    if (item.gameUniqueId.indexOf('28') < 0) continue
                }else if(this.props.tabLabel == 'PK拾'){
                    if (item.gameUniqueId.indexOf('PK10') < 0) continue
                }else if(this.props.tabLabel == '11选5'){
                    if (item.gameUniqueId.indexOf('D11') < 0) continue
                }else if(this.props.tabLabel == '快3'){
                    if (item.gameUniqueId.indexOf('K3') < 0) continue
                }

                let gameInfo = JXHelper.getGameInfoWithUniqueId(item.gameUniqueId)
                let myicon = ''
                if (gameInfo&&gameInfo.status == 'FORBIDDEN'){
                    myicon = gameInfo.gameIconGrayUrl
                }else if(gameInfo){
                    myicon = gameInfo.gameIconUrl
                }

                itemArr.push(
                    <SudokuItemView
                        key={i}
                        gameInfo={gameInfo}
                        icon={gameInfo&&myicon?myicon:item.icon}
                        title={item.gameNameInChinese}
                        mTimer={item.stopOrderTimeEpoch - item.currentTimeEpoch}
                        rowData={item} moment={Moment().format('X')}
                        mobData = {this.props.mobData[i]}
                    />)
            }

            // let paddinngNum = 3-itemArr.length%3
            // paddinngNum = paddinngNum==3?0:paddinngNum
            // for (let i = 0; i < paddinngNum; i++) {
            //     itemArr.push(<SudokuItemView key={i+100} icon={'123'} title={''} mTimer={''}/>)
            // }
            return itemArr
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.mainBg,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop:2
    }
});
