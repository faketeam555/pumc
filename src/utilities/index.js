import { Dimensions } from "react-native";

import * as Api from "./api";
import * as Storage from "./storage";
import { dispatch, getResetAction, navigate, setTopLevelNavigator } from "./navigationService";
import { getDate } from './dateTimeFunctions';
import { getUniqueId } from './deviceInfoFunction';
import { isAndroid, isFunction, isIos, isOkResponse, isOkStatus, isEmpty, isObject } from "./validations";

const { width, height } = Dimensions.get("window");

export {
  width,
  height,
  Api,
  isAndroid,
  isIos,
  Storage,
  getResetAction,
  navigate,
  dispatch,
  setTopLevelNavigator,
  getDate, getUniqueId,
  isOkResponse, isOkStatus, isFunction,
  isEmpty, isObject
};
