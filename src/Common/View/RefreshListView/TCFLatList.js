
import React from 'react';
import {
    View,
    FlatList,
    Text,
} from 'react-native'

import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

//轻量级的Flat list 用于替换普通的 listView ， 如果需要 上拉 下拉 处理，请使用refreshList
@observer
export default class TCFlatList extends React.Component {
    static propTypes = {
        renderRow: PropTypes.func,
        renderHeader: PropTypes.func,
        getItemLayout: PropTypes.any,
        keyExtractor: PropTypes.any,
        pageSize: PropTypes.any,
        initialNumToRender: PropTypes.number,
        style: PropTypes.any,
        styleContain: PropTypes.any,
        dataS: PropTypes.any,
        extraData: PropTypes.any,
        isHorizon:PropTypes.bool,
        refreshControl:PropTypes.any,
        numColumns:PropTypes.any,
        listEmptyComponent:PropTypes.any,
        itemSeparatorComponent:PropTypes.any,
        onScroll:PropTypes.any,
    }

    static defaultProps = {
        pageSize: 14,
        initialNumToRender: 10,
        extraData: null,
        isHorizon:false,
        numColumns:1,
        dataS:[]
    }


    _keyExtractor = (item, index) => index;

    _onRendRow = ({item, index}) => {
        let {renderRow} = this.props;
        return renderRow(item, index)
    }

    scrollToEnd=()=>{
        this.refs.list.scrollToEnd({animated:true})
    }

    scrollToTop =()=> {
        this.refs.list. scrollToIndex({index:0,animated:true})
    }

    scrollToOffset =(offset)=>{
        this.refs.list.scrollToOffset(offset)
    }

    /*
    * 对于固定高度的listItem 可以优化性能
    * */
    // getItemLayout={(data, index) => (
    //     // 120 是被渲染 item 的高度 ITEM_HEIGHT。
    //     {length: 120, offset: 120 * index, index}
    // )}

    render() {
        let {dataS,isHorizon,listEmptyComponent,itemSeparatorComponent,numColumns,
            renderHeader,refreshControl, onFootFlush,renderFooter,extraData,
            getItemLayout, keyExtractor, initialNumToRender,style, styleContain,onScroll,showsVerticalScrollIndicator = true} = this.props;

        return (
                <FlatList
                    style={[style]}
                    contentContainerStyle={styleContain}
                    horizontal={isHorizon}
                    ref={"list"}
                    getItemLayout={getItemLayout}
                    data={dataS}
                    extraData={extraData}
                    numColumns={numColumns}
                    ItemSeparatorComponent={itemSeparatorComponent}
                    renderItem={this._onRendRow}
                    keyExtractor={keyExtractor ? keyExtractor : this._keyExtractor}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={onFootFlush}
                    onEndReachedThreshold={0.3}
                    ListEmptyComponent={listEmptyComponent}
                    initialNumToRender={initialNumToRender}
                    refreshControl={refreshControl}
                    onScroll={onScroll}
                    scrollEventThrottle = {100}
                    showsVerticalScrollIndicator = {showsVerticalScrollIndicator}
                />
        );
    }


}


