import React from "react";
import { View } from "react-native";
import Loading from "./loading";
import styles from "../../styles";
import Events from "react-native-simple-events";

const style = [styles.absolute, styles.bgTransparent, styles.center, styles.l0, styles.b0, styles.t0, styles.r0];

export function showLoader() {
  Events.trigger("showLoader", { showLoading: true });
}

export function hideLoader() {
  Events.trigger("showLoader", { showLoading: false });
}

export default class Loader extends React.PureComponent {
  state = { showLoading: false };

  componentDidMount() {
    let { id = null } = this.props;
    Events.on("showLoader", id ? id : "123456789", this.onRequest);
  }

  componentWillUnmount() {
    let { id = null } = this.props;
    Events.remove("showLoader", id ? id : "123456789");
  }

  onRequest = ({ showLoading }) => {
    this.setState({ showLoading });
  };

  render() {
    const { showLoading } = this.state;

    if (!showLoading) {
      return <View/>;
    }
    return (
      <View style={style}>
        <Loading/>
      </View>
    );
  }
}