/**
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../../../resouce/theme'

export default class TCAgentCommissionListRow extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>

                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.username}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.sumBetsTaskPeriod.toFixed(2)}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.agentCommission.toFixed(2)}</Text>
            </View>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    }, titleTxtStyle: {
        color: listViewTxtColor.title,
        textAlign: 'center',
        fontSize: Size.font14,
        marginTop: 6,
        width: width * 0.33,
        marginBottom: 6
    }
});