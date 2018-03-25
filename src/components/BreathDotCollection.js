import React, { Component } from "react";
import { View, Platform, ART } from "react-native";
const { Surface, Shape, Path, Group, Transform } = ART;
import Circle from "./Circle";

type Props = {};
export default class BreathDotCollection extends Component<Props> {
  render() {
    const {
      radius,
      cx,
      cy,
      originX,
      originY,
      color,
      border,
      fill,
      rotations,
    } = this.props;

    return (
      <Group>
        {rotations.map(i => (
          <Circle
            key={i}
            {...this.props}
            rotation={i}
            // orientation={"down"}
          />
        ))}
      </Group>
    );
  }
}
