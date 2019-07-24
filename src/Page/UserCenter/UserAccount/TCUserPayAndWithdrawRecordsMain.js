'use strict'
/**
 * 充值和提款记录主界面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import UserAccount from './TCUserPayAndWithdrawRecords'
import {ASSET_Images, ASSET_Theme} from "../../asset";
import TCImage from "../../../Common/View/image/TCImage";

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
        let newLeft=this.adjustLocation()
        return (
            <View >
                <TCImage style={{position:"absolute", left:newLeft}} source={ASSET_Images.gameUI.img_czmx_dkMenu} />
                <View style={{position:"absolute", left:newLeft}}>
                    <View style={styles.container}>

                        <TouchableOpacity onPress={()=>{this.onSelect(1)
                            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
                        }} >
                            <View>
                                <TCImage source={ this.state.selectType == 1 ? ASSET_Images.gameUI.czmxAll:ASSET_Images.gameUI.czmxAll_Normal}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onSelect(2)
                            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
                        }} >
                            <View>
                                <TCImage source={ this.state.selectType == 2 ? ASSET_Images.gameUI.czmxDone:ASSET_Images.gameUI.czmxDone_Normal}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onSelect(3)
                            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
                        }} >
                            <View>
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
    }

    /**
     * 根据屏宽来获取明细列表left的值
     * @returns {number}
     */
    adjustLocation() {
        let widthStandard = 812
        return ((SCREEN_W - widthStandard) / 16 * 5)
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

