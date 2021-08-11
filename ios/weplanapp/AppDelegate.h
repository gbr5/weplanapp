#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
  // Block from Expo
#import <UMCore/UMAppDelegateWrapper.h>

@interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>
  // End Block from Expo

@property (nonatomic, strong) UIWindow *window;

@end
