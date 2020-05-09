import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";

export default AppNavigator = () => {
  return (
    // それぞれのスタックをボトムタブに入れ込む
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
