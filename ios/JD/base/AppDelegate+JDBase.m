//
//  AppDelegate+JDBase.m
//  JD
//
//  Created by Sam on 06/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import "AppDelegate+JDBase.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import "RNUMConfigure.h"
#import <Bugly/Bugly.h>
#import "TalkingData.h"
#import "JDHelper.h"
#import <CodePush/CodePush.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "AFNetworking.h"
#import "WTSafeGuard.h"
#import <UMShare/UMShare.h>

// 特殊标识字符
static NSString * const JDSpecialStr = @"SueL";
static Boolean  IsFirtReuest = YES;
@implementation AppDelegate (JDBase)

//- (BOOL)getLoadModel{
//  return YES;
//  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
//  BOOL appForJS = [[defaults objectForKey:@"JD_AppFromR1N1"] boolValue];
//  if (appForJS) {
//    return YES;
//  }
//  return NO;
//}

//暂时不用这种方式了
//- (void)rquestHttpData{
//  NSArray *domainArray = [AppDelegate getBBQArray];
//  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
//  NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
//  NSString * bundleID = [infoDictionary objectForKey:@"CFBundleIdentifier"];
//  for (NSString *url in domainArray) {
//    [self starEngine:url andVersion:app_Version andBundleID:bundleID];
//  }
//}

//- (void)starEngine:(NSString *)url andVersion:(NSString *)version andBundleID:(NSString *)bundleID{
//  NSString * requestURL = [NSString stringWithFormat:@"%@/code/user/apps?appId=%@&version=%@&appType=IOS",url,bundleID,version];
//  AFHTTPSessionManager * manager =[AFHTTPSessionManager manager];
//  manager.requestSerializer.timeoutInterval = 15.f;
//  [manager GET:requestURL parameters:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, NSDictionary * responseObject) {
//    if(IsFirtReuest&&responseObject){
//      IsFirtReuest = NO;
//       NSLog(@"responseObject-----%@-----IsFirtReuest--",responseObject);
//       [self resetAppKeyWithDictionary:responseObject];
//       [self JD_OtherSDKInit];
//    }
// //   NSLog(@"responseObject-----%@-------",responseObject);
////    if (!self.isLoadForJS && responseObject && ![self isBlankString:responseObject[@"bbq"]] && [responseObject[@"bbq"] containsString:JDSpecialStr]) {
////      [self resetAppKeyWithDictionary:responseObject];
////     // [self loadReactNativeController];
////    }
//  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
//  }];
//}
//
//- (BOOL)isBlankString:(NSString *)aStr {
//  if (!aStr) {
//    return YES;
//  }
//  if ([aStr isKindOfClass:[NSNull class]]) {
//    return YES;
//  }
//  NSCharacterSet *set = [NSCharacterSet whitespaceAndNewlineCharacterSet];
//  NSString *trimmedStr = [aStr stringByTrimmingCharactersInSet:set];
//  if (!trimmedStr.length) {
//    return YES;
//  }
//  return NO;
//}

- (void)resetRootViewController:(UIViewController *)newRootVC {
  [UIView transitionWithView:self.window duration:0.28 options:UIViewAnimationOptionTransitionCrossDissolve animations:^{
    [UIView setAnimationsEnabled:YES];
    if (self.window.rootViewController!=newRootVC) {
      self.window.rootViewController = newRootVC;
      [self.window makeKeyAndVisible];
    }
    [UIView setAnimationsEnabled:[UIView areAnimationsEnabled]];
  } completion:nil];
}

- (void)loadRootController{
  [WTSafeGuard startSafeGuardWithType:WTSafeGuardType_NilTarget| WTSafeGuardType_Foundation|WTSafeGuardType_KVO|WTSafeGuardType_Timer|WTSafeGuardType_MainThreadUI];
    self.isLoadForJS = YES;
   // [self rquestHttpData];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    [self loadReactNativeController];
    rootViewController.view = self.rootView;
    rootViewController.view.backgroundColor = [UIColor whiteColor];
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
//    [self JD_OtherSDKInit];
}

