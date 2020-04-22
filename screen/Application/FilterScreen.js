import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>検索画面</Text>
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

export default SearchScreen;
