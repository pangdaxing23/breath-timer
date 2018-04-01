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
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        colors={["#f2fcfe", "#1c92d2"]}
        style={[styles.container]}
      >
        <BreathTimer
          size={width}
          outerRingRadius={width / 2 - 40}
          width={5}
          fontSize={20}
          numberOfDots={2}
          // timerRotation={0}
          duration={DURATION}
          initalScaleFactor={SCALE_FACTOR * 0.6}
          endScaleFactor={SCALE_FACTOR * 1.13}
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
