import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const SelectBox = ({ isSelected, onChange, children }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onChange}>
        <View style={styles.selectBox}>
          {isSelected ? (
            <View style={styles.selected}>
              <AntDesign name="check" size={16} color="white" />
            </View>
          ) : (
            <View style={styles.notSelected}></View>
          )}
          <Text>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  selected: {
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 2,
    borderColor: Colors.buttonColor2,
    height: 20,
    width: 20,
    backgroundColor: Colors.buttonColor2,
  },
  notSelected: {
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 2,
    borderColor: "#C4C4C4",
    height: 20,
    width: 20,
  },
});

export default SelectBox;
