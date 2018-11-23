/**
 * Created by Allen on 2017/1/2.
 * Copyright © 2016年 JX. All rights reserved.
 */
var TCServerDomains = null
var TCDefaultDomain = 'http://192.168.1.93:7500'
var TCDefaultTendDomain = null
var TCGameSetting = {}
var TCHomeContents = {}
var JXCodePushServerUrl = '';
var JX_ProjectName = 'JD';
// APP全局状态
var TC_AppState = {
    selectedTabName: 'home',
    appRoute: 'home',
}

global.TCServerDomains = TCServerDomains;
global.TCGameSetting = TCGameSetting;
global.TCDefaultDomain = TCDefaultDomain;
global.TCDefaultTendDomain = TCDefaultTendDomain;
global.TCHomeContents = TCHomeContents;
global.TC_AppState = TC_AppState;
global.JXCodePushServerUrl = JXCodePushServerUrl;
global.JX_ProjectName = JX_ProjectName;