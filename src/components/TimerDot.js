import React, { Component } from "react";
import { View, Platform, Animated, ART } from "react-native";
const { Surface, Shape, Path, Group, Transform } = ART;
import Circle from "./Circle";
const AnimatedHalfCircle = Animated.createAnimatedComponent(Circle);

type Props = {};
export default class TimerDot extends Component<Props> {
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
      rotation,
    } = this.props;

    return <AnimatedHalfCircle {...this.props} orientation={"down"} />;
  }
}
