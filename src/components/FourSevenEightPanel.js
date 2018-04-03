import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BreathTimer from "./BreathTimer";

import { DURATION } from "../constants";

export default class FourSevenEightPanel extends Component<Props> {
  render() {
    const { width } = this.props;
    return (
      <View style={styles.slide3}>
        <Text style={styles.text}>Calming "4-7-8" Breathing</Text>
        <BreathTimer
          type={"box"}
          size={width}
          outerRingRadius={width / 2 - 40}
          width={5}
          primaryColor={"#00bf8f"}
          secondaryColor={"#001510"}
          duration={DURATION}
          showCheckmarks={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
});
