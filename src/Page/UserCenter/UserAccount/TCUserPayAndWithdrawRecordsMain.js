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
            selectType: 1
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
        let {accountType,onBack} = this.props
        return (
            <View >
                <TCImage source={ASSET_Images.gameUI.img_czmx_dkMenu} />
                <View style={{position:"absolute"}}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={()=>this.onSelect(1)} >
                            <View style={styles.buttonImg}>
                                <TCImage source={ this.state.selectType == 1 ? ASSET_Images.gameUI.czmxAll:ASSET_Images.gameUI.czmxAll_Normal}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSelect(2)} >
                            <View style={styles.buttonImg}>
                                <TCImage source={ this.state.selectType == 2 ? ASSET_Images.gameUI.czmxDone:ASSET_Images.gameUI.czmxDone_Normal}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onSelect(3)} >
                            <View style={styles.buttonImg}>
                                <TCImage source={ this.state.selectType == 3? ASSET_Images.gameUI.czmxFail:ASSET_Images.gameUI.czmxFail_Normal}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.selectType ==1 ?  <UserAccount  type={this.state.selectType}
                                                                       accountType={accountType}/>:null}
                    {this.state.selectType ==2 ?  <UserAccount  type={this.state.selectType}
                                                                accountType={accountType}/>:null}
                    {this.state.selectType ==3 ?  <UserAccount  type={this.state.selectType}
                                                                accountType={accountType}/>:null}

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

    },
});
