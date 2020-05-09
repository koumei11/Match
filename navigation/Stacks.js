import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import PersonListScreen from "../screen/Application/PersonListScreen";
import PersonDetailScreen from "../screen/Application/PersonDetailScreen";
import ReceiveGoodScreen from "../screen/Application/ReceiveGoodScreen";
import ReceiveHistoryScreen from "../screen/Application/ReceiveHistoryScreen";
import HomeScreen from "../screen/Application/HomeScreen";
import FilterScreen from "../screen/Application/FilterScreen";
import WrapScreen from "../screen/Application/WrapScreen";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import { createAppContainer } from "react-navigation";

// StackとTabを初期化
const Stack = createStackNavigator();

// export const PersonStack = createStackNavigator({
//     Person: {
//         screen: PersonListScreen
//     }
// })

// 「お相手」のStackを作成
export const PersonStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Strings.person}
        options={{
          title: "さがす",
          headerShown: false,
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
        options={{
          headerTintColor: Colors.headerColor,
          title: "絞り込み",
          tabBarVisible: false,
        }}
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
};

// 「相手から」のStackを作成
export const ReceiveStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Strings.receive}
        options={{
          headerTintColor: Colors.headerColor,
          title: "お相手からのいいね！",
          headerRight: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("History");
                }}
              >
                <FontAwesome
                  name="history"
                  size={20}
                  color={Colors.headerColor}
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            );
          },
        }}
        component={ReceiveGoodScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonDetailScreen}
      />
      <Stack.Screen
        name="History"
        options={{ headerTintColor: Colors.headerColor, title: "絞り込み" }}
        component={ReceiveHistoryScreen}
      />
    </Stack.Navigator>
  );
};

// 「メッセージ」のStackを作成
// メッセージの部分はトップタブがあるのでそれぞれのページをラップするScreenをcomponentとしている
export const WrapStack = () => {
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
        navigationOptions={{
          tabBarVisible: false,
        }}
        component={WrapScreen}
      />
    </Stack.Navigator>
  );
};

// 「自分」のStackを作成
export const HomeStack = () => {
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
