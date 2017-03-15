/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "RCTOneSignal.h"

//@import Firebase;
//@import GoogleMobileAds;

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  [[RCTBundleURLProvider sharedSettings] setDefaults];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions appId:@"1fa5174c-6956-4c09-9094-a7238c10823b"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AdPagesGo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Use Firebase library to configure APIs
//  [FIRApp configure];
//  [GADMobileAds configureWithApplicationID:@"ca-app-pub-5226075387583224~1828654799"];
  
  [NSThread sleepForTimeInterval:0.0];
  
  return YES;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)notification {
  [RCTOneSignal didReceiveRemoteNotification:notification];
}

@end
