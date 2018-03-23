import React, { Component } from "react";
import { View, Platform, ART } from "react-native";
const { Surface, Shape, Path, Group } = ART;

export default class Circle extends Component {
  render() {
    const { radius, cx, cy, color, border, fill } = this.props;
    const path = Path()
      .moveTo(cx, cy - radius)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)
      .close();

    return <Shape {...this.props} d={path} />;
  }
}

Circle.defaultProps = {
  x: 0,
  y: 0,
};
