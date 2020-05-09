import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Buttons from "../../components/buttons/Buttons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const PickerSelect = ({
  onMinChange,
  onMaxChange,
  setFilter,
  closeModal,
  items1,
  items2,
  modalMin,
  modalMax,
}) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.scope}>
        <View style={styles.min}>
          <RNPickerSelect
            onValueChange={onMinChange}
            items={items1}
            value={modalMin}
            placeholder={{ label: "気にしない", value: "" }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <Text>〜</Text>
        <View style={styles.max}>
          <RNPickerSelect
            onValueChange={onMaxChange}
            items={items2}
            value={modalMax}
            placeholder={{ label: "気にしない", value: "" }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>
      <Buttons onPressCancel={closeModal} onPressComplete={setFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  min: {
    width: SCREEN_WIDTH * 0.42,
    // backgroundColor: "blue",
  },
  max: {
    width: SCREEN_WIDTH * 0.42,
    // backgroundColor: "blue",
  },
  scope: {
    flexDirection: "row",
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    overflow: "hidden",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    // backgroundColor: "red",
    height: 30,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default PickerSelect;
