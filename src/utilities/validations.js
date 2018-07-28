import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android";
export const isIos = Platform.OS === "ios";

export function isFunction(func) {
  return func && typeof func === "function";
}

export function isOkStatus(status) {
  return ( status === "true" || status === true )
}

export function isOkResponse(responseCode) {
  return ( responseCode === "200" || responseCode === 200 );
}
