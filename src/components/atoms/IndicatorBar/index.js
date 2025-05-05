import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const IndicatorBar = ({ progress = 0, height = 6, backgroundColor = "#e0e0e0", fillColor = "#208D33" }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={{ width: "100%", height, backgroundColor, borderRadius: height / 2 }}>
      <Animated.View
        style={{
          width: animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }),
          height: "100%",
          backgroundColor: fillColor,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
};

export default IndicatorBar;