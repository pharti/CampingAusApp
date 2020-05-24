/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>
//#import <RNGoogleSignin/RNGoogleSignin.h>
#import "RNSplashScreen.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
// [GIDSignIn sharedInstance].clientID = @"1080541170987-dtcdake9lt96g2f5u03up8l08cf9oi3r.apps.googleusercontent.com";
// [GIDSignIn sharedInstance].delegate = self;
  
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  /* react-native-maps */
  [GMSServices provideAPIKey:@"AIzaSyCAST6yuyqY4e-c5WhO5Ethae-7FElgmgc"];
  /* react-native-maps */
  // [[FBSDKApplicationDelegate sharedInstance] application:application
  //   didFinishLaunchingWithOptions:launchOptions];
  // Add any custom logic here.
  
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
  
  //Splash-screen
  [RNSplashScreen show];
  
  //splash-screen

  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options];
}

//|| [RNGoogleSignin application:application openURL:url options:options];

@end
