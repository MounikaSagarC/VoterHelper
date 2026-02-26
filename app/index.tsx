import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function VoteLandingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(40)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -8,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={["#E8DDFF", "#73ebe7"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/image__3.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <AnimatedView
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] },
        ]}
      >
        {/* Illustration */}
        <AnimatedImage
          source={require("../assets/images/background-removebg-preview.png")}
          resizeMode="contain"
          style={[
            styles.illustration,
            { transform: [{ translateY: floatAnim }] },
          ]}
        />

        {/* Text */}
        <Text style={styles.title}>The World`s Most Popular</Text>
        <Text style={styles.title}>Voting Guide</Text>

        <Text style={styles.subtitle}>
          Find information about elections, political parties, candidates,
          voting states, and political issues
        </Text>

        {/* Button */}
        <Pressable>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Pressable>
      </AnimatedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 112, // pt-28
    height: 40,
  },

  logo: {
    width: 160,
    height: 120,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  illustration: {
    width: width * 0.9,
    height: 260,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#5B3FD9",
  },

  subtitle: {
    marginBottom: 32,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    color: "#7B6F9E",
  },

  button: {
    backgroundColor: "#6B4EFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

