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
#import "SplashScreen.h"
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
  if(forJS == nil){
    forJS = YES;
  }
  [JDHelper resetLoadModleForJS:forJS];
}

+ (void)resetLoadModleForJS:(BOOL)forJS
{
  AppDelegate *deleagte = (AppDelegate *)[UIApplication sharedApplication].delegate;
  if(forJS){
      [deleagte reloadForJSRN];
  }else{
      [deleagte setLoadFromR1N1Model:forJS];
  }
}

RCT_EXPORT_METHOD(getEvaString:(RCTResponseSenderBlock)callback){
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *JD_eva = [defaults objectForKey:@"JD_eva"];
  if (!JD_eva) {
    JD_eva = @" ";
  }
  callback(@[[NSNull null], JD_eva]);
}

RCT_EXPORT_METHOD(hideSplash){
  [SplashScreen hide];
}

RCT_EXPORT_METHOD(getEvaKeyString:(NSString *)key back:(RCTResponseSenderBlock)callback) {
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *data = [defaults objectForKey:key];
  if (!data) {
    data = @" ";
  }
  callback(@[[NSNull null], data]);
}



@end
