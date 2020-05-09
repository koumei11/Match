import React from "react";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Person from "../models/Person";
import { PersonStack, ReceiveStack, WrapStack, HomeStack } from "./Stacks";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";

// デモデータ
const person = new Person(1, "こう", 1, 20, 178, "東京");

// アイコンを設定
const iconOption = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => {
    if (route.name === Strings.person) {
      return <Feather name="search" size={20} color={color} />;
    } else if (route.name === Strings.receive) {
      return <FontAwesome name="thumbs-o-up" size={20} color={color} />;
    } else if (route.name === Strings.message) {
      return <Feather name="message-circle" size={20} color={color} />;
      // return <Icon name="message-circle" type="feather" color={color} />;
    } else {
      // フォーカスされていなければ別々のアイコンを返す
      return focused ? (
        <MaterialIcons name="person" size={20} color={color} />
      ) : (
        <MaterialIcons name="person-outline" size={20} color={color} />
      );
    }
  },
});

const BottomTabNavigator = () => {
  // タブを初期化
  const Tab = createBottomTabNavigator();

  // ボトムタブを表示するか判定
  const getVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";
    if (routeName === "Filter" || routeName === "Person") {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor:
          person.sex === 1 ? Colors.tabActiveColor1 : Colors.tabActiveColor2,
      }}
      screenOptions={iconOption}
    >
      <Tab.Screen
        name={Strings.person}
        component={PersonStack}
        options={({ route }) => ({
          title: "さがす",
          tabBarVisible: getVisibility(route),
        })}
      />
      <Tab.Screen name={Strings.receive} component={ReceiveStack} />
      <Tab.Screen name={Strings.message} component={WrapStack} />
      <Tab.Screen name={Strings.home} component={HomeStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
