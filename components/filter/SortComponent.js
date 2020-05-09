import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// ※有料会員の場合のロジックは後回し

const SortComponent = ({ styles, filterSettings, isReset }) => {
  const [sort, setSort] = useState(filterSettings.sort);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setConditions({ sort: sort }));
  }, [sort]);

  useEffect(() => {
    if (isReset) {
      setSort(0);
    }
  });

  return (
    <View>
      <View>
        <TouchableWithoutFeedback onPress={() => setSort(0)}>
          <View style={styles.selectList}>
            <Text style={styles.text}>ランダム</Text>
            {sort === 0 && <AntDesign name="check" />}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => setSort(1)}>
          <View style={styles.selectList}>
            <Text style={styles.text}>新着順</Text>
            {sort === 1 && <AntDesign name="check" />}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => setSort(2)}>
          <View style={styles.selectList}>
            <Text style={styles.text}>ログイン順</Text>
            {sort === 2 && <AntDesign name="check" />}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => setSort(3)}>
          <View style={{ ...styles.selectList, borderBottomWidth: 0 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>人気順</Text>
              <Text style={{ fontSize: 12, marginLeft: 10, color: "#EFE275" }}>
                有料会員限定
              </Text>
            </View>
            {sort === 3 && <AntDesign name="check" />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SortComponent;
