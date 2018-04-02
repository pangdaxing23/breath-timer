import React, { Component } from "react";
import Swiper from "react-native-swiper";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import BreathTimer from "./src/components/BreathTimer";
import LinearGradient from "react-native-linear-gradient";
import BellowsBreathPanel from "./src/components/BellowsBreathPanel";
import { DURATION, SCALE_FACTOR } from "./src/constants";

const { width, height } = Dimensions.get("window");

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
      >
        <BellowsBreathPanel width={width} />
        <View style={styles.slide2}>
          <BreathTimer
            size={width}
            outerRingRadius={width / 2 - 40}
            width={5}
            primaryColor={"#2C3E50"}
            secondaryColor={"#4CA1AF"}
            numberOfDots={3}
            duration={DURATION}
          />
        </View>
        <View style={styles.slide3}>
          <BreathTimer
            size={width}
            outerRingRadius={width / 2 - 40}
            width={5}
            primaryColor={"#00bf8f"}
            secondaryColor={"#001510"}
            numberOfDots={4}
            duration={DURATION}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  spacer: {
    padding: 10,
  },
});
