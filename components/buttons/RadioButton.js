import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";

const RadioButton = ({ isSelected, onChange, children }) => {
  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <View
        style={{
          ...styles.component,
          borderColor: isSelected ? "#54595D" : "#CBCED0",
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  component: {
    height: 35,
    width: 65,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RadioButton;
