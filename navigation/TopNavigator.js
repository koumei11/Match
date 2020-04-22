import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MessageListScreen from "../screen/Application/MessageListScreen";
import MessageScreen from "../screen/Application/MessageScreen";
import MatchListScreen from "../screen/Application/MatchListScreen";
import PersonDetailScreen from "../screen/Application/PersonDetailScreen";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Person from "../models/Person";
import Strings from "../constants/Strings";

// デモデータ
const person = new Person(1, "こう", 1, 20, 178, "東京");

// StackとTabを初期化
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

// 「マッチング」のスタックを作成
const MatchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MatchList"
        options={{ headerShown: false }}
        component={MatchListScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonDetailScreen}
      />
    </Stack.Navigator>
  );
};

// 「メッセージ」のスタックを作成
const MessageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessageList"
        options={{ headerShown: false }}
        component={MessageListScreen}
      />
      <Stack.Screen
        name="Message(Person name)"
        options={{ headerTintColor: Colors.headerColor }}
        component={MessageScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonDetailScreen}
      />
    </Stack.Navigator>
  );
};

// アイコンを設定
const iconOption = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => {
    let iconName;
    // 条件によってアイコンを切り替える
    if (route.name === Strings.match) {
      // フォーカスされていなければ別々のアイコンを設定
      iconName = focused ? "heart" : "hearto";
    } else {
      iconName = "message1";
    }
    return <AntDesign name={iconName} size={20} color={color} />;
  },
});

export default TopNavigator = () => {
  return (
    // それぞれのスタックをトップタブに入れ込む
    <Tab.Navigator
      initialRouteName="MatchList"
      tabBarOptions={{
        activeTintColor:
          person.sex === 1 ? Colors.tabActiveColor1 : Colors.tabActiveColor2,
        inactiveTintColor: Colors.tabInactiveColor,
        showIcon: true,
        indicatorStyle: {
          backgroundColor:
            person.sex === 1 ? Colors.tabActiveColor1 : Colors.tabActiveColor2,
        },
        style: {
          backgroundColor: "white",
        },
        labelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },
        pressOpacity: 0.7,
      }}
      screenOptions={iconOption}
    >
      <Tab.Screen name={Strings.match} component={MatchStack} />
      <Tab.Screen name={Strings.message} component={MessageStack} />
    </Tab.Navigator>
  );
};
