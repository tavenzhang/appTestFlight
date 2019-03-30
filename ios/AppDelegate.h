//
//  JD
//
//  Created by Sam on 10/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTRootView.h>

static NSString * const JDNight = @"12night";

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSDictionary *launchOptions;
@property(nonatomic,strong) RCTRootView *rootView;
@property(nonatomic,assign) BOOL isLoadForJS;
@property(nonatomic,assign) BOOL isLoad;

- (UIViewController *)rootController;
- (void *)registAppPush:(NSString *)jkey:(NSString *)channel;
- (void *)registUMeng:(NSString *)ukey:(NSString *)channel;
- (void *)registUMengShare:(NSString *)appId:(NSString *)api;
+(NSArray *)getBBQArray;
// Override to return a child view controller or nil. If non-nil, that view controller's home indicator auto-hiding will be used. If nil, self is used. Whenever the return value changes, -setNeedsHomeIndicatorAutoHiddenUpdate should be called.

@end
