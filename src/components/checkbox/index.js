import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../index";
import styles from "../../styles";

export default class Checkbox extends PureComponent {
  state = {
    checked: true
  };

  onChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    let {
      checked = this.state.checked,
      textStyle = {},
      iconStyle = {},
      rightText = "",
      onPressFnc = this.onChange,
      size = 24
    } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={onPressFnc}>
        <View style={[styles.f1, styles.flexRow, styles.jStart, styles.aCenter]}>
          {checked ? (
            <Icon color="#FFF" size={size} name={"check-box"} style={iconStyle} />
          ) : (
            <Icon color="#FFF" size={size} name={"check-box-outline-blank"} style={iconStyle} />
          )}
          <Text style={[styles.cWhite, styles.textCenter, styles.pl5, styles.font12, textStyle]}>{rightText}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
