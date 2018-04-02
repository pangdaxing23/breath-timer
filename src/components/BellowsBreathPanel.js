import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BreathTimer from "./BreathTimer";

import { DURATION } from "../constants";

export default class BellowsBreathPanel extends Component<Props> {
  render() {
    const { width } = this.props;
    return (
      <View style={styles.slide1}>
        <BreathTimer
          size={width}
          outerRingRadius={width / 2 - 40}
          width={5}
          primaryColor={"#ef473a"}
          secondaryColor={"#cb2d3e"}
          numberOfDots={2}
          duration={DURATION}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
});
