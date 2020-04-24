import React, { useState, useEffect } from "react";
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
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const HEADER_HEIGHT = Dimensions.get("window").height * 0.15;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PersonListScreen = () => {
  // Androidの場合は独自のエフェクトにする
  let TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const [scrollAnim, setScrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim, setOffsetAnim] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnim
      ),
      0,
      HEADER_HEIGHT - STATUS_BAR_HEIGHT
    )
  );

  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  useEffect(() => {
    scrollAnim.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        HEADER_HEIGHT - STATUS_BAR_HEIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });

    return () => {
      scrollAnim.removeAllListeners();
      offsetAnim.removeAllListeners();
    };
  }, []);

  let _scrollEndTimer;
  const _onScrollEndDrag = () => {
    _scrollEndTimer = setTimeout(_onMomentumScrollEnd, 250);
  };

  const _onMomentumScrollBegin = () => {
    clearTimeout(_scrollEndTimer);
  };

  const _onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > HEADER_HEIGHT &&
      _clampedScrollValue > (HEADER_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? _offsetValue + HEADER_HEIGHT
        : _offsetValue - HEADER_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [0, -(HEADER_HEIGHT - STATUS_BAR_HEIGHT + 50)],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.screen}>
      <AnimatedFlatList
        data={persons}
        ListHeaderComponent={() => {
          return <View></View>;
        }}
        ListHeaderComponentStyle={{
          height:
            Platform.OS === "android" ? HEADER_HEIGHT - 30 : HEADER_HEIGHT - 50,
        }}
        scrollEventThrottle={1}
        onMomentumScrollBegin={_onMomentumScrollBegin}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        onScrollEndDrag={_onScrollEndDrag}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
          { useNativeDriver: true }
        )}
        renderItem={(itemData) => (
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
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
      <Animated.View
        style={[
          styles.navbar,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <View style={styles.filter}>
          <View style={{ marginLeft: 5 }}>
            <Text style={styles.title}>さがす</Text>
            <Text style={styles.hit}>
              <Text style={styles.textHighlight}>{persons.length}</Text>
              人のお相手が見つかりました！
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles.search}>
            <Feather name="search" size={20} color={Colors.headerColor} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS ? 30 : 0,
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: HEADER_HEIGHT,
    padding: STATUS_BAR_HEIGHT - 12,
    paddingBottom: 20,
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.headerColor,
    top: Dimensions.get("screen").height * 0.02,
  },
  hit: {
    fontSize: 12,
    color: Colors.headerColor,
    top: Dimensions.get("screen").height * 0.03,
  },
  textHighlight: {
    fontWeight: "bold",
    color: Colors.color1,
    fontSize: 16,
  },
  search: {
    marginRight: 5,
    top: Dimensions.get("screen").height * 0.04,
  },
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 3,
    borderRadius: 15,
  },
});

export default PersonListScreen;
