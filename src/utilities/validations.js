import { Platform } from "react-native";

export const isAndroid = () => Platform.OS === "android";
export const isIos = () => Platform.OS === "ios";

export function isFunction(func) {
  return func && typeof func === "function";
}

export function isOkStatus(status) {
  return ( status === "true" || status === true )
}

export function isOkResponse(responseCode) {
  return ( responseCode === "200" || responseCode === 200 );
}

export function isObject(obj) {
  return obj && typeof obj === "object";
}

export function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else if (isObject(obj)) {
    return Object.keys(obj).length === 0
  } else {
    return !obj;
  }
}