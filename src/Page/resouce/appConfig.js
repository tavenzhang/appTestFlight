/**
 * Created by Sam on 18/02/2017.
 * Copyright © 2017年 JX. All rights reserved.
 *
 *
 *
 *
 *  *  106彩票  域名配置表
 *
 */
import React, {
    Platform
} from 'react-native';
//

//
// export const appDomainBase = {
// 	base1: 'https://www.xiyiji923.com',
// 	base2: 'https://www.ganxidian892.com',
// 	base3: 'https://www.dafafa939.com',
// 	base4: 'https://www.wangzhe789.com',
// 	base5: 'https://www.zhuceliang324.com',
// 	base6: 'https://www.shouye032.com',
// }

// export const configAppId = '7'
export const appDomainBase = {
    base1: 'http://192.168.1.93:7500',
    base2: 'http://192.168.12.23111:7500',
    base3: 'http://192.168.12.2411:7500',
    base4: 'http://192.168.1.93:7500',
    base5: 'http://192.168.12.2111:7500',
    base6: 'http://192.168.12.22311:7500',
}
export const configAppId = '31'

export const trendServer = 'http://trend.106caipiao.com'
export const MyAppName = '106彩票'

export const appHotFixUpdataServers = {
    base1: 'https://checkupdate.zeuspush.com',
    base2: 'https://checkupdate1.zeuspush.com',
    base3: 'https://checkupdate2.zeuspush.com',

    base4: 'https://checkupdate.106pushservice.com',
    base5: 'https://checkupdate1.106pushservice.com',
    base6: 'https://checkupdate2.106pushservice.com',
}

export const deploymentKey = Platform.OS === 'ios' ? 'xFrsnjytGR35uGox7jXFIZtkLCOd4ksvOXqog' : '';