import React, { useState, useEffect, useMemo } from "react";
import { Text, View, Animated, PanResponder, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCards,
}) => {
  const [pos, setPos] = useState(new Animated.ValueXY());
  // スムーズなアニメーションを実現するために2つ目のposを指定
  const [pos2, setPos2] = useState(new Animated.ValueXY());
  const [deckIndex, setDeckIndex] = useState(0);
  const [count, setCount] = useState(data.length);
  // 頻繁に呼ばれるためuseMemoでキャッシュしておく
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        // カードをドラッグするたびに呼ばれる
        onPanResponderMove: (event, gesture) => {
          pos.setValue({ x: gesture.dx, y: gesture.dy });
        },
        // カードのドラッグを離すと呼ばれる
        onPanResponderRelease: (event, gesture) => {
          // 動いていなかったらクリックしたとみなす
          if (gesture.dx === 0 && gesture.dy === 0) {
            console.log("navigationする");
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
      }),
    []
  );

  useEffect(() => {
    setDeckIndex(0);
  }, [data, renderCard, onSwipeRight, onSwipeLeft, renderNoMoreCards]);

  // スワイプを強制
  const forceSwipe = (direction) => {
    // 画面幅の1.5倍のところまでスワイプ
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(pos, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  // スワイプ終了時に呼ばれる
  const onSwipeComplete = (direction) => {
    const item = data[deckIndex];
    // 右スワイプ、左スワイプで別々の関数を呼び出す
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);

    // スワイプしたら次のカードが少し上がるようにする
    Animated.timing(pos2, {
      toValue: { x: 0, y: -10 },
      duration: 300,
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
            {renderCard(item)}
          </Animated.View>
        );
      }

      // 後ろには３枚までのカードを重ねて表示
      if (cardIndex < deckIndex + 3) {
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.card(cardIndex),
              { top: 10 * (cardIndex - deckIndex) },
            ]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
    });
  };

  return (
    <View>
      <Text style={{ display: count === 0 ? "none" : "flex" }}>{count}</Text>
      <Animated.View style={pos2.getLayout()}>{renderCards()}</Animated.View>
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
};

export default Deck;
