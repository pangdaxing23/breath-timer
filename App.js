import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import BreathTimer from "./src/components/BreathTimer";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={[styles.container]}
      >
        <BreathTimer size={width} width={5} numberOfDots={3} />
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
