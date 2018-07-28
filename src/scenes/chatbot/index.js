import React from "react";
import { KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Icon, List } from "../../components";
import styles, { COLOR, height } from "../../styles";
import { getDate, isIos, } from "../../utilities";

const LIGHT_GRAY = "#efefef";
const chatBot = "chatBot";
const welcomeText = `Hello, \nType and click send to check the message or \nclick report to report the message as fake/spam.`;

export default class ChatBot extends React.Component {
  state = {
    messages: [
      {
        user: chatBot,
        messageDate: new Date(),
        message: welcomeText
      }
    ]
  };

  _renderRow = rowData => {
    let { user } = rowData;

    return <ChatRow leftAlign={user === chatBot} {...rowData} />;
  };

  onSendClick = (message = "", cb = () => ( {} )) => {
    if (message) {
      this.state.messages.splice(0, 0, { message, messageDate: new Date(), user: this.getRandom() });
      this.setState({}, cb());
    }
  };
  onReportClick = (message, cb = () => ( {} )) => {
    this.onSendClick(message, cb);
  };

  getRandom = () => {
    return Math.random() * 10 > 5 ? 2 : chatBot;
  };

  render() {
    let { messages } = this.state;

    let keyboardAvoidingProps = isIos ? { behavior: "padding", enabled: true, keyboardVerticalOffset: height / 9 } : {};
    return (
      <SafeAreaView style={styles.f1}>
        <KeyboardAvoidingView style={styles.f1} {...keyboardAvoidingProps}>
          <View style={[styles.f1, styles.bgWhite]}>
            <List
              inverted
              data={messages}
              renderRow={this._renderRow}
              ItemSeparatorComponent={() => null}
            />
            <MessageTextInput
              onReportClick={this.onReportClick}
              onSendClick={this.onSendClick}/>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

class MessageTextInput extends React.PureComponent {
  state = { message: "" };

  onMessageTyping = text => {
    this.setState({ message: text });
  };
  onSendClick = () => {
    let { message } = this.state;
    let { onSendClick } = this.props;

    if (message) {
      onSendClick(message, () => {
        this.setState({ message: "" });
      });
    }
  };
  onReportClick = () => {
    let { message } = this.state;
    let { onReportClick } = this.props;

    if (message) {
      onReportClick(message, () => {
        this.setState({ message: "" });
      });
    }
  };

  render() {
    let { message = "" } = this.state;

    return (
      <View
        style={[
          styles.flexRow,
          styles.center,
          styles.ph10,
          isIos ? styles.pv5 : {},
          { backgroundColor: LIGHT_GRAY }
        ]}>
        <TextInput
          multiline
          autoCorrect={false}
          underlineColorAndroid={"transparent"}
          placeholder="Message"
          onChangeText={this.onMessageTyping}
          value={message}
          style={[styles.f1, isIos ? styles.pt0 : {}, styles.pr5, { maxHeight: 100 }]}
        />
        <TouchableOpacity
          style={[styles.circle40, styles.bgTransparent]}
          onPress={this.onReportClick}>
          <Icon style={styles.shadow4} name={"warning"} size={24} color={COLOR.APP}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.circle40, styles.bgTransparent]}
          onPress={this.onSendClick}>
          <Icon style={styles.shadow4} name={"send"} size={24} color={COLOR.APP}/>
        </TouchableOpacity>
      </View>
    )
  }
}

class ChatRow extends React.PureComponent {
  render() {
    let { leftAlign = false, message = "", messageDate = "" } = this.props;

    messageDate = getDate(messageDate || new Date(), "DD/MM/YYYY, hh:mm A");
    const messageContainerStyle = [
      styles.p5,
      styles.ph15,
      styles.bdRad15,
      { minHeight: 26 },
      leftAlign ? { backgroundColor: LIGHT_GRAY } : styles.bgApp
    ];
    const arrowStyle = [
      styles.circle30,
      styles.absolute,
      leftAlign
        ? { left: -10, bottom: -8, borderRightWidth: 8, borderRightColor: LIGHT_GRAY, transform: [{ rotate: "30deg" }] }
        : {
          left: -10,
          bottom: -8,
          borderLeftWidth: 8,
          borderLeftColor: COLOR.APP,
          transform: [{ rotate: "-30deg" }]
        }
    ];

    return (
      <View style={[styles.p10, styles.aCenter, leftAlign ? styles.flexRow : styles.flexRowReverse]}>

        <View style={[styles.circle40, styles.mh10, styles.bgLightGray]}>
          <Icon name={"person"} size={30} color={COLOR.WHITE}/>
        </View>

        <View style={styles.f1}>
          <View style={[leftAlign ? styles.flexRow : styles.flexRowReverse]}>
            <View style={arrowStyle}/>
            <View style={messageContainerStyle}>
              {message ? <Text style={[styles.fontLight14, !leftAlign && styles.cWhite]}>{message}</Text> : null}
            </View>
          </View>
          <Text
            style={[
              styles.fontLight12,
              styles.mt5,
              leftAlign ? styles.l20 : styles.r20,
              leftAlign ? styles.textLeft : styles.textRight
            ]}>
            {messageDate}
          </Text>
        </View>
      </View>
    );
  }
}
