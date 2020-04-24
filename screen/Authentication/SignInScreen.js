import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ButtonComponent from "../../components/buttons/ButtonComponent";

import { useFonts } from "@use-expo/font";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { AppLoading } from "expo";

const SignInScreen = () => {
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
            <View>
              <Text
                style={{
                  color: Colors.textColor2,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                メールアドレスでログイン
              </Text>
              <TextInput style={styles.inputBox} placeholder="メールアドレス" />
              <TextInput style={styles.inputBox} placeholder="パスワード" />
            </View>
            <ButtonComponent
              originalStyles={styles.mail}
              onButtonPress={() => {
                console.log("メールアドレスでログイン");
              }}
            >
              <Text style={styles.mailText}>ログイン</Text>
            </ButtonComponent>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.line}></View>
              <Text style={styles.subColor2}>または</Text>
              <View style={styles.line}></View>
            </View>
            <ButtonComponent
              originalStyles={styles.fb}
              onButtonPress={() => {
                console.log("Facebookでログイン");
              }}
            >
              <FontAwesome name="facebook" style={styles.fbIcon} />
              <Text style={styles.fbText}>Facebookでログイン</Text>
            </ButtonComponent>
            <TouchableOpacity
              style={{
                textAlign: "center",
                width: 90,
                alignSelf: "center",
                marginTop: 30,
              }}
            >
              <Text style={{ textAlign: "center", color: Colors.subColor2 }}>
                はじめての方
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                textAlign: "center",
                marginTop: 30,
                width: 145,
                alignSelf: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: Colors.subColor2 }}>
                パスワードを忘れた方
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    width: "65%",
    alignSelf: "center",
    paddingVertical: 45,
  },
  inputBox: {
    backgroundColor: Colors.subColor1,
    height: 50,
    marginVertical: 15,
    padding: 10,
  },
  mail: {
    backgroundColor: Colors.baseColor,
    marginVertical: 30,
  },
  mailText: {
    color: "white",
    fontSize: 16,
  },
  line: {
    backgroundColor: Colors.subColor2,
    height: 1,
    width: "30%",
  },
  fb: {
    backgroundColor: Colors.fbColor,
    flexDirection: "row",
    marginVertical: 30,
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

export default SignInScreen;
