# WTSafeGuard
## 使用
在 AppDelegate.m 
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
...
[WTSafeGuard startSafeGuardWithType:WTSafeGuardType_NilTarget| WTSafeGuardType_Foundation|WTSafeGuardType_KVO|WTSafeGuardType_Timer|WTSafeGuardType_MainThreadUI];
    return YES;
}