- (void)loadReactNativeController{
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [NSURL URLWithString:@"http://192.168.4.249:8081/index.bundle?platform=ios&dev=true"];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"BBL" initialProperties:nil launchOptions:self.launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.rootView  = rootView;
}

- (void)reloadForJSRN{
  if (self.isLoadForJS) {
    return;
  }
  self.isLoadForJS = YES;
  dispatch_async(dispatch_get_main_queue(), ^{
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = self.rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
  });
}

- (void)setLoadFromR1N1Model:(BOOL)loadFromR1N1
{
  NSUserDefaults *defaults =[NSUserDefaults standardUserDefaults];
  if (loadFromR1N1) {
    [defaults setObject:@"1" forKey:@"JD_AppFromR1N1"];
  }else {
    [defaults setObject:@"0" forKey:@"JD_AppFromR1N1"];
  }
  [defaults synchronize];
}


-(bool)isNotExist:(NSString*)data{
  return data == nil || [data isEqualToString:@""]||[data isEqual:[NSNull null]];
}

//- (void)JD_OtherSDKInit{
//  NSDictionary *tempInfoDict = [[NSBundle mainBundle] infoDictionary];
//  NSString *ukey = [tempInfoDict objectForKey:@"UmengKey"];
//  NSString *jkey  = [tempInfoDict objectForKey:@"JPushKey"];
//  NSString *channel = [tempInfoDict objectForKey:@"Channel"];
//  NSString *tkey = [tempInfoDict objectForKey:@"tkey"];
//  NSString *bkey = [tempInfoDict objectForKey:@"bkey"];
//  // 极光推送
//  if(![self isNotExist:jkey]){
//    NSLog(@"JD_OtherSDKInit---value %d",![self isNotExist:jkey]);
//    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
//    entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
//    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
//    [JPUSHService setupWithOption:self.launchOptions appKey:jkey
//                          channel:nil apsForProduction:true];
//  }
//  // 友盟统计
//  NSLog(@"JD_OtherSDKInit--ukey-%d",![self isNotExist:ukey]);
//  if(![self isNotExist:ukey]){
//    [UMConfigure setLogEnabled:YES];
//    [RNUMConfigure initWithAppkey:ukey channel:channel];
//  }
//  //talkingData
//    if(![self isNotExist:tkey]){
//        [TalkingData sessionStarted:tkey withChannelId:@"AppStore"];
//    }
//  //腾讯bugly
//    if(![self isNotExist:bkey]){
//      BuglyConfig * config = [[BuglyConfig alloc] init];
//      config.reportLogLevel = BuglyLogLevelWarn;
//      config.blockMonitorEnable = YES;
//      config.blockMonitorTimeout = 1.5;
//      [Bugly startWithAppId:bkey config:config];
//    }
//}

//- (void)resetAppKeyWithDictionary:(NSDictionary *)dic{
//  if (dic && [dic isKindOfClass:[NSDictionary class]]) {
//    [self setObject:dic[@"ukey"] forKey:@"JD_ukey"];
//    [self setObject:dic[@"tkey"] forKey:@"JD_tkey"];
//    [self setObject:dic[@"jkey"] forKey:@"JD_jkey"];
//    [self setObject:dic[@"bkey"] forKey:@"JD_bkey"];
//    [self setObject:dic[@"eva"] forKey:@"JD_eva"];
//    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
//    [defaults synchronize];
//  }
//}

- (void)setObject:(id)data forKey:(NSString *)key {
  if (key == nil || [key isEqualToString:@""]||[data isEqual:[NSNull null]] || [data isEqualToString:@""]) {
    return;
  }
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setObject:data forKey:key];
  [defaults synchronize];
}

- (void)registUMeng:(NSString *)ukey:(NSString *)channel{
  if(ukey.length > 0){
    [UMConfigure setLogEnabled:YES];
    [RNUMConfigure initWithAppkey:ukey channel:channel];
    [self configureUmengShare];
    // [self configUSharePlatforms];
  }
}

