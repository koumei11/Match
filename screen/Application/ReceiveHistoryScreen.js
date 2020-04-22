import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReceiveHistoryScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>good履歴</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReceiveHistoryScreen;
