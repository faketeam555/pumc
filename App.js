import React, { Component } from "react";
import { View , StatusBar} from "react-native";

import Index from "./src/scenes";
import { isAndroid } from "./src/utilities";
import { AlertView, SnackBar, EventLoader } from "./src/components";
import styles, { COLOR } from './src/styles'

export default class App extends Component {
  render() {
    return (
      <View style={[styles.f1]}>
        {isAndroid() ? <StatusBar
          backgroundColor={COLOR.APP_DARK}
          barStyle="light-content"
        /> : null}
        <Index />
        <AlertView id={"Alert_Root_App"} />
        <SnackBar id={"SnackBar_Root_App"} />
        <EventLoader id={"EventLoader_Root_App"} />
      </View>
    );
  }
}
