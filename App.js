import React, { Component } from "react";
import Swiper from "react-native-swiper";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import BreathTimer from "./src/components/BreathTimer";
import LinearGradient from "react-native-linear-gradient";
import BellowsBreathPanel from "./src/components/BellowsBreathPanel";
import FourSevenEightPanel from "./src/components/FourSevenEightPanel";
import BoxBreathPanel from "./src/components/BoxBreathPanel";
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
        <BoxBreathPanel width={width} />
        <BellowsBreathPanel width={width} />
        <FourSevenEightPanel width={width} />
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
