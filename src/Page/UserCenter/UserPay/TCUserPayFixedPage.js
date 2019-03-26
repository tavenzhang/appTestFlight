import React, {Component,} from 'react'

import {
    Alert,
    Clipboard,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    ListView, NativeModules, Platform
} from 'react-native'

import {
    baseColor,
    buttonStyle, height,
    indexBgColor,
    indexTxtColor,
    inputStyle,
    listViewTxtColor, payTxtColor, refreshColor,
    Size,
    width
} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import LoadingSpinnerOverlay from "../../../Common/View/LoadingSpinnerOverlay";
import JXHelper from "../../../Common/JXHelper/JXHelper";
import {userPay} from "../../asset/images";
import payHelper from './PayHelper'
import {ASSET_Images, ASSET_Theme} from "../../asset";
import TCImage from "../../../Common/View/image/TCImage";


/**
 * 银行充值
 */
export default class TCUserPayFixedPage extends Component {

    moneyData = []
    constructor(props) {
        super(props)
        this.moneyData = this.props.data.fixedAmount.slice(0);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <ScrollView style={[ASSET_Theme.gameUIStyle.subViewContainStye,{backgroundColor:"#3FCDFD"}]}>
                <View style={{paddingTop: 10, paddingLeft: 10, paddingBottom: 5, flexDirection: 'row',backgroundColor:"#3999CB"}}>
                    <Text style={styles.payTip}>请选择充值金额 (如有问题，请联系</Text>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}
                                      onPress={() => this.onlineService()}>
                        <Text style={[styles.payTip, {color: 'red'}]}>在线客服</Text>
                    </TouchableOpacity>
                    <Text style={styles.payTip}>)</Text>
                </View>
                {this.moneyData.length ? (
                    <ListView
                        ref="ListView"
                        contentContainerStyle={styles.listViewStyle}
                        dataSource={this.ds.cloneWithRows(this.moneyData)}
                        renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData)}
                        horizontal={false}
                        initialListSize={60}
                        removeClippedSubviews={false}
                        keyboardShouldPersistTaps={true}
                    />
                ) : this.getEmptyTip()}
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}
                    marginLeft={64}
                />
            </ScrollView>
        )
    }

    /**
     * 显示加载提示
     */
    showLoading() {
        this._partModalLoadingSpinnerOverLay.show()
    }

    /**
     * 隐藏加载提示
     */
    hideLoading() {
        this._partModalLoadingSpinnerOverLay.hide()
    }

    renderRow(rowData) {
        return (<TouchableOpacity
            style={styles.moneyStyle}
            onPress={() => {
                payHelper.money = rowData;
                this.showLoading();
                payHelper.applayPay(this.props.data.paymentType, null, () => {
                    this.hideLoading();
                })
            }}>
            <View>
                <TCImage source={ASSET_Images.gameUI.btnPayNormal} style={{width:80}}/>
                <View style={{
                    position: "absolute", alignItems: "center", justifyContent: "center", width: 80,
                    height: 40,
                }}>
                    <Text style={styles.moneyTxtStyle}>{rowData}元</Text>
                </View>
            </View>
        </TouchableOpacity>)
    }

    showBackTip() {
        Alert.alert('您确定退出充值吗？', '请确保已支付完成再退出!', [
            {
                text: '确定',
                onPress: () => {
                     payHelper.clearData();
                    NavigatorHelper.popToBack();
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            }
        ]);
    }

    /**
     * 当数据为空时提示
     * @returns {XML}
     */
    getEmptyTip() {
        return (
            <View style={styles.emptyTip}>
                <Image
                    source={userPay.noPayData} style={styles.payErrorImg}/>
                <Text style={{color: listViewTxtColor.content}}>该支付方式目前无法使用</Text>
                <Text style={{color: listViewTxtColor.content}}>敬请谅解!请选择其它支付方式!</Text>
            </View>
        )
    }



    onlineService() {
        TW_Store.gameUIStroe.showGusetView();
       // NavigatorHelper.pushToCustomService(JXHelper.getMenuIconsUrl('CUS_SERVICE'));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    moneyStyle: {
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
        marginTop: 10,
        margin:1
    },
    moneyTxtStyle: {
        color: "#8BCFCC",
        fontSize: Size.default,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    payTip: {
        color: "white",
        fontSize: Size.default,
    },
    listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: height+80,
        height: height,
    }, emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: indexBgColor.mainBg,
        height: height - 150
    }, payErrorImg: {
        height: 100,
        width: 100,
    },
})
