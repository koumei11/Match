import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../constants/Colors";

const AuthKeyScreen = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={{ lineHeight: 20 }}>
          【パスワード再発行認証】メール内にある「認証キー」をご入力ください。
        </Text>
        <TextInput
          style={{
            backgroundColor: Colors.subColor1,
            height: 50,
            marginVertical: 30,
            padding: 10,
          }}
          placeholder="認証キー"
        />
        <View style={{ alignItems: "center" }}>
          <Button title="送信する" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "white",
    flex: 1,
  },
});

export default AuthKeyScreen;
