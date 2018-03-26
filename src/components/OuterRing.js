import React, { Component } from "react";
import { View, Platform, ART } from "react-native";
const { Surface, Shape, Path, Group } = ART;
import Circle from "./Circle";

import { ROTATION_MAP } from "../constants";

// arc(xPosition, yPosition, xRadius, yRadius[,outer,counterClockWise,rotation])

export default class OuterRing extends Component {
  render() {
    const { radius, cx, cy, color, border, fill, numberOfDots } = this.props;
    const rotations = ROTATION_MAP[numberOfDots];
    const path1 = Path()
      .moveTo(cx, cy - radius)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)
      .close();

    const x = radius * Math.cos(rotations[1] / 180 * Math.PI);
    const y = radius * Math.sin(rotations[1] / 180 * Math.PI);
    const chordLength = 2 * radius * Math.sin(rotations[1] / 180 * Math.PI / 2);
    // console.group("POINTS");
    // console.log("rotations", rotations);
    // console.log("chord length", chordLength);
    // console.log("cos", x);
    // console.log("sin", y);
    // console.groupEnd();

    const path2 = Path()
      .moveTo(cx, cy - radius)
      .arc(cx + x, cy + y, radius);

    return <Shape {...this.props} d={path1} />;
    // return <Shape {...this.props} stroke={"red"} d={path2} />;
    // return (
    //   <Group>
    //     <Shape {...this.props} d={path1} />;
    //     <Shape {...this.props} stroke={"red"} d={path2} />;
    //   </Group>
    // );
  }
}

OuterRing.defaultProps = {
  x: 0,
  y: 0,
};
