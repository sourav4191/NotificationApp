/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';

if (global.DETOX_STARTUP_WAIT) {
  console.log('✅ Detox startup wait active');
}
AppRegistry.registerComponent(appName, () => App);
