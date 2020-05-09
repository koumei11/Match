import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Modal from "../Modals";
import Buttons from "../buttons/Buttons";
import drinkChoice from "../../data/drinkChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const DrinkComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // お酒
  const [isNotCareDrink, setIsNotCareDrink] = useState(
    filterSettings.isNotCareDrink
  );
  const [modalDrink, setModalDrink] = useState(filterSettings.drink);
  const [drink, setDrink] = useState(filterSettings.drink);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setIsNotCareDrink(true);
      setDrink({});
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「お酒」
    if (isNotCareDrink) {
      setModalDrink({});
    }
  }, [isNotCareDrink]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「休日」
    if (Object.keys(modalDrink).length) {
      setIsNotCareDrink(false);
    } else {
      setIsNotCareDrink(true);
    }
  }, [modalDrink]);

  // holidayを入力するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ drink: drink, isNotCareDrink: isNotCareDrink }));
  }, [drink, isNotCareDrink]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 9, drink, setModalDrink)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>お酒</Text>
          <View style={styles.choice}>
            {Object.keys(drink).length ? (
              Object.values(drink).map((value, key) => (
                <Text key={key} style={{ fontSize: 12 }}>
                  {value}
                </Text>
              ))
            ) : (
              <Text style={{ fontSize: 12 }}>気にしない</Text>
            )}
          </View>
        </View>
      </TouchableCmp>
      <Modal
        isModalVisible={isVisible}
        toggleModal={toggleModal.bind(this, 0, drink, setModalDrink)}
      >
        <View style={styles.popup}>
          <View style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareDrink}
              onChange={() => {
                setIsNotCareDrink(true);
              }}
            >
              {drinkChoice[0]}
            </SelectBox>
            <SelectBox
              isSelected={1 in modalDrink}
              onChange={selectChoice.bind(
                this,
                { 1: "全く飲まない" },
                modalDrink,
                setModalDrink
              )}
              style={styles.selectBoxes}
            >
              {drinkChoice[1]}
            </SelectBox>
            <SelectBox
              isSelected={2 in modalDrink}
              onChange={selectChoice.bind(
                this,
                { 2: "時々飲む" },
                modalDrink,
                setModalDrink
              )}
            >
              {drinkChoice[2]}
            </SelectBox>
            <SelectBox
              isSelected={3 in modalDrink}
              onChange={selectChoice.bind(
                this,
                { 3: "よく飲む" },
                modalDrink,
                setModalDrink
              )}
            >
              {drinkChoice[3]}
            </SelectBox>
          </View>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, drink, setModalDrink)}
            onPressComplete={setSelect.bind(this, modalDrink, setDrink)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DrinkComponent;
