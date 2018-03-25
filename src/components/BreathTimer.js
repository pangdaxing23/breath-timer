import React, { Component } from "react";
import {
  View,
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

import {
  OUTER_RING_WIDTH,
  RING_GAP,
  TIMER_DOT_RADIUS,
  SCALE_FACTOR,
  ROTATION_MAP,
  DURATION,
} from "../constants";

const calculateDurations = rotations => {
  return rotations.concat([360]).reduce((acc, curr, index, arr) => {
    if (index > 0) {
      acc.push(DURATION / (360 / (curr - arr[index - 1])));
    }
    return acc;
  }, []);
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
    text: "ready?",
    time: 0,
  };

  rotations = ROTATION_MAP[this.props.numberOfDots];

  durations = calculateDurations(this.rotations);

  timer = null;

  interval = null;

  cycleText = () => {
    this.setState({ text: "inhale" });
    this.timer = setTimeout(() => {
      this.setState({ text: "hold" });
      this.timer = setTimeout(() => {
        this.setState({ text: "exhale" });
      }, this.durations[1]);
    }, this.durations[0]);
  };

  tick = () => {
    this.setState({
      time: this.state.time + 1,
    });
  };

  animate = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(this.state.rotation, {
          toValue: 1,
          duration: DURATION,
          easing: Easing.linear,
        }),
        Animated.sequence([
          Animated.timing(this.state.scale, {
            toValue: SCALE_FACTOR * 1.1,
            duration: this.durations[0],
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(this.state.scale, {
            toValue: SCALE_FACTOR,
            duration: this.durations[2],
            delay: this.durations[1],
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
      ]),
    ).start(() => {
      const clockwise = this.state.rotation.__getValue() > 0.5;
      Animated.parallel([
        Animated.timing(this.state.rotation, {
          toValue: clockwise ? 1 : 0,
          duration: 400 - 400 * (this.state.rotation.__getValue() / 360),
          easing: Easing.linear,
        }),
        Animated.timing(this.state.scale, {
          toValue: SCALE_FACTOR,
          duration: 400 - 400 * (this.state.rotation.__getValue() / 360),
          easing: Easing.linear,
        }),
      ]).start();
    });
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  onPress = () => {
    if (toggler.next().value) {
      this.cycleText();
      this.interval = setInterval(() => {
        this.cycleText();
      }, DURATION);
      this.timeInterval = setInterval(this.tick, 1000);
      this.animate();
    } else {
      this.state.rotation.stopAnimation();
      this.state.scale.stopAnimation();
      this.setState({ text: "ready?" });
      clearInterval(this.interval);
      clearTimeout(this.timer);
    }
  };

  render() {
    const { size, width, arcSweepAngle, fontSize, numberOfDots } = this.props;
    const rotations = ROTATION_MAP[numberOfDots];
    const interpolatedRotation = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 360],
    });
    const interpolatedScale = this.state.scale.interpolate({
      inputRange: [SCALE_FACTOR, SCALE_FACTOR * 1.1],
      outputRange: [
        size / 2 - size / 2 * SCALE_FACTOR,
        size / 2 - size / 2 * SCALE_FACTOR * 1.1,
      ],
    });

    const cx = size / 2;
    const cy = size / 2;
    const fill = 50;
    const groupX = size / 2 - size / 2 * SCALE_FACTOR;
    const groupY = size / 2 - size / 2 * SCALE_FACTOR;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Surface width={size} height={size}>
            <AnimatedGroup
              x={interpolatedScale}
              y={interpolatedScale}
              scale={this.state.scale}
            >
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
                font={`${fontSize}px "Helvetica Neue", "Helvetica", Arial`}
                alignment={"center"}
                fill={"white"}
                x={cx}
                y={cy - fontSize / 2}
              >
                {this.state.text}
              </Text>
            </AnimatedGroup>
            <Text
              font={`19px "Helvetica Neue", "Helvetica", Arial`}
              alignment={"center"}
              fill={"white"}
              x={cx}
              y={cy}
            >
              {this.state.time}
            </Text>
          </Surface>
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
