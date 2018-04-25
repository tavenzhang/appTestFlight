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
import  ListRow from './view/TCUserBankRowView'
import BaseComponent from '../../Base/TCBaseComponent'
import Toast from '@remobile/react-native-toast';
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
/**
 * 银行卡管理
 */
@observer
export default class TCUserBankManager extends BaseComponent {

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    stateModel = new StateModel()

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({
            renderPlaceholderOnly: true,
        });
        this.getBankListFromNet();
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.listener = RCTDeviceEventEmitter.addListener('userBankChange', () => {
            this.getBankListFromNet();
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
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
                            dataSource={this.ds.cloneWithRows(this.stateModel.bankList.slice(0))}
                            renderRow={this.getRenderRow}
                            enableEmptySections={true}/>
                    </View>
                </ScrollView>
                <Dialog show={this.stateModel.tipShow}
                        setModalVisible={() => this.gotoAddBank()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您没有添加银行卡还不能提现哦！'}
                        btnTxt={'现在就去'}/>
            </View>
        )
    }

    goBack() {
        RCTDeviceEventEmitter.emit('balanceChange')
        this.props.navigator.pop()
    }

    /**
     * 跳转到添加银行界面
     */
    gotoAddBank() {
        this.stateModel.setDialogVisible();
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
        NetUtils.getUrlAndParamsAndCallback(config.api.userCards, null, (res) => {
            if (res.rs) {
                this.stateModel.bankList = res.content
                JXLog('bank:' + res.content)
                if (this.stateModel.bankList && this.stateModel.bankList.length === 0) {
                    this.stateModel.setDialogVisible();
                }
            } else {
                if (res.status === 401) {
                    Toast.showShortCenter('登录状态过期，请重新登录!')
                } else {
                    if (res.status === 500) {
                        Toast.showShortCenter("服务器出错啦!")
                    } else {
                        if (res.message) {
                            Toast.showShortCenter(res.message)
                        }
                    }
                    this.goBack()
                }
            }
        })
    }
}

class StateModel {
    @observable
    bankList = []
    @observable
    tipShow = false

    /**
     * 显示/隐藏提示对话框
     */
    @action
    setDialogVisible() {
        this.tipShow = !this.tipShow
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