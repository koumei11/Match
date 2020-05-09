import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

const Buttons = ({ onPressComplete, onPressCancel }) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        onPress={onPressCancel}
        style={styles.cancel}
        activeOpacity={0.7}
      >
        <Text style={{ color: Colors.buttonColor2 }}>キャンセル</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressComplete}
        style={styles.ok}
        activeOpacity={0.7}
      >
        <Text style={{ color: Colors.buttonColor2 }}>決定</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    alignSelf: "flex-end",
    flexDirection: "row",
    padding: 10,
  },
  ok: {
    marginLeft: 10,
    padding: 10,
  },
  cancel: {
    padding: 10,
  },
});

export default Buttons;
