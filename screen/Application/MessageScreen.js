import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>個別メッセージ画面</Text>
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

export default MessageScreen;
