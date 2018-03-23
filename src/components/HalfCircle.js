import React, { Component } from "react";
import { View, Platform, ART } from "react-native";
const { Surface, Shape, Path, Group, Transform } = ART;

export default class HalfCircle extends Component {
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
      orientation,
    } = this.props;
    let xPos;
    let yPos;
    let dXPos;
    let dYPos;
    let counterClockWise;

    switch (orientation) {
      case "left":
        xPos = cx;
        yPos = cy - radius;
        dXPos = 0;
        dYPos = radius * 2;
        counterClockWise = true;
        break;
      case "right":
        xPos = cx;
        yPos = cy - radius;
        dXPos = 0;
        dYPos = radius * 2;
        counterClockWise = false;
        break;
      case "down":
        xPos = cx - radius;
        yPos = cy;
        dXPos = radius * 2;
        dYPos = 0;
        counterClockWise = true;
        break;
      case "up":
      default:
        xPos = cx - radius;
        yPos = cy;
        dXPos = radius * 2;
        dYPos = 0;
        counterClockWise = false;
        break;
    }
    const path = Path()
      .moveTo(xPos, yPos)
      .arc(dXPos, dYPos, radius, radius, false, counterClockWise)
      .close();
    const trans = new Transform().rotate(rotation, originX, originY);
    return <Shape color={color} fill={fill} d={path} transform={trans} />;
  }
}

HalfCircle.defaultProps = {
  cx: 0,
  cy: 0,
};
