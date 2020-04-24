import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screen/Authentication/StartScreen";
import SignInScreen from "../screen/Authentication/SignInScreen";
import SignUpScreen from "../screen/Authentication/SignUpScreen";
import ResetPasswordScreen from "../screen/Authentication/ResetPasswordScreen";
import AuthKeyScreen from "../screen/Authentication/AuthKeyScreen";
import OpenMailScreen from "../screen/Authentication/OpenMailScreen";
import CompleteScreen from "../screen/Authentication/CompleteScreen";
import EditProfileScreen from "../screen/Authentication/EditProfileScreen";

import Colors from "../constants/Colors";
import Strings from "../constants/Strings";

// StackとTabを初期化
const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: Strings.app,
        headerTintColor: Colors.baseColor,
      }}
    >
      {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
      {/* <Stack.Screen
        name="Start"
        options={{
          headerShown: false,
        }}
        component={StartScreen}
      /> */}
      {/* <Stack.Screen name="Password" component={ResetPasswordScreen} /> */}
      {/* <Stack.Screen name="Auth" component={AuthKeyScreen} /> */}
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      {/* <Stack.Screen name="OpenMail" component={OpenMailScreen} /> */}
      {/* <Stack.Screen name="Complete" component={CompleteScreen} /> */}
      {/* <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator = () => {
  return <NavigationContainer>{LoginStack()}</NavigationContainer>;
};
