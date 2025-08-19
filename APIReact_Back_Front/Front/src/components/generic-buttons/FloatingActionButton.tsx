import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
  backgroundColor?: string;
}

const FloatingActionButton: React.FC<Props> = ({
  onPress,
  iconName = "add",
  iconSize = 28,
  iconColor = "#fff",
  style,
  backgroundColor = "#4a90e2",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fab, { backgroundColor }, style]}
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default FloatingActionButton;
