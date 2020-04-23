import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const TouchComponent = ({ original, onButtonPress, children }) => {
  return (
    <TouchableOpacity
      style={{ ...original, ...styles.button }}
      onPress={onButtonPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TouchComponent;
