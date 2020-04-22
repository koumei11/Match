import React from "react";
import {
  Text,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Deck from "./Deck";
import persons from "../../dummy-data/persons";
import Card from "../Card";

const Swiper = () => {
  const renderCard = (person) => {
    return (
      <Card
        name={person.name}
        age={person.age}
        address={person.address}
        imageUrl={person.image}
        hasVideo={person.hasVideo}
        originalStyles={{
          width: Dimensions.get("window").width * 0.5,
          height: Dimensions.get("window").height * 0.4,
        }}
      />
    );
  };

  // 右にスワイプされた時に発火
  const onSwipeRight = (item) => {
    console.log("Swiped Right!!!");
  };

  // 左にスワイプされた時に発火
  const onSwipeLeft = (item) => {
    console.log("Swiped Left!!!");
  };

  const renderNoMoreCards = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>終わり</Text>
      </View>
    );
  };

  return (
    <Deck
      data={persons}
      renderCard={renderCard}
      renderNoMoreCards={renderNoMoreCards}
      onSwipeRight={onSwipeRight}
      onSwipeLeft={onSwipeLeft}
    />
  );
};

export default Swiper;
