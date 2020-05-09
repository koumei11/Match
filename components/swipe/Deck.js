import React, { useState, useEffect, useRef } from "react";
import { Text, View, Animated, PanResponder, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TouchComponent from "../buttons/TouchComponent";
import Colors from "../../constants/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCards,
  navigation,
}) => {
  // カードのポジション
  const [pos, setPos] = useState(new Animated.ValueXY());
  // スムーズなアニメーションを実現するために2つ目のposを指定
  const [pos2, setPos2] = useState(new Animated.ValueXY());
  // スワイプのindex
  const [deckIndex, setDeckIndex] = useState(0);
  // もらったいいねのカウント数
  const [count, setCount] = useState(data.length);

  // アニメーションの設定
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // カードをドラッグするたびに呼ばれる
    onPanResponderMove: (event, gesture) => {
      pos.setValue({ x: gesture.dx, y: gesture.dy });
    },
    // カードのドラッグを離すと呼ばれる
    onPanResponderRelease: (event, gesture) => {
      // 動いていなかったらクリックしたとみなす
      if (gesture.dx === 0 && gesture.dy === 0) {
        navigation.navigate("Person", { id: data[deckIndex].id });
      } else if (gesture.dx > SWIPE_THRESHOLD) {
        // ある閾値まで動いたら右にスワイプ
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        // ある閾値まで動いたら左にスワイプ
        forceSwipe("left");
      } else {
        // 閾値まで行ってなければ元の場所に戻す
        resetPosition();
      }
    },
    // onPanResponderTerminate: (event, gesture) => {
    //   if (gesture.dx > SWIPE_THRESHOLD) {
    //     // ある閾値まで動いたら右にスワイプ
    //     forceSwipe("right");
    //   } else if (gesture.dx < -SWIPE_THRESHOLD) {
    //     // ある閾値まで動いたら左にスワイプ
    //     forceSwipe("left");
    //   } else {
    //     // 閾値まで行ってなければ元の場所に戻す
    //     resetPosition();
    //   }
    // },
  });

  useEffect(() => {
    setDeckIndex(0);
  }, [data, renderCard, onSwipeRight, onSwipeLeft, renderNoMoreCards]);

  // スワイプを強制
  const forceSwipe = (direction) => {
    // 画面幅の1.5倍のところまでスワイプ
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(pos, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION * 1.5,
    }).start(() => onSwipeComplete(direction));
  };

  // スワイプ終了時に呼ばれる
  const onSwipeComplete = (direction) => {
    const person = data[deckIndex];
    // 右スワイプ、左スワイプで別々の関数を呼び出す
    direction === "right" ? onSwipeRight(person) : onSwipeLeft(person);

    Animated.timing(pos2, {
      toValue: { x: 0, y: 0 },
      duration: 120,
    }).start(() => {
      pos.setValue({ x: 0, y: 0 });
      pos2.setValue({ x: 0, y: 0 });
      setCount((count) => count - 1);
      setDeckIndex((prevDeckIndex) => prevDeckIndex + 1);
    });
  };

  // スワイプが閾値まで行っていない場合は元の場所に戻す
  const resetPosition = () => {
    Animated.spring(pos, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  // スワイプのアニメーション設定
  const getCardStyle = () => {
    const rotate = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...pos.getLayout(),
      transform: [{ rotate }],
    };
  };

  // スワイプ時のopacityを設定
  const likeOpacity = pos.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
  });

  const dislikeOpacity = pos.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
  });

  // レンダー
  const renderCards = () => {
    // 全部スワイプし終えた時に呼ばれる
    if (deckIndex >= data.length) {
      return renderNoMoreCards();
    }

    return data.map((item, cardIndex) => {
      // すでにスワイプしたものはnullを返す
      if (cardIndex < deckIndex) {
        return null;
      }

      // 一番前にあるカードの設定
      if (cardIndex === deckIndex) {
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.card(cardIndex)]}
            {...panResponder.panHandlers}
          >
            <Animated.View style={{ ...styles.like, opacity: likeOpacity }}>
              <Text style={styles.good}>ありがとう！</Text>
            </Animated.View>
            <Animated.View
              style={{ ...styles.dislike, opacity: dislikeOpacity }}
            >
              <View>
                <Text style={styles.sorry}>ごめんね。。</Text>
              </View>
            </Animated.View>
            {renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View key={item.id} style={[styles.card(cardIndex)]}>
          <Animated.View style={{ ...styles.like, opacity: 0 }}>
            <View>
              <FontAwesome5 name="grin-beam" style={{ zIndex: 100 }} />
            </View>
          </Animated.View>
          <Animated.View style={{ ...styles.dislike, opacity: 0 }}>
            <View>
              <FontAwesome5 name="grin-beam" style={{ zIndex: 100 }} />
            </View>
          </Animated.View>
          {renderCard(item)}
        </Animated.View>
      );
    });
  };

  return (
    <View style={{ top: 10, height: "100%" }}>
      <View
        style={{
          ...styles.countContainer,
          display: count <= 0 ? "none" : "flex",
        }}
      >
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Animated.View style={pos2.getLayout()}>{renderCards()}</Animated.View>
      <Text style={styles.bottom}>スワイプできます</Text>
    </View>
  );
};

// デフォルト設定
Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
};

const styles = {
  card: (cardIndex) => ({
    position: "absolute",
    zIndex: cardIndex * -1,
  }),
  countContainer: {
    fontWeight: "bold",
    marginBottom: SCREEN_WIDTH * 0.1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: SCREEN_WIDTH * 0.6,
  },
  countText: {
    color: Colors.color1,
    fontWeight: "bold",
    position: "absolute",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.5,
  },
  like: {
    position: "absolute",
    zIndex: 100,
    top: SCREEN_WIDTH * 0.14,
    left: 10,
    transform: [{ rotate: "-30deg" }],
    borderRadius: 10,
  },
  good: {
    borderWidth: 1,
    borderColor: "#66CCCC",
    justifyContent: "center",
    fontSize: SCREEN_WIDTH * 0.04,
    padding: 10,
    color: "#66CCCC",
    fontWeight: "bold",
  },
  sorry: {
    borderWidth: 1,
    borderColor: "#E54E37",
    justifyContent: "center",
    fontSize: SCREEN_WIDTH * 0.04,
    padding: 10,
    color: "#E54E37",
    fontWeight: "bold",
  },
  dislike: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.14,
    right: 10,
    zIndex: 100,
    transform: [{ rotate: "30deg" }],
  },
  wrapper: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.12,
    fontSize: 12,
    width: SCREEN_WIDTH * 0.6,
    textAlign: "center",
    color: Colors.subColor2,
  },
};

export default Deck;
