// components/SwipeableCard.tsx
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

export type SwipeableCardRef = {
  reset: () => void;
};

type Props = {
  children: ReactNode;
  rightSlot: ReactNode;
  onOpen?: () => void;
};

export const SwipeableCard = forwardRef<SwipeableCardRef, Props>(
  ({ children, rightSlot, onOpen }, ref) => {
    const translateX = useRef(new Animated.Value(0)).current;

    const reset = () => {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    useImperativeHandle(ref, () => ({ reset }));

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10,
        onPanResponderMove: (_, g) => {
          if (g.dx < 0) translateX.setValue(g.dx);
        },
        onPanResponderRelease: (_, g) => {
          if (g.dx < -80) {
            Animated.timing(translateX, {
              toValue: -100,
              duration: 200,
              useNativeDriver: true,
            }).start(onOpen);
          } else {
            reset();
          }
        },
      })
    ).current;

    return (
      <View style={styles.wrapper}>
        <View style={styles.right}>{rightSlot}</View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[{ transform: [{ translateX }] }]}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
);

SwipeableCard.displayName = "SwipeableCard";

const styles = StyleSheet.create({
  wrapper: {
    // overflow: "hidden",
    borderRadius: 16,
    marginBottom: 10,
  },
  right: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});