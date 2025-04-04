//
//  RNLanguageDetectionModule.m
//  RNLanguageDetectionModule
//
//  Copyright © 2022 xmflsct. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNLanguageDetectionModule, NSObject)
  RCT_EXTERN_METHOD(
    detection:(nonnull NSString *)original
    resolve:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
  )
@end
