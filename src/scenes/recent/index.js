import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { hideLoader, Icon, List, showLoader, showSnackBar } from '../../components';
import { Api, getDate, getUniqueId, isOkResponse } from '../../utilities';
import styles, { COLOR } from "../../styles";

const containerStyle = [styles.f1, styles.bgWhite, styles.ph5];
const actionBtnStyle = [styles.circle60, styles.bgApp, styles.absolute, styles.r25, styles.b25, styles.shadow4];
const position = "top";

export default class Index extends Component {
  state = { data: [] };

  async componentDidMount() {
    try {
      showLoader();
      let payload = { phone: getUniqueId() };
      let { status, data } = await Api.post("/content/articles/", payload);

      if (isOkResponse(status)) {
        this.setState({ data });
      } else {
        let { error, message } = data;
        error && message && showSnackBar({ position, message });
      }
      hideLoader();
    } catch (error) {
      hideLoader();
      console.warn("Error in getting list of articles from DB.", error), JSON.stringify(error, null, 2);
    }
  }

  onChatPress = () => {
    let { navigation } = this.props;
    navigation.navigate("ChatBot")
  };

  _renderRow = (rowData) => {
    return ( <ArticleListRow {...rowData}/> )
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

class ArticleListRow extends React.PureComponent {
  render() {
    let { title = "", label = "", content = "", created_at = new Date() } = this.props;
    label = label ? label != "?" ? `(${label})` : "" : "";
    created_at = getDate(created_at, "LLL");

    return (
      <View style={[styles.p10]}>
        <Text style={[styles.font16]}>{`${title} ${label}`}</Text>
        <Text style={[styles.font14, styles.cApp, styles.pt5, styles.pl20]}>{content}</Text>
        <Text style={[styles.font12, styles.textRight]}>{created_at}</Text>
      </View>
    )
  }
}