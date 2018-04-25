/**
 * Created by Sam on 31/05/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import React from 'react';
import {
    StyleSheet, Text, View, ListView, TouchableOpacity, Alert, Clipboard, Image, Platform, Modal,
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';

/**组件内部显示需要引入的类 */
import {agent} from '../../resouce/images';
import {width, Size, height, indexBgColor, agentCenter, buttonStyle} from '../../resouce/theme';

/** 外部关系组件 如 页面跳转用 */
import NetUitls from '../../../Common/Network/TCRequestUitls';
import {config} from '../../../Common/Network/TCRequestConfig';
import ModalDropdown from '../../../Common/View/ModalDropdown';
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';

@observer
export default class TCAgentAffCodeList extends React.Component {

    constructor(props) {
        super(props);
        this.stateModel = new StateModel();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this.loadDataFormNet();
    }

    render() {
        return (
            <View>
                {this.renderHeader()}
                {this.getContentView()}
                {this.updateAffCodeView()}
                <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay2 = component}/>
            </View>
        );
    }

    async _setClipboardContent(content) {
        Clipboard.setString(content);
        try {
            var t = await Clipboard.getString();
            if (content == t) {
                Toast.showShortCenter('邀请码复制成功\n' + content);
            }
        } catch (e) {
            JXLog(e);
        }
    }

    loadDataFormNet() {
        NetUitls.PostUrlAndParamsAndCallback(config.api.getAffiliatesList, {}, (data) => {
            if (this.refs['listView']) {
                this.refs['listView'].scrollTo({x: 0, y: 0, animated: true});
            }

            if (data && data.rs && data.content.datas) {
                this.stateModel.setDataSource(data.content.datas);
            } else {
                Toast.showShortCenter('网络异常');
            }
        });
    }

    deleteAffiliatesCode(rowData) {
        if (!rowData.id || rowData.id.length == 0) {
            return;
        }

        this._modalLoadingSpinnerOverLay2.show();
        NetUitls.DeleteHttpUrlAndParamsAndCallback(config.api.teamAffiliates, '' + rowData.id, (data) => {
            this._modalLoadingSpinnerOverLay2.hide();
            if (data && data.rs) {
                this.loadDataFormNet();
            } else {
                let toastString = '网络异常';
                if (data.message) {
                    toastString = data.message;
                }

                this.timer = setTimeout(() => {
                    Toast.showShortCenter(toastString);
                }, 500);
            }
        });
    }

    submitUpdateUserGroup() {
        if (this.stateModel.prizeGroup.length == 0) {
            Toast.showShortCenter('请选择返点!');
            return;
        }

        let params = {
            affCode: this.stateModel.user.affCode,
            status: this.stateModel.userStatus == 0 ? 'ON' : 'OFF',
            prizeGroup: this.stateModel.prizeGroup,
            memberType: this.stateModel.accountKind == 0 ? 'AGENT' : 'PLAYER'
        };
        NetUitls.PutUrlAndParamsAndCallback(config.api.teamAffiliates + "" + this.stateModel.user.id, params,
            (res) => {
                if (res.rs) {
                    this.setUpdateModalVisible();
                    this.loadDataFormNet();
                    this.timer = setTimeout(() => {
                        Toast.showShortCenter("修改成功!");
                    }, 600);
                } else {
                    if (res.message) {
                        Toast.showShortCenter(res.message);
                    }
                }
            }
        );
    }

    deleteAffCode(rowData) {
        Alert.alert('确定要删除这个邀请码吗？\n' + rowData.affCode, null,
            [{text: '删除', onPress: () => this.deleteAffiliatesCode(rowData)}, {text: '取消', onPress: () => null}]
        );
    }

    cancelButtonCall() {
        this.setUpdateModalVisible(false);
    }

    getPrizeGroupArray() {
        let arr = [];
        if (TCUSER_DATA.prizeGroup) {
            let p = 98;
            for (let a = TCUSER_DATA.prizeGroup; a >= 1800; a -= 2) {
                let str = '' + a + ' - ' + ((a / 2000) * 100).toFixed(2) + '% (赔率)';
                arr.push({prize: a, str: str});
                p -= 0.1;
            }
        }

        return arr;
    }

    setUpdateModalVisible() {
        this.stateModel.setShowUpdateModal(!this.stateModel.showUpdateModal);
    }

    onPressModifyAffCode(rowData) {
        this.stateModel.setUser(rowData);
        this.setUpdateModalVisible();
    }

    onPressShowGroupModal() {
        this.refs['groupModalDropDown'].show();
    }

    onSelect(value) {
        this.stateModel.setPrizeGroup(value.prize);
    }

    renderAccountKindsButton(title) {
        let image;
        let fuc;
        switch (title) {
            case '代理':
                image = this.stateModel.accountKind == 0 ? agent.typeOn : agent.type;
                fuc = () => {
                    this.stateModel.setAccountKind(0);
                };
                break;
            case '玩家':
                image = this.stateModel.accountKind == 1 ? agent.typeOn : agent.type;
                fuc = () => {
                    this.stateModel.setAccountKind(1);
                };
                break;
            case '启用':
                image = this.stateModel.userStatus == 0 ? agent.typeOn : agent.type;
                fuc = () => {
                    this.stateModel.setUserStatus(0);
                };
                break;
            case '禁用':
                image = this.stateModel.userStatus == 1 ? agent.typeOn : agent.type;
                fuc = () => {
                    this.stateModel.setUserStatus(1);
                };
                break;
        }

        return (
            <TouchableOpacity style={styles.accountKindsButton} onPress={fuc}>
                <Image source={image} style={styles.accountKindsImage}/>
                <Text style={styles.accountKindsText}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderDropDownRow(rowData) {
        return (<View style={styles.dropDownItem}><Text style={styles.dropDownItemText}>{rowData.str}</Text></View>);
    }

    renderRow(rowData) {
        return (
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => this._setClipboardContent(rowData.affCode)}>
                    <Text style={[styles.rowText, styles.rowAffCode]}>{rowData.affCode}</Text>
                </TouchableOpacity>
                <Text style={styles.rowText}>{rowData.memberType == 'AGENT' ? '代理' : '玩家'}</Text>
                <Text style={[styles.rowText, styles.rowRebate]}>{rowData.prizeGroup}</Text>
                <Text style={styles.rowText}>{rowData.status == 'ON' ? '启用' : '禁用'}</Text>
                <TouchableOpacity style={styles.operateButton} onPress={() => this.onPressModifyAffCode(rowData)}>
                    <View style={styles.operateContainer}><Text style={styles.operateText}>修改</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.operateButton} onPress={() => this.deleteAffCode(rowData)}>
                    <View style={styles.operateContainer}>
                        <Text style={[styles.operateText, styles.deleteText]}>删除</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    updateAffCodeView() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.stateModel.showUpdateModal}
                onRequestClose={() => this.setUpdateModalVisible()}
            >
                <View style={styles.modalStyle}>
                    <TouchableOpacity onPress={() => this.setUpdateModalVisible()}>
                        <View style={styles.transparentShelter}/>
                    </TouchableOpacity>
                    <KeyboardAvoidingScrollView
                        style={styles.modalMain}
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
                    >
                        <View style={styles.groupViewStyle}>
                            <Text style={[styles.groupText, styles.affCode]}>邀 请 码：</Text>
                            <View style={styles.affCodeContent}>
                                <Text style={styles.affCodeText}>{this.stateModel.user.affCode}</Text>
                                <TouchableOpacity
                                    style={styles.groupClose}
                                    activeOpacity={0.5}
                                    onPress={() => this.cancelButtonCall()}
                                >
                                    <Image source={agent.close} style={styles.closeImage} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.groupViewStyle}>
                            <Text style={styles.groupText}>用户类型：</Text>
                            {this.renderAccountKindsButton('代理')}
                            {this.renderAccountKindsButton('玩家')}
                        </View>
                        <View style={styles.groupViewStyle}>
                            <Text style={styles.groupText}>用户状态：</Text>
                            {this.renderAccountKindsButton('启用')}
                            {this.renderAccountKindsButton('禁用')}
                        </View>
                        <TouchableOpacity onPress={() => this.onPressShowGroupModal()}>
                            <View style={[styles.groupViewStyle, styles.rebateContainer]}>
                                <Text style={styles.groupText}>返 点：</Text>
                                <Text style={styles.rebateText}>
                                    {this.stateModel.prizeGroup ? this.stateModel.prizeGroup : ''}
                                </Text>
                                <ModalDropdown
                                    ref="groupModalDropDown"
                                    textStyle={styles.dropDownTxtStyle}
                                    options={this.getPrizeGroupArray()}
                                    style={styles.groupDropStyle}
                                    dropdownStyle={styles.groupDropDownStyle}
                                    renderRow={(rowData, rowID) => this.renderDropDownRow(rowData)}
                                    onSelect={(idx, value) => this.onSelect(value)}
                                >
                                    <Image source={agent.arrow} style={styles.groupImgStyle}/>
                                </ModalDropdown>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.submitUpdateContainer}>
                            <TouchableOpacity
                                style={styles.submitUpdateButton}
                                onPress={() => this.submitUpdateUserGroup()}
                            >
                                <Text style={styles.submitUpdateText}>确认修改</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingScrollView>
                </View>
            </Modal>
        );
    }

    getContentView() {
        if (this.stateModel.showEmpty) {
            return (<Text style={styles.noData}>{' 您没有任何邀请码'}</Text>);
        } else {
            return (
                <ListView style={styles.codeList}
                          ref="listView"
                          dataSource={this.ds.cloneWithRows(this.stateModel.dataSource.slice(0))}
                          renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData)}
                          enableEmptySections
                          removeClippedSubviews={false}
                          scrollRenderAheadDistance={20}
                />
            );
        }
    }

    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>邀请码</Text>
                <Text style={[styles.headerTitle, styles.titleTypeAndStatus]}>类型</Text>
                <Text style={[styles.headerTitle, styles.titleRebate]}>返点</Text>
                <Text style={[styles.headerTitle, styles.titleTypeAndStatus]}>状态</Text>
                <Text style={[styles.headerTitle, styles.titleOperation]}>操作</Text>
            </View>
        );
    }
}

