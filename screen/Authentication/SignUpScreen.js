import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import { CheckBox } from "react-native-elements";

const SendMailScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>メールアドレス</Text>
            <TextInput style={styles.inputBox} placeholder="メールアドレス" />
            <Text style={styles.header}>パスワード</Text>
            <TextInput style={styles.inputBox} placeholder="パスワード" />
            <Text style={styles.header}>パスワード(確認)</Text>
            <TextInput style={styles.inputBox} placeholder="パスワード(確認)" />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  marginLeft: 0,
                  position: "relative",
                  left: -10,
                }}
                checkedIcon="check-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#009341"
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
                checked={isChecked}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  position: "relative",
                  left: -25,
                }}
              >
                <TouchableOpacity activeOpacity={0.4} onPress={() => {}}>
                  <Text style={styles.privacy}>プライバシーポリシー</Text>
                </TouchableOpacity>
                <Text style={styles.privacy}>に同意します。</Text>
              </View>
            </View>
            <View
              style={{
                width: "70%",
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 30,
                backgroundColor: Colors.baseColor,
              }}
            >
              <Button
                title="送信"
                color={Platform.OS === "android" ? Colors.baseColor : "white"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    width: "65%",
    alignSelf: "center",
    paddingVertical: 40,
  },
  inputBox: {
    backgroundColor: Colors.subColor1,
    height: 50,
    padding: 10,
  },
  privacy: {
    fontSize: 12,
  },
  header: {
    color: "#333333",
    marginTop: 20,
    marginBottom: 5,
  },
});

export default SendMailScreen;
