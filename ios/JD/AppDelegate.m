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
  nativeRootController.view.backgroundColor = [UIColor yellowColor];
  return nativeRootController;
}

+(NSArray *)getBBQArray {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 一定要返回一组正确请求地址
  return @[@"http://192.168.1.23:8866",
           @"http://192.168.1.24:8866",
           @"http://192.168.1.25:8866",
           @"http://192.168.1.26:8866",
           @"http://192.168.1.27:8866",
           @"http://192.168.1.28:8866",
           @"http://192.168.1.29:8866",
           @"http://192.168.1.30:8866",
           @"http://192.168.1.31:8866"];
}





@end
