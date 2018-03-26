import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import BreathTimer from "./src/components/BreathTimer";
import LinearGradient from "react-native-linear-gradient";
import { DURATION, SCALE_FACTOR } from "./src/constants";

const { width, height } = Dimensions.get("window");

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={[styles.container]}
      >
        <BreathTimer
          size={width}
          outerRingRadius={155}
          width={5}
          fontSize={30}
          numberOfDots={3}
          duration={DURATION}
          initalScaleFactor={SCALE_FACTOR * 0.9}
          endScaleFactor={SCALE_FACTOR * 1.2}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  spacer: {
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
});
