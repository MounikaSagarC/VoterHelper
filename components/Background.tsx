import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, View } from "react-native";

const { width, height } = Dimensions.get("window");

const ICONS = [
  require("../assets/images/icon.png"),
  require("../assets/images/icon1.png"),
  require("../assets/images/icon2.png"),
  require("../assets/images/icon3.png"),
  require("../assets/images/icon5.avif"),
  require("../assets/images/icon6.jpg"),
  require("../assets/images/icon7.jpg"),
  require("../assets/images/icon8.png"),
  require("../assets/images/icon9.png"),
  require("../assets/images/icon10.jpg"),
];

const ICON_COUNT = 70;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingBackground() {
  return (
    <View className="absolute inset-0">
      {Array.from({ length: ICON_COUNT }).map((_, index) => (
        <FloatingIcon key={index} icon={ICONS[index % ICONS.length]} />
      ))}
    </View>
  );
}

function FloatingIcon({ icon }: { icon: any }) {
  const translateY = useRef(new Animated.Value(0)).current;

  const left = random(0, width - 40);
  const top = random(0, height - 40);
  const size = random(20, 50);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: random(2000, 4000),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 10,
          duration: random(2000, 4000),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left,
        top,
        transform: [{ translateY }],
        opacity: 0.15,
      }}
    >
      <Image
        source={icon}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}
