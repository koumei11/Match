import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../../components/Card";
import persons from "../../dummy-data/persons";
import AnimatedList from "../../components/AnimatedList";
import { useSelector } from "react-redux";

const PersonListScreen = ({ navigation, route }) => {
  const filterSettings = useSelector((state) => state.filters.filterSettings);
  console.log(filterSettings);
  const filteredPersonList = persons;

  // // フィルター条件を取得
  // let inputText;
  // let minAge;
  // let maxAge;
  // let minHeight;
  // let maxHeight;

  // if (route.params) {
  //   inputText = route.params.inputText;
  //   minAge = route.params.minAge;
  //   maxAge = route.params.maxAge;
  //   minHeight = route.params.minHeight;
  //   maxHeight = route.params.maxHeight;
  //   console.log(minAge);
  //   console.log(maxAge);
  // }

  // // フィルターされたリストの作成
  // const filteredPersonList = persons.filter((person) => {
  //   return (
  //     (inputText ? person.name.includes(inputText) : true) &&
  //     (minAge ? minAge <= person.age : true) &&
  //     (maxAge ? person.age <= maxAge : true) &&
  //     (minHeight ? minHeight <= person.height : true) &&
  //     (maxHeight ? person.height <= maxHeight : true)
  //   );
  // });

  // Androidの場合は独自のエフェクトにする
  let TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <SafeAreaView style={styles.screen}>
      <AnimatedList
        navigation={navigation}
        filteredPersonList={filteredPersonList}
        renderItems={(itemData) => (
          <View style={{ flex: 1 / 2 }}>
            <View
              style={{
                padding: 10,
                // width: Dimensions.get("window").width * 0.46,
              }}
            >
              <View style={styles.card}>
                <TouchableCmp
                  useForeground
                  style={{
                    borderRadius: 15,
                  }}
                  onPress={() => {
                    navigation.navigate("Person", { id: itemData.item.id });
                  }}
                  activeOpacity={0.8}
                >
                  <View style={{ borderRadius: 15, overflow: "hidden" }}>
                    <Card
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
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS ? 30 : 0,
    flex: 1,
  },
});

export default PersonListScreen;
