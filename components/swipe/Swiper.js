import React, { useState, useRef } from "react";
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
  //   const [count, setCount] = useState(persons.length);
  //   const ref = useRef(persons);
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
    // setData((data) => data.filter((person) => person.id !== item.id));
    // setCount((count) => count - 1);
    // console.log(item);
    // ref.current = ref.current.filter((person) => person.id !== item.id);
  };

  // 左にスワイプされた時に発火
  const onSwipeLeft = (item) => {
    console.log("Swiped Left!!!");
    // setData((data) => data.filter((person) => person.id !== item.id));
    // setCount((count) => count - 1);
    // console.log(item);
    // ref.current = ref.current.filter((person) => person.id !== item.id);
  };

  const renderNoMoreCards = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>終わり</Text>
      </View>
    );
  };

  return (
    <View style={{ top: "15%" }}>
      {/* <Text>{ref.current.length}</Text> */}
      {/* <Text>{count}</Text> */}
      <Deck
        data={persons}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
      />
    </View>
  );
};

export default Swiper;
