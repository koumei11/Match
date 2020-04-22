import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MatchListScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>マッチング画面</Text>
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

export default MatchListScreen;
