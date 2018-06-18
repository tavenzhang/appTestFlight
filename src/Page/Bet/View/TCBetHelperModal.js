/**
 * Created by Sam on 2016/12/31.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Modal,
    Image,
    Platform,
    ImageBackground
} from 'react-native';
import JXHelperC from '../../../Common/JXHelper/TCInitHelper'
import TCUserCollectHelper from '../../../Common/JXHelper/TCUserCollectHelper'
import JXHelpers from '../../../Common/JXHelper/JXHelper'

let JXHelper = new JXHelperC()
let TCUserCollectHelpers = new TCUserCollectHelper()
import Toast from '../../../Common/JXHelper/JXToast';
import TCNavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import {betIcon} from '../../resouce/images'
import {Size} from '../../resouce/theme'
import {navbarHight} from '../../../Page/asset'

export default class TCBetHelperModal extends Component {
    constructor(state) {
        super(state)
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            isCollect: false
        }
    }

    static defaultProps = {
        selectedFunc: null,
        gameUniqueId: ''
    };

    componentDidMount() {
        if (TCUSER_DATA.islogin) {
            this.isCollectFromGameId()
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}
            >
                <TouchableHighlight onPress={() => {
                    this._setModalVisible(false)
                }} style={styles.modalBackgroundStyle} underlayColor='transparent'>
                    <ImageBackground
                        source={betIcon.topBg}
                        resizeMode={'stretch'}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: navbarHight - 6,
                            width: 120,
                            height: JXHelpers.checkHaveTrend(this.props.gameUniqueId) ? 265 : 215,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <TouchableHighlight underlayColor='transparent'
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 0,
                                                height: 58,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#f5f5f5'
                                            }}
                                            onPress={() => this.buttonCall(0)}>
                            <Text
                                style={{
                                    fontSize: Size.font16,
                                    fontWeight: 'bold',
                                    height: 50,
                                    marginTop: 40,
                                    color: '#585858'
                                }}>投注记录</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent'
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 0,
                                                height: 50,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#f5f5f5'
                                            }}
                                            onPress={() => this.buttonCall(1)}>
                            <Text
                                style={{
                                    fontSize: Size.font16,
                                    fontWeight: 'bold',
                                    height: 50,
                                    marginTop: 30,
                                    color: '#585858'
                                }}>开奖历史</Text>
                        </TouchableHighlight>
                        {this.getZST()}
                        <TouchableHighlight underlayColor='transparent'
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 0,
                                                height: 50,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#f5f5f5'
                                            }}
                                            onPress={() => this.buttonCall(2)}>
                            <Text
                                style={{
                                    fontSize: Size.font16,
                                    fontWeight: 'bold',
                                    height: 50,
                                    marginTop: 30,
                                    color: '#585858'
                                }}>玩法说明</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent'
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 0,
                                                height: 50
                                            }}
                                            onPress={() => this.buttonCall(3)}>
                            <Text style={{
                                fontSize: Size.font16,
                                fontWeight: 'bold',
                                height: 50,
                                marginTop: 30,
                                color: '#585858'
                            }}>{this.state.isCollect ? '取消收藏' : '收藏彩票'}</Text>
                        </TouchableHighlight>
                    </ImageBackground>
                </TouchableHighlight>
            </Modal>
        );
    }

    getZST() {
        if (JXHelpers.checkHaveTrend(this.props.gameUniqueId)) {
            return (<TouchableHighlight underlayColor='transparent'
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 0,
                                            height: 50,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#f5f5f5'
                                        }}
                                        onPress={() => {
                                            this._setModalVisible(false)
                                            TCNavigatorHelper.pushView(JX_Compones.TCWebTrendView, {
                                                game: this.props.gameUniqueId,
                                                title: '走势图'
                                            })
                                        }}>
                <Text
                    style={{
                        fontSize: Size.font16,
                        fontWeight: 'bold',
                        height: 50,
                        marginTop: 30,
                        color: '#585858'
                    }}>走势图</Text>
            </TouchableHighlight>)
        }

    }

    buttonCall(index) {
        this._setModalVisible(false)
        if (this.props.selectedFunc == null) return
        this.props.selectedFunc(index);
        if (index === 3) {
            if (TCUSER_DATA.islogin) {
                if (!JXHelper.isGuestUser()) {
                    // this.collectGame()
                    this.collectGameToServer()

                } else {
                    this.showShortCenterWithString('您是试玩账号不能收藏哦！')
                }
            } else {
                this.showShortCenterWithString('请您先登录，再收藏哦！')
            }
        }
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    isCollectFromGameId() {
        let gameUniqueId = this.props.gameUniqueId
        let isCollect = TCUserCollectHelpers.isCollected(gameUniqueId)
        this.setState({
            isCollect: isCollect
        })
    }

    collectGame() {
        let gameUniqueId = this.props.gameUniqueId
        if (this.state.isCollect) {
            TCUserCollectHelpers.removeCollect(gameUniqueId)
            this.showShortCenterWithString('已取消！')
        } else {
            let gameInfo = JXHelpers.getGameInfoWithUniqueId(gameUniqueId)
            if (gameInfo) {
                TCUserCollectHelpers.addCollect(gameInfo)
                this.showShortCenterWithString('已收藏！')
            } else {
                this.showShortCenterWithString('收藏失败！')
            }

        }
    }

    collectGameToServer() {
        let gameUniqueId = this.props.gameUniqueId
        if (!this.state.isCollect) {
            TCUserCollectHelpers.saveUserCollectsToServer(gameUniqueId, (res) => {
                if (res.rs) {
                    this.showShortCenterWithString('已收藏！')
                    this.setState({
                        isCollect: !this.state.isCollect
                    })
                } else {
                    this.showShortCenterWithString('收藏失败！')
                }
            })
        } else {
            TCUserCollectHelpers.cancelUserCollectsFromServer(gameUniqueId, (res) => {
                if (res.rs) {
                    this.setState({
                        isCollect: !this.state.isCollect
                    })
                    this.showShortCenterWithString('已取消！')
                } else {
                    this.showShortCenterWithString('取消失败！')
                }
            })
        }
    }

    showShortCenterWithString(str) {
        this.timer = setTimeout(() => {
            Toast.showShortCenter(str)
        }, 600)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginTop: 0,
    }
});
