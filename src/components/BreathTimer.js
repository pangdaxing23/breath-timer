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
import CenterText from "./CenterText";
import ElapsedTime from "./ElapsedTime";

import { toggle, timeout } from "../util";
const toggler = toggle();

import {
  OUTER_RING_WIDTH,
  RING_GAP,
  TIMER_DOT_RADIUS,
  BREATH_DOT_RADIUS,
  ROTATION_MAP,
  TIMER_ROTATION,
  RETURN_DURATION,
} from "../constants";

const durationsMap = {
  "478": {
    inhaleDuration: 4000,
    holdFullDuration: 7000,
    exhaleDuration: 8000,
    holdEmptyDuration: 0,
  },
  box: {
    inhaleDuration: 4000,
    holdFullDuration: 4000,
    exhaleDuration: 4000,
    holdEmptyDuration: 4000,
  },
  bellows: {
    inhaleDuration: 600,
    holdFullDuration: 0,
    exhaleDuration: 600,
    holdEmptyDuration: 0,
  },
};

const calculateRotations = (segments, startingRotation) => {
  segments = Object.values(segments);
  const totalDuration = segments.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return segments.reduce((rotations, duration, index, arr) => {
    if (index > 0) {
      if (duration === 0) {
        return rotations;
      }
      rotations.push(duration * 360 / totalDuration + rotations[index - 1]);
    } else {
      rotations.push(duration * 360 / totalDuration);
    }
    return rotations;
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

  segments = durationsMap[this.props.type];

  duration = Object.keys(this.segments).reduce((sum, key) => {
    return sum + this.segments[key];
  }, 0);

  checkpointRotations = calculateRotations(this.segments, 0);

  textTimer = null;

  textInterval = null;

  cycleText = () => {
    const { type } = this.props;
    this.setState({ text: "Inhale" });
    switch (type) {
      case "bellows":
        this.textTimer = setTimeout(() => {
          this.setState({ text: "Exhale" });
        }, this.segments.inhaleDuration);
        break;
      case "478":
        this.textTimer = setTimeout(() => {
          this.setState({ text: "Hold" });
          this.textTimer = setTimeout(() => {
            this.setState({ text: "Exhale" });
          }, this.segments.holdFullDuration);
        }, this.segments.inhaleDuration);
        break;
      case "box":
        this.textTimer = setTimeout(() => {
          this.setState({ text: "Hold" });
          this.textTimer = setTimeout(() => {
            this.setState({ text: "Exhale" });
            this.textTimer = setTimeout(() => {
              this.setState({ text: "Hold" });
            }, this.segments.holdEmptyDuration);
          }, this.segments.holdFullDuration);
        }, this.segments.inhaleDuration);
        break;
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
        duration:
          RETURN_DURATION -
          RETURN_DURATION * (this.state.timerRotation.__getValue() / 360),
        easing: Easing.linear,
      }),
      Animated.timing(this.state.scale, {
        toValue: initalScaleFactor,
        duration:
          RETURN_DURATION -
          RETURN_DURATION * (this.state.timerRotation.__getValue() / 360),
        easing: Easing.linear,
      }),
    ]).start(() => {
      this.setState({ text: "Begin", returningToStart: false });
    });
  };

  scaleAnimation = () => {
    const { initalScaleFactor, endScaleFactor, numberOfDots } = this.props;

    return Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: endScaleFactor,
        duration: this.segments.inhaleDuration,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(this.state.scale, {
        toValue: initalScaleFactor,
        duration: this.segments.exhaleDuration,
        delay: this.segments.holdFullDuration,
        easing: Easing.inOut(Easing.ease),
      }),
    ]);
  };

  animate = () => {
    const { timerRotation, initalScaleFactor, endScaleFactor } = this.props;
    Animated.loop(
      Animated.parallel([
        Animated.timing(this.state.timerRotation, {
          toValue: 1 + timerRotation,
          duration: this.duration,
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

  onPress = () => {
    if (this.state.returningToStart) {
      return;
    }

    if (toggler.next().value) {
      this.timeInterval = setInterval(this.tick, 1000);
      this.cycleText();
      this.textInterval = setInterval(() => {
        this.cycleText();
      }, this.duration);
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
                rotations={this.checkpointRotations}
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
            <CenterText
              fontSize={fontSize}
              cx={cx}
              cy={cy}
              text={this.state.text}
            />
          </Surface>
          <ElapsedTime elapsed={this.state.elapsed} cx={size / 2} size={size} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BreathTimer.defaultProps = {
  timerRotation: 0,
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
