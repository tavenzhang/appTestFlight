import React, {Component, PropTypes,} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ListView,
    ScrollView
} from 'react-native'

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Dialog from '../../../Common/View/TipDialog'
import {Size, indexBgColor, listViewTxtColor, baseColor} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import ListRow from './view/TCUserBankRowView'
import BaseComponent from '../../Base/TCBaseComponent'
import Toast from '../../../Common/JXHelper/JXToast';
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import BankStore from "../../../Data/store/BankStore";

/**
 * 银行卡管理
 */
@observer
export default class TCUserBankManager extends Component {

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    bankStore = new BankStore();

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getBankListFromNet();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'银行卡管理'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack()
                    }}/>
                <ScrollView>
                    <View style={{backgroundColor: indexBgColor.itemBg}}>
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.bankStore.personBank.slice(0))}
                            renderRow={this.getRenderRow}
                            enableEmptySections={true}/>
                    </View>
                </ScrollView>
                <Dialog show={this.bankStore.showAddBankTip}
                        setModalVisible={() => this.gotoAddBank()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您没有添加银行卡还不能提现哦！'}
                        btnTxt={'现在就去'}/>
            </View>
        )
    }

    goBack() {
        Helper.popToBack()
    }

    /**
     * 跳转到添加银行界面
     */
    gotoAddBank() {
        this.bankStore.showAddBankTip = false;
        Helper.pushToAddBank()
    }

    getRenderRow(rowData) {
        return <ListRow
            bankName={rowData.bankName}
            bankNum={rowData.bankCardNo}
            bankId={rowData.id}
            bankCode={rowData.bankCode}/>;
    }

    /**
     * 获取用户银行卡列表
     */
    getBankListFromNet() {
        this.bankStore.initUserBank((res) => {
            if (res.status) {
                if (!this.bankStore.personBank || this.bankStore.personBank.length === 0) {
                    this.bankStore.showAddBankTip = true;
                }
            } else {
                Toast.showShortCenter(res.message);
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    addBankTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.large,
        marginLeft: 20,
        marginBottom: 5
    }, addBankStyle: {
        marginTop: 30,
        borderBottomColor: listViewTxtColor.content,
        borderBottomWidth: 1,
        marginBottom: 30,
        backgroundColor: indexBgColor.mainBg
    }
})
