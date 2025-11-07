#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (BatteryModule, NSObject)
RCT_EXTERN_METHOD(getBatteryLevel : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getFreeStorage : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject)
@end