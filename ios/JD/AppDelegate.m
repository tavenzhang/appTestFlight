//
//  JD
//
//  Created by Sam on 10/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import <CodePush/CodePush.h>
#import "RNUMConfigure.h"
#import <Bugly/Bugly.h>
#import "AppDelegate+JDBase.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <WebKit/WebKit.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.launchOptions = launchOptions;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
 // [self loadRootController];
  [self testLoadNative];
  [self.window makeKeyAndVisible];
  return YES;
}

-(void)testLoadNative{
  WKWebViewConfiguration * configuration = [[WKWebViewConfiguration alloc] init];
  [configuration.preferences setValue:@"TRUE" forKey:@"allowFileAccessFromFileURLs"];
  WKWebView * web = [[WKWebView alloc] initWithFrame:[UIScreen mainScreen].bounds configuration:configuration];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = web;
  NSString* url=[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"assets/src/page/web/gamelobby"];
  NSURL  *nsUrl = [NSURL fileURLWithPath:url];
  [web loadFileURL:nsUrl allowingReadAccessToURL:nsUrl];
  self.window.rootViewController = rootViewController;
  //NSURLRequest* request =[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://www.baidu.com"]];
  //[web loadRequest:request];
}
- (UIViewController *)rootController {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 替换换成壳的入口 返回一个controller
  UIViewController *nativeRootController = [[UIViewController alloc] init];
  nativeRootController.view.backgroundColor = [UIColor whiteColor];
  return nativeRootController;
}

+(NSArray *)getBBQArray {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 一定要返回一组正确请求地址
  
  return @[@"https://www.ba2d16.com",
           @"https://www.aa2d16.com",
           @"https://www.ca2d16.com"];
}


@end
