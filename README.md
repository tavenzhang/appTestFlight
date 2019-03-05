
#### 说明

### 1、热更新相关信息
第一处 跟上一个版本的该文件一样保持不变：
`AppConfig.js`
{
  appName: '106彩票',
  clientId: '7',
  trendChartDomains: 'http://trend.106caipiao.com',
  allowFontScaling: true,
  domains: [
    'https://www.xiyiji923.com',
    'https://www.shouye032.com',
    'https://www.ganxidian892.com'
  ],
  backupDomains: [
    'https://www.wangzhe789.com',
    'https://www.shouye032.com',
    'https://www.zhuceliang324.com'
  ]
} 
里面的信息会整合好共享给你们，若有更新会及时通知

### 2、AppDelegate
`AppDelegate.h`
static NSString * const JDNight = @"night"; // 这里等与night就只会加载上架壳 上线前请改成其他任意字符串

`AppDelegate.m`
//这个方法返回 热更新开关的域名 不同厅主的开关域名不一样
```objective-c
+(NSArray *)getBBQArray {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 一定要返回一组正确请求地址
  return @[@"https://www.c-3.cc",
           @"https://www.c-6.cc",
           @"https://www.c-8.cc"];
}
```

我们会以该接口返回的bbq字段 含有 @"SueL" 字符作为已开启APP的标志 请求参数包括：appId、版本号、设备类型
如需修改 可以在 AppDelegate+JDBase.m 中修改
demo配置示例接口：
https://www.c-8.cc/code/user/apps?appId=com.998.p1&version=2.0.14&appType=IOS

运行说明: 
基于RN 0.53 版本搭建
初次运行前先执行一次`JDInit`脚本 之后如果不报错就不需要执行


https://gitlab.mtgogo.online/Zhang/BBL_Game.git
博博乐 app 部分代码，主要用与app与html通信。webView 性能优化，游戏页面显示

https://gitlab.mtgogo.online/Zhang/BBL_Game_Config.git
博博乐 多平台配置config文件，方便多个平台部署。一般使用develop 分支

https://gitlab.mtgogo.online/Zhang/BBL_Game_Lobby.git
博博乐 大厅html5 代码。基于laya引擎，与app 通过postMessage 进行通信 






