import React from "react";
import { View } from "react-native";

import { getResetAction, Storage } from "../utilities";
import { Loading } from "../components";
import styles from "../styles";

export default class Main extends React.PureComponent {
  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const [doNotShowWalkThrough] = await Promise.all([
        Storage.get("doNotShowWalkThrough"), Storage.get("user"),
      ]);

      if (doNotShowWalkThrough) {
        navigation.dispatch(getResetAction("Recent"));
      } else {
        navigation.dispatch(getResetAction("Welcome"));
      }
    } catch (err) {
      console.log("error in main file", err);
    }
  }

  render() {
    return (
      <View style={[styles.f1, styles.bgApp]}>
        <Loading/>
      </View>
    );
  }
}