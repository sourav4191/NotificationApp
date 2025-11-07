package com.notificationapp

import android.content.Context
import android.os.BatteryManager
import android.os.Environment
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File

class BatteryModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BatteryModule"

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        val bm = reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
        val level = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
        promise.resolve(level)               // % (0-100)
    }

    @ReactMethod
    fun getFreeStorage(promise: Promise) {
        val path: File = Environment.getDataDirectory()
        val stat = android.os.StatFs(path.path)
        val blockSize = stat.blockSizeLong
        val availableBlocks = stat.availableBlocksLong
        val freeBytes = availableBlocks * blockSize
        val freeMB = freeBytes / (1024.0 * 1024.0)   // MB
        promise.resolve(freeMB)
    }
}