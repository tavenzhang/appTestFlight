'use strict'
/**
 * 充值和提款记录主界面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    ScrollView, TouchableOpacity, Text, Image
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import ScrollableTabView from '../../../Common/View/ScrollableTab'
import DefaultTabBar from '../../../Common/View/ScrollableTab/DefaultTabBar'
import UserAccount from './TCUserPayAndWithdrawRecords'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {Size, shoppingTxtColor, indexBgColor, listViewTxtColor} from '../../asset/game/themeComponet'
import {ASSET_Images, ASSET_Theme} from "../../asset";
import TCImage from "../../../Common/View/image/TCImage";
import TCText from "../../../Common/View/widget/TCText";
import TCButtonView from "../../../Common/View/button/TCButtonView";

export default class TCUserPayAndWithdrawRecordsMain extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectType: 0
        }
    }

    static defaultProps = {
        initPage: 0,
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let userRecord = TW_Store.userAccountStore.getTransferRecords()
        let {onBack} = this.props
        let {isSelect, data, accountType} = this.props
        return (
            <View>
                <TCImage source={ASSET_Images.gameUI.img_czmx_dkMenu} style={{}}/>
                <View style={{backgroundColor: "red",position:"absolute"}}>

                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=>this.onSelect(0)} style={{flex:1}}>
                            <View style={styles.buttonImg}>
                                {
                                    this.state.selectType == 0 ?
                                        <TCImage source={ASSET_Images.gameUI.czmxAll}/>:
                                        <View style={{backgroundColor:"yellow"}}/>
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSelect(1)} style={{flex:1}}>
                            <View style={styles.buttonImg}>
                                {
                                    this.state.selectType == 1 ?
                                        <TCImage source={ASSET_Images.gameUI.czmxDone}/>:
                                        <View style={{backgroundColor:"yellow"}}/>
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSelect(2)} style={{flex:1}}>
                            <View style={styles.buttonImg}>
                                {
                                    this.state.selectType == 2 ?
                                        <TCImage source={ASSET_Images.gameUI.czmxFail}/>:
                                        <View style={{backgroundColor:"yellow"}}/>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <UserAccount tabLabel='全部' navigator={this.props.navigator} type={0}
                                     accountType={accountType}/>
                    </View>
                </View>
            </View>

        );
    };

    onSelect = (tabIndex) => {

        this.setState({selectType: tabIndex})
        TW_Log("onSelect----",this.state)
        // let {onClick, data} = this.props
        // let UserAccount = this.props
        // if (onClick) {
        //
        //     //accountType={this.props.accountType}
        //     onClick(data)
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor:"green",
        flex:1
    },
    buttonImg: {
        // justifyContent: "center",
        // alignItems: "center",

    }
});
