import React, { Component } from "react";
import {
  View,
  // Text,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  ART,
} from "react-native";
const { Surface, Shape, Path, Group, Transform, Text } = ART;
const AnimatedGroup = Animated.createAnimatedComponent(Group);

import Circle from "./Circle";
import TimerDot from "./TimerDot";
import BreathDotCollection from "./BreathDotCollection";

const OUTER_RING_WIDTH = 3;
const RING_GAP = 15;
const TIMER_DOT_RADIUS = 8;
const SCALE_FACTOR = 0.7;
const SOME_BIG_NUMBER = 100;

const rotationMap = {
  2: [0, 180],
  3: [0, 135, 225],
  4: [0, 90, 180, 270],
};

function* toggle() {
  while (true) {
    yield true;
    yield false;
  }
}

const toggler = toggle();

type Props = {
  size: Number,
  width: Number,
  numberOfDots: Number,
};
export default class BreathTimer extends Component<Props> {
  state = {
    fill: 0,
    rotation: new Animated.Value(0),
    scale: new Animated.Value(SCALE_FACTOR),
    lastRotationValue: 0,
    // scale: new Animated.Value(1),
  };

  rotations = rotationMap[this.props.numberOfDots];

  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  onPress = () => {
    if (toggler.next().value) {
      Animated.parallel([
        Animated.timing(this.state.rotation, {
          // fromValue: this.state.rotation,
          toValue: SOME_BIG_NUMBER,
          duration:
            SOME_BIG_NUMBER * 3000 - 3000 * this.state.rotation.__getValue(),
          easing: Easing.linear,
        }),
        Animated.sequence([
          Animated.timing(this.state.scale, {
            toValue: 0.8,
            duration: 1000 - 1000 * this.state.scale.__getValue(),
            easing: Easing.linear,
          }),
          Animated.timing(this.state.scale, {
            toValue: 0.7,
            delay: 1000,
            duration: 1000 - 1000 * this.state.rotation.__getValue(),
            easing: Easing.linear,
          }),
        ]),
      ]).start();
    } else {
      this.state.rotation.stopAnimation();
      this.state.scale.stopAnimation();
    }
  };

  render() {
    console.log("hello");
    const { size, width, arcSweepAngle, numberOfDots } = this.props;
    const rotations = rotationMap[numberOfDots];
    const interpolatedRotation = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 360],
    });
    const interpolatedScale = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 0.91],
    });

    const cx = size / 2;
    const cy = size / 2;
    const fill = 50;
    const groupX = size / 2 - size / 2 * this.state.scale;
    const groupY = size / 2 - size / 2 * this.state.scale;

    // const groupTransform = new Transform().scale(this.state.scale);

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Surface width={size} height={size}>
            <AnimatedGroup x={groupX} y={groupY} scale={this.state.scale}>
              <Circle // Outer ring
                radius={size / 2}
                cx={size / 2}
                cy={size / 2}
                strokeWidth={OUTER_RING_WIDTH}
                stroke={"green"}
              />
              <Circle // Inner circle
                radius={size / 2 - RING_GAP}
                cx={size / 2}
                cy={size / 2}
                fill={"green"}
              />
              <BreathDotCollection
                radius={TIMER_DOT_RADIUS}
                stroke={"white"}
                fill={"white"}
                cx={cx}
                cy={0}
                originX={cx}
                originY={cy}
                rotations={rotations}
              />
              <TimerDot
                radius={TIMER_DOT_RADIUS}
                stroke={"black"}
                fill={"black"}
                cx={cx}
                cy={0}
                originX={cx}
                originY={cy}
                rotation={interpolatedRotation}
              />
              <Text
                font={`17px "Helvetica Neue", "Helvetica", Arial`}
                alignment={"center"}
                fill={"white"}
                x={cx}
                y={cy}
              >
                breath
              </Text>
            </AnimatedGroup>
          </Surface>
          {/* <Text style={[styles.text, { width: size / 2 }]}>breath</Text> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BreathTimer.defaultProps = {};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 17,
    position: "absolute",
    textAlign: "center",
  },
});
