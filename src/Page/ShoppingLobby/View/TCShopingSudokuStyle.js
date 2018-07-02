/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View
} from 'react-native';

import SudokuItemView from './TCShopingSudokuItemView'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import {indexBgColor} from '../../resouce/theme'

import Moment from 'moment'
import TCFlatList from "../../../Common/View/RefreshListView/TCFLatList";


export default class MyComponent extends Component {
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
        let {isNow}=this.props
        if(!isNow){
            return null
        }
        return (
            <ScrollView contentContainerStyle={styles.container} style={{
                height: Dimensions.get('window').height - 64 - 45 - 50,
            }}>
                <TCFlatList numColumns={3}   dataS={this.getRenderListView()} renderRow={this.renderRow}/>
            </ScrollView>
        );
    }

    renderRow=(item,index)=>{
        if(item.special){
            return <SudokuItemView icon={'123'} title={''} mTimer={''}/>;
        }

        let gameInfo = JXHelper.getGameInfoWithUniqueId(item.gameUniqueId)
        let myicon = ''
        if (gameInfo && gameInfo.status == 'FORBIDDEN') {
            myicon = gameInfo.gameIconGrayUrl
        } else if (gameInfo) {
            myicon = gameInfo.gameIconUrl
        }
        return <SudokuItemView  gameInfo={gameInfo} icon={gameInfo && myicon ? myicon : item.icon}
                                title={item.gameNameInChinese}
                                mTimer={item.stopOrderTimeEpoch - item.currentTimeEpoch} rowData={item}
                                moment={Moment().format('X')} mobData={this.props.mobData[index]}/>


    }

    getRenderListView=()=> {
        let itemArr = []
        for (let i = 0; i < this.props.cpArray.length; i++) {
            let item = this.props.cpArray[i]
            if (this.props.tabLabel == '全部彩种') {

            } else if (this.props.tabLabel == '时时彩') {
                if (item.gameUniqueId.indexOf('SSC') < 0) continue
            }
            else if (this.props.tabLabel == '高频彩') {

                if (item.gameUniqueId.indexOf('HF_') < 0) continue

            } else if (this.props.tabLabel == '低频彩') {

                if (item.gameUniqueId.indexOf('HF_') >= 0) continue
            } else if (this.props.tabLabel == 'PC蛋蛋') {
                if (item.gameUniqueId.indexOf('28') < 0) continue
            } else if (this.props.tabLabel == 'PK拾') {
                if (item.gameUniqueId.indexOf('PK10') < 0) continue
            } else if (this.props.tabLabel == '11选5') {
                if (item.gameUniqueId.indexOf('D11') < 0) continue
            } else if (this.props.tabLabel == '快3') {
                if (item.gameUniqueId.indexOf('K3') < 0) continue
            }

            itemArr.push(item)
            // let gameInfo = JXHelper.getGameInfoWithUniqueId(item.gameUniqueId)
            // let myicon = ''
            // if (gameInfo && gameInfo.status == 'FORBIDDEN') {
            //     myicon = gameInfo.gameIconGrayUrl
            // } else if (gameInfo) {
            //     myicon = gameInfo.gameIconUrl
            // }
            // itemArr.push(<SudokuItemView key={i} gameInfo={gameInfo} icon={gameInfo && myicon ? myicon : item.icon}
            //                              title={item.gameNameInChinese}
            //                              mTimer={item.stopOrderTimeEpoch - item.currentTimeEpoch} rowData={item}
            //                              moment={Moment().format('X')} mobData={this.props.mobData[i]}/>)
        }

        let paddinngNum = 3 - itemArr.length % 3
        paddinngNum = paddinngNum == 3 ? 0 : paddinngNum
        for (let i = 0; i < paddinngNum; i++) {
           // itemArr.push(<SudokuItemView key={i + 100} icon={'123'} title={''} mTimer={''}/>)
            itemArr.push({special:true})
        }
        return itemArr
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.mainBg,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 2
    }
});
