//
//  JD
//
//  Created by Sam on 10/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import "RNUMConfigure.h"
#import <Bugly/Bugly.h>
#import "AppDelegate+JDBase.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.launchOptions = launchOptions;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [self loadRootController];
  [self.window makeKeyAndVisible];
  return YES;
}

- (UIViewController *)rootController {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 替换换成壳的入口 返回一个controller
  UIViewController *nativeRootController = [[UIViewController alloc] init];
  nativeRootController.view.backgroundColor = [UIColor whiteColor];
  return nativeRootController;
}

+(NSArray *)getBBQArray {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 一定要返回一组正确请求地址
  return @[@"https://www.c-3.cc",
           @"https://www.c-6.cc",
           @"https://www.c-8.cc"];
}


@end
