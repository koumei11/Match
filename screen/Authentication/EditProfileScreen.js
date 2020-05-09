import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import RadioButton from "../../components/buttons/RadioButton";
import RNPickerSelect from "react-native-picker-select";
import placesPicker from "../../data/placesPicker";
import Colors from "../../constants/Colors";
import { Avatar } from "react-native-elements";

const EditProfileScreen = () => {
  // ラジオボタンのstateを男女別に保持
  const [isManSelected, setIsManSelected] = useState(false);
  const [isWomanSelected, setIsWomanSelected] = useState(true);

  // ラジオボタンのstateを変える
  const changeManState = () => {
    if (!isManSelected) {
      setIsManSelected(true);
      setIsWomanSelected(false);
    }
  };

  const changeWomanState = () => {
    if (!isWomanSelected) {
      setIsWomanSelected(true);
      setIsManSelected(false);
    }
  };

  // 数値チェック
  const convertNumeric = (value) => {
    console.log(value);
  };

  return (
    <TouchableWithoutFeedback style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Avatar
            size="large"
            rounded
            title="アップロード"
            titleStyle={{ fontSize: 10 }}
            onPress={() => {
              console.log("Pressed!");
            }}
            activeOpacity={1}
          />
          <View style={styles.name}>
            <Text>ニックネーム</Text>
            <TextInput style={styles.inputBox} placeholder="ニックネーム" />
          </View>
          <View style={styles.sex}>
            <Text>性別</Text>
            <View style={styles.radioContainer}>
              <RadioButton
                onChange={changeWomanState}
                isSelected={isWomanSelected}
              >
                <Text
                  style={{
                    color: isWomanSelected ? "#54595D" : "#CBCED0",
                    fontWeight: "bold",
                  }}
                >
                  女性
                </Text>
              </RadioButton>
              <RadioButton onChange={changeManState} isSelected={isManSelected}>
                <Text
                  style={{
                    color: isManSelected ? "#54595D" : "#CBCED0",
                    fontWeight: "bold",
                  }}
                >
                  男性
                </Text>
              </RadioButton>
            </View>
          </View>
          <View>
            <Text>生年月日</Text>
            <TextInput
              keyboardType="numeric"
              onChange={(value) => {
                convertNumeric(value);
              }}
            />
          </View>
          <View style={styles.address}>
            <Text>住んでるところ</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={placesPicker}
              placeholder={{ label: "選択してください", value: "" }}
              style={pickerSelectStyles}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  inputBox: {
    backgroundColor: Colors.subColor1,
    height: 50,
    padding: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "#333",
    backgroundColor: Colors.subColor1,
  },
  inputAndroid: {
    fontSize: 16,
    color: "#333",
    backgroundColor: Colors.subColor1,
  },
});

export default EditProfileScreen;
