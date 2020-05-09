import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const FilterButtons = ({ onReset, onComplete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>リセット</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onComplete}
      >
        <Text style={styles.buttonText}>この条件で検索</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    paddingBottom: Platform.OS === "ios" ? 20 : 5,
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.buttonColor2,
    padding: 20,
    width: "40%",
    borderRadius: 30,
  },
  buttonText: {
    color: Colors.buttonColor2,
    fontSize: 12,
    textAlign: "center",
  },
});

export default FilterButtons;