- (void)registAppPush:(NSString *)jkey:(NSString *)channel{
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
    JPUSHRegisterEntity *entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = UNAuthorizationOptionAlert | UNAuthorizationOptionBadge |
    UNAuthorizationOptionSound;
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  } else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    //可以添加自定义categories
    [JPUSHService
     registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge |
                                         UIUserNotificationTypeSound |
                                         UIUserNotificationTypeAlert)
     categories:nil];
  } else {
    // iOS 8以前 categories 必须为nil
    [JPUSHService
     registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge |
                                         UIRemoteNotificationTypeSound |
                                         UIRemoteNotificationTypeAlert)
     categories:nil];
  }
  [JPUSHService setupWithOption:self.launchOptions appKey:jkey
                        channel:channel apsForProduction:true];
}


#pragma mark 极光推送
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
  [JPUSHService handleRemoteNotification:userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  
  completionHandler(UNNotificationPresentationOptionAlert);
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  [JPUSHService handleRemoteNotification:userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
  
  completionHandler();
}
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:notification.userInfo];
}

#pragma mark UMShare 友盟分享
- (void)confitUShareSettings
{
  /*
   * 打开图片水印
   */
  //[UMSocialGlobal shareInstance].isUsingWaterMark = YES;
  /*
   * 关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
   <key>NSAppTransportSecurity</key>
   <dict>
   <key>NSAllowsArbitraryLoads</key>
   <true/>
   </dict>
   */
  //[UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
}

- (void)configureUmengShare
{
  NSArray *URLTypesArr = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleURLTypes"];
  /* 设置微信的appKey和appSecret */
  NSDictionary *AppSecretDic = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"AppSecret"];
  //NSLog(@"appId--api-:%@---api---%@" , appId,api);
  
  for(NSDictionary *urlTypes in  URLTypesArr){
    if([[urlTypes objectForKey:@"CFBundleURLName"] isEqualToString:@"weixin"]){
      NSArray *weixinKey = [urlTypes objectForKey:@"CFBundleURLSchemes"];
      [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:weixinKey.count > 0? weixinKey[0]:@"" appSecret:[AppSecretDic objectForKey:@"weixin"] redirectURL:@""];
      [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatTimeLine appKey:weixinKey.count > 0? weixinKey[0]:@"" appSecret:[AppSecretDic objectForKey:@"weixin"] redirectURL:@""];
    }
  }
  
  [self confitUShareSettings];
  
  
  /*
   * 移除相应平台的分享，如微信收藏
   */
  //[[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];
  /* 设置分享到QQ互联的appID
   * U-Share SDK为了兼容大部分平台命名，统一用appKey和appSecret进行参数设置，而QQ平台仅需将appID作为U-Share的appKey参数传进即可。
   */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1105821097"/*设置QQ平台的appID*/  appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置新浪的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"3921700954"  appSecret:@"04b48b094faeb16683c32669824ebdad" redirectURL:@"https://sns.whalecloud.com/sina2/callback"];
  //  /* 钉钉的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_DingDing appKey:@"dingoalmlnohc0wggfedpk" appSecret:nil redirectURL:nil];
  //  /* 支付宝的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_AlipaySession appKey:@"2015111700822536" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置易信的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_YixinSession appKey:@"yx35664bdff4db42c2b7be1e29390c1a06" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置点点虫（原来往）的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_LaiWangSession appKey:@"8112117817424282305" appSecret:@"9996ed5039e641658de7b83345fee6c9" redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置领英的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Linkedin appKey:@"81t5eiem37d2sc"  appSecret:@"7dgUXPLH8kA8WHMV" redirectURL:@"https://api.linkedin.com/v1/people"];
  //  /* 设置Twitter的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Twitter appKey:@"fB5tvRpna1CKK97xZUslbxiet"  appSecret:@"YcbSvseLIwZ4hZg9YmgJPP5uWzd4zr6BpBKGZhf07zzh3oj62K" redirectURL:nil];
  //  /* 设置Facebook的appKey和UrlString */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Facebook appKey:@"506027402887373"  appSecret:nil redirectURL:@"http://www.umeng.com/social"];
  //  /* 设置Pinterest的appKey */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Pinterest appKey:@"4864546872699668063"  appSecret:nil redirectURL:nil];
  //  /* dropbox的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_DropBox appKey:@"k4pn9gdwygpy4av" appSecret:@"td28zkbyb9p49xu" redirectURL:@"https://mobile.umeng.com/social"];
  //  /* vk的appkey */
  //  [[UMSocialManager defaultManager]  setPlaform:UMSocialPlatformType_VKontakte appKey:@"5786123" appSecret:nil redirectURL:nil];
}