class StateModel {
    @observable dataSource = [];
    @observable showEmpty = false;
    @observable showUpdateModal = false;
    @observable user = {};
    @observable prizeGroup = '';
    @observable accountKind = 0;
    @observable userStatus = 0;

    @action
    setDataSource(data) {
        this.dataSource = data;
        if (data.length > 0) {
            this.showEmpty = false;
        } else {
            this.showEmpty = true;
        }
    }

    @action
    setShowEmpty(value) {
        this.showEmpty = value;
    }

    @action
    setShowUpdateModal(shouldShowUpdate) {
        this.showUpdateModal = shouldShowUpdate;
    }

    @action
    setUser(user) {
        this.user = user;
        this.userStatus = user.status == 'ON' ? 0 : 1;
        this.accountKind = user.memberType == 'AGENT' ? 0 : 1;
        this.prizeGroup = user.prizeGroup;
    }

    @action
    setPrizeGroup(value) {
        this.prizeGroup = value;
    }

    @action
    setAccountKind(value) {
        this.accountKind = value;
    }

    @action
    setUserStatus(value) {
        this.userStatus = value;
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between',
        backgroundColor: indexBgColor.itemBg,
        width: width,
        marginBottom: 1,
    },
    headerTitle: {
        color: agentCenter.title,
        fontSize: Size.font14,
        fontWeight: 'bold',
        width: width * 0.3,
        textAlign: 'center',
    },
    titleTypeAndStatus: {
        width: width * 0.1,
    },
    titleRebate: {
        width: width * 0.12,
    },
    titleOperation: {
        width: width * 0.38,
    },
    noData: {
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        color: '#666666',
        marginTop: 20,
    },
    codeList: {
        height: height - 64 - 40,
        backgroundColor: indexBgColor.mainBg,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
        height: 50,
        backgroundColor: indexBgColor.itemBg,
    },
    rowText: {
        color: agentCenter.content,
        fontSize: Size.font14,
        width: width * 0.1,
        textAlign: 'center',
    },
    rowAffCode: {
        width: width * 0.3,
    },
    rowRebate: {
        width: width * 0.12,
    },
    operateButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: width * 0.19
    },
    operateContainer: {
        borderRadius: 10,
    },
    operateText: {
        color: agentCenter.btnAffCodeTxt,
        fontSize: Size.font14,
        width: width * 0.14,
        backgroundColor: agentCenter.updateBtnBg,
        textAlign: 'center',
        paddingVertical: 4,
    },
    deleteText: {
        backgroundColor: agentCenter.deleteBtnBg,
        marginRight: 5,
    },
    modalStyle: {
        justifyContent: 'flex-end',
    },
    transparentShelter: {
        height: height * 0.35,
        width: width,
        backgroundColor: 'rgba(52,52,52,0.5)',
    },
    modalMain: {
        backgroundColor: indexBgColor.itemBg,
        height: height * 0.65,
    },
    groupViewStyle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginLeft: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg,
    },
    groupText: {
        textAlign: 'center',
        color: agentCenter.title,
        fontWeight: 'bold',
        width: 100,
        fontSize: Size.font15,
    },
    affCode: {
        width: parseInt(0.285 * (width - 10)),
    },
    affCodeContent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        flexDirection: 'row',
    },
    affCodeText: {
        width: parseInt(0.5 * (width - 10)),
        fontSize: Size.font14,
        color: agentCenter.content,
    },
    groupClose: {
        width: parseInt((width - 10) * (1 - 0.285 - 0.5)),
        alignItems: 'flex-end',
        marginRight: 10,
    },
    closeImage: {
        width: 25,
        height: 25,
    },
    accountKindsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40,
        flexDirection: 'row',
        height: 80,
    },
    accountKindsImage: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    accountKindsText: {
        fontSize: Size.font15,
        color: agentCenter.content,
    },
    rebateContainer: {
        justifyContent: 'space-between',
    },
    rebateText: {
        fontSize: Size.font17,
        color: agentCenter.content
    },
    dropDownItem: {
        alignItems: 'center',
        margin: 15,
    },
    dropDownItemText: {
        fontSize: Size.font18,
        color: agentCenter.title,
    },
    dropDownView: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 4,
        margin: 10,
        paddingLeft: 10,
        marginTop: 0,
        backgroundColor: indexBgColor.mainBg,
        width: width * 0.95,
        borderColor: indexBgColor.itemBg,
        borderWidth: 0.5,
    },
    groupDropStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    groupDropDownStyle: {
        width: width * 0.9,
        height: height * 0.65 - 50 - 50 - 50 - 50,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 15,
        left: width * 0.1 / 2,
        backgroundColor: indexBgColor.mainBg,
    },
    dropDownTxtStyle: {
        color: agentCenter.title,
    },
    groupImgStyle: {
        width: 20,
        height: 20,
        marginRight: 30,
    },
    submitUpdateContainer: {
        alignItems: 'center',
    },
    submitUpdateButton: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20,
    },
    submitUpdateText: {
        color: buttonStyle.btnTxtColor,
        fontWeight: 'bold',
        fontSize: Size.large,
    },
});
