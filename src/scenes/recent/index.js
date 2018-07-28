import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { Icon, List } from '../../components';
import styles, { COLOR } from "../../styles";

const containerStyle = [styles.f1, styles.bgWhite, styles.ph5];
const actionBtnStyle = [styles.circle60, styles.bgApp, styles.absolute, styles.r25, styles.b25, styles.shadow4];

export default class Index extends Component {
  state = {
    data: [
      { id: 1, title: "text1" },
      { id: 2, title: "text1" },
      { id: 3, title: "text1" },
      { id: 4, title: "text1" },
      { id: 5, title: "text1" },
      { id: 6, title: "text1" },
      { id: 7, title: "text1" },
      { id: 8, title: "text1" },
      { id: 9, title: "text1" },
      { id: 10, title: "text1" },
      { id: 11, title: "text1" },
      { id: 12, title: "text1" },
      { id: 13, title: "text1" },
      { id: 14, title: "text1" },
    ]
  };

  onChatPress = ()=>{
    let {navigation} = this.props;
    navigation.navigate("ChatBot")
  };

  _renderRow = (rowData) => {
    return ( <RecentListRow {...rowData}/> )
  };
  _rowTouch = (rowData) => {

  };

  render() {
    let { data = [] } = this.state;

    return (
      <View style={containerStyle}>
        <List
          data={data}
          renderRow={this._renderRow}
          rowTouch={this._rowTouch}
        />
        <TouchableOpacity style={actionBtnStyle} onPress={this.onChatPress}>
          <Icon name={"chat"} size={24} color={COLOR.WHITE}/>
        </TouchableOpacity>
      </View>
    );
  }
}

class RecentListRow extends React.PureComponent {
  render() {
    let { title = "" } = this.props;

    return (
      <View style={[styles.flexRow, styles.p10]}>
        <Text style={[styles.font14]}>{title}</Text>
      </View>
    )
  }
}