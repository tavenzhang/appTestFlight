/**
 * Created by Sam on 16/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    PixelRatio,
    Animated,
    Easing,
    WebView
} from 'react-native';
var px = PixelRatio.get()
import MarqueeLabel from './MarqueeLabel'
import MarqueeLabel2 from './TCMarqueeLabel';
import JXHelper from '../../JXHelper/TCNavigatorHelper'

import {width, indexBgColor, indexTxtColor, Size} from '../../../Page/resouce/theme'
let noticeText = ''
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        announcement: []
    };


    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        noticeText = this.getTextWithAnnouncement()
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                JXHelper.pushToNotice(this.props.announcement)

            }}>
                <Text style={{
                    marginLeft: 8,
                    color: indexTxtColor.noticeTitle,
                    fontSize: Size.font12,
                    borderWidth: 1,
                    borderColor: indexTxtColor.noticeTitle,
                    borderRadius: 5,
                    paddingLeft: 6,
                    paddingRight: 6,
                    marginRight: 5,
                    paddingTop: 2,
                    paddingBottom: 2
                }}>公告</Text>
                {this.getMarquee()}
            </TouchableOpacity>
        );
    }

    getMarquee() {
        if (Platform.OS === 'ios') {
            return (
                <MarqueeLabel2
                    ref="marqueeLabel"
                    speed={30}
                    text={this.getTextWithAnnouncement()}
                    textContainerWidth={3000}
                    textContainerHeight={35}
                    textStyle={{fontSize: Size.font14, color: indexTxtColor.noticeContent}}
                    bgViewStyle={{backgroundColor: indexBgColor.noticeBg}}
                    textContainerStyle={{height: 35}}
                />
            )
        } else {
            return (<MarqueeLabel style={styles.marqueeLabel} scrollDuration={2.0}>
                {this.getTextWithAnnouncement()}
            </MarqueeLabel>)
        }
    }

    getTextWithAnnouncement() {
        let str = ''
        let l = this.props.announcement.length
        l = l > 2 ? 2 : l
        for (let i = 0; i < l; i++) {
            str += (this.props.announcement[i].content + ' ')
        }

        return str.replace('\n', '')
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: indexBgColor.noticeBg,
        height: 35,
        width: width,
        borderBottomColor: indexBgColor.mainBg,
        borderBottomWidth: TCLineW
    },
    label: {
        marginLeft: 3,
        marginRight: 5,
        color: indexTxtColor.noticeContent,
        marginTop: 5,
        fontSize: Size.font14,
        width: width,
        backgroundColor: 'white',
        overflow: 'hidden',
    }, marqueeLabel: {
        flex: 1,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: indexBgColor.noticeBg,
        width: width - 50,
        height: 40,
        fontSize: 15 * px,
        color: indexTxtColor.noticeContent,
    }
});
