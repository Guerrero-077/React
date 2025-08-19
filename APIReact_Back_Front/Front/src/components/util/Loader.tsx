import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
  backgroundColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "#4a90e2",
  backgroundColor = "#f7f9fc",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
