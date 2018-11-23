/**
 * Created by Allen on 2017/2/21.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import _ from 'lodash';
import {betHome, Size} from '../../../../resouce/theme'
import {betIcon} from '../../../../asset/images'

export default class TCcqsscPositionView extends Component {

    // 构造函数
    constructor(props) {

        super(props)
        this.state = {
            checkList: this.props.checkedList
        }
    }

    static defaultProps = {
        checkedList: [],
        checkedChangeCallback: null,
        positionArr: []
    };


    render() {
        return (
            <View style={styles.container}>
                {this.getContentView()}
            </View>
        )
    }

    getContentView() {

        let positionArr = this.props.positionArr

        let viewArr = []

        if (this.state.checkList == null) return

        for (var i = positionArr.length - 1; i >= 0; i--) {

            let checked = false
            for (var j = 0; j < this.state.checkList.length; j++) {
                if (i === this.state.checkList[j]) {
                    checked = true
                    continue
                }
            }
            viewArr.push(<TCSelectView
                index={i}
                key={i}
                isChecked={checked}
                title={positionArr[i]}
                changeCheck={(i, isAdd)=> {
                    this.changeCheked(i, isAdd)
                }}

            />)
        }

        return viewArr
    }

    changeCheked(i, isAdd) {
        let arr = this.state.checkList.concat()
        if (isAdd) {
            arr.push(i)
            this.setState({
                checkList: arr
            })
        } else {
            arr.remove(i)
            this.setState({
                checkList: arr
            })
        }
        if (this.props.checkedChangeCallback === null) return
        this.props.checkedChangeCallback(arr)
    }

    _resetCheked(checkList) {
        JXLog(checkList)
        this.setState({checkList: checkList})
    }
}

class TCSelectView extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        isChecked: false,
        title: '',
        index: 0,
    };

    componentWillReceiveProps() {
    }

    render() {
        return (
            <TouchableOpacity onPress={()=> {
                this.changeCheck()
            }}>
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 20, alignItems: 'center'}}>
                    { this.props.isChecked ? ( <Image
                        source={betIcon.check}
                        style={styles.agreeStyle}
                        resizeMode={'contain'}
                    />) : <Image
                        source={betIcon.unCheck}
                        style={styles.agreeStyle}
                        resizeMode={'contain'}
                    />
                    }
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    changeCheck() {
        let checked = this.props.isChecked
        this.props.changeCheck(this.props.index, !checked)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: betHome.betMidBg,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    }, agreeStyle: {
        width: 30,
        height: 30,
    },
})