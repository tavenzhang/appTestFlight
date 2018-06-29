'use-strict';
import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

export default class TabBarIcon extends React.Component {

    render() {
        return (
            <Image
                resizeMode={Image.resizeMode.contain}
                source={!this.props.focused ? this.props.normalIcon : this.props.pressedIcon}
                style={{width: 25, height: 25, tintColor: this.props.tintColor}}/>
        );
    }
}

TabBarIcon.propTypes = {
    focused: PropTypes.bool.isRequired,
    normalIcon: PropTypes.string.isRequired,
    pressedIcon: PropTypes.string.isRequired,
    tintColor: PropTypes.string.isRequired
}
