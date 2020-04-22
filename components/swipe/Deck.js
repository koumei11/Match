import React, { useState, useEffect, useMemo } from "react";
import { Animated, PanResponder, Dimensions } from "react-native";

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
          }
          // ある閾値まで動いたら右にスワイプ
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe("right");
            // ある閾値まで動いたら左にスワイプ
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
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
      duration: SWIPE_OUT_DURATION, //
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[deckIndex];
    // direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);

    Animated.timing(pos2, {
      toValue: { x: 0, y: -10 },
      duration: 300,
    }).start(() => {
      pos.setValue({ x: 0, y: 0 });
      pos2.setValue({ x: 0, y: 0 });
      setDeckIndex((prevDeckIndex) => prevDeckIndex + 1);
    });
  };

  const resetPosition = () => {
    Animated.spring(pos, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

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

  const renderCards = () => {
    if (deckIndex >= data.length) {
      return renderNoMoreCards();
    }

    return data.map((item, cardIndex) => {
      if (cardIndex < deckIndex) {
        return null;
      }

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
    <Animated.View style={pos2.getLayout()}>{renderCards()}</Animated.View>
  );
};

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
