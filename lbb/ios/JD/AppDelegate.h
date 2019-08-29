//
//  JD
//
//  Created by Sam on 10/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <RCTJPushModule.h>
#import <React/RCTRootView.h>

static NSString * const JDNight = @"123night";

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSDictionary *launchOptions;
@property(nonatomic,strong) RCTRootView *rootView;
@property(nonatomic,assign) BOOL isLoadForJS;
@property(nonatomic,assign) BOOL isLoad;

- (UIViewController *)rootController;

+(NSArray *)getBBQArray;


@end
