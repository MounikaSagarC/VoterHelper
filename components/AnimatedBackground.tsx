import { Dimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect } from "react";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

type Variant = "blue" | "purple" | "green";

interface Props {
  variant?: Variant;
}

export default function AnimatedBackground({ variant = "blue" }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 10000 }),
      -1,
      true
    );
  }, []);

  const gradientStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ["#3B82F6", "#A855F7", "#EC4899"]
    );

    return { backgroundColor: bg };
  });

  return (
    <View className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient */}
      <Animated.View
        style={[
          { width, height, position: "absolute" },
          gradientStyle,
        ]}
      >
        <LinearGradient
          colors={["#3B82F6", "#A855F7", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Floating Shapes */}
      {[...Array(5)].map((_, i) => (
        <FloatingBlob key={i} />
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle key={i} />
      ))}

      {/* Grid Overlay */}
      <View className="absolute inset-0 opacity-[0.04]">
        {[...Array(30)].map((_, i) => (
          <View
            key={i}
            className="border-b border-white"
            style={{ height: 40 }}
          />
        ))}
      </View>
    </View>
  );
}

/* Floating Blob */

function FloatingBlob() {
  const x = useSharedValue(Math.random() * width);
  const y = useSharedValue(Math.random() * height);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(Math.random() * width, {
        duration: 20000 + Math.random() * 8000,
      }),
      -1,
      true
    );

    y.value = withRepeat(
      withTiming(Math.random() * height, {
        duration: 20000 + Math.random() * 8000,
      }),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          width: 200,
          height: 200,
          borderRadius: 100,
          position: "absolute",
        },
      ]}
    >
      <BlurView intensity={60} className="flex-1 rounded-full bg-white/10" />
    </Animated.View>
  );
}

/* Floating Particle */

function FloatingParticle() {
  const x = useSharedValue(Math.random() * width);
  const y = useSharedValue(Math.random() * height);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(Math.random() * width, { duration: 15000 }),
      -1,
      true
    );
    y.value = withRepeat(
      withTiming(Math.random() * height, { duration: 15000 }),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: "white",
          position: "absolute",
        },
      ]}
    />
  );
}
