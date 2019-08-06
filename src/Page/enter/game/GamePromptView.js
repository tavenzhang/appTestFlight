'use strict'
/**
 * 提示界面
 * Created by Benny on 2019/08/05.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react';
import {ASSET_Images, ASSET_Theme} from "../../asset";
import TCImage from "../../../Common/View/image/TCImage";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";

@observer
export default class GamePromptView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectType: 2
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
        let {itemData} = this.props;
        //let newLeft=this.adjustLocation()
        //TW_Log("Benny >> Testing: "+itemData.methodName)
        return (
            <View >
                <Text style={{
                    color: "#A2E1EE",
                    textAlign:'center',
                    fontSize: 16,
                    top:50
                }}>支付宝快捷支付：</Text>
                <Text style={{color: "#A2E1EE", fontSize: 16,textAlign:'center',top:50}}>支付宝：5254534535345</Text>
                <Text style={{color: "#A2E1EE", fontSize: 16,textAlign:'center',top:50}}>充值代理的账号已经复制到系统粘贴板上</Text>
                <Text style={{color: "#A2E1EE", fontSize: 16,textAlign:'center',top:90}}>是否现在跳转到"微信"？</Text>
                <TCButtonImg imgSource={ASSET_Images.gameUI.query}
                             btnStyle={{position: "absolute", top: 220, left: 190}}
                             soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                             onClick={() => {
                                 //TW_Store.gameUIStroe.showGusetView();
                                 // if (onClose) {
                                 //     onClose()
                                 // }
                             }}/>
            </View>

        );
    };



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

