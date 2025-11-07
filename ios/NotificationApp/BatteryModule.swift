import Foundation
import UIKit

@objc(BatteryModule)
class BatteryModule: NSObject {
    @objc
    func getBatteryLevel(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        UIDevice.current.isBatteryMonitoringEnabled = true
        let level = UIDevice.current.batteryLevel * 100
        resolve(level)
    }

    @objc
    func getFreeStorage(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let documentDirectory = FileManager.default.urls(
            for: .documentDirectory, in: .userDomainMask)[0]
        do {
            let attributes = try FileManager.default.attributesOfFileSystem(
                forPath: documentDirectory.path)
            let freeSpace = (attributes[.systemFreeSize] as? NSNumber)?.doubleValue ?? 0
            resolve(freeSpace / (1024 * 1024))  // MB
        } catch {
            reject("ERROR", "Failed to get storage", error)
        }
    }

    @objc
    static override func requiresMainQueueSetup() -> Bool {
        return true
    }
}
