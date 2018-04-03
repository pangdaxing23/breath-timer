import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
// const { Text } = ART;

export default class ElapsedTime extends Component<Props> {
  render() {
    const { elapsed, cx, size } = this.props;
    const timeString = moment.duration({ seconds: elapsed }).asSeconds();
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>{`Time practiced: ${timeString}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
