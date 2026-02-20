import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Pressable,
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
    <LinearGradient
      colors={["#E8DDFF", "#73ebe7"]}
      className="flex-1"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-28 h-10">
        {/* Logo */}
        <Image
          source={require("../assets/images/image__3.png")}
          className="h-30 w-40"
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <AnimatedView
        className="flex-1 items-center justify-center px-5"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
        }}
      >
        {/* Illustration */}
        <AnimatedImage
          source={require("../assets/images/background-removebg-preview.png")}
          resizeMode="contain"
          className="mb-5"
          style={{
            width: width * 0.9,
            height: 260,
            transform: [{ translateY: floatAnim }],
          }}
        />

        {/* Text */}
        <Text className="text-2xl font-extrabold text-[#5B3FD9]">
          The World`s Most Popular 
        </Text>
        <Text className="mb-2 text-2xl font-extrabold text-[#5B3FD9]">
           Voting Guide
        </Text>

        <Text className="mb-8 text-center text-sm leading-5 text-[#7B6F9E]">
          Find information about elections, political parties, candidates, voting states, and political issues
        </Text>

        {/* Buttons */}
        <Pressable>
          <TouchableOpacity className="rounded-full bg-[#6B4EFF] px-6 py-3">
            <Text className="font-semibold text-white" onPress={()=>{router.replace("/(auth)/login")}}>Get Started</Text>
          </TouchableOpacity>
        </Pressable>
      </AnimatedView>
    </LinearGradient>
  );
}
