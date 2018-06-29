import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react/native'
import {indexBgColor,baseColor,width} from "../resouce/theme";
import PropTypes from 'prop-types'
import TCFlatList from "../../Common/View/RefreshListView/TCFLatList";
import TCImage from "../../Common/View/image/TCImage";
import {Other} from "../asset/drawable";


@observer
export default class GamePage extends Component {

    static propTypes ={
        datas:PropTypes.any,
        onClickItem:PropTypes.any,
        initNumRender:PropTypes.any
    }

    static  default={
        initNumRender:10
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {initNumRender} = this.props

        return (<TCFlatList
                itemSeparatorComponent={this.renderSepator}
                dataS={this.props.datas}
                initialNumToRender={initNumRender}
                listEmptyComponent={this.getNodataView}
                numColumns={2}
                renderRow={this.renderItemView}
            />)
    }

    renderSepator=()=>{
        return (<View
            style={{height: 1, backgroundColor: indexBgColor.mainBg, width: width}}/>)
    }


    getNodataView=()=> {
        return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Text>
                        游戏加载中...
                    </Text>
              </View>)
        // return <NoDataView
        //     ref='NoDataView'
        //     unNetwork={true}
        //     titleTip={'加载失败'}
        //     contentTip="服务器出错啦，请稍后再试~"
        //     btnTxt="重新加载"
        //     gotoDoing={() => {
        //         // this.loadData();
        //     }}
        // />
    }
    // _renderItem = ({item}) => (
    //     <MyListItem
    //         id={item.id}
    //         onPressItem={this._onPressItem}
    //         selected={!!this.state.selected.get(item.id)}
    //         title={item.title}
    //     />
    // );



    renderItemView=(item,index)=> {
        return (<TouchableOpacity onPress={()=>this.onItemClick(item)}><View style={{
            backgroundColor: baseColor.itemBg,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: width * 0.2,
            width: width * 0.5,
            height:130
        }}>
            <TCImage
                style={{
                    height: 100,
                    width: width * 0.46,
                }}
                resizeMode="contain"
                source={{uri: item.icon}}
                imgPlaceHolder={Other.mg_holder}
            />
            <Text style={{width: width * 0.46, textAlign: 'center', marginTop: 5}}>{item.name}</Text>
        </View>
        </TouchableOpacity>)
    }

    onItemClick=(item)=>{
        let {onClickItem}=this.props
        if(onClickItem){
            onClickItem(item)
        }
    }
}

