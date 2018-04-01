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
const { Surface, Shape, Path, Group, Transform, Text, LinearGradient } = ART;
const AnimatedGroup = Animated.createAnimatedComponent(Group);

import Circle from "./Circle";
import OuterRing from "./OuterRing";
import TimerDot from "./TimerDot";
import BreathDotCollection from "./BreathDotCollection";

import { toggle, timeout } from "../util";
const toggler = toggle();

import {
  OUTER_RING_WIDTH,
  RING_GAP,
  TIMER_DOT_RADIUS,
  BREATH_DOT_RADIUS,
  ROTATION_MAP,
  TIMER_ROTATION,
} from "../constants";

const calculateDurations = (totalDuration, rotations) => {
  return rotations
    .concat([rotations[0] + 360])
    .reduce((acc, curr, index, arr) => {
      if (index > 0) {
        acc.push(totalDuration / (360 / (curr - arr[index - 1])));
      }
      return acc;
    }, []);
};

type Props = {
  size: Number,
  width: Number,
  numberOfDots: Number,
  timerRotation: Number,
};
export default class BreathTimer extends Component<Props> {
  state = {
    timerRotation: new Animated.Value(this.props.timerRotation),
    scale: new Animated.Value(this.props.initalScaleFactor),
    text: "Begin",
    elapsed: 0,
    returningToStart: false,
  };

  checkpointRotations = ROTATION_MAP[this.props.numberOfDots];

  segmentDurations = calculateDurations(
    this.props.duration,
    this.checkpointRotations,
  );

  textTimer = null;

  textInterval = null;

  cycleText = () => {
    const { numberOfDots } = this.props;
    this.setState({ text: "Inhale" });
    if (numberOfDots === 2) {
      this.textTimer = setTimeout(() => {
        this.setState({ text: "Exhale" });
      }, this.segmentDurations[0]);
    } else {
      this.textTimer = setTimeout(() => {
        this.setState({ text: "Hold" });
        this.textTimer = setTimeout(() => {
          this.setState({ text: "Exhale" });
          if (numberOfDots === 4) {
            this.textTimer = setTimeout(() => {
              this.setState({ text: "Hold" });
            }, this.segmentDurations[2]);
          }
        }, this.segmentDurations[1]);
      }, this.segmentDurations[0]);
    }
  };

  tick = () => {
    this.setState({
      elapsed: this.state.elapsed + 1,
    });
  };

  returnToStartAnimation = () => {
    const { timerRotation, initalScaleFactor } = this.props;
    const clockwise =
      this.state.timerRotation.__getValue() > 0.5 + timerRotation;
    Animated.parallel([
      Animated.timing(this.state.timerRotation, {
        toValue: clockwise ? 1 + timerRotation : 0 + timerRotation,
        duration: 300 - 300 * (this.state.timerRotation.__getValue() / 360),
        easing: Easing.linear,
      }),
      Animated.timing(this.state.scale, {
        toValue: initalScaleFactor,
        duration: 300 - 300 * (this.state.timerRotation.__getValue() / 360),
        easing: Easing.linear,
      }),
    ]).start(() => {
      this.setState({ text: "Begin", returningToStart: false });
    });
  };

