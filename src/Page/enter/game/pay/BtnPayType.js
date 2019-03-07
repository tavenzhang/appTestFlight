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
        let {isSelect,data} = this.props
        return (<TouchableWithoutFeedback onPress={this.onSelect}>
                <View>
                    <TCImage source={isSelect ? ASSET_Images.gameUI.btnPayHight : ASSET_Images.gameUI.btnPayNormal}/>
                    <View style={{
                        position: "absolute", alignItems: "center", justifyContent: "center", width: 115,
                        height: 40,
                    }}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                            <TCImage source={this.getPayTypeIcon(data.code)}
                                     style={{width: 25, height: 25, marginRight: 5}}/>
                            <View style={{justifyContent:"center", alignItems:"center"}}>
                            <TCImage source={this.getPayName(data.code)}/>
                                {this.isFinxePay(data.code) ? <TCImage source={ASSET_Images.gameUI.title_fix}/>:null}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    onSelect = () => {
        let {onClick,data} = this.props
        if (onClick) {
            onClick(data)
        }
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
        switch (typeCode) {
            case 'WX':
            case 'FIXED_WX':
            case 'WX_PUBLIC':
                return userPay.payTypeWx
            case 'FIXED_QQ':
            case 'QQ':
                return  userPay.qqPay
            case 'ZHB':
            case 'FIXED_ZHB':
                return userPay.payTypeAlipay
            case 'JD':
                return userPay.payTypeJdzf
            case 'BANK':
                return userPay.payTypeBank
            case 'ONLINEBANK':
                return userPay.payTypeUnionpay
            default:
                return userPay.payTypeOther
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
                return ASSET_Images.gameUI.typeBank;
            case 'ONLINEBANK':
                return ASSET_Images.gameUI.typeBank
            default:
                return ASSET_Images.gameUI.typeBank
        }
    }



}