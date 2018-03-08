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

#import <CodePush/CodePush.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate (JDBase)

- (void)JD_OtherSDKInit{
  
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

- (void)resetRootViewController:(UIViewController *)newRootVC {
  [UIView transitionWithView:self.window duration:0.28 options:UIViewAnimationOptionTransitionCrossDissolve animations:^{
    [UIView setAnimationsEnabled:NO];
    if (self.window.rootViewController!=newRootVC) {
      self.window.rootViewController = newRootVC;
    }
    [UIView setAnimationsEnabled:[UIView areAnimationsEnabled]];
  } completion:nil];
}

- (void)testChange{
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC));
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    [self resetRootViewController:[self loadReactNativeController]];
    [self setLoadFromR1N1Model:YES];
  });
}

- (void)loadRootController{
  [self testChange];
  if(![self getLoadModel]){
    [self resetRootViewController:[self rootController]];
  }else{
    [self resetRootViewController:[self loadReactNativeController]];
  }
}

- (BOOL)getLoadModel{
  NSUserDefaults *defaults =[NSUserDefaults standardUserDefaults];
  BOOL appForJS = [[defaults objectForKey:@"JDAppFromR1N1"] boolValue];
  if (appForJS) {
    return YES;
  }
  return NO;
}

- (void)setLoadFromR1N1Model:(BOOL)loadFromR1N1
{
  NSUserDefaults *defaults =[NSUserDefaults standardUserDefaults];
  if (loadFromR1N1) {
    [defaults setObject:@"1" forKey:@"JDAppFromR1N1"];
  }else {
    [defaults setObject:@"0" forKey:@"JDAppFromR1N1"];
  }
  [defaults synchronize];
}

- (UIViewController *)loadReactNativeController{
  
  [self JD_OtherSDKInit];
  
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"TC168" initialProperties:nil launchOptions:self.launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  return rootViewController;
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

@end
