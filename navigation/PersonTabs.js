import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PersonListScreen from "../screen/Application/PersonListScreen";
import PersonDetailScreen from "../screen/Application/PersonDetailScreen";
import FilterScreen from "../screen/Application/FilterScreen";

const PersonTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Person" component={PersonListScreen} />
      <Tab.Screen name="Detail" component={PersonDetailScreen} />
      <Tab.Screen name="Filter" component={FilterScreen} />
    </Tab.Navigator>
  );
};

export default PersonTabs;
