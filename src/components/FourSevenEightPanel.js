import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BreathTimer from "./BreathTimer";

import { DURATION } from "../constants";

export default class FourSevenEightPanel extends Component<Props> {
  render() {
    const { width } = this.props;
    return (
      <View style={styles.slide3}>
        <BreathTimer
          type={"box"}
          size={width}
          outerRingRadius={width / 2 - 40}
          width={5}
          primaryColor={"#00bf8f"}
          secondaryColor={"#001510"}
          duration={DURATION}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
});
