import {configAppId,MyAppName,appDomainBase} from '../../config/appConfig'
export  default {
  appName: MyAppName,
  clientId: configAppId,
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