- (void)registUMengShare:(NSString *)appId:(NSString *)api
{
  NSArray *URLTypesArr = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleURLTypes"];
  /* 设置微信的appKey和appSecret */
  NSDictionary *AppSecretDic = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"AppSecret"];
  //NSLog(@"appId--api-:%@---api---%@" , appId,api);
  if(appId.length>0&&api.length>0){
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:appId appSecret:api redirectURL:@""];
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatTimeLine appKey:appId appSecret:api redirectURL:@""];
  }else{
    for(NSDictionary *urlTypes in  URLTypesArr){
      if([[urlTypes objectForKey:@"CFBundleURLName"] isEqualToString:@"weixin"]){
        NSArray *weixinKey = [urlTypes objectForKey:@"CFBundleURLSchemes"];
        [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:weixinKey.count > 0? weixinKey[0]:@"" appSecret:[AppSecretDic objectForKey:@"weixin"] redirectURL:@""];
        [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatTimeLine appKey:weixinKey.count > 0? weixinKey[0]:@"" appSecret:[AppSecretDic objectForKey:@"weixin"] redirectURL:@""];
      }
    }
  }
  [self confitUShareSettings];
  
  
  /*
   * 移除相应平台的分享，如微信收藏
   */
  //[[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];
  /* 设置分享到QQ互联的appID
   * U-Share SDK为了兼容大部分平台命名，统一用appKey和appSecret进行参数设置，而QQ平台仅需将appID作为U-Share的appKey参数传进即可。
   */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1105821097"/*设置QQ平台的appID*/  appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置新浪的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"3921700954"  appSecret:@"04b48b094faeb16683c32669824ebdad" redirectURL:@"https://sns.whalecloud.com/sina2/callback"];
  //  /* 钉钉的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_DingDing appKey:@"dingoalmlnohc0wggfedpk" appSecret:nil redirectURL:nil];
  //  /* 支付宝的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_AlipaySession appKey:@"2015111700822536" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置易信的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_YixinSession appKey:@"yx35664bdff4db42c2b7be1e29390c1a06" appSecret:nil redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置点点虫（原来往）的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_LaiWangSession appKey:@"8112117817424282305" appSecret:@"9996ed5039e641658de7b83345fee6c9" redirectURL:@"http://mobile.umeng.com/social"];
  //  /* 设置领英的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Linkedin appKey:@"81t5eiem37d2sc"  appSecret:@"7dgUXPLH8kA8WHMV" redirectURL:@"https://api.linkedin.com/v1/people"];
  //  /* 设置Twitter的appKey和appSecret */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Twitter appKey:@"fB5tvRpna1CKK97xZUslbxiet"  appSecret:@"YcbSvseLIwZ4hZg9YmgJPP5uWzd4zr6BpBKGZhf07zzh3oj62K" redirectURL:nil];
  //  /* 设置Facebook的appKey和UrlString */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Facebook appKey:@"506027402887373"  appSecret:nil redirectURL:@"http://www.umeng.com/social"];
  //  /* 设置Pinterest的appKey */
  //  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Pinterest appKey:@"4864546872699668063"  appSecret:nil redirectURL:nil];
  //  /* dropbox的appKey */
  //  [[UMSocialManager defaultManager] setPlaform: UMSocialPlatformType_DropBox appKey:@"k4pn9gdwygpy4av" appSecret:@"td28zkbyb9p49xu" redirectURL:@"https://mobile.umeng.com/social"];
  //  /* vk的appkey */
  //  [[UMSocialManager defaultManager]  setPlaform:UMSocialPlatformType_VKontakte appKey:@"5786123" appSecret:nil redirectURL:nil];
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url];
  if (!result) {
    // 其他如支付等SDK的回调
  }
  return result;
}

@end