  scaleAnimation = () => {
    const { initalScaleFactor, endScaleFactor, numberOfDots } = this.props;
    const scaleDownDuration =
      numberOfDots === 2 ? this.segmentDurations[1] : this.segmentDurations[2];
    const scaleDownDelay = numberOfDots === 2 ? 0 : this.segmentDurations[1];

    return Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: endScaleFactor,
        duration: this.segmentDurations[0],
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(this.state.scale, {
        toValue: initalScaleFactor,
        duration: scaleDownDuration,
        delay: scaleDownDelay,
        easing: Easing.inOut(Easing.ease),
      }),
    ]);
  };

  animate = () => {
    const {
      duration,
      timerRotation,
      initalScaleFactor,
      endScaleFactor,
    } = this.props;
    Animated.loop(
      Animated.parallel([
        Animated.timing(this.state.timerRotation, {
          toValue: 1 + timerRotation,
          duration: duration,
          easing: Easing.linear,
        }),
        this.scaleAnimation(),
      ]),
    ).start(this.returnToStartAnimation);
  };

  stopAnimation = () => {
    this.setState({ returningToStart: true });
    this.state.timerRotation.stopAnimation();
    this.state.scale.stopAnimation();

    clearInterval(this.timeInterval);
    clearInterval(this.textInterval);
    clearTimeout(this.textTimer);
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  onPress = () => {
    if (this.state.returningToStart) {
      return;
    }
    if (toggler.next().value) {
      this.timeInterval = setInterval(this.tick, 1000);
      this.cycleText();
      this.textInterval = setInterval(() => {
        this.cycleText();
      }, this.props.duration);
      this.animate();
    } else {
      this.stopAnimation();
    }
  };

  render() {
    const {
      size,
      outerRingRadius,
      width,
      arcSweepAngle,
      fontSize,
      numberOfDots,
      initalScaleFactor,
      endScaleFactor,
      primaryColor,
      secondaryColor,
    } = this.props;
    const timerDotColor = primaryColor;
    const checkpointRotations = ROTATION_MAP[numberOfDots];

    const cx = size / 2;
    const cy = size / 2;

    const interpolatedRotation = this.state.timerRotation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 360],
    });

    const interpolatedScale = this.state.scale.interpolate({
      inputRange: [initalScaleFactor, endScaleFactor],
      outputRange: [
        size / 2 - size / 2 * initalScaleFactor,
        size / 2 - size / 2 * endScaleFactor,
      ],
    });

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          <Surface width={size} height={size}>
            <Group x={0} y={0}>
              <OuterRing // Outer ring
                radius={outerRingRadius}
                cx={size / 2}
                cy={size / 2}
                strokeWidth={OUTER_RING_WIDTH}
                stroke={secondaryColor}
                numberOfDots={numberOfDots}
              />

              <BreathDotCollection
                radius={BREATH_DOT_RADIUS}
                stroke={secondaryColor}
                fill={primaryColor}
                cx={cx}
                cy={cy - outerRingRadius}
                originX={cx}
                originY={cy}
                rotations={checkpointRotations}
              />
              <TimerDot
                radius={TIMER_DOT_RADIUS}
                stroke={timerDotColor}
                fill={timerDotColor}
                cx={cx}
                cy={cy - outerRingRadius}
                originX={cx}
                originY={cy}
                rotation={interpolatedRotation}
              />
            </Group>

            <AnimatedGroup
              x={interpolatedScale}
              y={interpolatedScale}
              scale={this.state.scale}
            >
              <Circle // Inner circle
                radius={size / 2 - RING_GAP}
                cx={size / 2}
                cy={size / 2}
                fill={primaryColor}
              />
            </AnimatedGroup>
            <Text
              font={`${fontSize}px "Helvetica", sans-serif-light`}
              alignment={"center"}
              fill={"white"}
              x={cx}
              y={cy - fontSize / 2}
            >
              {this.state.text}
            </Text>
            <Text
              font={`19px "Helvetica Neue", "Helvetica", Arial`}
              alignment={"center"}
              fill={"white"}
              x={cx}
              y={size - 19}
            >
              {`${this.state.elapsed}`}
            </Text>
          </Surface>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BreathTimer.defaultProps = {
  timerRotation: TIMER_ROTATION,
  fontSize: 20,
  numberOfDots: 3,
  duration: 9000,
  initalScaleFactor: 0.7 * 0.6,
  endScaleFactor: 0.7 * 1.13,
};

const primaryColor = "#ef473a";
const secondaryColor = "#cb2d3e";
const timerDotColor = "#cb2d3e";

const styles = StyleSheet.create({});
