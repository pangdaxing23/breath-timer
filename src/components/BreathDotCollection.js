import React, { Component } from "react";
import { View, Platform, ART } from "react-native";
const { Surface, Shape, Path, Group, Transform } = ART;
import HalfCircle from "./HalfCircle";

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
    // const breathDots = ;

    return (
      <Group>
        {rotations.map(i => (
          <HalfCircle
            key={i}
            {...this.props}
            rotation={i}
            orientation={"down"}
          />
        ))}
      </Group>
    );
  }
}
