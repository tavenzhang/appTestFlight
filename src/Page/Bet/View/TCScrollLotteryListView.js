/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
} from 'react-native';

import TCListRowView from '../../../Common/View/TCLottertHistoryListRowView'
import _ from 'lodash';
import {config} from '../../../Common/Network/TCRequestConfig';
import NetUitls from '../../../Common/Network/TCRequestUitls'
import Toast from '../../../Common/JXHelper/JXToast';

var {width, height} = Dimensions.get('window');

export default class TCLotteryHistoryList extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefreshing: false,
            renderPlaceholderOnly: true,
            height:0
        };
        this.loadDataFormNet = this.loadDataFormNet.bind(this)
    }

    static defaultProps = {
        title: '',
        type: '',
        gameUniqueId: 'HF_CQSSC',
    };

    componentDidMount() {
        this.loadDataFormNet();
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={{height:this.state.height}}
                          ref="ListView1"
                          dataSource={this.state.dataSource}
                          renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                          removeClippedSubviews={false}
                          scrollRenderAheadDistance={20}
                />
            </View>
        );
    }

    open(){
        this.setState({height:height/3})
    }

    close(){
        this.setState({height:0})
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        return (
            <TCListRowView
                issue={rowData.uniqueIssueNumber}
                number={rowData.openCode}
                rowData={rowData}
                isFirstRow={rowID == 0 ? true : false}
            />
        )
    }

    loadDataFormNet() {
        NetUitls.getUrlAndParamsAndCallback(config.api.getHistoryList, this.props.gameUniqueId, (data)=> {

            if (this.refs['ListView1']) {
                this.refs['ListView1'].scrollTo({x: 0, y: 0, animated: true})
            }

            if (data && data.rs && data.content) {

                data.content = _.sortBy(data.content, function (item) {
                    return -item.uniqueIssueNumber;
                });

                if (data.content.length > 0) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data.content),
                        renderPlaceholderOnly: false
                    });
                } else {
                    this.setState({
                        renderPlaceholderOnly: false
                    })
                }
            } else {
                Toast.showShortCenter('网络异常')
            }
        });
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    }
});

