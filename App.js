import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import StartScreen from "./screen/Authentication/StartScreen";
import SignInScreen from "./screen/Authentication/SignInScreen";
import AuthNavigator from "./navigation/AuthNavigator";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  // return <AuthNavigator />;
  return <AppNavigator />;
}
