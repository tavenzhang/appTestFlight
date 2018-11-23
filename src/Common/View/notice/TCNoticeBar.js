/**
 * Created by Sam on 16/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */
import React, {Component} from 'react';
import {Image, PixelRatio, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import MarqueeLabel from './MarqueeLabel'
import MarqueeLabel2 from './TCMarqueeLabel';
import JXHelper from '../../JXHelper/TCNavigatorHelper'

import {indexTxtColor, Size, width} from '../../../Page/resouce/theme'
import {Other} from "../../../Page/asset";

var px = PixelRatio.get()

export default class MyComponent extends Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        announcement: []
    };


    componentWillReceiveProps(nextProps) {

    }


    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                JXHelper.pushToNotice(this.props.announcement)

            }}>
                <Image source={Other.cardGame.homeNotice}
                       style={{marginLeft: 10, width: 25, height: 15}}/>
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
                    textStyle={{fontSize: Size.font14, color: 'white'}}
                    bgViewStyle={{backgroundColor: 'transparent'}}
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
        backgroundColor: 'transparent',
        height: 35,
        width: width,
        borderBottomColor: 'transparent',
        borderBottomWidth: TCLineW
    },
    label: {
        marginLeft: 3,
        marginRight: 5,
        color: indexTxtColor.noticeContent,
        marginTop: 5,
        fontSize: Size.font14,
        width: width,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    }, marqueeLabel: {
        flex: 1,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'transparent',
        width: width - 50,
        height: 40,
        fontSize: 15 * px,
        color: 'white',
    }
});
