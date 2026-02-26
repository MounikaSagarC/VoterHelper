// components/ui/Card.tsx
import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

type CardProps = ViewProps & {
  children: React.ReactNode;
};

const Card = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
card: {
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,

  // Android shadow
  elevation: 5,

  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
},
});