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
import tabaccoChoice from "../../data/tabaccoChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const TabaccoComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 休日
  const [isNotCareTabacco, setIsNotCareTabacco] = useState(
    filterSettings.isNotCareTabacco
  );
  const [modalTabacco, setModalTabacco] = useState(filterSettings.tabacco);
  const [tabacco, setTabacco] = useState(filterSettings.tabacco);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setIsNotCareTabacco(true);
      setTabacco({});
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「タバコ」
    if (isNotCareTabacco) {
      setModalTabacco({});
    }
  }, [isNotCareTabacco]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「タバコ」
    if (Object.keys(modalTabacco).length) {
      setIsNotCareTabacco(false);
    } else {
      setIsNotCareTabacco(true);
    }
  }, [modalTabacco]);

  // tabaccoを入力するたびにstateを更新
  useEffect(() => {
    dispatch(
      setConditions({ tabacco: tabacco, isNotCareTabacco: isNotCareTabacco })
    );
  }, [tabacco, isNotCareTabacco]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 10, tabacco, setModalTabacco)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>タバコ</Text>
          <View style={styles.choice}>
            {Object.keys(tabacco).length ? (
              Object.values(tabacco).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, tabacco, setModalTabacco)}
      >
        <View style={styles.popup}>
          <View style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareTabacco}
              onChange={() => {
                setIsNotCareTabacco(true);
              }}
            >
              {tabaccoChoice[0]}
            </SelectBox>
            <SelectBox
              isSelected={1 in modalTabacco}
              onChange={selectChoice.bind(
                this,
                { 1: "吸わない" },
                modalTabacco,
                setModalTabacco
              )}
              style={styles.selectBoxes}
            >
              {tabaccoChoice[1]}
            </SelectBox>
            <SelectBox
              isSelected={2 in modalTabacco}
              onChange={selectChoice.bind(
                this,
                { 2: "時々吸う" },
                modalTabacco,
                setModalTabacco
              )}
            >
              {tabaccoChoice[2]}
            </SelectBox>
            <SelectBox
              isSelected={3 in modalTabacco}
              onChange={selectChoice.bind(
                this,
                { 3: "お酒の場だけ吸う" },
                modalTabacco,
                setModalTabacco
              )}
            >
              {tabaccoChoice[3]}
            </SelectBox>
            <SelectBox
              isSelected={4 in modalTabacco}
              onChange={selectChoice.bind(
                this,
                { 4: "吸う" },
                modalTabacco,
                setModalTabacco
              )}
            >
              {tabaccoChoice[4]}
            </SelectBox>
          </View>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, tabacco, setModalTabacco)}
            onPressComplete={setSelect.bind(this, modalTabacco, setTabacco)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default TabaccoComponent;
