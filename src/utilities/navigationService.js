import { NavigationActions } from "react-navigation";

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params
    })
  );
}

export function dispatch(action) {
  _navigator.dispatch(action);
}

export function getResetAction(routeNames, index = 0, params = {}) {
  const actionJson = { index };

  if (Array.isArray(routeNames)) {
    actionJson.actions = routeNames.map(route => NavigationActions.navigate({ routeName: route, params: params }));
  } else {
    actionJson.actions = [NavigationActions.navigate({ routeName: routeNames, params: params })];
  }
  return NavigationActions.reset(actionJson);
}
