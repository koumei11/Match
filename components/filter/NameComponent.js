import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

const NameComponent = ({ styles, filterSettings, isReset }) => {
  // 名前
  const [inputText, setInputText] = useState(filterSettings.name);
  const dispatch = useDispatch();

  // nameを入力するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ name: inputText }));
  }, [inputText]);

  useEffect(() => {
    if (isReset) {
      setInputText("");
    }
  });

  return (
    <View style={styles.wordSearch}>
      <Text style={styles.title1}>名前検索</Text>
      <TextInput
        style={styles.inputText}
        placeholder="検索したい名前を入力してください"
        value={inputText}
        onChangeText={(text) => {
          setInputText(text);
        }}
      />
    </View>
  );
};

export default NameComponent;
