'use-strict';
import React from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';

let {height, width} = Dimensions.get('window');

global.iOS = Platform.OS === 'ios';
global.Android = Platform.OS === 'android';
global.screenWidth = width;
global.screenHeight = height;
global.pixelRatio = PixelRatio.get();