import React, { useState, useRef } from "react";
import { Text, View, Dimensions } from "react-native";
import Deck from "./Deck";
import persons from "../../dummy-data/persons";
import Card from "../Card";
import Colors from "../../constants/Colors";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Swiper = (props) => {
  //   const [count, setCount] = useState(persons.length);
  const ref = useRef(persons);
  const renderCard = (person) => {
    return (
      <Card
        name={person.name}
        age={person.age}
        address={person.address}
        imageUrl={person.image}
        hasVideo={person.hasVideo}
        intro={person.intro}
        originalStyles={{
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_HEIGHT * 0.4,
          borderWidth: person.hasVideo ? 0 : 0,
        }}
      />
    );
  };

  // 右にスワイプされた時に発火
  const onSwipeRight = (item) => {
    console.log("Swiped Right!!!");
    // setData((data) => data.filter((person) => person.id !== item.id));
    // setCount((count) => count - 1);
    if (item) {
      ref.current = ref.current.filter((person) => person.id !== item.id);
      //   console.log(ref.current);
    } else {
      console.log(false);
    }
  };

  // 左にスワイプされた時に発火
  const onSwipeLeft = (item) => {
    console.log("Swiped Left!!!");
    // setData((data) => data.filter((person) => person.id !== item.id));
    // setCount((count) => count - 1);
    if (item) {
      ref.current = ref.current.filter((person) => person.id !== item.id);
      //   console.log(ref.current);
    } else {
      console.log(false);
    }
  };

  const renderNoMoreCards = () => {
    return (
      <View
        style={{
          marginRight: "31%",
          top: SCREEN_HEIGHT * 0.1,
        }}
      >
        <MaterialCommunityIcons
          name="cards-outline"
          size={SCREEN_HEIGHT * 0.1}
          color={Colors.headerColor}
          style={{ marginLeft: "27%", marginBottom: 30 }}
        />
        <Text
          style={{
            fontSize: 16,
            color: Colors.headerColor,
            marginBottom: 50,
          }}
        >
          もらった「いいね」がありません。
        </Text>
        <ButtonComponent originalStyles={{ backgroundColor: Colors.baseColor }}>
          <Text style={{ color: "white" }}>いいね！履歴を見る</Text>
        </ButtonComponent>
      </View>
    );
  };

  return (
    <View style={{ top: "5%" }}>
      <Deck
        data={persons.reverse()}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
      />
    </View>
  );
};

export default Swiper;
