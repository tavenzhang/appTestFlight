//
//  JDHelper.m
//  JD
//
//  Created by Sam on 10/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import "JDHelper.h"
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import "AppDelegate.h"
#import "AppDelegate+JDBase.h"
#import <AdSupport/AdSupport.h>
#import <CodePush.h>
#import <Crashlytics/Crashlytics.h>
@implementation JDHelper
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(screenShotSave)
{
  JDHelper *helper = [[JDHelper alloc] init];
  [helper sscreenShotSave];
}
- (void)sscreenShotSave{
  AppDelegate *delagete = (AppDelegate *)[UIApplication sharedApplication].delegate;
UIGraphicsBeginImageContextWithOptions(CGSizeMake(delagete.window.bounds.size.width, delagete.window.bounds.size.height), YES, 2);
  [[delagete.window layer] renderInContext:UIGraphicsGetCurrentContext()];
  UIImage *imag = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  CGImageRef ima =imag.CGImage;
  UIImage *sendImag = [UIImage imageWithCGImage:ima];
  UIImageWriteToSavedPhotosAlbum(sendImag, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
}

// 用来监听图片保存到相册的状况
- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo{
  if (error) {
  }else{
  }
  NSLog(@"%@",contextInfo);
}

RCT_EXPORT_METHOD(getPlatInfo:(RCTResponseSenderBlock)callback)
{
  NSDictionary *tempInfoDict = [[NSBundle mainBundle] infoDictionary];
  NSString *platId = [tempInfoDict objectForKey:@"PlatId"];
  NSString *channel = [tempInfoDict objectForKey:@"Channel"];
  NSString *affCode = [tempInfoDict objectForKey:@"Affcode"];
  NSMutableDictionary *dict = [NSMutableDictionary new];
  [dict setObject:platId forKey:@"PlatId"];
    [dict setObject:channel forKey:@"Channel"];
    [dict setObject:affCode forKey:@"Affcode"];
    NSString *jsonString = nil;
  if ([NSJSONSerialization isValidJSONObject:dict])
  {
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:&error];
    jsonString =[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    //NSLog(@"json data:%@",jsonString);
    if (error) {
      NSLog(@"Error:%@" , error);
    }else{
         callback(@[jsonString]);
    }
  }
}

RCT_EXPORT_METHOD(getAffCode:(RCTResponseSenderBlock)callback)
{
  NSString * str = [JDHelper getAffCode];
  callback(@[str]);
}


RCT_EXPORT_METHOD(startFarbic:(NSString*)key)
{
  [Crashlytics startWithAPIKey:key];
}


RCT_EXPORT_METHOD(getCodePushBundleURL:(RCTResponseSenderBlock)callback)
{
    //NSString * bundleAssetsPath =  [CodePush bundleAssetsPath];
    NSString* bundleURL=[[CodePush bundleURL] path];
    callback(@[bundleURL]);
}

+ (NSString *)getAffCode{
  NSDictionary *tempInfoDict = [[NSBundle mainBundle] infoDictionary];
  NSString *Affcode = [tempInfoDict objectForKey:@"Affcode"];
  return Affcode;
}

RCT_EXPORT_METHOD(openAppWith:(NSString *)eventId){
  if (eventId == nil || [eventId isKindOfClass:[NSNull class]]) {
    return;
  }
  [JDHelper openAppWithString:eventId];
}

+ (void)openAppWithString:(NSString *)appSc{
  NSURL *url  = [NSURL URLWithString:appSc];
  [[UIApplication sharedApplication] openURL:url];
}

RCT_EXPORT_METHOD(getAppIDFA:(RCTResponseSenderBlock)callback)
{
  NSString * str = [JDHelper getIdfa];
  callback(@[[NSNull null], str]);
}

+(NSString *)getIdfa{
  NSString *idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
  return idfa;
}

RCT_EXPORT_METHOD(resetLoadModleForJS:(BOOL)forJS){
  [JDHelper resetLoadModleForJS:forJS];
}
+ (void)resetLoadModleForJS:(BOOL)forJS
{
  AppDelegate *deleagte = (AppDelegate *)[UIApplication sharedApplication].delegate;
  [deleagte reloadForJSRN];
}

RCT_EXPORT_METHOD(getEvaString:(RCTResponseSenderBlock)callback){
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *JD_eva = [defaults objectForKey:@"JD_eva"];
  callback(@[[NSNull null], JD_eva]);
}

RCT_EXPORT_METHOD(startJPush:(NSString *)key
                  : (NSString *)channel) {
  AppDelegate *deleagte = (AppDelegate *)[UIApplication sharedApplication].delegate;
  [deleagte registAppPush:key :channel];
}

RCT_EXPORT_METHOD(startUMeng:(NSString *)key
                  : (NSString *)channel) {
  AppDelegate *deleagte = (AppDelegate *)[UIApplication sharedApplication].delegate;
  [deleagte registUMeng:key :channel];
}

RCT_EXPORT_METHOD(startUMengShare:(NSString *)appId
                  : (NSString *)api) {
  AppDelegate *deleagte = (AppDelegate *)[UIApplication sharedApplication].delegate;
  NSString* myAppid =@"";
  NSString* myApi=@"";
  if(appId&&appId.length>0){
    myAppid = appId;
  }
  if(api&&api.length>0){
    myApi = api;
  }
  [deleagte registUMengShare:appId:api];
}


RCT_EXPORT_METHOD(notification
                  : (NSString *)title
                  : (NSString *)body) {
  //1.创建本地通知
  UILocalNotification *localNote = [[UILocalNotification alloc] init];
  //2.设置通知显示的内容
  //设置通知发出的时间
  localNote.fireDate = [NSDate dateWithTimeIntervalSinceNow:1];
  //设置通知的内容
  localNote.alertBody = body;
  // 是否让上面的文字生效
  localNote.hasAction = YES;
  // 设置滑块显示的文字
  localNote.alertAction = @"BBL";
  //设置通知中心的标题
  localNote.alertTitle = title;
  // 设置通知的声音;
  localNote.soundName = @"default";
  //设置应用程序图标右上角的数字
  localNote.applicationIconBadgeNumber = 1;
   [[UIApplication sharedApplication] scheduleLocalNotification:localNote];
//  dispatch_async(dispatch_get_main_queue(), ^{
//    [[UIApplication sharedApplication] scheduleLocalNotification:localNote];
//  });

}

RCT_EXPORT_METHOD(setAgent
                  : (NSString *)agent) {
  static dispatch_once_t onceToken;
  
  dispatch_once(&onceToken, ^{
    
    UIWebView *tempWebView=[[UIWebView alloc] init];
    
    NSString *originUA = [tempWebView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
    
    NSString *newUA = [NSString stringWithFormat:@"%@ %@",originUA,agent];
    
    NSDictionary *dictionary = @{@"UserAgent":newUA};
    
    [[NSUserDefaults standardUserDefaults] registerDefaults:dictionary];
    
  });
}


@end
