/**
 * Created by Jason on 09/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */
import React, {Component, PropTypes,} from 'react'
import { View,Text } from 'react-native';

export const VerticalText = props => (
    <View style={{ flex: 1, flexDirection: 'column' ,alignItems:'center'}}>
            {props.string.split('').map((char) => <Text key={char} style={props.textStyle}>{char}</Text>)}
    </View>
);