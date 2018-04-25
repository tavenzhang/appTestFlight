/**
 * 服务协议
 * Created by Allen on 2017/1/19.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import TopNavigationBar from '../../Common/View/TCNavigationBar'
import {Size} from '../../Page/resouce/theme'

export default class TCUserProtocol extends Component {
    constructor(state) {
        super(state)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'服务协议'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}/>
                <View style={styles.contentStyle}>
                    <Text style={{fontSize: Size.large}}>本公司只接受年龄已满18岁的注册用户。
                        本网欢迎全世界的客户，但部份地区或国家法律尚未明定在线博彩的合法性问题，
                        甚至某些地区或国家已明确规范在线博彩为非法行为。
                        凡于美国及菲律宾居住之人士，本公司一律不接受其帐户注册，
                        投注或任何财务上之交易，我们无意邀请任何人在这些地区或国家非法使用本服务平台。
                        使用者必需确定在您所居住的地区或国家使用在线博彩是否合法，并负完全的责任，
                        使用本服务之会员请遵守使用者当地法令之许可，
                        如有违反之情事恕非本公司之负责范围。</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }, contentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});