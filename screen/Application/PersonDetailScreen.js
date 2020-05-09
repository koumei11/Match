import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PersonDetailScreen = ({ route, navigation }) => {
  const id = route.params.id;
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
      >
        <Text>←</Text>
      </TouchableOpacity>
      <Text>この人のidは{id}です。</Text>
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
