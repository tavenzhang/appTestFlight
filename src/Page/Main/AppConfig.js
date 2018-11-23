import {configAppId,MyAppName,trendServer,appDomainBase} from '../resouce/appConfig'
export  default {
  appName: MyAppName,
  clientId: configAppId,
  trendChartDomains: trendServer,
  allowFontScaling: true,
  domains: [
    appDomainBase.base1,
    appDomainBase.base2,
    appDomainBase.base3
  ],
  backupDomains: [
    appDomainBase.base4,
    appDomainBase.base5,
    appDomainBase.base6
  ]
}
