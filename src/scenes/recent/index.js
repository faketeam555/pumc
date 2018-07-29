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

  _renderNoData = () => {
    return null;

    return (
      <View style={[styles.f1, styles.center, styles.p25, styles.pt40, styles.mt20]}>
        <Text style={[styles.font14, styles.textCenter]}>
          There is no articles found for you right now, please try again later.
        </Text>
      </View>
    )
  };

  _renderRow = (rowData) => {
    return ( <ArticleListRow {...rowData}/> )
  };

  _rowTouch = (rowData) => {
    let { navigation } = this.props;

    navigation.navigate("RecentDetails", { data: rowData })
  };

  render() {
    let { data = [] } = this.state;

    return (
      <View style={containerStyle}>
        <List
          data={data}
          renderNoData={this._renderNoData}
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
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={[styles.font16, styles.cAppDark, styles.bold]}>
          {`${title} ${label}`}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={[styles.font14, styles.cApp, styles.pt5, styles.pl20]}>
          {content}
        </Text>
        <Text style={[styles.font12, styles.cAppDark, styles.textRight]}>
          {created_at}
        </Text>
      </View>
    )
  }
}