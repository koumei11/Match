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
import Card from "./Card";
import persons from "../dummy-data/persons";
import Colors from "../constants/Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";

// ヘッダーの高さを指定
const HEADER_HEIGHT = Dimensions.get("window").height * 0.15;
// ステータスの高さを指定
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
// FlatListでアニメーションをするため
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedList = ({ navigation, filteredPersonList, renderItems }) => {
  // スクロールに応じてヘッダーを出し入れするためここでstateを宣言
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

  // スクロールの初期値を設定
  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  // スクロール時にイベントを設定
  useEffect(() => {
    // マウント時に発火
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

    // アンマウント時に関数ないが実行される
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

    // アニメーションの持続時間を設定
    Animated.timing(offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  // ヘッダーのアニメーション設定
  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [0, -(HEADER_HEIGHT - STATUS_BAR_HEIGHT + 50)],
    extrapolate: "clamp",
  });

  return (
    <>
      {filteredPersonList.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <FontAwesome name="search" size={24} style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 24 }}>検索結果：0件</Text>
          </View>
          <Text>条件をゆるくして検索しましょう！</Text>
        </View>
      ) : (
        <AnimatedFlatList
          data={filteredPersonList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return <View></View>;
          }}
          ListHeaderComponentStyle={{
            height:
              Platform.OS === "android"
                ? HEADER_HEIGHT - 30
                : HEADER_HEIGHT - 50,
          }}
          scrollEventThrottle={1}
          onMomentumScrollBegin={_onMomentumScrollBegin}
          onMomentumScrollEnd={_onMomentumScrollEnd}
          onScrollEndDrag={_onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
            { useNativeDriver: true }
          )}
          renderItem={renderItems}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Animated.View
        style={[
          styles.navbar,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <View style={styles.filter}>
          <View style={{ marginLeft: 5 }}>
            <Text style={styles.title}>さがす</Text>
            {filteredPersonList.length !== 0 ? (
              <Text style={styles.hit}>
                <Text style={styles.textHighlight}>
                  {filteredPersonList.length}
                </Text>
                人のお相手が見つかりました！
              </Text>
            ) : (
              <Text style={styles.hit}>お相手が見つかりませんでした。。。</Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.search}
            onPress={() => {
              navigation.navigate("Filter");
            }}
          >
            <Feather name="search" size={20} color={Colors.headerColor} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default AnimatedList;
