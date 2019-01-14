import React, {Component} from 'react';
import {View, Animated, Easing} from 'react-native';
import {Size} from '../../Page/resouce/theme'
/**系统 npm类 */
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

export default class MarqueeLabel extends Component {

    constructor(state) {
        super(state)
        this.state = {
            started: false
        }
        this.lastTimeStopValue = 0
    }

    componentWillMount() {
        this.animatedTransformX = new Animated.Value(0);
        this.bgViewWidth = 0;
        this.textWidth = 0;
        this.duration = 0;

        this.listener = RCTDeviceEventEmitter.addListener('needChangeAnimated', (state) => {
            this.animationState(state);
        })
        this.animatedTransformX.addListener((obj) => {
            if (obj.value != 0) {
                this.lastTimeStopValue = obj.value
            }
        })
    }

    animationState(state) {
        if (this.stateAnimation == state) return;
        this.stateAnimation = state;
        if (state == 'stop') {
            this.animatedTransformX.stopAnimation(()=> {
                if (this.lastTimeStopValue != 0) {
                    let duration = this.duration
                    this.lastAnimationDuration = duration - (-this.lastTimeStopValue + this.bgViewWidth) / this.props.speed * 1000
                    let toValueLast = this.lastTimeStopValue
                    // TW_Log('duration = '+ this.duration)
                    // TW_Log('lastAnimationDuration = '+ this.lastAnimationDuration)
                    // TW_Log('lastTimeStopValue = '+ this.lastTimeStopValue)
                    Animated.timing(this.animatedTransformX, {toValue: toValueLast, duration: 0, easing: Easing.linear}).start(() => {});
                }
            });
        } else {
            if (this.lastAnimationDuration > 0) {
                this.animate(this.lastAnimationDuration);
            } else {
                this.animate();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.animatedTransformX.removeAllListeners()
    }

    textOnLayout(e) {
        this.textWidth = e.nativeEvent.layout.width;
        if (this.bgViewWidth !== 0) {
            this.prepareToAnimate();
        }
    }

    bgViewOnLayout(e) {
        this.bgViewWidth = e.nativeEvent.layout.width;
        if (this.textWidth !== 0) {
            this.prepareToAnimate();
        }
    }

    prepareToAnimate() {
        const {duration, speed} = this.props;
        if (duration !== undefined) {
            this.duration = duration;
        } else if (speed !== undefined) {
            this.duration = ((this.bgViewWidth + this.textWidth) / speed) * 1000;
        }
        this.animate();
    }

    animate(durationLast) {

        if(!durationLast || durationLast == 0){
            this.animatedTransformX.setValue(this.bgViewWidth);
        }

        if (!this.state.started) {
            this.setState({
                started: true
            });
        }
        Animated.timing(this.animatedTransformX, {
            toValue: -this.textWidth,
            duration: durationLast?durationLast:this.duration,
            // useNativeDriver: true,
            easing: Easing.linear
        }).start((finished) => {
            this.lastAnimationDuration = 0
            if (finished.finished && this.stateAnimation != 'stop') {
                this.animate()
            }
        });
    }


    render() {
        const {
            children,
            text,
            bgViewStyle,
            textStyle,
            textContainerWidth = 10000,
            textContainerHeight = 35,
            textContainerStyle
        } = this.props;

        const {started} = this.state;
        return (
            <View
                style={{...styles.bgViewStyle, ...bgViewStyle}}
                onLayout={(event) => this.bgViewOnLayout(event)}
            >
                <View
                    style={{
                        ...styles.textContainerStyle,
                        width: textContainerWidth,
                        height: textContainerHeight,
                        opacity: started ? 1 : 0,
                        ...textContainerStyle
                    }}
                >
                    <Animated.Text
                        numberOfLines={1}
                        style={{
                            fontSize: Size.font16,
                            transform: [{translateX: this.animatedTransformX}],
                            ...textStyle
                        }}
                        onLayout={(event) => this.textOnLayout(event)}
                    >
                        {children || text || ' '}
                    </Animated.Text>
                </View>
            </View>
        );
    }
}

const styles = {
    bgViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
        backgroundColor: 'white'
    },
    textContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
};