import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BreathTimer from "./BreathTimer";

import { DURATION } from "../constants";

export default class BoxBreathPanel extends Component<Props> {
  render() {
    const { width } = this.props;
    return (
      <View style={styles.slide1}>
        <Text style={styles.text}>Box Breathing</Text>
        <BreathTimer
          type={"478"}
          size={width}
          outerRingRadius={width / 2 - 40}
          width={5}
          primaryColor={"#2C3E50"}
          secondaryColor={"#4CA1AF"}
          numberOfDots={3}
          duration={DURATION}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
});
