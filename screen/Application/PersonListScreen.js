import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Animated,
} from "react-native";
import Card from "../../components/Card";
import persons from "../../dummy-data/persons";

const HEADER_HEIGHT = 100;

const PersonListScreen = () => {
  // Androidの場合は独自のエフェクトにする
  let TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={persons}
        ListHeaderComponent={() => {
          return <Text>HELLO</Text>;
        }}
        ListHeaderComponentStyle={{
          marginTop: Platform.OS === "android" ? 30 : 0,
          height: 100,
        }}
        renderItem={(itemData) => (
          <View style={{ borderWidth: 1, flex: 1 / 2 }}>
            <View
              style={{
                borderWidth: 1,
                padding: 10,
                // width: Dimensions.get("window").width * 0.46,
              }}
            >
              <TouchableCmp
                useForeground
                style={{
                  shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 1,
                  backgroundColor: "white",
                  elevation: 3,
                  borderRadius: 15,
                }}
                onPress={() => {
                  console.log("ERERER");
                }}
                activeOpacity={0.8}
              >
                <View style={{ borderRadius: 15, overflow: "hidden" }}>
                  <Card
                    // columnWrapperStyle={{ justifyContent: "space-between", flex: 1 }}
                    name={itemData.item.name}
                    age={itemData.item.age}
                    address={itemData.item.address}
                    imageUrl={itemData.item.image}
                    hasVideo={itemData.item.hasVideo}
                    intro={itemData.item.intro}
                    originalStyles={{
                      height: Dimensions.get("window").height * 0.33,
                    }}
                  />
                </View>
              </TouchableCmp>
            </View>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
  },
});

export default PersonListScreen;
