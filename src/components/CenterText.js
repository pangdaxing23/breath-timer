import React, { Component } from "react";
import { ART } from "react-native";
const { Text } = ART;

type Props = {};
export default class CenterText extends Component<Props> {
  render() {
    const { fontSize, cx, cy, text } = this.props;
    return (
      <Text
        font={`${fontSize}px "Helvetica", sans-serif-light`}
        alignment={"center"}
        fill={"white"}
        x={cx}
        y={cy - fontSize / 2}
      >
        {text}
      </Text>
    );
  }
}
