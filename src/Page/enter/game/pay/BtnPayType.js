import React, {Component} from 'react'
import {
    View,
    TouchableWithoutFeedback
} from 'react-native'
import {observer} from 'mobx-react';
import {ASSET_Images, JX_PLAT_INFO} from "../../../asset";

import TCImage from "../../../../Common/View/image/TCImage";
import PropTypes from "prop-types";

@observer
export default class BtnPayType extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
    }


    render() {
        let {isSelect, data} = this.props
        let vipLeft = SCREEN_W > 800 ? -24 : -20
        return (<TouchableWithoutFeedback onPress={this.onSelect}>
                <View style={{justifyContent: "center", alignItems: "center", height: 55}}>
                    <TCImage
                        source={isSelect ? ASSET_Images.gameUI.btnPayHight : data.code == 'VIP' ? ASSET_Images.gameUI.btnPayVIPNormal : ASSET_Images.gameUI.btnPayNormal}
                        style={{
                            width: SCREEN_W > 850 ? 175 : 160,
                            left: isSelect ? 0 : data.code == 'VIP' ? vipLeft : -35
                        }}/>
                    <View style={{
                        position: "absolute", alignItems: "center", justifyContent: "center",
                    }}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                            <TCImage source={this.getPayTypeIcon(data.code)}
                                     soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                     style={{marginRight: 5}}/>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    onSelect = () => {
        let {onClick,data} = this.props
        if (onClick) {
            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick);
            onClick(data)
        }
    }

    getBtnStyle = (isSelect) =>{
        let btnStyle = {height:60}
        if(isSelect){
            btnStyle.width = 210;

        }else{
            btnStyle.width = 180;
        }
        return btnStyle;
    }

    isFinxePay=(typeCode)=>{
        if(typeCode&&typeCode.indexOf("FIXED")>-1){
            return true;
        }else{
            return false
        }

    }


    /**
     * 获取支付图标
     * @param rowData
     * @returns {XML}
     */
    getPayTypeIcon=(typeCode)=> {
        TW_Log(`typeCode ${typeCode}`);

        switch (typeCode) {
            case 'WX':
                return ASSET_Images.gameUI.payTypeWx
            case 'FIXED_WX':
                return ASSET_Images.gameUI.payTypeWxFix
            case 'WX_PUBLIC':
                return ASSET_Images.gameUI.payTypeWxGZH
            case 'FIXED_QQ':
                return ASSET_Images.gameUI.payTypeQQFix
            case 'QQ':
                return  ASSET_Images.gameUI.payTypeQQ
            case 'ZHB':
                return ASSET_Images.gameUI.payTypeZFB
            case 'FIXED_ZHB':
                return ASSET_Images.gameUI.payTypeZFBFix
            case 'JD':
                return ASSET_Images.gameUI.payTypeJD
            case 'BANK':
                return ASSET_Images.gameUI.payTypeYhzz
            case 'ONLINEBANK':
                return ASSET_Images.gameUI.payTypeWy
            case 'VIP':
                return ASSET_Images.gameUI.payTypeVIP
            default:
                return ASSET_Images.gameUI.payTypeYL
        }
    }

    /**
     * 获取支付 text
     * @param rowData
     * @returns {XML}
     */
    getPayName=(typeCode)=> {
        switch (typeCode) {
            case 'WX':
            case 'FIXED_WX':
                return ASSET_Images.gameUI.typeWX;
            case 'WX_PUBLIC':
                return ASSET_Images.gameUI.typeWX_GZ;
            case 'FIXED_QQ':
            case 'QQ':
                return  ASSET_Images.gameUI.typeQQ;
            case 'ZHB':
            case 'FIXED_ZHB':
                return ASSET_Images.gameUI.typeZFB;
            case 'JD':
                return ASSET_Images.gameUI.typeJD;
            case 'BANK':
                return ASSET_Images.gameUI.typeTrans ;
            case 'ONLINEBANK':
                return ASSET_Images.gameUI.typeWy
            default:
                return ASSET_Images.gameUI.typeBank
        }
    }



}
