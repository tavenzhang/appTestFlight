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

@implementation AppDelegate (JDBase)

- (void)JDInit{
  // 极光推送
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  [JPUSHService setupWithOption:self.launchOptions appKey:@"您的 App Key"
                        channel:nil apsForProduction:true];
  
  // 友盟统计
  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"您的 App Key" channel:@"App Store"];
  
  //talkingData
  [TalkingData sessionStarted:@"您的 App ID" withChannelId:@"渠道 ID"];
  
  //腾讯bugly
  BuglyConfig * config = [[BuglyConfig alloc] init];
  // 设置自定义日志上报的级别，默认不上报自定义日志
  config.reportLogLevel = BuglyLogLevelWarn;
  config.blockMonitorEnable = YES;
  config.blockMonitorTimeout = 1.5;
  [Bugly startWithAppId:@"您的 App ID" config:config];
}

// 切换UIViewController
- (void)restoreRootViewController:(UIViewController *)newRootController {
  
  [UIView transitionWithView:self.window duration:0.25 options:UIViewAnimationOptionTransitionCrossDissolve animations:^{
    BOOL oldState = [UIView areAnimationsEnabled];
    [UIView setAnimationsEnabled:NO];
    if (self.window.rootViewController!=newRootController) {
      self.window.rootViewController = newRootController;
    }
    [UIView setAnimationsEnabled:oldState];
  } completion:nil];
}




// 极光推送
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

@end
