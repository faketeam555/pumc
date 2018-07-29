import React from 'react';
import { View, Text } from 'react-native';
import { getDate, isEmpty } from "../../utilities";
import styles from "../../styles";

export default class RecentDetails extends React.PureComponent {
  render() {
    let { navigation } = this.props;
    let data = navigation.getParam("data", {});

    if (isEmpty(data)) {
      return null;
    }

    let { content, created_at = new Date(), label, title } = data;
    label = label ? label != "?" ? `(${label})` : "" : "";
    created_at = getDate(created_at, "LLL");

    return (
      <View style={[styles.f1, styles.p15, styles.bgWhite]}>
        <Text style={[styles.font16, styles.cAppDark, styles.bold]}>{`${title} ${label}`}</Text>
        <Text style={[styles.font12, styles.cAppDark, styles.textRight, styles.pt5]}>{created_at}</Text>
        <Text style={[styles.font14,styles.cApp, styles.pt10, styles.pl20]}>{content}</Text>
      </View>
    )
  }
}