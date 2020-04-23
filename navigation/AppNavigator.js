import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import PersonListScreen from "../screen/Application/PersonListScreen";
import PersonDetailScreen from "../screen/Application/PersonDetailScreen";
import ReceiveGoodScreen from "../screen/Application/ReceiveGoodScreen";
import ReceiveHistoryScreen from "../screen/Application/ReceiveHistoryScreen";
import HomeScreen from "../screen/Application/HomeScreen";
import FilterScreen from "../screen/Application/FilterScreen";
import WrapScreen from "../screen/Application/WrapScreen";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import Person from "../models/Person";

import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";

// デモデータ
const person = new Person(1, "こう", 1, 20, 178, "東京");

// StackとTabを初期化
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 「お相手」のStackを作成
const PersonStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Strings.person}
        options={{
          title: "さがす",
          headerShown: false,
          headerTintColor: Colors.headerColor,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="filter"
                iconName={
                  Platform.OS === "android" ? "md-search" : "ios-search"
                }
                onPress={() => {
                  console.log("HeaderButton!");
                }}
              />
            </HeaderButtons>
          ),
        }}
        component={PersonListScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonDetailScreen}
      />
      <Stack.Screen
        name={Strings.search}
        options={{ headerTintColor: Colors.headerColor }}
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
};

// 「相手から」のStackを作成
const ReceiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Strings.receive}
        options={{
          headerTintColor: Colors.headerColor,
          title: "お相手からのいいね！",
        }}
        component={ReceiveGoodScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonDetailScreen}
      />
      <Stack.Screen
        name={Strings.sentence1}
        options={{ headerTintColor: Colors.headerColor }}
        component={ReceiveHistoryScreen}
      />
    </Stack.Navigator>
  );
};

// 「メッセージ」のStackを作成
// メッセージの部分はトップタブがあるのでそれぞれのページをラップするScreenをcomponentとしている
const WrapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Strings.message}
        options={{
          headerStyle: {
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTintColor: Colors.headerColor,
        }}
        component={WrapScreen}
      />
    </Stack.Navigator>
  );
};

// 「自分」のStackを作成
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Strings.home}
        options={{ headerShown: false }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

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

export default AppNavigator = () => {
  return (
    // それぞれのスタックをボトムタブに入れ込む
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor:
            person.sex === 1 ? Colors.tabActiveColor1 : Colors.tabActiveColor2,
        }}
        screenOptions={iconOption}
      >
        <Tab.Screen name={Strings.person} component={PersonStack} />
        <Tab.Screen name={Strings.receive} component={ReceiveStack} />
        <Tab.Screen name={Strings.message} component={WrapStack} />
        <Tab.Screen name={Strings.home} component={HomeStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
