import React from "react";
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
} from "react-native";
import Card from "../../components/Card";
import persons from "../../dummy-data/persons";

const PersonListScreen = () => {
  // Androidの場合は独自のエフェクトにする
  let TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={persons}
        columnWrapperStyle={{}}
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
                onPress={() => {
                  console.log("ERERER");
                }}
                useForeground
              >
                <Card
                  // columnWrapperStyle={{ justifyContent: "space-between", flex: 1 }}
                  name={itemData.item.name}
                  age={itemData.item.age}
                  address={itemData.item.address}
                  imageUrl={itemData.item.image}
                  hasVideo={itemData.item.hasVideo}
                  originalStyles={{
                    height: Dimensions.get("window").height * 0.33,
                  }}
                />
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
