import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Icon } from '../../components';
import { getUniqueId} from '../../utilities';
import styles, { COLOR } from "../../styles";

const containerStyle = [styles.f1, styles.bgWhite, styles.p20];
const actionBtnStyle = [styles.circle60, styles.bgApp, styles.absolute, styles.r25, styles.b25, styles.shadow4];

export default class Index extends Component {
  onChatPress = ()=>{
    let {navigation} = this.props;
    navigation.navigate("ChatBot")
  };

  render() {
    return (
      <View style={containerStyle}>
        <Text>Recentsssssss</Text>
        <Text>{getUniqueId()}</Text>
        <TouchableOpacity style={actionBtnStyle} onPress={this.onChatPress}>
          <Icon name={"chat"} size={24} color={COLOR.WHITE}/>
        </TouchableOpacity>
      </View>
    );
  }
}