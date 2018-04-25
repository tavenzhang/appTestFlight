/**
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { agent } from '../../../../resouce/images';
import { Size, indexBgColor, width, height, listViewTxtColor } from '../../../../resouce/theme';
export default class TCAgentTeamListRow extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {};

    componentDidMount() {}

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#666666',
                            fontSize: Size.font14,
                            marginTop: 3,
                            width: width * 0.3,
                            marginBottom: 3,
                            textAlign: 'center'
                        }}
                    >
                        {this.props.rowData.username}
                    </Text>
                    <Text style={[{ width: width * 0.12 }, styles.titleTxtStyle]}>
                        {this.props.rowData.memberType === 'AGENT' ? '代 理' : '玩 家'}
                    </Text>
                    <Text style={[{ width: width * 0.12 }, styles.titleTxtStyle]}>{this.props.rowData.prizeGroup}</Text>
                    <Text style={[{ width: width * 0.21 }, styles.titleTxtStyle]}>
                        {this.props.rowData.teamMemberCount}
                    </Text>
                    <Text style={[{ width: width * 0.22 }, styles.titleTxtStyle]}>
                        {this.props.rowData.teamBalance}
                    </Text>
                    <Text style={[{ width: width * 0.22, marginLeft: width * 0.02 }, styles.titleTxtStyle]}>
                        {this.props.rowData.balance}
                    </Text>
                    <Text
                        style={[
                            styles.titleTxtStyle,
                            {
                                color: '#ff6666',
                                width: width * 0.21
                            }
                        ]}
                    >
                        {this.props.rowData.aggregateBets}
                    </Text>
                    <Text style={[{ width: width * 0.21 }, styles.titleTxtStyle]}>
                        {this.props.rowData.topupAggregateAmount}
                    </Text>
                    <Text style={[{ width: width * 0.21 }, styles.titleTxtStyle]}>
                        {this.props.rowData.withdrawAggregateAmount}
                    </Text>
                </View>
                {this.props.selectData &&
                this.props.selectData.userId == this.props.rowData.userId &&
                this.props.selectData.isSelected
                    ? this.getView()
                    : null}
            </View>
        );
    }

    getView() {
        return (
            <View style={styles.operateMain}>
                {this.getButton(
                    '下级',
                    this.props.rowData.teamMemberCount === 1 ? agent.agentSubordinateGray : agent.agentSubordinate,
                    () => {
                        this.props.juniorUser();
                    }
                )}

                {this.getButton('修改', this.props.tabs.length === 1 ? agent.agentlitre : agent.agentLitreGray, () => {
                    this.props.updateUser();
                })}

                {this.getButton('转账', agent.agentTransferGray, () => {
                    this.props.withDraw();
                })}

                {this.getButton('报表', agent.agentDetail, () => {
                    this.props.userDetail();
                })}
            </View>
        );
    }

    getButton(title, image, fuc) {
        return (
            <TouchableOpacity onPress={fuc}>
                <View style={styles.itemViewStyle}>
                    <Image source={image} style={{ width: 30, height: 30, marginBottom: 1 }} />

                    <Text style={{ fontSize: Size.font14, color: listViewTxtColor.title }}>{' ' + title + ' '}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 1,
        height: 50
    },
    titleTxtStyle: {
        color: '#666666',
        fontSize: Size.font14,
        marginTop: 3,
        marginBottom: 3,
        textAlign: 'center'
    },
    controlTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.font20,
        marginTop: 3,
        width: width * 0.17,
        marginBottom: 3,
        textAlign: 'center'
    },
    operateMain: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        backgroundColor: indexBgColor.mainBg
    },
    itemTxtStyle: {
        textAlign: 'center',
        width: width * 0.25
    },
    itemViewStyle: {
        width: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
