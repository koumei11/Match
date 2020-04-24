import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const ButtonComponent = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonStyle, ...props.originalStyles }}
      activeOpacity={0.6}
      onPress={props.onButtonPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 30,
  },
});

export default ButtonComponent;
