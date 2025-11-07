import {NativeModules} from 'react-native';

type BatteryModuleType = {
  getBatteryLevel(): Promise<number>;
  getFreeStorage(): Promise<number>;
};

export default NativeModules.BatteryModule as BatteryModuleType;
