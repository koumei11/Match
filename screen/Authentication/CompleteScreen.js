import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";

const CompleteScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        padding: 50,
        alignItems: "center",
      }}
    >
      <Text>ようこそ、MATCHへ！</Text>
      <Text style={{ marginTop: 10, marginBottom: 20 }}>
        ご登録が完了しました！
      </Text>
      <TouchableOpacity activeOpacity={0.4}>
        <Text style={{ color: Colors.buttonColor }}>
          プロフィール登録へすすむ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteScreen;
