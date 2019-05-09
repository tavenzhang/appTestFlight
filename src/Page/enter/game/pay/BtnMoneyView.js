
import TCImage from "../../../../Common/View/image/TCImage";
import PropTypes from "prop-types";
import {Text, TouchableOpacity, TouchableOpacityComponent, TouchableWithoutFeedback, View} from "react-native";
import {ASSET_Images} from "../../../asset";
import React, {Component} from "react";
import {observer} from 'mobx-react/native';

@observer
export default class BtnMoneyView extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any,
        style: PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
    }

    render() {

        let {isSelect,data,style} = this.props
        let btnStyle=isSelect ? {width: 71, height: 25}:{}
        return (<TouchableOpacity onPress={this.onSelect}>
                <View style={[{alignItems: "center" ,justifyContent: "center",},style]}>
                    <TCImage  source={isSelect ? ASSET_Images.gameUI.btnMoneyHight : ASSET_Images.gameUI.btnMoneyBg}   style={{marginHorizontal: 2,width: SCREEN_W * 0.2 - 60, height: 40}}/>
                    <View style={{
                        position: "absolute", alignItems: "center" ,justifyContent: "center",
                    }}>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                           <Text style={{color:"#fff",fontWeight:"bold", fontSize:14}}>{data}</Text>
                            <Text style={{color:"#fff",fontWeight:"bold",fontSize:14, marginLeft:2}}>元</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    onSelect = () => {
        let {onClick,data} = this.props
        if (onClick) {
            onClick(data)
        }
    }

}