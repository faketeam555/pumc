const DeviceInfo = require('react-native-device-info');

export function getUniqueId() {
  return DeviceInfo.getUniqueID();
}