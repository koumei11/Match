import React from "react";
import { View, Text, Button, Platform } from "react-native";
import Colors from "../../constants/Colors";

const OpenMailScreen = () => {
  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 50 }}>
      <Text style={{ fontSize: 16, lineHeight: 25, marginBottom: 30 }}>
        xxxxxx@gmail.com宛にメールを送信しました。メールを開いて登録を完了してください。
      </Text>
      <View
        style={{
          backgroundColor: Colors.baseColor,
          width: "70%",
          alignSelf: "center",
        }}
      >
        <Button
          title="メールを開く"
          color={Platform.OS === "android" ? Colors.baseColor : "white"}
        />
      </View>
    </View>
  );
};

export default OpenMailScreen;
