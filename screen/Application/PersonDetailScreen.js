import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PersonDetailScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>お相手詳細画面</Text>
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

export default PersonDetailScreen;
