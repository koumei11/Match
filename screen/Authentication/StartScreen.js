import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useFonts } from "@use-expo/font";

import ButtonComponent from "../../components/buttons/ButtonComponent";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";
import { AppLoading } from "expo";

const StartScreen = () => {
  let [fontsLoaded] = useFonts({
    "open-sans": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.login}
              activeOpacity={0.6}
              onPress={() => {}}
            >
              <Text style={styles.loginText}>ログイン</Text>
            </TouchableOpacity>
            <View style={styles.content}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../../assets/image/heart.png")}
              />
              <Text style={styles.name}>{Strings.app}</Text>
            </View>
            <View style={styles.registerContainer}>
              <ButtonComponent
                originalStyles={styles.mail}
                onButtonPress={() => {
                  console.log("メールアドレス");
                }}
              >
                <Text style={styles.mailText}>メールアドレスではじめる</Text>
              </ButtonComponent>
              <ButtonComponent
                originalStyles={styles.fb}
                onButtonPress={() => {
                  console.log("Facebook");
                }}
              >
                <FontAwesome name="facebook" style={styles.fbIcon} />
                <Text style={styles.fbText}>Facebookではじめる</Text>
              </ButtonComponent>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  login: {
    alignItems: "center",
    alignSelf: "flex-end",
    marginVertical: 20,
    marginRight: 40,
    width: 70,
  },
  loginText: {
    color: Colors.textColor1,
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 48,
    color: Colors.baseColor,
    fontFamily: "open-sans",
  },
  registerContainer: {
    flex: 1,
    alignItems: "center",
  },
  mail: {
    backgroundColor: Colors.baseColor,
    width: "65%",
    marginBottom: 45,
  },
  mailText: {
    color: "white",
    fontSize: 16,
  },
  fb: {
    backgroundColor: Colors.fbColor,
    flexDirection: "row",
    width: "65%",
  },
  fbIcon: {
    color: "white",
    fontSize: 20,
    marginRight: 20,
  },
  fbText: {
    color: "white",
    fontSize: 16,
  },
});

export default StartScreen;
