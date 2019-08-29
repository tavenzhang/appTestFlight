/**
 * Created by Allen on 2017/1/2.
 * Copyright © 2016年 JX. All rights reserved.
 */
var TCServerDomains = null
var TCDefaultDomain = null
var TCDefaultTendDomain = null
var TCUSER_DATA = {}
var TCUSER_BALANCE = 0
var TCGameSetting = {}
var TCHomeContents = {}
var TCUSER_DEVICE_TOKEN = 0
var TCPUSH_TO_LOGIN = false
var TC_LOGINED_USER_NAME = []
var TCUSER_COLLECT = []
var TCUSER_COLLECTS = []
var TCUSER_ICON_BGCOLOR = '#333333'
var TC_BUTTON_SOUND_STATUS = true
var TC_NEW_MSG_COUNT = 0
var TC_DEFAULT_AFFCODE = null
var TC_FEEDBACK_COUNT = 0
var TC_ANDROID_DEVICE_IS_ROOT=false;
var TC_ANDROID_CAN_SHOW_INTELLIGENCE_BET=false;
var JXCodePushServreUrl = '';
var JXAPPVersion = '';

// APP全局状态
var TC_AppState = {
  selectedTabName:'home',
  appRoute:'home',
}

global.TCServerDomains = TCServerDomains;
global.TCUSER_DATA = TCUSER_DATA;
global.TCUSER_BALANCE = TCUSER_BALANCE;
global.TCGameSetting = TCGameSetting;
global.TCDefaultDomain = TCDefaultDomain;
global.TCDefaultTendDomain = TCDefaultTendDomain;
global.TCHomeContents = TCHomeContents;
global.TCUSER_DEVICE_TOKEN = TCUSER_DEVICE_TOKEN;
global.TCPUSH_TO_LOGIN = TCPUSH_TO_LOGIN;
global.TC_LOGINED_USER_NAME = TC_LOGINED_USER_NAME;
global.TCUSER_COLLECT = TCUSER_COLLECT;
global.TCUSER_COLLECTS = TCUSER_COLLECTS;
global.TC_BUTTON_SOUND_STATUS = TC_BUTTON_SOUND_STATUS;
global.TC_NEW_MSG_COUNT = TC_NEW_MSG_COUNT;
global.TC_DEFAULT_AFFCODE = TC_DEFAULT_AFFCODE;
global.TC_FEEDBACK_COUNT = TC_FEEDBACK_COUNT;
global.TC_ANDROID_DEVICE_IS_ROOT=TC_ANDROID_DEVICE_IS_ROOT;
global.TC_ANDROID_CAN_SHOW_INTELLIGENCE_BET=TC_ANDROID_CAN_SHOW_INTELLIGENCE_BET;
global.TC_AppState = TC_AppState;
global.JXCodePushServerUrl = JXCodePushServreUrl;
global.JXAPPVersion = JXAPPVersion;
global.TCUSER_ICON_BGCOLOR = TCUSER_ICON_BGCOLOR;