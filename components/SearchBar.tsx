import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value = "",
  onChangeText,
  onClear,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setInputValue("");
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={handleChange}
      />
      <TouchableOpacity
        onPress={inputValue ? handleClear : undefined}
        style={styles.iconContainer}
      >
        {inputValue ? (
          <Ionicons name="close-circle" size={24} color="#666" />
        ) : (
          <Ionicons name="search" size={24} color="#666" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginHorizontal:20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderColor:'gray',
    borderWidth:1,
    paddingHorizontal: 10,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconContainer: {
    marginLeft: 8,
  },
});