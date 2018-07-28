import React, { Component } from "react";
import { View , StatusBar} from "react-native";
import Index from "./src/scenes";
import { AlertView, SnackBar, EventLoader } from "./src/components";
import {COLOR} from './src/styles'

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={COLOR.APP_DARK}
          barStyle="light-content"
        />
        <Index />
        <AlertView id={"Alert_Root_App"} />
        <SnackBar id={"SnackBar_Root_App"} />
        <EventLoader id={"EventLoader_Root_App"} />
      </View>
    );
  }
}
