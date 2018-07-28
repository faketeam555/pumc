import React, { Component } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

import { getResetAction, Storage } from "../../utilities";
import styles, { height } from "../../styles";
import { Checkbox } from "../../components";
import { BACK_GROUND, PLACEHOLDER } from "../../images";

const containerStyle = [styles.f1, styles.bgApp, styles.p10, styles.pt25];
const footerStyle = [styles.right20, styles.l20, styles.b10, styles.flexRow];
const imageWrapperStyle = [styles.aCenter];
const textWrapperStyle = [styles.f1];
const textStyle = [styles.cWhite, styles.textCenter, styles.textVCenter, styles.font16];
const swiperData = [{ image: BACK_GROUND, text: "DEMO TEXT 1" }, { image: PLACEHOLDER, text: "DEMO TEXT 2" }];

export default class Index extends Component {
  state = {
    checked: false,
    skipButton: true
  };

  skip = () => {
    if (this.state.checked) {
      Storage.set("doNotShowWalkThrough", true);
    }

    return this.props.navigation.dispatch(getResetAction("Recent", 0, {}));
  };

  onChange = () => this.setState({ checked: !this.state.checked });

  onSwipe = index => {
    if (index === swiperData.length - 1) {
      this.setState({ skipButton: false });
    }
  };

  render() {
    let { checked, skipButton } = this.state;

    return (
      <SafeAreaView style={[styles.f1, styles.bgApp]}>
        <View style={containerStyle}>
          <Swiper
            dotStyle={styles.swiperDot}
            activeDotStyle={styles.swiperActiveDot}
            loop={false}
            showsButtons={false}
            onIndexChanged={this.onSwipe}>
            {
              swiperData.map(({ image, text }, index) => (
                <WalkThroughScreens
                  key={index}
                  image={image}
                  text={text}
                />
              ))
            }
          </Swiper>
          <View style={footerStyle}>
            <Checkbox
              onPressFnc={this.onChange}
              checked={checked}
              textStyle={textStyle}
              rightText={"Do not show me again"}
            />
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={this.skip}>
            <Text style={[styles.cWhite, styles.font16]}>{skipButton ? "Skip" : "Done"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

function WalkThroughScreens(props) {
  let { image, text } = props;
  return (
    <View style={styles.f1}>
      <View style={imageWrapperStyle}>
        <Image style={{ height: ( height / 3 ) * 2.22, width: height / 3 }} source={image}/>
      </View>

      <View style={textWrapperStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
}
