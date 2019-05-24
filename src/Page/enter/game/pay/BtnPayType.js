import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView, TouchableWithoutFeedback
} from 'react-native'
import {observer} from 'mobx-react/native';
import {ASSET_Images, JX_PLAT_INFO} from "../../../asset";

import TCImage from "../../../../Common/View/image/TCImage";
import PropTypes from "prop-types";
import {userPay} from "../../../asset/images";


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
        return (<TouchableWithoutFeedback onPress={this.onSelect}>
                <View style={{justifyContent: "center", alignItems: "center", height: 50}}>
                    <TCImage source={isSelect ? ASSET_Images.gameUI.btnPayHight :
                        data.code == "VIP" ? ASSET_Images.gameUI.btnPayVIPNormal : ASSET_Images.gameUI.btnPayNormal}
                             resizeMode={'stretch'}/>
                    <View style={{
                        position: "absolute", alignItems: "center", justifyContent: "center",
                    }}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                            <TCImage source={this.getPayTypeIcon(data.code)}
                                     soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                     style={{marginRight: 5}}/>
                            {/*<View style={{justifyContent:"center", alignItems:"center"}}>*/}
                            {/*<TCImage source={this.getPayName(data.code)}/>*/}
                            {/*{this.isFinxePay(data.code) ? <TCImage source={ASSET_Images.gameUI.title_fix}/>:null}*/}
                            {/*</View>*/}
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
