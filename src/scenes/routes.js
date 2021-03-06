import React from "react";
import { StackNavigator } from "react-navigation";

import Main from "./main";
import Welcome from "./welcome";
import Recent from "./recent";
import RecentDetails from "./recent/detailPage";
import ChatBot from "./chatbot";

import styles, { COLOR } from "../styles";

const nullHeader = ({ navigation }) => ( {
  header: null
} );

const ROUTE_CONFIG = {
  Main: { screen: Main, navigationOptions: nullHeader },
  Welcome: { screen: Welcome, navigationOptions: nullHeader },
  Recent: { screen: Recent, navigationOptions: { title: "Articles" } },
  RecentDetails: { screen: RecentDetails, navigationOptions: { title: "Article details" } },
  ChatBot: { screen: ChatBot, navigationOptions: { title: "ChatBot" } },
};
const STACK_NAVIGATOR_CONFIG = {
  initialRouteName: "Main",
  navigationOptions: {
    headerStyle: styles.bgApp,
    headerBackTitleStyle: COLOR.WHITE,
    headerTintColor: COLOR.WHITE,
    headerTitleStyle: styles.cWhite
  }
};

export default StackNavigator(ROUTE_CONFIG, STACK_NAVIGATOR_CONFIG);
