//
//  AppDelegate+JDBase.h
//  JD
//
//  Created by Sam on 06/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate (JDBase)

- (void)loadReactNativeController;
- (void)loadRootController;
- (void)reloadForJSRN;
- (void)confitUShareSettings;
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url;
@end
