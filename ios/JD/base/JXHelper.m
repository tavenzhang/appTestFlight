//
//  JXHelper.m
//  JD-Lottery
//
//  Created by Sam on 2018/9/18.
//  Copyright © 2018年 JD. All rights reserved.
//

#import "JXHelper.h"

@implementation JXHelper
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getAffCode:(RCTResponseSenderBlock)callback)
{
  NSString * str = [JXHelper getAffCode];
  callback(@[str]);
}

+ (NSString *)getAffCode{
  NSDictionary *tempInfoDict = [[NSBundle mainBundle] infoDictionary];
  NSString *Affcode = [tempInfoDict objectForKey:@"Affcode"];
  return Affcode;
}

@end
