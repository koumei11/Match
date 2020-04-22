import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageListScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>メッセージ一覧画面</Text>
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

export default MessageListScreen;
