import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../../styles";

const containerStyle = [styles.f1, styles.bgWhite, styles.p20];

export default class Index extends Component {
  render() {
    return (
      <View style={containerStyle}>
        <Text>
          Recentsssssss
        </Text>
      </View>
    );
  }
}