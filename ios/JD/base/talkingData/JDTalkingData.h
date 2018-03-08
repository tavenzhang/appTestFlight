//
//  JDTalkingData.h
//  JD
//
//  Created by Sam on 07/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface JDTalkingData : NSObject<RCTBridgeModule>

+ (void)registerApp:(NSString *)appId channelID:(NSString *)channelID crashReport:(BOOL)report;
@end
