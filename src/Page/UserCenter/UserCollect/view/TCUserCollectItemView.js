import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import JXHelper from '../../../../Common/JXHelper/JXHelper'
import {Size, width, height, indexBgColor, listViewTxtColor, indexTxtColor} from '../../../resouce/theme'

export default class TCUserCollectItemView extends React.Component {

    constructor(state) {
        super(state);
        this.rowData = this.props.rowData
    }

    static defaultProps = {
        pushToEvent: null,
    };

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.rowData = nextProps.rowData
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.leftContainerStyle} onPress={() => {
                    this.buttonCall()
                }}>
                    {this.getImage()}
                    <View style={{marginLeft: 5, justifyContent: 'center', flex: 1, marginRight: 8} }>
                        <Text style={{color: listViewTxtColor.title, fontSize: Size.font16}} ellipsizeMode='tail'
                              numberOfLines={1}> {this.rowData.gameNameInChinese} </Text>
                        <Text style={{
                            color: indexTxtColor.cpDescription,
                            fontSize: width >= 375 ? Size.font14 : Size.font12,
                            marginTop: 5
                        }}
                              ellipsizeMode='tail'
                              numberOfLines={1}> {this.rowData.gameDescription} </Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.container} onPress={() => {
                        this.props.removeCollect(this.rowData.gameUniqueId)
                    }}>
                        <Text style={styles.txtStyle}>
                            取消收藏
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }

    getImage() {
        if (this.rowData && this.rowData.status && this.rowData.status == 'FORBIDDEN') {
            <Image
                source={{uri: this.rowData.status == 'FORBIDDEN' ? this.rowData.gameIconGrayUrl : this.rowData.gameIconUrl}}
                style={styles.leftImgStyle}/>
        } else {
            return <Image source={JXHelper.getGameIconWithUniqueId(this.rowData.gameUniqueId)}
                          style={styles.leftImgStyle}/>
        }
    }

    buttonCall = () => {
        if (this.props.pushToEvent == null) return
        this.props.pushToEvent(this.props.rowData);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 0.5,
        marginLeft: 0.5
    },
    leftImgStyle: {
        width: 60,
        height: 60,
        marginLeft: 8
    }, leftContainerStyle: {
        flexDirection: 'row',
        height: 90,
        width: width * 0.8,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 0.5,
        marginLeft: 0.5
    }, txtStyle: {
        color: listViewTxtColor.title,
        fontWeight: 'bold',
        fontSize: Size.default,
        marginRight: 5
    }
});