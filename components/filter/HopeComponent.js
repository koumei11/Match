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
import hopeChoice from "../../data/hopeChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const HopeComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 出会うまでの希望
  const [isNotCareHope, setIsNotCareHope] = useState(
    filterSettings.isNotCareHope
  );
  const [modalHope, setModalHope] = useState(filterSettings.hope);
  const [hope, setHope] = useState(filterSettings.hope);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setIsNotCareHope(true);
      setHope({});
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「出会うまでの希望」
    if (isNotCareHope) {
      setModalHope({});
    }
  }, [isNotCareHope]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「出会うまでの希望」
    if (Object.keys(modalHope).length) {
      setIsNotCareHope(false);
    } else {
      setIsNotCareHope(true);
    }
  }, [modalHope]);

  // hopeを入力するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ hope: hope, isNotCareHope: isNotCareHope }));
  }, [hope, isNotCareHope]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 11, hope, setModalHope)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>出会うまでの希望</Text>
          <View style={styles.choice}>
            {Object.keys(hope).length ? (
              Object.values(hope).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, hope, setModalHope)}
      >
        <View style={styles.popup}>
          <View style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareHope}
              onChange={() => {
                setIsNotCareHope(true);
              }}
            >
              {hopeChoice[0]}
            </SelectBox>
            <SelectBox
              isSelected={1 in modalHope}
              onChange={selectChoice.bind(
                this,
                { 1: "まずは会いたい" },
                modalHope,
                setModalHope
              )}
              style={styles.selectBoxes}
            >
              {hopeChoice[1]}
            </SelectBox>
            <SelectBox
              isSelected={2 in modalHope}
              onChange={selectChoice.bind(
                this,
                { 2: "気が合えば会いたい" },
                modalHope,
                setModalHope
              )}
            >
              {hopeChoice[2]}
            </SelectBox>
            <SelectBox
              isSelected={3 in modalHope}
              onChange={selectChoice.bind(
                this,
                { 3: "メッセージを重ねてから" },
                modalHope,
                setModalHope
              )}
            >
              {hopeChoice[3]}
            </SelectBox>
            <SelectBox
              isSelected={4 in modalHope}
              onChange={selectChoice.bind(
                this,
                { 4: "まずは通話したい" },
                modalHope,
                setModalHope
              )}
            >
              {hopeChoice[4]}
            </SelectBox>
          </View>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, hope, setModalHope)}
            onPressComplete={setSelect.bind(this, modalHope, setHope)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HopeComponent;
